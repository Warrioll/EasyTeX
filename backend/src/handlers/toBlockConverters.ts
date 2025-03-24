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

const basicToBlockFontConverter = (fontToConvert:string): string=>{
     //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //line= line.replace('\r', '')
    
    //znaki specjalne
    //w drugą stronę z tym coś nie działało
    //line= line.replaceAll('\\textbackslash', '\\')  

    //bold
    fontToConvert =fontToConvert.replaceAll(/\\textbf\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
        return '<strong>'+insideOfFraze+'</strong>';})

    //italic
    fontToConvert =fontToConvert.replaceAll(/\\textit\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
        return '<em>'+insideOfFraze+'</em>';})

    //monospace
    fontToConvert =fontToConvert.replaceAll(/\\texttt\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
        return '<code>'+insideOfFraze+'</code>';})

     //underline
     fontToConvert =fontToConvert.replaceAll(/\\uline\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
        return '<u>'+insideOfFraze+'</u>';})
    
    //strikethrough - uzywa paczki ulem
    fontToConvert =fontToConvert.replaceAll(/\\sout\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
        return '<s>'+insideOfFraze+'</s>';})

        return fontToConvert
}

export const sectionToBlock =(line: string) : blockType=>{

    let section= basicToBlockFontConverter (line)

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
     section = section.replace('\\section{', '')
     section = section.replace('\\textnormal{', '')
    section= section.replaceAll('}', '')

   
    //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //section= section.replace('\r', '')
    const sectionBlock: blockType = {typeOfBlock: 'section', blockContent: section}
    return sectionBlock;
}

export const subsectionToBlock =(line: string) : blockType=>{

    let section= basicToBlockFontConverter(line)

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
    section = section.replace('\\subsection{', '')
    section = section.replace('\\textnormal{', '')
   section= section.replaceAll('}', '')

   
    //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //section= section.replace('\r', '')
    const sectionBlock: blockType = {typeOfBlock: 'subsection', blockContent: section}
    return sectionBlock;
}

export const subsubsectionToBlock =(line: string) : blockType=>{

    let section= basicToBlockFontConverter(line)

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
    section = section.replace('\\subsubsection{', '')
    section = section.replace('\\textnormal{', '')
   section= section.replaceAll('}', '')

    
    //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //section= section.replace('\r', '')
    const sectionBlock: blockType = {typeOfBlock: 'subsubsection', blockContent: section}
    return sectionBlock;
}


export const getTitleFromTex =(line: string) : string=>{

    let title= basicToBlockFontConverter(line)

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
    title = title.replace('\\title{', '')
    title= title.replace('}', '')
   
    return title
}

export const getAuthorFromTex =(line: string) : string=>{

    let author= basicToBlockFontConverter(line)

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
    author = author.replace('\\author{', '')
    author= author.replace('}', '')
   
    return author
}

export const getDateFromTex =(line: string) : string=>{

    let date= basicToBlockFontConverter(line)

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
    date = date.replace('\\date{', '')
    date= date.replace('}', '')
   
    return date
}


export const textfieldToBlock =(line: string) : blockType=>{
    //poza indeksami działa // ?? o co chodziło xD


     //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //line= line.replace('\r', '')
    
    //znaki specjalne
    //w drugą stronę z tym coś nie działało
    //line= line.replaceAll('\\textbackslash', '\\')  

    // //bold
    // line = line.replaceAll(/\\textbf\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
    //     return '<strong>'+insideOfFraze+'</strong>';})

    // //italic
    // line = line.replaceAll(/\\textit\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
    //     return '<em>'+insideOfFraze+'</em>';})

    // //monospace
    // line = line.replaceAll(/\\texttt\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
    //     return '<code>'+insideOfFraze+'</code>';})

    //  //underline
    //  line = line.replaceAll(/\\uline\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
    //     return '<u>'+insideOfFraze+'</u>';})
    
    // //strikethrough - uzywa paczki ulem
    // line = line.replaceAll(/\\sout\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
    //     return '<s>'+insideOfFraze+'</s>';})

    line=basicToBlockFontConverter(line)

    //subscript               
     line = line.replaceAll(/\$_\{\\textnormal\{(.*?)\}\}\$/g, (wholeFraze, insideOfFraze) => {
        return '<sub>'+insideOfFraze+'</sub>';})

    //superscript           
     line = line.replaceAll(/\$\^\{\\textnormal\{(.*?)\}\}\$/g, (wholeFraze, insideOfFraze) => {
        return '<sup>'+insideOfFraze+'</sup>';})


       //----------!!! ususwać \\ przed listami bo błąd!!! albo robić coś żeby w konsoli wciskało enter----------------------- 
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

export const equationToBlock =(line: string) : blockType=>{

    let equation = line.replace('\\begin{equation}', '')
    equation = equation.replace('\\end{equation}', '')

    return {typeOfBlock: 'equation', blockContent: equation}
}
