import express from 'express'
import * as fileHander from "fs";
import { documentModel, documentType } from '../models/documentModel'
import { compileTex, clearCompilationFiles, deleteDocumentFiles } from '../handlers/commandHandlers';
import { deleteFile, doesTexFileExist, loadTexFile,  saveFileWithContent} from '../handlers/fileHandlers';
import { textfieldToTex, 
  sectionToTex, 
  subsectionToTex, 
  documentclassToTex, 
  subsubsectionToTex, 
  basicToTexFontConverter,
  titlePageToTex, 
  equationToTex,
  tableToTex, 
  figureToTex, 
  referencesToTex, 
  slideBreaktoTex,
addressAndDateToTex,
openingToTeX,
bookSectionToTex,
closingToTeX } from '../handlers/toTexConverters';
import { sectionToBlock, 
  documentclassToBlock, 
  textfieldToBlock, 
  subsectionToBlock, 
  subsubsectionToBlock, 
  getAuthorFromTex, 
  getDateFromTex, 
  getTitleFromTex, 
  equationToBlock, 
  figureToBlock,
  referencesToBlock,
  slideBreakToBlock,
  addressAndDateToBlock,
  chapterToBlock, 
    bookSubsubsectionToBlock,
tableToBlock,
openingToBlock,
closingToBlock} from '../handlers/toBlockConverters';
import { verifySession,verifySessionWithCallback, extendSession } from '../auth/auth';
import { blockAbleToRef, blockType, referencesElementType, slideBreak, titleSectionType} from '../types';
import { figureModel } from '../models/figureModel';
import { Document, InferSchemaType } from 'mongoose';
import { nameRegex } from '../nameRegexes';




const verifyAccesToDocument= async (sessionId:string, documentId:string, res: express.Response, callback: (userId:string, documentInstantion: documentType)=>Promise<void>): Promise<void>=>{
  await verifySessionWithCallback(sessionId, res, async (userId: string)=>{
    try{
        if(documentId===null || documentId===undefined){
          res.sendStatus(400);
        }else{
          const documentInstantion = await documentModel.findById(documentId)
          if (documentInstantion===null || documentInstantion===undefined){
          res.sendStatus(404)
          }else{
            if(documentInstantion.userId!==userId){
              res.sendStatus(403)
            }else{
              await callback(userId, documentInstantion)
            }
          }
        }
    }catch(error){
      console.log('Document acces verification error:', error)
              if(!res.headersSent){
            res.sendStatus(500)
        }
    }
    })
  
}

// const verifyAccesToDocument= async (userId:string, documentId:string, res: express.Response, callback: (userId:string)=>Promise<void>): Promise<void>=>{
 
//     try{
//        const documentInstantion = await documentModel.findById(documentId)
//        if (documentInstantion===null || documentInstantion===undefined){
//         res.sendStatus(404)
//        }else{
//           if(documentInstantion.userId!==userId){
//               res.sendStatus(403)
//           }else{
//             await callback(userId, documentInstantion)
//           }
        
//        }

//     }catch(error){
//       console.log('Document acces verification error:', error)
//               if(!res.headersSent){
//             res.sendStatus(500)
//         }
//     }
  
// }


export const getDocumentById = async (req: express.Request, res: express.Response)=>{

  await verifyAccesToDocument(req.cookies.auth, req.params.id, res, async ( userId: string, documentInstantion:documentType)=>{
    try{
      res.status(200).json(documentInstantion);
    }catch(error){
      console.log("Get ERROR: ", error)
      if(!res.headersSent){
        res.sendStatus(500);
      }
    }
  })

// bez ciasteczek poniżej
    // try{
    //     const {id} = req.params;
    //     const document = await documentModel.findById(id);
    //     res.status(200).json(document);
    // }catch(error){
    //     console.log("Get ERROR: ", error)
    //     res.sendStatus(400);
    // }
};

// dokumenty wszystkich użytkowników
export const  getDocuments= async (req: express.Request, res: express.Response)=>{

  try{
      const documents = await documentModel.find().sort({ lastUpdate: -1 });
      //console.log('documents list',documents)
     // documents.sort((a, b)=>new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime())
      res.status(200).json(documents);
  }catch(error){
      console.log("Get ERROR: ", error)
      res.sendStatus(400);
  }
};

export const getUserDocuments = async (req: express.Request, res: express.Response)=>{

  await verifySessionWithCallback(req.cookies.auth, res, async (userId: string)=>{
  try{
    const { documentClass} = req.params;

      let  userDocuments;
      switch (documentClass){
        case 'all':
        userDocuments = await documentModel.find({userId: userId}).sort({ lastUpdate: -1 });
        break;
        case 'article':
        userDocuments = await documentModel.find({userId: userId, documentClass: 'article'}).sort({ lastUpdate: -1 });
        break;
        case 'beamer':
        userDocuments = await documentModel.find({userId: userId, documentClass: 'beamer'}).sort({ lastUpdate: -1 });
        break; 
        case 'report':
        userDocuments = await documentModel.find({userId: userId, documentClass: 'report'}).sort({ lastUpdate: -1 });
        break;
        case 'book':
        userDocuments = await documentModel.find({userId: userId, documentClass: 'book'}).sort({ lastUpdate: -1 });
        break;
        case 'letter':
        userDocuments = await documentModel.find({userId: userId, documentClass: 'letter'}).sort({ lastUpdate: -1 });
        break;
        case 'slides':
        userDocuments = await documentModel.find({userId: userId, documentClass: 'slides'}).sort({ lastUpdate: -1 });
        break;
        default:
        userDocuments = null
        break;
      }
      //const userDocuments = await documentModel.find({userId: userId})
      await extendSession(req.cookies.auth,res)
      res.status(200).json(userDocuments)
  
  }catch(error){
    console.log("getUserDocuments error: ", error)
    res.sendStatus(500)
  }

  })


}
 

export const  getPdf= async (req: express.Request, res: express.Response)=>{
 
  await  verifyAccesToDocument(req.cookies.auth, req.params.id, res,async ( userId: string, documentInstantion:  documentType)=>{
        try{  
          
          if(!doesTexFileExist(documentInstantion.path, documentInstantion._id as unknown as string)) {
             res.sendStatus(410)
          }else{
            
              try{
            await compileTex(documentInstantion.path, documentInstantion._id as unknown as string+'.tex')
          }catch(error){
            //rozróżnianie jak plik nie istnieje a jak rekord w bazie nie isnieje
            console.log('in docController compilation error: ',error)
            res.sendStatus(422)
          }
            clearCompilationFiles(documentInstantion.path, documentInstantion._id  as unknown as string+'.tex')
          } 
        
        
          if (!res.headersSent) {
            await extendSession(req.cookies.auth,res)
            res.setHeader('Content-type', 'application/pdf')
            //FIXME ?można zrobić sendFile??
            const stream = fileHander.createReadStream([documentInstantion.path, [documentInstantion._id as unknown as string, 'pdf'].join('.')].join('/'))
            stream.pipe(res);
            stream.on('error', (error: NodeJS.ErrnoException)=>{
              console.log("Stream pdf error: ", error)
              if (!res.headersSent) {
                if(error.code==='ENOENT' && error.errno===-4058){
                  res.sendStatus(404)
                }else{
                  res.sendStatus(500)
                }
              } else {
                res.destroy();
              }
            })
          }
        }catch(error){
          console.log("Get pdf error: ", error)
          if(!res.headersSent){
            res.sendStatus(500);
          }
        }
  });
};

export const  getTexFile= async (req: express.Request, res: express.Response)=>{
 await  verifyAccesToDocument(req.cookies.auth, req.params.id, res,async ( userId: string, documentInstantion:  documentType)=>{
 
  try{
    //const userId = await verifySession(req.cookies.auth, res);

    //await compileTex(documentInstantion.path, id+'.tex')
    //clearCompilationFiles(documentInstantion.path, id+'.tex')
    if(!doesTexFileExist(documentInstantion.path, documentInstantion._id as unknown as string)) {
             res.sendStatus(410)
          }else{
    res.setHeader('Content-type', 'text/x-tex')
    await extendSession(req.cookies.auth,res)
    //FIXME ?można zrobić sendFile??
    //FIXME obsługa błędow?
    fileHander.createReadStream([documentInstantion.path, [documentInstantion._id, 'tex'].join('.')].join('/')).pipe(res);
          }
 
  // }else{
  //   res.status(403).send({msg: 'Not loged in!'});
  // }
      //res.status(200).json(documents);
  }catch(error){
      console.log("getTexFile error: ", error)
     if(!res.headersSent){
        res.sendStatus(500);
    }
  }
})
};

export const getDocumentContent = async (req: express.Request, res: express.Response)=>{
  const nullBlock: blockType = {typeOfBlock: null, blockContent: null}

   await verifyAccesToDocument(req.cookies.auth, req.params.id, res,async ( userId: string, documentInstantion:  documentType)=>{
 
  try{

        if(!doesTexFileExist(documentInstantion.path, documentInstantion._id as unknown as string)) {
             res.sendStatus(410)
          }else{


          let document: (string | undefined)[] = await loadTexFile(documentInstantion.path, documentInstantion._id as unknown as string);
          //console.log(document)

          let titlePageData = {
            title: '',
            author: '',
            date: ''
          }

          let blocks: (blockType)[] = document.map((line, idx)=>{
            //line.indexOf("fraza")===0 jeśli wytłapywanie na początku a nie w środku
            

             
            if(line.includes('\\documentclass')) return  documentclassToBlock(line);
             if(line.includes('\\address')) {  return  addressAndDateToBlock(line)}
            if(line.includes('\\title')) {titlePageData.title=getTitleFromTex(line); return  nullBlock};
            if(line.includes('\\author')) {titlePageData.author=getAuthorFromTex(line); return  nullBlock};
            if(line.includes('\\date')) {titlePageData.date=getDateFromTex(line); return  nullBlock};
            if(line.includes('\\maketitle')) return  {typeOfBlock: 'titlePage', blockContent: titlePageData};
           
            if(line.includes('\\tableofcontents')) return  {typeOfBlock: 'tableOfContents', blockContent: ''};
            if(line.includes('\\newpage')) return  {typeOfBlock: 'pageBreak', blockContent: ''};
            if(line.includes('\\begin{frame}')) return slideBreakToBlock(line);
            if(line.includes('\\end{frame}')) return  nullBlock;
             if(line.includes('\\chapter'))  return chapterToBlock(line)
            if(line.includes('\\section')) {if(documentInstantion.documentClass==='book'){subsectionToBlock(line)} return sectionToBlock(line)}
            if(line.includes('\\subsection')) {if(documentInstantion.documentClass==='book'){return subsubsectionToBlock(line)} return  subsectionToBlock(line)};
            if(line.includes('\\subsubsection')) {if(documentInstantion.documentClass==='book'){return   bookSubsubsectionToBlock(line)} return  subsubsectionToBlock(line)};
            if(line.includes('\\begin{equation}')) return equationToBlock(line);
            if(line.includes('\\begin{table}[h!] \\begin{center} \\begin{tabular}')) return tableToBlock(line);
            if(line==='' || line==='\r') return nullBlock;
            if(line.includes('\\begin{figure}')) return figureToBlock(line);
            if(line.includes('\\opening{')) return openingToBlock(line)
            if(line.includes('\\closing{')) return closingToBlock(line)
            if(line.includes('\\begin{thebibliography}')) return referencesToBlock(line);
            if(line.includes('\\begin{document}')) return nullBlock;
            if(line.includes('\\end{document}')) return  nullBlock;
            if(line.includes('\\begin{letter}')) return nullBlock;
            if(line.includes('\\end{letter}')) return  nullBlock;
            if(line.includes('\\usepackage')) return  nullBlock;
            if(line.includes('\\AtBegin')) return nullBlock
            if(line.includes('\\frame{')) return nullBlock
            if(line==='') return  nullBlock;
            return  textfieldToBlock(line)
            })
          blocks = blocks.filter(block => (block.typeOfBlock!==undefined && block.typeOfBlock!==null))
          //console.log(blocks)

    // res.cookie('auth', req.cookies.auth, {maxAge: 1000 * 60 * 1, sameSite: 'lax', //httpOnly: true
    // })
          res.status(200).json(blocks);

          }

  } catch(error){
    console.log("getDocumentContent error: ", error)
    if(!res.headersSent){
        res.sendStatus(500);
    }
}
})
  
} 

export const createDocument = async (req: express.Request, res: express.Response)=>{

//const nd: (string |undefined)[]= ["\\documentclass{book}", , "\\begin{document}",, "wlazł kotek na płotek i mrugaa",, "\\end{document}"];
await verifySessionWithCallback(req.cookies.auth, res, async (userId: string)=>{

    try{
      //const userId = await verifySession(req.cookies.auth, res)
       

        

        if(nameRegex.test(req.body.name)){
        const path: string = ['documentBase', userId].join('/')

        const documentData= {name: req.body.name, 
                    userId: userId,
                    documentClass:  req.body.documentClass,
                    path: path,
                    creationDate: new Date(Date.now()),
                   lastUpdate: new Date(Date.now()),
        }

        const document= new documentModel(documentData);
        const savedDocument = await document.save();



        const content: (string |undefined)[] = [`\\documentclass{${savedDocument.documentClass}}`, , 
          "\\begin{document}",'New document', "\\end{document}"];
        const fileName: string= savedDocument._id+".tex"
        
        await saveFileWithContent(savedDocument.path, savedDocument.id, 'tex', content.join("\n"))
        //fileHander.writeFileSync([path, fileName].join("/"), content.join("\n"));

        //compileTex(path, fileName);
        //clearCompilationFiles(path, fileName);
        await extendSession(req.cookies.auth,res)
        res.status(201).json(savedDocument);
      }
      else{
        res.sendStatus(422)
      }

    }catch(error){
        console.log("createDocument error: ", error) 
        if(!res.headersSent){
          res.sendStatus(500);
    }
    }
    })
};


// TODO reaczej do usuniecia
export const addLine = async (req: express.Request, res: express.Response)=>{
  // try{
  //   const {id} = req.params;
  //   const {lineNr, line} = req.body;
  //   let content: (string | undefined)[] = await loadTexFile(id);
  //   content.splice(lineNr-1,0, line);
  //   console.log(content);

  //   fileHander.writeFileSync(`documentBase/${id}.tex`, content.join("\n"));

  //   res.sendStatus(200);
  // }catch(error){
  //   console.log(error);
  //   res.sendStatus(500);
  // }

  try{
    const {id} = req.params;
    const {idx, block} = req.body as {idx: number, block: blockType};

    let line;
    switch(block.typeOfBlock){
      case 'textfield':
       line = textfieldToTex(block.blockContent as string);
       break;
      case 'section':
       line = sectionToTex(block.blockContent as string);
       break;
       case 'subsection':
        line = subsectionToTex(block.blockContent as string); 
        break; 
      default: 
        console.log("This type of block don't exists! ", block.typeOfBlock)
    } 
    
    let document: (string | undefined)[] = await loadTexFile('documentBase/',id);
    document.splice(idx,0, line);
    //console.log(content);

    fileHander.writeFileSync(`documentBase/${id}.tex`, document.join("\n"));

    res.sendStatus(200);
  }catch(error){
    console.log(error);
    if(!res.headersSent){
          res.sendStatus(500);
    }
  }
}


export const updateWholeDocumentContent  = async (req: express.Request, res: express.Response)=>{

 await verifyAccesToDocument(req.cookies.auth, req.params.id, res,async ( userId: string, documentInstantion:  documentType)=>{

  try{

   
      const blocks = req.body as blockType[]; 
      console.log(blocks);

   // let titlePageData = {title: '', author: '', date: ''}
      let document: (string | undefined)[] = await Promise.all( blocks.map(async (block: blockType, idx: number)=>{
      switch(block.typeOfBlock){
        case 'documentclass':{
          if(documentInstantion.documentClass!==block.blockContent as string){
            //FIXME branie jednego z typów?
            throw new Error("Document types are not the same!");
          }
          return documentclassToTex(block.blockContent as string);
      } case 'titlePage':{
        if(documentInstantion.documentClass==='letter'){
          return addressAndDateToTex(block.blockContent as titleSectionType)
        }
        if(typeof block.blockContent === "object" && 'title' in block.blockContent && 'author' in block.blockContent && 'date' in block.blockContent){
          // titlePageData=block.blockContent;
          //   return '\\maketitle'
          return titlePageToTex(block.blockContent as titleSectionType)
        }
        return ''
      }case 'tableOfContents':{
        return '\\tableofcontents'
       } case 'pageBreak':{
        if(documentInstantion.documentClass==='beamer'){
          //TODO jesli zrobion block usepackaga to samo > alb ojakis inny sposob na wykrywanie tego
          if(idx>1){
           
            return slideBreaktoTex(block.blockContent as slideBreak, false)
                     
          }

          return slideBreaktoTex(block.blockContent as slideBreak, true)
        }
        return '\\newpage' 
      }case 'textfield':{
       return textfieldToTex(block.blockContent as string);
       } case 'section':{ 
         if(documentInstantion.documentClass==='book'){
          return bookSectionToTex(block.blockContent as string);
         }
       return sectionToTex(block.blockContent as string);
      }case 'subsection':{
          if(documentInstantion.documentClass==='book'){
          return sectionToTex(block.blockContent as string);
         }else
        if(documentInstantion.documentClass==='letter'){ 
          return openingToTeX(block.blockContent as string)
        }
       return subsectionToTex(block.blockContent as string);
        }  case 'subsubsection':{
           if(documentInstantion.documentClass==='book'){
          return subsectionToTex(block.blockContent as string);
         }else
          if(documentInstantion.documentClass==='letter'){
          return closingToTeX(block.blockContent as string)
        } 
        return subsubsectionToTex(block.blockContent as string);
      }case 'subsubsubsection':{
           if(documentInstantion.documentClass==='book'){
          return subsubsectionToTex(block.blockContent as string);
         }
        return '%'+subsubsectionToTex(block.blockContent as string);
      }case 'equation':{
        return equationToTex(block.blockContent)
      }case 'table':{
        if(Array.isArray((block.blockContent as blockAbleToRef).content)){
          return tableToTex(block.blockContent as blockAbleToRef) 
        }
          return ''}
      case 'figure':{
         const noImagePath=['..', '..', 'figureBase/noImage.png'].join('/')
        if((block.blockContent as blockAbleToRef).content!=='' && (block.blockContent as blockAbleToRef).content){
          const figure= await figureModel.findById((block.blockContent as blockAbleToRef).content)
          if(figure!==null && figure.userId===userId){
            const path=['..', '..', figure.path, [figure._id, figure.fileType].join('.')].join('/')
           return figureToTex((block.blockContent as blockAbleToRef), path, documentInstantion.documentClass==='beamer' ? 6 : 10)
          }else{
            return figureToTex((block.blockContent as blockAbleToRef), noImagePath, documentInstantion.documentClass==='beamer' ? 6 : 10)
          }
        }else{
         return figureToTex((block.blockContent as blockAbleToRef), noImagePath, documentInstantion.documentClass==='beamer' ? 6 : 10)}
       
        
      }
      case 'references':
        return referencesToTex(block.blockContent as referencesElementType[])
      default:
        console.log("This type of block don't exists! ", block.typeOfBlock)
    }
  }))

 
    // document.splice(1,0,`\\title{${basicToTexFontConverter( titlePageData.title)}}`
    //   +`\n\\author{${basicToTexFontConverter( titlePageData.author)}}`
    //   +`\n\\date{${basicToTexFontConverter( titlePageData.date)}}` 
    // ); 



    let defaultPackages =['\\usepackage{ulem}',
      '\\usepackage{amsmath}', 
      //'\\usepackage[colorlinks=true, linkcolor=blue, urlcolor=blue]{hyperref}', 
      '\\usepackage{graphicx} ', 
      '\\usepackage{amssymb}',
     ]

     let beamerSettings=[
      '\\AtBeginSection[]{{\\centering \\huge{ \\insertsection} \\par}}',
      '\\AtBeginSubsection[]{{\\centering \\Large{ \\insertsubsection} \\par}}',
      '\\AtBeginSubsubsection[]{{\\centering \\large{ \\insertsubsubsection} \\par}}'
     ]

     let defaultEnding=['\\end{document}']


     switch (documentInstantion.documentClass){
      case 'beamer':
        document.splice(1,0,[...defaultPackages, ...beamerSettings, '\\begin{document}', '\\begin{frame}'].join('\n'))
        document.push(['\\end{frame}', ...defaultEnding].join('\n'))
        break
      case 'letter':
         document.splice(1,0,[...defaultPackages, '\\begin{document}', '\\begin{letter}{}'].join('\n'))
          document.push(['\\end{letter}', ...defaultEnding].join('\n'))
        break
      default:
         document.splice(1,0,[...defaultPackages, '\\begin{document}'].join('\n'))
          document.push(defaultEnding.join('\n'))
     }
    
   // console.log(document);
    await saveFileWithContent(documentInstantion.path, documentInstantion._id as unknown as string, 'tex',document.join("\n"))
    //fileHander.writeFileSync(documentInstantion.path+`/${id}.tex`, document.join("\n"));

    const updatedDocument = await documentModel.findByIdAndUpdate(documentInstantion._id, {lastUpdate: new Date(Date.now())})

    //console.log('saved, now compiling...')
    //await compileTex('documentBase', id+'.tex')
   // clearCompilationFiles('documentBase', id+'.tex')

    await extendSession(req.cookies.auth,res )
    res.sendStatus(200);

  }catch(error){
    console.log(error);
   if(!res.headersSent){
          res.sendStatus(500);
    }
  }
})
}


export const renameDocument  = async (req: express.Request, res: express.Response)=>{
  
   await verifyAccesToDocument(req.cookies.auth, req.params.id, res,async ( userId: string, documentInstantion:  documentType)=>{
  try{
   // console.log('userId',id)
      

      if(nameRegex.test(req.body.name)){
        const updatedDocument = await documentModel.findByIdAndUpdate(documentInstantion._id, {name: req.body.name, lastUpdate: new Date(Date.now())})
        await extendSession(req.cookies.auth,res)
        res.sendStatus(200)
      }else{
        res.sendStatus(422)
      }
  }catch(error){
    console.log('rename document error: ', error)
    if(!res.headersSent){
          res.sendStatus(500);
    }
  }
})
}

export const deleteDocument  = async (req: express.Request, res: express.Response)=>{
   await verifyAccesToDocument(req.cookies.auth, req.params.id, res,async ( userId: string, documentInstantion:  documentType)=>{
  try{
      //await deleteDocumentFiles(documentInstantion.path,id)
      await deleteFile(documentInstantion.path, documentInstantion._id as unknown as string, 'pdf')
      await deleteFile(documentInstantion.path, documentInstantion._id as unknown as string, 'tex')
      const updatedDocument = await documentModel.findByIdAndDelete(documentInstantion._id)

      await extendSession(req.cookies.auth,res)
      res.sendStatus(200)
    
  }catch(error){
    console.log('rename document error: ', error)
    if(!res.headersSent){
          res.sendStatus(500);
    }
  }
  })
}



