import { figureModel } from "../models/figureModel";
import { blockAbleToRef, blockContentType, documentOptionsType, referencesElementType, slideBreak, titleSectionType } from "../types";
import { specialCharacters } from "../specialCharacters";

export const documentclassToTex =(blockContent:documentOptionsType): string =>{
    let options: string[] =[]

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
        return(`\\documentclass[${options.join(', ')}]{${blockContent.class}}`);
    }else{
        return('\\documentclass{'+blockContent.class+'}');
    }
    
}

export const specialCharactersToTexConverter = (toConvert: string):string=>{
    toConvert=toConvert.replaceAll('\\', '\\textbackslash ') // UWAGA!!! zmienia wszystkie backslashe wiec wczesniejsza konwersja na latex jest rozwalana
    toConvert=toConvert.replaceAll('&lt;', '\\textless ') //zmianiane rpzez html
    toConvert=toConvert.replaceAll('&gt;', '\\textgreater ')  //zmianiane rpzez html
toConvert=toConvert.replaceAll('{', '\\{')
  toConvert=toConvert.replaceAll('}', '\\}')
    toConvert=toConvert.replaceAll('#', '\\#{}')
    toConvert=toConvert.replaceAll('$', '\\${}')
    toConvert=toConvert.replaceAll('%', '\\%{}')
    toConvert=toConvert.replaceAll('^', '\\^{}')
    toConvert=toConvert.replaceAll('&amp;', '\\&{}') //zmianiane rpzez html
        toConvert=toConvert.replaceAll('_', '\\_{}')
        toConvert=toConvert.replaceAll('~', '\\textasciitilde ')
  toConvert=toConvert.replaceAll('|', '\\textbar ')

    for(const specChar of specialCharacters){
        //console.log('value:', specChar.value, 'latex:',`$${specChar.latexRepresentation}$` )
        //console.log('before:',toConvert )
        toConvert=toConvert.replaceAll(specChar.value, `$${specChar.latexRepresentation}$`)
       // console.log('after:',toConvert )
    }
  

    return toConvert
}

// export const curlyBracketsToTexConverter = (toConvert: string):string=>{
//   toConvert=toConvert.replaceAll('{', '\\{')
//   toConvert=toConvert.replaceAll('}', '\\}')
  

//     return toConvert
// }

export const basicToTexFontConverter = (fontToConvert:string): string=>{
//znaki specjalne
    //z tym coś nie działa
    //textfield= textfield.replaceAll('\\', '\\textbackslash')
    console.log('bacis text:', fontToConvert)

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
        console.log('mention: ', wholeFraze)
        if(insideOfFraze.includes('bib')){
            console.log('cite: ', `\\cite{${insideOfFraze}}`)
            return `\\cite{${insideOfFraze}}`
        }
        //console.log('cite: ', `\\ref{${insideOfFraze}}`)
        return `\\ref{${insideOfFraze}}`
        
    })

    // const splitted = fontToConvert.split('<span class="mention" data-type="mention" data-id="')
    // console.log('splitted: ', splitted)
    // const splitted2=splitted.map((item, id)=>{
    //     if (id>0){
    //     return item.split('">')
    //     } 
    //     return item
    //     })
    // console.log('splitted2: ', splitted2)
    // const converted = splitted2.map((item, id)=>{
    //     if(Array.isArray(item) && item.length>1){
    //         console.log('item', item)
    //         let tmpItem=[...item]
    //         const itemId=tmpItem[0]
    //         tmpItem.splice(0,1)

    //         if(itemId.includes('eq') || itemId.includes('tab') || itemId.includes('img')){
    //             return `\\ref{${itemId}}${tmpItem.join('').replace(itemId, '').replace('</span>', '')}`
    //         }
    //         return `\\cite{${itemId}} ${tmpItem.join('').replace(itemId, '').replace('</span>', '')}`
    //     }
    //     return item
    // })
    //  console.log('converted: ', converted)
    // fontToConvert=converted.join('');

    //<span class="mention" data-type="mention" data-id="eq1">eq1</span>
     fontToConvert =  fontToConvert.replaceAll('<br>', '\\newline ')

    const splitted= fontToConvert.split('<p>').filter(i=>i!=='')
    fontToConvert=splitted.join('\\newline ')
    fontToConvert= fontToConvert.replaceAll('</p>', "");
    //fontToConvert= fontToConvert.replaceAll('</p>', "\\newline")

   

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


        //link
    // textfield = textfield.replaceAll('<a>', '\\uline{\\url{')
    // textfield = textfield.replaceAll('</a>', '}}')

    // //subscript
    // textfield = textfield.replaceAll('<sub>', '$_{\\textnormal{')
    // textfield = textfield.replaceAll('</sub>', '}}$')

    // //superscript
    // textfield = textfield.replaceAll('<sup>', '$^{\\textnormal{')
    // textfield = textfield.replaceAll('</sup>', '}}$')

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
    console.log('test')
    textfield = textfield.replaceAll(/\\end{itemize}(?:[ ]*\\newline)*/g, ()=>{
        console.log('boooo')
        return '\\end{itemize}'})
    textfield = textfield.replaceAll(/\\end{enumerate}(?:[ ]*\\newline)*/g, '\\end{enumerate}')

    //p-tagi i nowe linie

    

    if(textfield.endsWith("\\\\"))
        textfield= textfield.substring(0, textfield.length-2)

    
    // //znaki specjalne
    // textfield= textfield.replaceAll('\\', '\\textbackslash')

    //console.log("Po split", content);
    //content = content.map(line=> line.replace('<p>', ''));
    //console.log("Po map", content);

    return(textfield);
}

export const sectionToTex =(blockContent:string): string =>{
    // tu trzeba uwzględnić wystąpienie \r
    blockContent=basicToTexFontConverter(blockContent);

    blockContent=blockContent.replaceAll('\r', '')
    blockContent=erasePTags(blockContent)
    return('\\section{\\textnormal{'+blockContent+'}}');
}
export const bookSectionToTex =(blockContent:string): string =>{
    // tu trzeba uwzględnić wystąpienie \r
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
    return('\\closing{'+blockContent+'}');
}

export const slideSectionToTex =(blockContent:string): string =>{
    // tu trzeba uwzględnić wystąpienie \r
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
    //const title = erasePTags(basicToTexFontConverter( blockContent.title))
    let address = erasePTags(basicToTexFontConverter( blockContent.author))
    let date = erasePTags(basicToTexFontConverter( blockContent.date))

    address=address.replaceAll('\\newline', '\\\\')
    date=date.replaceAll('\\newline', '\\\\')


    return `\\address{${address}}\\date{${date}}\\opening{}` 

}

export const equationToTex =(blockContent: blockContentType): string =>{
    return `\\begin{equation}${(blockContent as blockAbleToRef).content}\\label{${(blockContent as blockAbleToRef).id}}\\end{equation}`
}


export const slideBreaktoTex =(blockContent: blockContentType, isOnBegining: boolean): string =>{
    return `${isOnBegining ? '' : '\\end{frame}'}\\begin{frame}{${ erasePTags(basicToTexFontConverter((blockContent as slideBreak).title))}}{${ erasePTags(basicToTexFontConverter((blockContent as slideBreak).subtitle))}}`
}

export const tableToTex =(blockContent: blockAbleToRef): string =>{
    let tableContent:string=''

    for(let row=0; row<blockContent.content.length; row++){
        for(let column=0; column<blockContent.content[row].length; column++){
            tableContent=tableContent+ erasePTags(basicToTexFontConverter(blockContent.content[row][column]))
            if(!(column===blockContent.content[row].length-1)){
                
                 tableContent=tableContent+'&'
            }
        }
        tableContent=tableContent+' \\\\ \\hline '
    }
    const style='|c'.repeat(blockContent.content[0].length)+'|'
 
    return `\\begin{table}[h!] \\begin{center} \\begin{tabular}{${style}} \\hline ${tableContent} \\end{tabular}\\end{center} \\caption{${erasePTags(basicToTexFontConverter(blockContent.label))}} \\label{${blockContent.id}} \\end{table}`
}

export const figureToTex =(blockContent:blockAbleToRef, path:string, height: number): string =>{
    //return '\\begin{figure} \\centering \\includegraphics[width=\\linewidth, height=10cm, keepaspectratio]{'+path+'} \\caption{'+erasePTags(basicToTexFontConverter(blockContent.label))+'} \\label{'+blockContent.id+'}\\end{figure}'
     return `\\begin{figure}[H] \\centering \\includegraphics[width=\\linewidth, height=${height}cm, keepaspectratio]{${path}} \\caption{${erasePTags(basicToTexFontConverter(blockContent.label))}} \\label{${blockContent.id}}\\end{figure}`
}


export const referencesToTex =(blockContent:referencesElementType[]): string =>{
let list:string =''
    blockContent.map((item, idx)=>{
        list=list.concat(`\\bibitem{${item.id}} ${erasePTags(basicToTexFontConverter(item.label))}`)    })
       
return `\\begin{thebibliography}{${blockContent.length}}`+list+'\\end{thebibliography}'
}

