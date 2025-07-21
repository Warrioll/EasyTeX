import * as fileHander from "fs";
import { documentModel } from "../models/documentModel";
//import { createDirectory } from "./commandHandlers";

export const loadTexFile = async(path: string , fileName: string):Promise<(string | undefined)[]> =>{

    try{
        //const document = await documentModel.findById(id)
        //const contentTemp = await fileHander.readFileSync("documentBase/"+document._id+".tex", 'utf8')
       const contentTemp = await fileHander.readFileSync([path,[fileName,"tex"].join('.')].join('/'), 'utf8')
        let content = contentTemp.split("\n");
       content = content.map((line: (string | undefined), idx: number)=>{
        if(line.endsWith('\r')){
            return line.substring(0, line.length-1)
        }
        else{
            return line;
        }
       })
        return contentTemp.split("\n");
    }catch(error){
        console.log("Load .tex file ERROR: ", error); 
    }
    
}


export const saveFileWithContent = async(path: string , fileName: string, extention:string, content: any):Promise<void> =>{
    await createDirectory(path)
    fileHander.writeFileSync([path, [fileName, extention].join('.')].join("/"), content);
}


export const deleteFile = async (path:string, fileName: string, fileType: string) : Promise<void>=>{
  //await execute(`rm ${[path, [fileId, fileType].join('.')].join("/")}`) 
  await fileHander.rm([path, [fileName, fileType].join('.')].join("/"),{  force: true }, (error)=>{
    if(error){
      console.log('delete file  error: ', error);
    }})
}

export const deleteDirectory = async (path:string) : Promise<void>=>{
  //await execute(`rm ${[path, [fileId, fileType].join('.')].join("/")}`) 
  await fileHander.rm(path,{ recursive:true, force: true }, (error)=>{
    if(error){
      console.log('delete directory error: ', error);
    }})
}

export const createDirectory = async (path:string) : Promise<void>=>{
  await fileHander.mkdir(path, {recursive: true}, (error)=>{
    if(error){
      console.log('Create directory error: ', error);
    }
  })
}