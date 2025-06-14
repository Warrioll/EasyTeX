export const documentclassToTex =(blockContent:string): string =>{
    return('\\documentclass{'+blockContent+'}');
}

export const basicToTexFontConverter = (fontToConvert:string): string=>{
//znaki specjalne
    //z tym coś nie działa
    //textfield= textfield.replaceAll('\\', '\\textbackslash')

    //obsługa znaku non-breaking space w sytuacji gdy ma rolę placeholdera na froncie
    if(fontToConvert==='&nbsp;' || fontToConvert==='<p>&nbsp;</p>'){
        return ' '
    }

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
    textfield = textfield.replaceAll('<a>', '\\uline{\\url{')
    textfield = textfield.replaceAll('</a>', '}}')

    //subscript
    textfield = textfield.replaceAll('<sub>', '$_{\\textnormal{')
    textfield = textfield.replaceAll('</sub>', '}}$')

    //superscript
    textfield = textfield.replaceAll('<sup>', '$^{\\textnormal{')
    textfield = textfield.replaceAll('</sup>', '}}$')

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

    //p-tagi i nowe linie
    textfield= textfield.replaceAll('<p>', "");
    textfield= textfield.replaceAll('</p>', "\\\\")
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

export const titlePageToTex =(blockContent:{title:string, author: string, date: string}): string =>{
    const title = erasePTags(basicToTexFontConverter( blockContent.title))
    const author = erasePTags(basicToTexFontConverter( blockContent.author))
    const date = erasePTags(basicToTexFontConverter( blockContent.date))


    return `\\title{${title}}`
          +`\n\\author{${author}}`
          +`\n\\date{${date}}` 
          + '\n\\maketitle'
}

export const equationToTex =(blockContent:string): string =>{
    return '\\begin{equation} '+blockContent+' \\end{equation}'
}

export const tableToTex =(blockContent: string[][]): string =>{
    let tableContent:string=''

    for(let row=0; row<blockContent.length; row++){
        for(let column=0; column<blockContent[row].length; column++){
            tableContent=tableContent+ erasePTags(basicToTexFontConverter(blockContent[row][column]))
            if(!(column===blockContent[row].length-1)){
                
                 tableContent=tableContent+'&'
            }
        }
        tableContent=tableContent+' \\\\ \\hline '
    }
    const style='|c'.repeat(blockContent[0].length)+'|'

    return `\\begin{table}[h!] \\begin{center} \\begin{tabular}{${style}} \\hline ${tableContent} \\end{tabular}\\end{center} \\end{table}`
}

