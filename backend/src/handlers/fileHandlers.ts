import { promises as fileHander } from "fs";


export const loadTexFile = async(path: string , fileName: string):Promise<(string | undefined)[]> =>{

    try{
       const contentTemp = await fileHander.readFile([path,[fileName,"tex"].join('.')].join('/'), 'utf8')
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
    await fileHander.writeFile([path, [fileName, extention].join('.')].join("/"), content);
}


export const deleteFile = async (path:string, fileName: string, fileType: string) : Promise<void>=>{ 
  try{
await fileHander.rm([path, [fileName, fileType].join('.')].join("/"),{  force: true })
  }catch(error){
  console.log('delete file  error: ', error)
  }
  
}

export const deleteDirectory = async (path:string) : Promise<void>=>{
  try{
 await fileHander.rm(path,{ recursive:true, force: true })
  }catch(error){
 console.log('delete directory error: ', error);
  }
 
}

export const createDirectory = async (path:string) : Promise<void>=>{
  try{
 await fileHander.mkdir(path, {recursive: true})
  }catch(error){
 console.log('Create directory error: ', error);
  }
 
}


export const doesTexFileExist = async (path:string, fileName: string,): Promise<boolean>=>{
  try{
await fileHander.access([path, [fileName, 'tex'].join('.')].join('/'))
return true
  }catch(error){
 return false

  }
 
}