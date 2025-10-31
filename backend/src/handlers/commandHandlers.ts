import { exec } from 'child_process';
import { promisify } from 'util';
import { spawn } from 'child_process';
import * as fileHander from "fs";
import { execSync } from 'child_process';

//const execPromisify = promisify(exec)

//exec jest asynchroniczny!
// const execute = async (command: string):Promise<void> =>{
//   try{
    
//     // const {stdout, stderr} = await execPromisify(command);
//     // if (stderr) {
//     //   console.log(`stderr: ${stderr}`);
//     // }else{
//     //       console.log(`stdout: ${stdout}`);
//     // }
//     const result =  execSync(command);
//     console.log(result)

//     //return ;
//   }catch(error){
//     console.error("execution function error: ", error)
//   }

// } 


export const compileTex = async (path:string, fileName: string): Promise<void>=>{
   execSync(`firejail --private=/${path} --private-tmp --private-dev --net=none --seccomp --cpu=1 --memory=128M pdflatex --no-shell-escape -output-directory=${path} ${[path, fileName].join("/")}`, {
    stdio: "inherit"
  })
   execSync(`firejail --private=/${path} --private-tmp --private-dev --net=none --seccomp --cpu=1 --memory=128M pdflatex --no-shell-escape -output-directory=${path} ${[path, fileName].join("/")}`, {
    stdio: "inherit"
  })
   
  
   //execSync(`firejail --private=/${path} pdflatex --no-shell-escape -output-directory=${path} ${[path, fileName].join("/")}`)
   //execSync(`docker run --rm worker pdflatex -output-directory=${path} ${[path, fileName].join("/")}`)
   
    // await execute(`pdflatex -output-directory=${path} ${[path, fileName].join("/")}`)
    // await execute(`pdflatex -output-directory=${path} ${[path, fileName].join("/")}`)
}

export const clearCompilationFiles = async (path:string, fileName: string): Promise<void>=>{
   execSync(`latexmk -c -cd -output-directory=${path} ${ fileName}`)
    // await execute(`latexmk -c -cd -output-directory=${path} ${ fileName}`)
} 

export const deleteDocumentFiles = async (path:string, fileId: string) : Promise<void>=>{
  execSync(`rm ${[path, fileId.concat('.pdf')].join("/")}`) 
  execSync(`rm ${[path, fileId.concat('.tex')].join("/")}`)
  // await execute(`rm ${[path, fileId.concat('.pdf')].join("/")}`) 
  // await execute(`rm ${[path, fileId.concat('.tex')].join("/")}`)
}

// export const deleteFigureFile = async (path:string, fileName: string, fileType: string) : Promise<void>=>{
//   //await execute(`rm ${[path, [fileId, fileType].join('.')].join("/")}`) 
//   await fileHander.rm([path, [fileName, fileType].join('.')].join("/"),{  force: true }, (error)=>{
//     if(error){
//       console.log('delete file  error: ', error);
//     }})
// }

// export const deleteDirectory = async (path:string) : Promise<void>=>{
//   //await execute(`rm ${[path, [fileId, fileType].join('.')].join("/")}`) 
//   await fileHander.rm(path,{ recursive:true, force: true }, (error)=>{
//     if(error){
//       console.log('delete directory error: ', error);
//     }})
// }

// export const createDirectory = async (path:string) : Promise<void>=>{
//   await fileHander.mkdir(path, {recursive: true}, (error)=>{
//     if(error){
//       console.log('Create directory error: ', error);
//     }
//   })
// }

