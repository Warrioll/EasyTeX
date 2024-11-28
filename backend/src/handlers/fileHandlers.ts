import * as fileHander from "fs";
import { documentModel } from "../models/documentModel";

export const loadTexFile = async(id: string):Promise<(string | undefined)[]> =>{

    try{
        //const document = await documentModel.findById(id)
        //const contentTemp = await fileHander.readFileSync("documentBase/"+document._id+".tex", 'utf8')
       const contentTemp = await fileHander.readFileSync("documentBase/"+id+".tex", 'utf8')
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