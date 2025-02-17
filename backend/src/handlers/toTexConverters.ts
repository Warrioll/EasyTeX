export const documentclassToTex =(blockContent:string): string =>{
    return('\\documentclass{'+blockContent+'}');
}

export const textfieldToTex =(blockContent:string): string =>{
    let textfield= blockContent;
    
    //znaki specjalne
    //z tym coś nie działa
    //textfield= textfield.replaceAll('\\', '\\textbackslash')

    

    //bold
    textfield = textfield.replaceAll('<strong>', '\\textbf{')
    textfield = textfield.replaceAll('</strong>', '}')

    //italic
    textfield = textfield.replaceAll('<em>', '\\textit{')
    textfield = textfield.replaceAll('</em>', '}')

    //monospace
    textfield = textfield.replaceAll('<code>', '\\texttt{')
    textfield = textfield.replaceAll('</code>', '}')

    //link
    textfield = textfield.replaceAll('<a>', '\\uline{\\url{')
    textfield = textfield.replaceAll('</a>', '}}')

    //underline
    textfield = textfield.replaceAll('<u>', '\\uline{')
    textfield = textfield.replaceAll('</u>', '}')

    //strikethorugh - używa paczki ulem
     textfield = textfield.replaceAll('<s>', '\\sout{')
     textfield = textfield.replaceAll('</s>', '}')

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
    blockContent=blockContent.replaceAll('\r', '')
    return('\\section{'+blockContent+'}');
}

export const subsectionToTex =(blockContent:string): string =>{
   
    return('\\subsection{'+blockContent+'}');
}