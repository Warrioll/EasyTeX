import express from 'express'
import * as fileHander from "fs";
import { exec } from 'child_process';
import { documentModel } from '../models/documentModel'
import { compileTex, clearCompilationFiles } from '../handlers/commandHandlers';
import { loadTexFile } from '../handlers/fileHandlers';


export const getDocumentById = async (req: express.Request, res: express.Response)=>{
    try{
        const {id} = req.params;
        const document = await documentModel.findById(id);
        res.status(200).json(document);
    }catch(error){
        console.log("Get ERROR: ", error)
        res.sendStatus(400);
    }
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
  try{
    const {id} = req.params;
    const {lineNr, line} = req.body;
    let content: (string | undefined)[] = await loadTexFile(id);
    content.splice(lineNr-1,0, line);
    console.log(content);

    fileHander.writeFileSync(`documentBase/${id}.tex`, content.join("\n"));

    res.sendStatus(200);
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
}

export const updateLine = async (req: express.Request, res: express.Response)=>{
  try{
    const {id} = req.params;
    const {lineNr, line} = req.body;
    let content: (string | undefined)[] = await loadTexFile(id);
    content.splice(lineNr-1,1, line);
    console.log(content);

    fileHander.writeFileSync(`documentBase/${id}.tex`, content.join("\n"));

    res.sendStatus(200);
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
}