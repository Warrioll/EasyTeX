import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync= promisify(exec)

export const compileTex = async (path:string, fileName: string): Promise<void>=>{
   await execAsync(`firejail --private=/${path} --caps.drop=all --nonewprivs --private-tmp --private-dev --net=none --seccomp --cpu=1 pdflatex -interaction=nonstopmode -no-shell-escape -output-directory=${path} ${[path, fileName].join("/")}`)
   await execAsync(`firejail --private=/${path} --caps.drop=all --nonewprivs --private-tmp --private-dev --net=none --seccomp --cpu=1 pdflatex -interaction=nonstopmode -no-shell-escape -output-directory=${path} ${[path, fileName].join("/")}`)
}

export const clearCompilationFiles = async (path:string, fileName: string): Promise<void>=>{
  await execAsync(`latexmk -c -cd -output-directory=${path} ${ fileName}`)
} 

export const deleteDocumentFiles = async (path:string, fileId: string) : Promise<void>=>{
 await execAsync(`rm ${[path, fileId.concat('.pdf')].join("/")}`) 
  await execAsync(`rm ${[path, fileId.concat('.tex')].join("/")}`)
}



