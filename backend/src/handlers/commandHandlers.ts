import { exec } from 'child_process';

//exec jest asynchroniczny!
const execute = (command: string):void =>{
    exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log(`Error executing command: ${error.message}`);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
      });
}


export const compileTex = (path:string, fileName: string): void=>{
    execute(`pdflatex -output-directory=${path} ${[path, fileName].join("/")}`)
}


export const clearCompilationFiles = (path:string, fileName: string): void=>{
    execute(`latexmk -c -cd -output-directory=${path} ${ fileName}`)
}