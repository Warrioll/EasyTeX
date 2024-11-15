import { blockType } from "../types"

export const documentclassToBlock =(line: string) : blockType=>{
    //tu sprawdzenie czy nie ma jakiegoś innego docuimentclass i ch=ya innych jestn git xddd
    const regex = /\\documentclass\{[a-z]+\}/g
    const fromRegex =  [...line.matchAll(regex)] 
    let documentclassLine: string[] = fromRegex.map(temp => temp[0])
    //documentclassLine = documentclassLine.flat();
    // if(documentclass.lenght >1) {...}        //sprawdzenie czy w lini nie ma więcej trakich  dziadostw
    let [documentclass] = documentclassLine;
    documentclass = documentclass.replace("\\documentclass{", "")
    documentclass = documentclass.replace("}", "")
    const documentclassBlock: blockType = {typeOfBlock: 'documentclass', blockContent: documentclass}
    return documentclassBlock;
}

export const sectionToBlock =(line: string) : blockType=>{

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
    let section = line.replace('\\section{', '')
    section= section.replace('}', '')
    //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //section= section.replace('\r', '')
    const sectionBlock: blockType = {typeOfBlock: 'section', blockContent: section}
    return sectionBlock;
}
export const textfieldToBlock =(line: string) : blockType=>{
     //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //line= line.replace('\r', '')
    let fieldLines = line.split('\\\\');
    fieldLines= fieldLines.map(temp=> '<p>'+temp+'</p>');

    const textfieldBlock: blockType = {typeOfBlock: 'textfield', blockContent: fieldLines.join('')}
    return textfieldBlock;
}
