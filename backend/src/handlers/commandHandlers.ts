import { exec } from 'child_process';
import { promisify } from 'util';
import { spawn } from 'child_process';

const execPromisify = promisify(exec)

//exec jest asynchroniczny!
const execute = async (command: string):Promise<void> =>{
  try{

    
    const {stdout, stderr} = await execPromisify(command);

    if (stderr) {
      console.log(`Error executing command: ${stderr}`);
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
    //return ;
  }catch(error){
    console.error("execution function error: ", error)
  }

} 


export const compileTex = async (path:string, fileName: string): Promise<void>=>{
    await execute(`pdflatex -output-directory=${path} ${[path, fileName].join("/")}`)
}

export const clearCompilationFiles = (path:string, fileName: string): void=>{
    execute(`latexmk -c -cd -output-directory=${path} ${ fileName}`)
}