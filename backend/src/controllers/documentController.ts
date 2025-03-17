import express from 'express'
import * as fileHander from "fs";
import { documentModel } from '../models/documentModel'
import { compileTex, clearCompilationFiles, deleteDocumentFiles } from '../handlers/commandHandlers';
import { loadTexFile } from '../handlers/fileHandlers';
import { textfieldToTex, sectionToTex, subsectionToTex, documentclassToTex, subsubsectionToTex, basicToTexFontConverter,titlePageToTex } from '../handlers/toTexConverters';
import { sectionToBlock, 
  documentclassToBlock, 
  textfieldToBlock, 
  subsectionToBlock, 
  subsubsectionToBlock, 
  getAuthorFromTex, 
  getDateFromTex, 
  getTitleFromTex } from '../handlers/toBlockConverters';
import { verifySession, extendSession } from '../auth/auth';
import { blockType, titlePageType } from '../types';


export const getDocumentById = async (req: express.Request, res: express.Response)=>{

  
    try{
      const {id} = req.params;
      const document = await documentModel.findById(id);
      res.status(200).json(document);
  }catch(error){
      console.log("Get ERROR: ", error)
      res.sendStatus(400);
  }
          


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

export const  getDocuments= async (req: express.Request, res: express.Response)=>{
  try{
      const documents = await documentModel.find();
      res.status(200).json(documents);
  }catch(error){
      console.log("Get ERROR: ", error)
      res.sendStatus(400);
  }
};

export const getUserDocuments = async (req: express.Request, res: express.Response)=>{

  try{
    const {userId, documentClass} = req.params;
   

    if(req.cookies.auth && await verifySession(req.cookies.auth)===userId ){
      await extendSession(req.cookies.auth,res)
      let  userDocuments;
      switch (documentClass){
        case 'all':
        userDocuments = await documentModel.find({userId: userId})
        break;
        case 'article':
        userDocuments = await documentModel.find({userId: userId, documentClass: 'article'})
        break;
        case 'beamer':
        userDocuments = await documentModel.find({userId: userId, documentClass: 'beamer'})
        break;
        case 'report':
        userDocuments = await documentModel.find({userId: userId, documentClass: 'report'})
        break;
        case 'book':
        userDocuments = await documentModel.find({userId: userId, documentClass: 'book'})
        break;
        case 'letter':
        userDocuments = await documentModel.find({userId: userId, documentClass: 'letter'})
        break;
        case 'slides':
        userDocuments = await documentModel.find({userId: userId, documentClass: 'slides'})
        break;
        default:
        userDocuments = null
        break;
      }
      //const userDocuments = await documentModel.find({userId: userId})

      res.status(200).json(userDocuments)
    }else{
      res.sendStatus(401)
    }
  }catch(error){
    console.log("getUserDocuments error: ", error)
    res.sendStatus(500)
  }

}

export const  getPdf= async (req: express.Request, res: express.Response)=>{
 
  try{
    const {id} = req.params;
    const documentInstantion = await documentModel.findById(id)


    //console.log("cookie:", req.cookies.auth)  
    //console.log("usrId1:", documentInstantion.userId)
    //console.log("usrId2:", await verifySession(req.cookies.auth))
    //if(req.cookies.auth && await verifySession(req.cookies.auth)===documentInstantion.userId ){
      //await extendSession(req.cookies.auth,res)


    // res.setHeader("Content-Disposition", 'inline; filename="document.pdf"');

    await compileTex('documentBase', id+'.tex')
    clearCompilationFiles('documentBase', id+'.tex')
    res.setHeader('Content-type', 'application/pdf')
    await extendSession(req.cookies.auth,res)
    fileHander.createReadStream('documentBase/'+id+'.pdf').pipe(res);
 
  // }else{
  //   res.status(403).send({msg: 'Not loged in!'});
  // }
      //res.status(200).json(documents);
  }catch(error){
      console.log("Get ERROR: ", error)
      res.sendStatus(400);
  }
};

export const getDocumentContent = async (req: express.Request, res: express.Response)=>{
  const nullBlock: blockType = {typeOfBlock: null, blockContent: null}
 
  try{

    const logedUser = await verifySession(req.cookies.auth);

    //sprawdzenie czy jest sesja i czy użytkenik isntienie
      if(logedUser!==null && logedUser!== undefined){
        const {id}= req.params;
        const documentInstantion = await documentModel.findById(id)

        //sprawdzenie czy id z sesji zgadza sie z id właściiciela dokumnetu
        if(logedUser===documentInstantion.userId ){
          //await extendSession(req.cookies.auth,res)

          let document: (string | undefined)[] = await loadTexFile(id);
          //console.log(document)

          let titlePageData = {
            title: '',
            author: '',
            date: ''
          }

          let blocks: (blockType)[] = document.map((line, idx)=>{
            //line.indexOf("fraza")===0 jeśli wytłapywanie na początku a nie w środku
            //console.log(line)

            
            if(line.includes('\\documentclass')) return  documentclassToBlock(line);
            if(line.includes('\\title')) {titlePageData.title=getTitleFromTex(line); return  nullBlock};
            if(line.includes('\\author')) {titlePageData.author=getAuthorFromTex(line); return  nullBlock};
            if(line.includes('\\date')) {titlePageData.date=getDateFromTex(line); return  nullBlock};
            if(line.includes('\\maketitle')) return  {typeOfBlock: 'titlePage', blockContent: titlePageData};
            if(line.includes('\\tableofcontents')) return  {typeOfBlock: 'tableOfContents', blockContent: ''};
            if(line.includes('\\newpage')) return  {typeOfBlock: 'pageBreak', blockContent: ''};
            if(line.includes('\\section')) return  sectionToBlock(line);
            if(line.includes('\\subsection')) return  subsectionToBlock(line);
            if(line.includes('\\subsubsection')) return  subsubsectionToBlock(line);
            if(line==='') return nullBlock;
            if(line.includes('\\begin{document}')) return nullBlock;
            if(line.includes('\\end{document}')) return  nullBlock;
            if(line.includes('\\usepackage')) return  nullBlock;
            if(line==='') return  nullBlock;
            return  textfieldToBlock(line)
            })
          blocks = blocks.filter(block => (block.typeOfBlock!==undefined && block.typeOfBlock!==null))
          //console.log(blocks)

    // res.cookie('auth', req.cookies.auth, {maxAge: 1000 * 60 * 1, sameSite: 'lax', //httpOnly: true
    // })
          res.status(200).json(blocks);

        }else{
          res.status(401).send({msg: 'Not loged in!'});
        }
      }else{
       res.status(401).send({msg: 'Not loged in!'});
      }
  } catch(error){
    console.log("Get ERROR: ", error)
    res.sendStatus(500); 
}

}

export const createDocument = async (req: express.Request, res: express.Response)=>{

//const nd: (string |undefined)[]= ["\\documentclass{book}", , "\\begin{document}",, "wlazł kotek na płotek i mrugaa",, "\\end{document}"];

    try{
      const userId = await verifySession(req.cookies.auth)
       const documentNameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9. _!@#$%^&-]{3,255}(?<![_.])$/g

      if(req.cookies.auth &&  userId){
        await extendSession(req.cookies.auth,res)

        if(documentNameRegex.test(req.body.name)){
        const documentData= {name: req.body.name, 
                    userId: userId,
                    documentClass:  req.body.documentClass,
                    creationDate: new Date(Date.now()),
                   lastUpdate: new Date(Date.now()),
        }

        const document= new documentModel(documentData);
        const savedDocument = await document.save();



        const content: (string |undefined)[] = [`\\documentclass{${savedDocument.documentClass}}`, , 
          "\\begin{document}",'New document', "\\end{document}"];
        const fileName: string= savedDocument._id+".tex"
        const path: string = "documentBase" 
        fileHander.writeFileSync([path, fileName].join("/"), content.join("\n"));

        //compileTex(path, fileName);
        //clearCompilationFiles(path, fileName);

        res.status(201).json(savedDocument);
      }
      else{
        res.sendStatus(403)
      }
    }
        else{
          res.sendStatus(401)
        }
    }catch(error){
        console.log("Post ERROR: ", error) 
        res.sendStatus(400);
    }
};

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
    
    let document: (string | undefined)[] = await loadTexFile(id);
    document.splice(idx,0, line);
    //console.log(content);

    fileHander.writeFileSync(`documentBase/${id}.tex`, document.join("\n"));

    res.sendStatus(200);
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
}





// export const updateLine = async (req: express.Request, res: express.Response)=>{
//   // try{
//   //   const {id} = req.params;
//   //   const {lineNr, line} = req.body;
//   //   let content: (string | undefined)[] = await loadTexFile(id);
//   //   content.splice(lineNr-1,1, line);
//   //   console.log(content);

//   //   fileHander.writeFileSync(`documentBase/${id}.tex`, content.join("\n"));

//   //   res.sendStatus(200);
//   // }catch(error){
//   //   console.log(error);
//   //   res.sendStatus(500);
//   // }

//   try{
//     const {id} = req.params;
//     const {idx, block} = req.body as {idx: number, block: blockType};

//     let line;
//     switch(block.typeOfBlock){
//       case 'textfield':
//        line = textfieldToTex(block.blockContent as string);
//        break;
//       default:
//         console.log("This type of block don't exists! ", block.typeOfBlock)
//     }

//     let document: (string | undefined)[] = await loadTexFile(id);
//     document.splice(idx,1, line);
//     //console.log(content);

//     fileHander.writeFileSync(`documentBase/${id}.tex`, document.join("\n"));

//     res.sendStatus(200);
//   }catch(error){
//     console.log(error);
//     res.sendStatus(500);
//   }

// }

// export const updateLines = async (req: express.Request, res: express.Response)=>{
//   type chapterType = {
//     head: string | null | undefined,
//     body: string | null | undefined
//   }

//   const parseToTex = (chapter: chapterType)=>{
//       const title = `\\section{${chapter.head}}`
//       //console.log("Przed", chapter.body );
//       let content = chapter.body.split('</p>');
//       //console.log("Po split", content);
//       content = content.map(line=> line.replace('<p>', ''));
//       //console.log("Po map", content);
//       const endContent = content.join(" ");
//       //console.log("Po join", endContent);

//       /*
//       W taki sam sposób jak <p> z boldami i resztą:
//         1. wyszukanie i podzielenie na elementy tablicy po znaku </b>
//         2. podzelenie elemenmtów na kolejene tablie tak zamo jak w 1. tylko względem <b>
//         3. powinna powstać tablica zabierajace podtablice o 2 elementach gdzioe ten drugi element ma być boldem - usunąć z niego znaczniki i opatrzyć w skłądnie Tex
//         4. złączayć wszytko w jeden string do zmiennej content (falt i join chyba trzeba bedzie)
//       */

//       return [title, endContent];
//   }

//   try{
//     const {id} = req.params;
//     const {sections} = req.body;
//     console.log("section", sections);
//     const toTex = sections.map(parseToTex).flat();
//     console.log("toTex", toTex);
//     let content: (string | undefined)[] = await loadTexFile(id);
//     content.splice(4,0, toTex);
//     content=content.flat();
//     console.log("content", content);

//     fileHander.writeFileSync(`documentBase/${id}.tex`, content.join("\n"));

//     await compileTex('documentBase', id+'.tex')
//     //clearCompilationFiles('documentBase', id+'.tex')

//     res.sendStatus(200);
//   }catch(error){
//     console.log(error);
//     res.sendStatus(500);
//   }
// }

export const updateWholeDocumentContent  = async (req: express.Request, res: express.Response)=>{

//z jakiejś duby wrzuciło się to dłuższe usepackage do środka, oraz po listach nie mozna dawać nowej lini

  try{
  const {id} = req.params;
  const blocks = req.body as blockType[]; 

  console.log(blocks);
  
   // let titlePageData = {title: '', author: '', date: ''}
  let document: (string | undefined)[] = blocks.map((block: blockType, idx: number)=>{
    switch(block.typeOfBlock){
      case 'documentclass':
        return documentclassToTex(block.blockContent as string);
      case 'titlePage':
        if(typeof block.blockContent === "object" && 'title' in block.blockContent && 'author' in block.blockContent && 'date' in block.blockContent){
          // titlePageData=block.blockContent;
          //   return '\\maketitle'
          return titlePageToTex(block.blockContent)
        }
        return ''
      case 'tableOfContents':
        return '\\tableofcontents'
      case 'pageBreak':
        return '\\newpage'
      case 'textfield':
       return textfieldToTex(block.blockContent as string);
      case 'section':
       return sectionToTex(block.blockContent as string);
      case 'subsection':
       return subsectionToTex(block.blockContent as string);
       case 'subsubsection':
        return subsubsectionToTex(block.blockContent as string);
      default:
        console.log("This type of block don't exists! ", block.typeOfBlock)
    }
  })

 
    // document.splice(1,0,`\\title{${basicToTexFontConverter( titlePageData.title)}}`
    //   +`\n\\author{${basicToTexFontConverter( titlePageData.author)}}`
    //   +`\n\\date{${basicToTexFontConverter( titlePageData.date)}}`
    // );

      document.splice(1,0,'\\usepackage{ulem}'
        +'\n\\usepackage[colorlinks=true, linkcolor=blue, urlcolor=blue]{hyperref}'
        +'\n\\begin{document}'
      );
     document.push('\\end{document}')
    console.log(document);
    fileHander.writeFileSync(`documentBase/${id}.tex`, document.join("\n"));

    const updatedDocument = await documentModel.findByIdAndUpdate(id, {lastUpdate: new Date(Date.now())})

    //console.log('saved, now compiling...')
    //await compileTex('documentBase', id+'.tex')
   // clearCompilationFiles('documentBase', id+'.tex')

    await extendSession(req.cookies.auth,res )
    res.sendStatus(200);
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
}


export const renameDocument  = async (req: express.Request, res: express.Response)=>{
  try{
    const {id}=req.params
    const userId = await verifySession(req.cookies.auth)
    const documentNameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9. _!@#$%^&-]{3,255}(?<![_.])$/g
   
    const document = await documentModel.findById(id)
   // console.log('userId',id)
    if(req.cookies.auth && userId && userId===document.userId){
      await extendSession(req.cookies.auth,res)

      if(documentNameRegex.test(req.body.name)){
      const updatedDocument = await documentModel.findByIdAndUpdate(id, {name: req.body.name, lastUpdate: new Date(Date.now())})
      res.sendStatus(200)
      }else{
        res.sendStatus(403)
      }
    
    }else{
      res.sendStatus(401)
    }
  }catch(error){
    console.log('rename document error: ', error)
  }
}

export const deleteDocument  = async (req: express.Request, res: express.Response)=>{
  try{
    const {id}=req.params
    const userId = await verifySession(req.cookies.auth)
   
    const document = await documentModel.findById(id)
   // console.log('userId',id)
    if(req.cookies.auth && userId && userId===document.userId){
      await extendSession(req.cookies.auth,res)

      await deleteDocumentFiles('documentBase',id)
      const updatedDocument = await documentModel.findByIdAndDelete(id)

      res.sendStatus(200)
    
    }else{
      res.sendStatus(401)
    }
  }catch(error){
    console.log('rename document error: ', error)
  }
}



