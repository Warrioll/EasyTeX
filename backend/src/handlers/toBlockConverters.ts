import { blockAbleToRef, blockType, referencesElementType, typeOfBlockType } from "../types"

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

        // refs to figures, tables and equations
    fontToConvert=fontToConvert.replaceAll(/\\ref\{(.*?)\}/g, (wholeFraze, insideOfFraze)=>{
        let wholeFrazeCopy=wholeFraze
        console.log('wholeFraze', wholeFraze)
        console.log('insideOfFraze', insideOfFraze)
        //for( let i of insideOfFraze){
            wholeFrazeCopy =wholeFrazeCopy.replaceAll(`\\ref{${insideOfFraze}}`, `<span class="mention" data-type="mention" data-id="${insideOfFraze}">${insideOfFraze}</span>`)
       // }
       
        return wholeFrazeCopy
         //<span class="mention" data-type="mention" data-id="eq1">eq1</span>
    })

        // refs to bibliography
        fontToConvert=fontToConvert.replaceAll(/\\cite\{(.*?)\}/g, (wholeFraze, insideOfFraze)=>{
        let wholeFrazeCopy=wholeFraze
        console.log('wholeFraze', wholeFraze)
        console.log('insideOfFraze', insideOfFraze)
        //for( let i of insideOfFraze){
            wholeFrazeCopy =wholeFrazeCopy.replaceAll(`\\cite{${insideOfFraze}}`, `<span class="mention" data-type="mention" data-id="${insideOfFraze}">${insideOfFraze}</span>`)
       // }
       


        return wholeFrazeCopy
         //<span class="mention" data-type="mention" data-id="eq1">eq1</span>
    })

              fontToConvert =fontToConvert.split('\\newline ').map(temp=> '<p>'+temp+'</p>').join('')
     

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



export const addressAndDateToBlock =(line: string) : blockType=>{
console.log('ddressAndDateToBlock: ', line)
let address:string
let date: string
    // \address{Ministry of Silly Walks\\ The Embankment\\ London}\date{01.01.1999}\opening{}
    line.replace(/\\address\{(.*?)\}\\date\{(.*?)\}\\opening\{\}/g, (wholeFraze, addr, d)=>{
        address= addr
        date=d
        return wholeFraze
    })

    address=address.replaceAll('\\\\','\\newline' )
    date=date.replaceAll( '\\\\', '\\newline')

    address=basicToBlockFontConverter(address)
    date=basicToBlockFontConverter(date)



return {typeOfBlock: 'titlePage', blockContent: { title: '', author: address, date: date}}

}
export const openingToBlock =(line: string) : blockType=>{

    let section= basicToBlockFontConverter(line)

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
    section = section.replace('\\opening{', '')
    //section = section.replace('\\textnormal{', '')
   section= section.replaceAll('}', '')

   
    //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //section= section.replace('\r', '')
    const sectionBlock: blockType = {typeOfBlock: 'subsection', blockContent: section}
    return sectionBlock;
}

export const closingToBlock =(line: string) : blockType=>{

    let section= basicToBlockFontConverter(line)

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
    section = section.replace('\\closing{', '')
    //section = section.replace('\\textnormal{', '')
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


       // FIXME ----------!!! ususwać \\ przed listami bo błąd!!! albo robić coś żeby w konsoli wciskało enter----------------------- 
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
    





    const textfieldBlock: blockType = {typeOfBlock: 'textfield', blockContent: line}
    return textfieldBlock;
}

export const equationToBlock =(line: string) : blockType=>{

    let equation = line.replace('\\begin{equation}', '')
    equation = equation.replace('\\end{equation}', '')

    let id:string;
    equation=equation.replace(/\\label\{(.*)\}/g,(wholeFraze, insideOfFraze)=>{
        id=insideOfFraze
        return wholeFraze.replace(`\\label{${insideOfFraze}}`, '')
    })

    return {typeOfBlock: 'equation', blockContent: {id:id, label: '', content: equation}}
}

export const slideBreakToBlock =(line: string) : blockType=>{

    // let equation = line.replace('\\begin{equation}', '')
    // equation = equation.replace('\\end{equation}', '')

    let title:string=''
    let subtitle:string=''

    line.replace(/.*\\begin\{frame\}\{(.*?)\}\{(.*?)\}.*/g, (wholeFraze, t, subt)=>{
        title=t
        subtitle=subt
        return null
    })

    return {typeOfBlock: 'pageBreak', blockContent: {title: title, subtitle: subtitle}}
}



export const tableToBlock =(line: string) : blockType=>{
   

    let table: blockAbleToRef;
    let tableTeX= line.replace(/\\begin\{table\}\[h!\] \\begin\{center\} \\begin\{tabular\}(.*)\\end\{tabular\}\\end\{center\} \\caption\{(.*)\} \\label\{(.*)\} \\end\{table\}/,(wholeFraze, tab, label, id)=>{
         const labelFormatted = basicToBlockFontConverter(label)
        table = {id:id, label: labelFormatted, content: ''}
        return tab.replaceAll('\\hline', '')
    })

    //let tableTeX=line.replace('\\begin{table}[h!]', '').replace('\\begin{center}', '').replace('\\begin{tabular}', '').replace('\\end{tabular}', '').replace('\\end{center}', '').replace('\\end{table}', '').replaceAll('\\hline','')
    tableTeX=basicToBlockFontConverter(tableTeX)
    let tmp:string[]=tableTeX.split('}')
    const style=tmp.shift()
    let tmp2=tmp.join()
    
    tmp=tmp2.split('\\\\')
    tmp.pop()
    let tableContent: string[][]=tmp.map((element, id)=>{
        
        return element.split('&').map((ele, id)=>{
            const uniqueArr = [...new Set(ele)]
            const uniqueStr=uniqueArr.join()
            if(uniqueStr==='' || uniqueStr===' '){
                return '<p>&nbsp;</p>'
            }else{
                 return ele
            }
           
        })
    })

    table.content=tableContent

return {typeOfBlock: 'table', blockContent: table}
}



export const figureToBlock =(line: string) : blockType=>{

    let figure:blockAbleToRef;

    line.replace(/\\begin\{figure\} \\centering \\includegraphics\[width=\\linewidth, height=\d*cm, keepaspectratio\]\{(.*)\} \\caption\{(.*)\} \\label\{(.*)\}\\end\{figure\}/, (wholeFraze, fig, label, id)=>{
        const link= fig.split('/')
        const name=link[link.length-1].split('.')
        const labelFormatted = basicToBlockFontConverter(label)
        //console.log('figure id')
        figure={content: name[0], id: id, label: labelFormatted}
        return wholeFraze
    })

    // let path= line.replace('\\begin{figure} \\centering \\includegraphics[width=\\linewidth, height=15cm, keepaspectratio]{', '')
    // //TODO regexy to caption i label

    // path = path.replace('} \\end{figure}', '').replaceAll(' ', '')

    // let pathArray=path.split('/')
    // let fileName=pathArray[pathArray.length-1].split('.')
    // let  figure = fileName[0]
    const blockFigure = {typeOfBlock:'figure' as typeOfBlockType, blockContent: figure}
    console.log('block figure---------: ', blockFigure)

    return blockFigure
}

export const referencesToBlock =(line: string) : blockType=>{ 

    const convertedLine=basicToBlockFontConverter(line)
     console.log(convertedLine)
    let references = convertedLine.replace('\\begin{thebibliography}{', '').replace('\\end{thebibliography}', '').split('\\bibitem{')
    console.log(references)
    let referencesBlocks = references.map((item, id)=>{
        let tmp = item.split('}')
        let referenceId:string=''
        if(id!==0){
        referenceId=tmp[0]
        tmp.splice(0,1);
        
        //console.log( {id: Number(referenceId), label: tmp.join('}')})
        return {id: referenceId, label: tmp.join('}')}
        }
      
    })
      referencesBlocks=referencesBlocks.filter(item=>item!==undefined && item!==null)
 console.log( referencesBlocks)
    return {typeOfBlock: 'references', blockContent: referencesBlocks as referencesElementType[]}
}
