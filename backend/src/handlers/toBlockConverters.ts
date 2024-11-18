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
    //poza indeksami działa


     //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //line= line.replace('\r', '')
    
    //znaki specjalne
    //w drugą stronę z tym coś nie działało
    //line= line.replaceAll('\\textbackslash', '\\')  

    //bold
    line = line.replaceAll(/\\textbf\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
        return '<b>'+insideOfFraze+'</b>';})

    //italic
    line = line.replaceAll(/\\textit\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
        return '<em>'+insideOfFraze+'</em>';})

    //monospace
    line = line.replaceAll(/\\texttt\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
        return '<code>'+insideOfFraze+'</code>';})

     //underline
     line = line.replaceAll(/\\underline\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
        return '<u>'+insideOfFraze+'</u>';})
    
    //strikethrough - uzywa paczki ulem
    line = line.replaceAll(/\\sout\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
        return '<s>'+insideOfFraze+'</s>';})

     //subscript
     line = line.replaceAll(/\$_\\\{\\textnormal\{(.*?)\}\}\$/g, (wholeFraze, insideOfFraze) => {
        return '<sub>'+insideOfFraze+'</sub>';})

    //bullet and enumerate list
    line = line.replaceAll( /\\begin\{(itemize|enumerate)\}(.*?)\\end\{(itemize|enumerate)\}/g, (wholeFraze, listType, insideOfFraze) => {
        let items:string[] = insideOfFraze.split('\\item ')
        items.shift()
        items=items.map(item=>'<li>'+item+'</li>')
        if(listType==="enumerate"){
            return '<ol>'+items.join('')+'</ol>'
        }
        else { return '<ul>'+items.join('')+'</ul>'}})

    //To tak nie będzie przez końcowe znaczniki, więc trzeba będzie robić te splity chyba, ale to nie będzie takie łatwe ja przy tagach
    


     let fieldLines = line.split('\\\\');
    fieldLines= fieldLines.map(temp=> '<p>'+temp+'</p>');


    const textfieldBlock: blockType = {typeOfBlock: 'textfield', blockContent: fieldLines.join('')}
    return textfieldBlock;
}
