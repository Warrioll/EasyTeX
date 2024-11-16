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
    

    //To tak nie będzie przez końcowe znaczniki, więc trzeba będzie robić te splity chyba, ale to nie będzie takie łatwe ja przy tagach
    //  //znaki specjalne
    // line= line.replaceAll('\\textbackslash', '\\')    

    //  //bold
    //  textfield = textfield.replaceAll('textbf{', '<strong>\\')
    //  textfield = textfield.replaceAll('}', '</strong>')
 
    //  //italic
    //  textfield = textfield.replaceAll('\\textit{', '<em>')
    //  textfield = textfield.replaceAll('}', '</em>')
 
    //  //monospace
    //  textfield = textfield.replaceAll('\\texttt{', '<code>')
    //  textfield = textfield.replaceAll('}', '</code>')
 
    //  //underline
    //  textfield = textfield.replaceAll('\\underline{', '<u>')
    //  textfield = textfield.replaceAll('}', '</u>')
 
    //  //strikethorugh - używa paczki ulem
    //   textfield = textfield.replaceAll('\\sout{', '<s>')
    //   textfield = textfield.replaceAll('}', '</s>')
 
    //  //subscript
    //  textfield = textfield.replaceAll('$_{\\textnormal{', '<sub>')
    //  textfield = textfield.replaceAll('}}$', '</sub>')
 
    //  //superscript
    //  textfield = textfield.replaceAll('$^{\\textnormal{', '<sup>')
    //  textfield = textfield.replaceAll('}}$', '</sup>')
 
    //  //lists points with p-tags inside
    // //  textfield = textfield.replaceAll('<li><p>', '\\item ')
    // //  textfield = textfield.replaceAll('</p></li>', '')
 
    //   //lists points without p-tags inside just in case
    //   textfield = textfield.replaceAll('\\item ', '<li>')
    //   textfield = textfield.replaceAll('', '</li>')
     
    //  //bulletlist
    //  textfield = textfield.replaceAll('<ul>', '\\begin{itemize}')
    //  textfield = textfield.replaceAll('</ul>', '\\end{itemize}')
     
    //  //bulletlist
    //  textfield = textfield.replaceAll('<ol>', '\\begin{enumerate}')
    //  textfield = textfield.replaceAll('</ol>', '\\end{enumerate}')

     let fieldLines = line.split('\\\\');
    fieldLines= fieldLines.map(temp=> '<p>'+temp+'</p>');

    const textfieldBlock: blockType = {typeOfBlock: 'textfield', blockContent: fieldLines.join('')}
    return textfieldBlock;
}
