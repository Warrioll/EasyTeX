import { exec } from 'child_process';

//exec jest asynchroniczny!
const execute = async (command: string):Promise<void> =>{
    await exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log(`Error executing command: ${error.message}`);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        return ;
      });
} 


export const compileTex = async (path:string, fileName: string): Promise<void>=>{
    await execute(`pdflatex -output-directory=${path} ${[path, fileName].join("/")}`)
}

export const clearCompilationFiles = (path:string, fileName: string): void=>{
    execute(`latexmk -c -cd -output-directory=${path} ${ fileName}`)
}