import * as fileHander from "fs";
import { documentModel } from "../models/documentModel";

export const loadTexFile = async(id: string):Promise<(string | undefined)[]> =>{

    try{
        const document = await documentModel.findById(id)
        const contentTemp = await fileHander.readFileSync("documentBase/"+document._id+".tex", 'utf8')
        return contentTemp.split("\n");
    }catch(error){
        console.log("Load .tex file ERROR: ", error);
    }
    
}