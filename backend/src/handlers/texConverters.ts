
export const textfieldToTex =(blockContent:string): string =>{
    let textfield= blockContent.replaceAll('<p>', "");
    textfield= textfield.replaceAll('</p>', "\\\\")
    //console.log("Po split", content);
    //content = content.map(line=> line.replace('<p>', ''));
    //console.log("Po map", content);
    return(textfield);
}

export const sectionToTex =(blockContent:string): string =>{
    return('\\section{'+blockContent+'}');
}

export const subsectionToTex =(blockContent:string): string =>{
    return('\\subsection{'+blockContent+'}');
}