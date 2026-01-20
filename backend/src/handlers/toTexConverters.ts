import { blockAbleToRef, blockContentType, documentOptionsType, referencesElementType, slideBreak, titleSectionType } from "../types";
import { specialCharacters } from "../specialCharacters";

export const documentclassToTex =(blockContent:documentOptionsType, language: {lang: string}): string =>{
    let options: string[] =[]
    let toReturn: string;

    if(blockContent.fontSize){
        options=[...options, blockContent.fontSize]
    }
    if(blockContent.fontType){
        options=[...options, blockContent.fontType]
    }
    if(blockContent.paperSize){
        options=[...options, blockContent.paperSize]
    }
    if(blockContent.orientation){
        options=[...options, blockContent.orientation]
    }
    if(blockContent.columns){
        options=[...options, blockContent.columns]
    }

    if(options.length>=1){
        toReturn=`\\documentclass[${options.join(', ')}]{${blockContent.class}}`;
    }else{
        toReturn= '\\documentclass{'+blockContent.class+'}';
    }

    if(blockContent.language){
        language.lang='\\AtBeginDocument{\\selectlanguage{'+blockContent.language+'}}'
    }else{
        language.lang='\n\\AtBeginDocument{\\selectlanguage{english}}'
    }
    return toReturn
    
}

export const specialCharactersToTexConverter = (toConvert: string):string=>{
    toConvert=toConvert.replaceAll('\\', '\\textbackslash ') 
    toConvert=toConvert.replaceAll('&lt;', '\\textless ') 
    toConvert=toConvert.replaceAll('&gt;', '\\textgreater ')  
toConvert=toConvert.replaceAll('{', '\\{')
  toConvert=toConvert.replaceAll('}', '\\}')
    toConvert=toConvert.replaceAll('#', '\\#{}')
    toConvert=toConvert.replaceAll('$', '\\${}')
    toConvert=toConvert.replaceAll('%', '\\%{}')
    toConvert=toConvert.replaceAll('^', '\\^{}')
    toConvert=toConvert.replaceAll('&amp;', '\\&{}') 
        toConvert=toConvert.replaceAll('_', '\\_{}')
        toConvert=toConvert.replaceAll('~', '\\textasciitilde ')
  toConvert=toConvert.replaceAll('|', '\\textbar ')

    for(const specChar of specialCharacters){
        toConvert=toConvert.replaceAll(specChar.value, `$${specChar.latexRepresentation}$`)

    }
  

    return toConvert
}

export const basicToTexFontConverter = (fontToConvert:string): string=>{
//znaki specjalne
 fontToConvert=specialCharactersToTexConverter(fontToConvert);

    //obsługa znaku non-breaking space w sytuacji gdy ma rolę placeholdera na froncie
    if(fontToConvert==='&nbsp;' || fontToConvert==='<p>&nbsp;</p>'){
        return ' '
    }

    //usuniecie &nbsp;
    fontToConvert = fontToConvert.replaceAll('&nbsp;', '')

    //bold
    fontToConvert = fontToConvert.replaceAll('<strong>', '\\textbf{')
    fontToConvert = fontToConvert.replaceAll('</strong>', '}')

    //italic
    fontToConvert = fontToConvert.replaceAll('<em>', '\\textit{')
    fontToConvert = fontToConvert.replaceAll('</em>', '}')

    //monospace
    fontToConvert = fontToConvert.replaceAll('<code>', '\\texttt{')
    fontToConvert = fontToConvert.replaceAll('</code>', '}')


    //underline
    fontToConvert = fontToConvert.replaceAll('<u>', '\\uline{')
    fontToConvert = fontToConvert.replaceAll('</u>', '}')

    //strikethorugh - używa paczki ulem
    fontToConvert = fontToConvert.replaceAll('<s>', '\\sout{')
    fontToConvert = fontToConvert.replaceAll('</s>', '}')

    fontToConvert = fontToConvert.replaceAll('<s>', '\\sout{')
    fontToConvert = fontToConvert.replaceAll('</s>', '}')

     //subscript
     fontToConvert =  fontToConvert.replaceAll('<sub>', '\\textsubscript{')
     fontToConvert =  fontToConvert.replaceAll('</sub>', '}')

    //superscript
     fontToConvert =  fontToConvert.replaceAll('<sup>', '\\textsuperscript{')
     fontToConvert =  fontToConvert.replaceAll('</sup>', '}')

    fontToConvert=fontToConvert.replaceAll(/\<span.*?class=\"mention\".*?data-type=\"mention\".*?data-id=\".*?\".*?>(.*?)<\/span>/g, (wholeFraze, insideOfFraze)=>{
     
        if(insideOfFraze.includes('bib')){
          
            return `\\cite{${insideOfFraze}}`
        }
        return `\\ref{${insideOfFraze}}`
        
    })

     fontToConvert =  fontToConvert.replaceAll('<br>', '\\newline ')

    const splitted= fontToConvert.split('<p>').filter(i=>i!=='')
    fontToConvert=splitted.join('\\newline ')
    fontToConvert= fontToConvert.replaceAll('</p>', "");


   

return fontToConvert
}

const erasePTags = (fontToConvert:string): string =>{
    fontToConvert= fontToConvert.replaceAll('<p>', "");
    fontToConvert= fontToConvert.replaceAll('</p>', "");
    return fontToConvert
}

export const textfieldToTex =(blockContent:string): string =>{
    let textfield= blockContent;
    
    textfield=basicToTexFontConverter(textfield);


    //lists points with p-tags inside
    textfield = textfield.replaceAll('<li><p>', '\\item ')
    textfield = textfield.replaceAll('</p></li>', '')



     //lists points without p-tags inside just in case
     textfield = textfield.replaceAll('<li>', '\\item ')
     textfield = textfield.replaceAll('</li>', '')     


    
    //bulletlist
    textfield = textfield.replaceAll('<ul>', '\\begin{itemize}')
    textfield = textfield.replaceAll('</ul>', '\\end{itemize}')
    
    //enumaratedlist
    textfield = textfield.replaceAll('<ol>', '\\begin{enumerate}')
    textfield = textfield.replaceAll('</ol>', '\\end{enumerate}') 

    textfield = textfield.replaceAll(/(?:\\newline[ ]*)*\\item/g, '\\item')
    textfield = textfield.replaceAll(/\\item(?:[ ]*\\newline)*/g, '\\item')

    textfield = textfield.replaceAll(/\\end{itemize}(?:[ ]*\\newline)*/g, ()=>{
     
        return '\\end{itemize}'})
    textfield = textfield.replaceAll(/\\end{enumerate}(?:[ ]*\\newline)*/g, '\\end{enumerate}')
    

    if(textfield.endsWith("\\\\"))
        textfield= textfield.substring(0, textfield.length-2)

    return(textfield);
}

export const sectionToTex =(blockContent:string): string =>{

    blockContent=basicToTexFontConverter(blockContent);

    blockContent=blockContent.replaceAll('\r', '')
    blockContent=erasePTags(blockContent)
    return('\\section{\\textnormal{'+blockContent+'}}');
}
export const bookSectionToTex =(blockContent:string): string =>{
   
    blockContent=basicToTexFontConverter(blockContent);

    blockContent=blockContent.replaceAll('\r', '')
    blockContent=erasePTags(blockContent)
    return('\\chapter{\\textnormal{'+blockContent+'}}');
}

export const subsectionToTex =(blockContent:string): string =>{

   blockContent=basicToTexFontConverter(blockContent);
   blockContent=erasePTags(blockContent)
    return('\\subsection{\\textnormal{'+blockContent+'}}');
}

export const subsubsectionToTex =(blockContent:string): string =>{
   
    blockContent=basicToTexFontConverter(blockContent);
    blockContent=erasePTags(blockContent)
    return('\\subsubsection{\\textnormal{'+blockContent+'}}');
}


 
export const openingToTeX =(blockContent:string): string =>{

   blockContent=basicToTexFontConverter(blockContent);
   blockContent=erasePTags(blockContent)
    return('\\opening{'+blockContent+'}');
}

export const closingToTeX =(blockContent:string): string =>{
   
    blockContent=basicToTexFontConverter(blockContent);
    blockContent=erasePTags(blockContent)
    if(/^ *$/.test(blockContent)){
        blockContent='\\ '+blockContent
    }
    return('\\closing{'+blockContent+'}');
}

export const slideSectionToTex =(blockContent:string): string =>{
    blockContent=basicToTexFontConverter(blockContent);

    blockContent=blockContent.replaceAll('\r', '')
    blockContent=erasePTags(blockContent)
    return('\\section{\\textnormal{'+blockContent+'}}');
}

export const titlePageToTex =(blockContent: titleSectionType): string =>{
    const title = erasePTags(basicToTexFontConverter( blockContent.title))
    const author = erasePTags(basicToTexFontConverter( blockContent.author))
    const date = erasePTags(basicToTexFontConverter( blockContent.date))


    return `\\title{${title}}`
          +`\n\\author{${author}}`
          +`\n\\date{${date}}` 
          + '\n\\maketitle'
}


export const addressAndDateToTex =(blockContent: titleSectionType): string =>{
  
    let address = erasePTags(basicToTexFontConverter( blockContent.author))
    let date = erasePTags(basicToTexFontConverter( blockContent.date))

    address=address.replaceAll('\\newline', '\\\\')
    date=date.replaceAll('\\newline', '\\\\')


    return `\\address{${address}}\\date{${date}}\\opening{}` 

}

export const equationToTex =(blockContent: blockContentType): string =>{
    let content: string = (blockContent as blockAbleToRef).content as string
    return `\\begin{equation}${content.replaceAll('\n', '')}\\label{${(blockContent as blockAbleToRef).id}}\\end{equation}`
}


export const slideBreaktoTex =(blockContent: blockContentType, isOnBegining: boolean): string =>{
    return `${isOnBegining ? '' : '\\end{frame}'}\\begin{frame}{${ erasePTags(basicToTexFontConverter((blockContent as slideBreak).title))}}{${ erasePTags(basicToTexFontConverter((blockContent as slideBreak).subtitle))}}`
}

export const tableToTex =(blockContent: blockAbleToRef): string =>{
    let tableContent:string=''
    let maxCols:number =0
    for(let row=0; row<blockContent.content.length; row++){
        if(blockContent.content[row].length>maxCols){
            maxCols=blockContent.content[row].length
        }
        for(let column=0; column<blockContent.content[row].length; column++){
            tableContent=tableContent+ erasePTags(basicToTexFontConverter(blockContent.content[row][column]))
            if(!(column===blockContent.content[row].length-1)){
                
                 tableContent=tableContent+'&'
            }
        }
        tableContent=tableContent+' \\\\ \\hline '
    }

    const style=`|X`.repeat(maxCols)+'|'
 
    return `\\begin{table}[h!] \\begin{center} \\begin{tabularx}{\\linewidth}{${style}} \\hline ${tableContent} \\end{tabularx}\\end{center} \\caption{${erasePTags(basicToTexFontConverter(blockContent.label))}} \\label{${blockContent.id}} \\end{table}`
}

export const figureToTex =(blockContent:blockAbleToRef, path:string, height: number): string =>{
    
     return `\\begin{figure}[H] \\centering \\includegraphics[width=\\linewidth, height=${height}cm, keepaspectratio]{${path}} \\caption{${erasePTags(basicToTexFontConverter(blockContent.label))}} \\label{${blockContent.id}}\\end{figure}`
}


export const referencesToTex =(blockContent:referencesElementType[]): string =>{
let list:string =''
    blockContent.map((item, idx)=>{
        list=list.concat(`\\bibitem{${item.id}} ${erasePTags(basicToTexFontConverter(item.label))}`)    })
       
return `\\begin{thebibliography}{${blockContent.length}}`+list+'\\end{thebibliography}'
}

