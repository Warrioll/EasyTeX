import express from 'express'
import * as fileHander from "fs";
import { exec } from 'child_process';
import { documentModel } from '../models/documentModel'
import { compileTex, clearCompilationFiles } from '../handlers/commandHandlers';
import { loadTexFile } from '../handlers/fileHandlers';
import { textfieldToTex, sectionToTex, subsectionToTex, documentclassToTex } from '../handlers/toTexConverters';
import { sectionToBlock, documentclassToBlock, textfieldToBlock } from '../handlers/toBlockConverters';
import { blockType } from '../types';


export const getDocumentById = async (req: express.Request, res: express.Response)=>{

  //--------------cookie test-------------------------
  if(req.cookies.auth && req.cookies.auth==='Warrioll' ){
    try{
      const {id} = req.params;
      const document = await documentModel.findById(id);
      res.status(200).json(document);
  }catch(error){
      console.log("Get ERROR: ", error)
      res.sendStatus(400);
  }
                res.status(201).send({msg: 'Access granted'});
            }else{
                res.status(403).send({msg: 'Acces denied!'});
            }
//--------------^cookie test^-------------------------

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

export const  getPdf= async (req: express.Request, res: express.Response)=>{
 
  try{
    const {id} = req.params;
    res.setHeader('Content-type', 'application/pdf')
   
    fileHander.createReadStream('documentBase/'+id+'.pdf').pipe(res);
      //res.status(200).json(documents);
  }catch(error){
      console.log("Get ERROR: ", error)
      res.sendStatus(400);
  }
};

export const getDocumentContent = async (req: express.Request, res: express.Response)=>{
  const nullBlock: blockType = {typeOfBlock: null, blockContent: null}
 // if(req.cookies.auth && req.cookies.auth==='Warrioll' ){
  try{
   const {id}= req.params;
   let document: (string | undefined)[] = await loadTexFile(id);
   console.log(document)
    let blocks: (blockType)[] = document.map((line, idx)=>{
    //line.indexOf("fraza")===0 jeśli wytłapywanie na początku a nie w środku
    //console.log(line)
      if(line.includes('\\documentclass')) return  documentclassToBlock(line);
      if(line.includes('\\section')) return  sectionToBlock(line);
      //if(line.includes('\\subsection')) return  subsectionToBlock(item);
      if(line==='') return nullBlock;
      if(line.includes('\\begin{document}')) return nullBlock;
      if(line.includes('\\end{document}')) return  nullBlock;
      if(line.includes('\\usepackage')) return  nullBlock;
      return  textfieldToBlock(line)
   })
   blocks = blocks.filter(block => (block.typeOfBlock!==undefined && block.typeOfBlock!==null))
   console.log(blocks)
   res.status(200).json(blocks);
  } catch(error){
    console.log("Get ERROR: ", error)
    res.sendStatus(500); 
}
// }else{
//   res.status(403).send({msg: 'Not loged in!'});
// }
}

export const createDocument = async (req: express.Request, res: express.Response)=>{

//const nd: (string |undefined)[]= ["\\documentclass{book}", , "\\begin{document}",, "wlazł kotek na płotek i mrugaa",, "\\end{document}"];

    try{

        const document= new documentModel(req.body);
        const savedDocument = await document.save();

        const content: (string |undefined)[] = [`\\documentclass{${savedDocument.documentClass}}`, , 
          "\\begin{document}",, "\\end{document}"];


        const fileName: string= savedDocument._id+".tex"
        const path: string = "documentBase" 
        fileHander.writeFileSync([path, fileName].join("/"), content.join("\n"));

        //compileTex(path, fileName);
        //clearCompilationFiles(path, fileName);

        res.status(200).json(savedDocument);
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

export const updateWholeDocument  = async (req: express.Request, res: express.Response)=>{

//z jakiejś duby wrzuciło się to dłuższe usepackage do środka, oraz po listach nie mozna dawać nowej lini

  try{
  const {id} = req.params;
  const blocks = req.body as blockType[]; 

  console.log(blocks);

  let document: (string | undefined)[] = blocks.map((block: blockType, idx: number)=>{
    switch(block.typeOfBlock){
      case 'documentclass':
        return documentclassToTex(block.blockContent as string);
      case 'textfield':
       return textfieldToTex(block.blockContent as string);
      case 'section':
       return sectionToTex(block.blockContent as string);
      case 'subsection':
       return subsectionToTex(block.blockContent as string);
      default:
        console.log("This type of block don't exists! ", block.typeOfBlock)
    }
  })

      document.splice(1,0,'\\usepackage{ulem}'
        +'\n\\usepackage[colorlinks=true, linkcolor=blue, urlcolor=blue]{hyperref}'
        +'\n\\begin{document}'
      );
     document.push('\\end{document}')
    console.log(document);
    fileHander.writeFileSync(`documentBase/${id}.tex`, document.join("\n"));
    await compileTex('documentBase', id+'.tex')
    clearCompilationFiles('documentBase', id+'.tex')

    res.sendStatus(200);
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
}


