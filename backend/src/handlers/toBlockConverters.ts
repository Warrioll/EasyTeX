import { blockAbleToRef, blockType, referencesElementType, typeOfBlockType, documentOptionsType, documentClassType } from "../types"
import { specialCharacters } from "../specialCharacters"
//import { cloneDeep } from "lodash"

export const documentclassToBlock =(line: string) : blockType=>{

    // const regex = /\\documentclass\{[a-z]+\}/g
    // const fromRegex =  [...line.matchAll(regex)] 
    // let documentclassLine: string[] = fromRegex.map(temp => temp[0])
    // //documentclassLine = documentclassLine.flat();
    // // if(documentclass.lenght >1) {...}        //sprawdzenie czy w lini nie ma więcej trakich  dziadostw
    // let [documentclass] = documentclassLine;
    // documentclass = documentclass.replace("\\documentclass{", "")
    // documentclass = documentclass.replace("}", "")
    // const documentclassBlock: blockType = {typeOfBlock: 'documentclass', blockContent: documentclass}
    // return documentclassBlock;

    let docBlockContent:documentOptionsType ={class: 'article'}

    if(line.includes('\\documentclass[')){
         line.replace(/\\documentclass\[([,a-z0-9 ]*?)\]\{([a-z]*?)\}/, (wholeFraze, options, docClass)=>{
            docBlockContent.class=docClass
               console.log('if class:',docClass )
            
            //font size
            if(options.includes('12pt')){
                docBlockContent.fontSize='12pt'
            }else if(options.includes('11pt')){
                docBlockContent.fontSize='11pt'
            }else {
                docBlockContent.fontSize='10pt'
            }

            //paper size
            if(docClass!=='beamer'){
            if(options.includes('letterpaper')){
                docBlockContent.paperSize='letterpaper'
            }else if(options.includes('a5paper')){
                docBlockContent.paperSize='a5paper'
            }else if(options.includes('b5paper')){
                docBlockContent.paperSize='b5paper'
            }else if(options.includes('executivepaper')){
                docBlockContent.paperSize='executivepaper'
            }else if(options.includes('legalpaper')){
                docBlockContent.paperSize='legalpaper'
            }
            else {
                docBlockContent.paperSize='a4paper'
            }
        }

            //orientation
            if(docClass!=='letter'){
             if(options.includes('landscape')){
                docBlockContent.orientation='landscape'
            }
            else {
                docBlockContent.orientation=''
            }
        }

            return wholeFraze
        }) 

    }else{
        docBlockContent.class=(line.replace(/\\documentclass\{([a-z]*?)\}/, (wholeFraze, docClass)=>{
            console.log('else class:',docClass )
            return docClass 
        }) as documentClassType)
    }
    console.log('doc.class:', docBlockContent.class)
    return {typeOfBlock: 'documentclass', blockContent: docBlockContent}
}

export const specialCharactersToBlockConverter = (toConvert: string):string=>{
   
    toConvert=toConvert.replaceAll('\\textless ',  '&lt;') //zmianiane pzez html
    toConvert=toConvert.replaceAll('\\textgreater ',  '&gt;')  //zmianiane pzez html
    toConvert=toConvert.replaceAll('\\#{}',  '#')
    toConvert=toConvert.replaceAll( '\\${}' , '$')
    toConvert=toConvert.replaceAll('\\%{}',  '%')
    toConvert=toConvert.replaceAll('\\^{}' , '^')
    toConvert=toConvert.replaceAll('\\&{}',  '&amp;') //zmianiane pzez html
        toConvert=toConvert.replaceAll('\\_{}', '_')
        toConvert=toConvert.replaceAll('\\textasciitilde ' ,'~' )
          toConvert=toConvert.replaceAll('\\textbar ', '|' )
          toConvert=toConvert.replaceAll('\\{','\\tmpleftcurlybracket', )
  toConvert=toConvert.replaceAll('\\}','\\tmprightcurlybracket')

      for(const specChar of specialCharacters){
          toConvert=toConvert.replaceAll(`$${specChar.latexRepresentation}$`, specChar.value )
      }

   toConvert=toConvert.replaceAll('\\textbackslash ' , '\\') // UWAGA!!! zmienia wszystkie backslashe wiec wczesniejsza konwersja na latex jest rozwalana
  

    return toConvert
}

const basicToBlockFontConverter = (fontToConvert:string): string=>{
     //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //line= line.replace('\r', '')
    
    //znaki specjalne
    //w drugą stronę z tym coś nie działało
    //line= line.replaceAll('\\textbackslash', '\\')
    
    //OLD VERSION
/*
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

      //subscript               
     fontToConvert = fontToConvert.replaceAll(/\\textsubscript\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
        return '<sub>'+insideOfFraze+'</sub>';})

    //superscript           
    fontToConvert = fontToConvert.replaceAll(/\\textsuperscript\{(.*?)\}/g, (wholeFraze, insideOfFraze) => {
        return '<sup>'+insideOfFraze+'</sup>';})


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
     

    fontToConvert=specialCharactersToBlockConverter(fontToConvert)

        return fontToConvert
        */


        //NEW VERSION

         // refs to figures, tables and equations
        fontToConvert=fontToConvert.replaceAll(/\\ref\{(.*?)\}/g, (wholeFraze, insideOfFraze)=>{
        let wholeFrazeCopy=wholeFraze
        //console.log('wholeFraze', wholeFraze)
        //console.log('insideOfFraze', insideOfFraze)
        //for( let i of insideOfFraze){
            wholeFrazeCopy =wholeFrazeCopy.replaceAll(`\\ref{${insideOfFraze}}`, `<span class="mention" data-type="mention" data-id="${insideOfFraze}">${insideOfFraze}</span>`)
       // }
       
        return wholeFrazeCopy
         //<span class="mention" data-type="mention" data-id="eq1">eq1</span>
    })


        // refs to bibliography
        fontToConvert=fontToConvert.replaceAll(/\\cite\{(.*?)\}/g, (wholeFraze, insideOfFraze)=>{
        let wholeFrazeCopy=wholeFraze
       // console.log('wholeFraze', wholeFraze)
        //console.log('insideOfFraze', insideOfFraze)
        //for( let i of insideOfFraze){
            wholeFrazeCopy =wholeFrazeCopy.replaceAll(`\\cite{${insideOfFraze}}`, `<span class="mention" data-type="mention" data-id="${insideOfFraze}">${insideOfFraze}</span>`)
       // }
       


        return wholeFrazeCopy
         //<span class="mention" data-type="mention" data-id="eq1">eq1</span>
    })

     //special characters
    fontToConvert=specialCharactersToBlockConverter(fontToConvert)

    //other
    let stack:(RegExpExecArray)[]=[]

const fonts = [
    {reg: /\\textbf\{/g, tag: 'strong'},
    {reg: /\\textit\{/g, tag: 'em'},
    {reg: /\\texttt\{/g, tag: 'code'}, 
    {reg: /\\uline\{/g, tag: 'u'},
    {reg: /\\sout\{/g, tag: 's'},
    {reg: /\\textsubscript\{/g, tag: 'sub'},
    {reg: /\\textsuperscript\{/g, tag: 'sup'}
]



let converted =''

const splitted =fontToConvert.split('}')

for (let i=0; i<splitted.length; i++){
    let tmpStack:(RegExpExecArray)[]=[]
    for( let font of fonts){
         tmpStack = [...tmpStack, ...[...splitted[i].matchAll( new RegExp(font.reg.source, 'g'))]]
       //console.log('to stack', font , ' : ', splitted[i],":",[...splitted[i].matchAll(font.reg)])
    }
    
     tmpStack.sort((a,b)=> a.index - b.index)
     stack=[...stack, ...tmpStack]
     //console.log('stack:', stack)
    if (i!==splitted.length-1)
    {
         const poped = stack.pop()
       //console.log('pop',poped)
       for( let font of fonts){
       if(( new RegExp(font.reg.source, 'g')).test(poped[0])){
          converted = converted+splitted[i]
            let splittedPart = converted.split(new RegExp(font.reg.source, 'g'))
           splittedPart[splittedPart.length-1]=`<${font.tag}>`+splittedPart[splittedPart.length-1]
            let joinedPart=splittedPart.join('')+`</${font.tag}>`
           
        //   let part = splitted[i].slice(0, poped.index)+`<${font.tag}>`+splitted[i].slice(poped.index+poped[0].length)+`</${font.tag}>`
           converted =joinedPart
       }
    
       }
    }else{
        converted=converted+splitted[i]
    }
   
}
    fontToConvert=converted

    //new lines
    fontToConvert =fontToConvert.split('\\newline ').map(temp=> '<p>'+temp+'</p>').join('')

    //replacing temporary curly brackets markers
    fontToConvert=fontToConvert.replaceAll('\\tmpleftcurlybracket', '{')
    fontToConvert=fontToConvert.replaceAll( '\\tmprightcurlybracket', '}')


 return fontToConvert
}

export const chapterToBlock =(line: string) : blockType=>{

    //let section= basicToBlockFontConverter (line)

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
    //  let section = line.replace('\\chapter{', '')
    //  section = section.replace('\\textnormal{', '')
    // section= section.replaceAll('}', '')
     let section = line.replace(/\\chapter\{\\textnormal\{(.*)\}\}/, (wholeFraze, section)=>{
        return section
    })

   
    //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //section= section.replace('\r', '')
    const sectionBlock: blockType = {typeOfBlock: 'section', blockContent: basicToBlockFontConverter (section)}
    return sectionBlock;
}
export const sectionToBlock =(line: string) : blockType=>{

    //let section= basicToBlockFontConverter (line)

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
    let section = line.replace(/\\section\{\\textnormal\{(.*)\}\}/, (wholeFraze, section)=>{
        return section
    })
    //section = section.replace('\\textnormal{', '')
    //section= section.replaceAll('}', '')

   
    //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //section= section.replace('\r', '')
    const sectionBlock: blockType = {typeOfBlock: 'section', blockContent: basicToBlockFontConverter (section)}
    return sectionBlock;
}

export const subsectionToBlock =(line: string) : blockType=>{

   // let section= basicToBlockFontConverter(line)

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
//     let section = line.replace('\\subsection{', '')
//     section = section.replace('\\textnormal{', '')
//    section= section.replaceAll('}', '')
    let section = line.replace(/\\subsection\{\\textnormal\{(.*)\}\}/, (wholeFraze, section)=>{
        return section
        })

   
    //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //section= section.replace('\r', '')
    const sectionBlock: blockType = {typeOfBlock: 'subsection', blockContent:  basicToBlockFontConverter(section)}
    return sectionBlock;
}

export const subsubsectionToBlock =(line: string) : blockType=>{

   // let section=

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
//     let section = line.replace('\\subsubsection{', '')
//     section = section.replace('\\textnormal{', '')
//    section= section.replaceAll('}', '')
    let section = line.replace(/\\subsubsection\{\\textnormal\{(.*)\}\}/, (wholeFraze, section)=>{
        return section
        })
    
    //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //section= section.replace('\r', '')
    const sectionBlock: blockType = {typeOfBlock: 'subsubsection', blockContent:  basicToBlockFontConverter(section)}
    return sectionBlock;
}
export const bookSubsubsectionToBlock =(line: string) : blockType=>{

    //let section=

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
//    let section = line.replace('\\subsubsection{', '')
//     section = section.replace('\\textnormal{', '')
//    section= section.replaceAll('}', '')
    let section = line.replace(/\\subsubsection\{\\textnormal\{(.*)\}\}/, (wholeFraze, section)=>{
        return section
        })

    
    //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //section= section.replace('\r', '')
    const sectionBlock: blockType = {typeOfBlock: 'subsubsubsection', blockContent: basicToBlockFontConverter(section)}
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

    //let section= basicToBlockFontConverter(line)

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
//     section = section.replace('\\opening{', '')
//     //section = section.replace('\\textnormal{', '')
//    section= section.replaceAll('}', '')
    let section = line.replace(/\\opening\{(.*)\}/, (wholeFraze, section)=>{
        return section
        })

   
    //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //section= section.replace('\r', '')
    const sectionBlock: blockType = {typeOfBlock: 'subsection', blockContent: basicToBlockFontConverter(section)}
    return sectionBlock;
}

export const closingToBlock =(line: string) : blockType=>{

    //let section= 

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
//     section = section.replace('\\closing{', '')
//     //section = section.replace('\\textnormal{', '')
//    section= section.replaceAll('}', '')
    let section = line.replace(/\\closing\{(.*)\}/, (wholeFraze, section)=>{
        return section
        })

    
    //to poniżej trochę niebezpieczne więc najpeliejm jakiś regex usuwajacy to \r
    //section= section.replace('\r', '')
    const sectionBlock: blockType = {typeOfBlock: 'subsubsection', blockContent: basicToBlockFontConverter(section )}
    return sectionBlock;
}


export const getTitleFromTex =(line: string) : string=>{

    //let title= 

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
    // title = title.replace('\\title{', '')
    // title= title.replace('}', '')
        let title = line.replace(/\\title\{(.*)\}/, (wholeFraze, section)=>{
        return section
        })
   
    return basicToBlockFontConverter(title)
}

export const getAuthorFromTex =(line: string) : string=>{

    //let author= basicToBlockFontConverter(line)

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
    // author = author.replace('\\author{', '')
    // author= author.replace('}', '')
        let author = line.replace(/\\author\{(.*)\}/, (wholeFraze, section)=>{
        return section
        })
    return basicToBlockFontConverter(author)

}

export const getDateFromTex =(line: string) : string=>{

    //let date= basicToBlockFontConverter(line)

    //zakładam że jest czysta linijka z samym section bez spacji z przodu itp.
    // date = date.replace('\\date{', '')
    // date= date.replace('}', '')
            let date = line.replace(/\\date\{(.*)\}/, (wholeFraze, section)=>{
        return section
        })
   
    return basicToBlockFontConverter(date)
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

    

    // //subscript               
    //  line = line.replaceAll(/\$_\{\\textnormal\{(.*?)\}\}\$/g, (wholeFraze, insideOfFraze) => {
    //     return '<sub>'+insideOfFraze+'</sub>';})

    // //superscript           
    //  line = line.replaceAll(/\$\^\{\\textnormal\{(.*?)\}\}\$/g, (wholeFraze, insideOfFraze) => {
    //     return '<sup>'+insideOfFraze+'</sup>';})


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
    


        line=basicToBlockFontConverter(line)


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

    return {typeOfBlock: 'pageBreak', blockContent: {title: basicToBlockFontConverter(title), subtitle:  basicToBlockFontConverter(subtitle)}}
}



export const tableToBlock =(line: string) : blockType=>{
   

    let table: blockAbleToRef;
    let tableTeX= line.replace(/\\begin\{table\}\[h!\] \\begin\{center\} \\begin\{tabular\}(.*)\\end\{tabular\}\\end\{center\} \\caption\{(.*)\} \\label\{(.*)\} \\end\{table\}/,(wholeFraze, tab, label, id)=>{
         const labelFormatted = basicToBlockFontConverter(label)
        table = {id:id, label: labelFormatted, content: ''}
        return tab.replaceAll('\\hline', '')
    })

    //let tableTeX=line.replace('\\begin{table}[h!]', '').replace('\\begin{center}', '').replace('\\begin{tabular}', '').replace('\\end{tabular}', '').replace('\\end{center}', '').replace('\\end{table}', '').replaceAll('\\hline','')
    //tableTeX=basicToBlockFontConverter(tableTeX)
    let tmp:string[]=tableTeX.split('}')
    const style=tmp.shift()
    let tmp2=tmp.join('}')
    
    tmp=tmp2.split('\\\\')
    tmp.pop()
    let tableContent: string[][]=tmp.map((element, id)=>{
        
        return element.split('&').map((ele, id)=>{
            const uniqueArr = [...new Set(ele)]
            const uniqueStr=uniqueArr.join()
            if(uniqueStr==='' || uniqueStr===' '){
                return '<p>&nbsp;</p>'
            }else{
                 return basicToBlockFontConverter(ele)
            }
           
        })
    })

    table.content=tableContent

return {typeOfBlock: 'table', blockContent: table}
}



export const figureToBlock =(line: string) : blockType=>{

    let figure:blockAbleToRef;

    line.replace(/\\begin\{figure\}\[h\] \\centering \\includegraphics\[width=\\linewidth, height=\d*cm, keepaspectratio\]\{(.*)\} \\caption\{(.*)\} \\label\{(.*)\}\\end\{figure\}/, (wholeFraze, fig, label, id)=>{
        const link= fig.split('/')
        const name=link[link.length-1].split('.')
        const labelFormatted = basicToBlockFontConverter(label)
        //console.log('figure id')
        figure={content: name[0]==='noImage'? null : name[0] , id: id, label: labelFormatted}
        return wholeFraze
    })

    // let path= line.replace('\\begin{figure} \\centering \\includegraphics[width=\\linewidth, height=15cm, keepaspectratio]{', '')
    // //TODO regexy to caption i label

    // path = path.replace('} \\end{figure}', '').replaceAll(' ', '')

    // let pathArray=path.split('/')
    // let fileName=pathArray[pathArray.length-1].split('.')
    // let  figure = fileName[0]
    const blockFigure = {typeOfBlock:'figure' as typeOfBlockType, blockContent: figure}
    //console.log('block figure---------: ', blockFigure)

    return blockFigure
}

export const referencesToBlock =(line: string) : blockType=>{ 

    //const convertedLine=basicToBlockFontConverter(line)
    const convertedLine=line
     console.log(convertedLine)
    let references = convertedLine.replace('\\begin{thebibliography}{', '').replace('\\end{thebibliography}', '').split('\\bibitem{')
    console.log(references)
    let referencesBlocks = references.map((item, id)=>{
        // let tmp = item.split('}')
         let referenceId:string=''
       
        let label:string=''
        if(id!==0){
            item.replace(/(.*?)\}(.*)/, (wholeFraze, refId, refLabel)=>{
                referenceId=refId
                label=refLabel
                return wholeFraze
            })
        // referenceId=tmp[0]
        // tmp.splice(0,1);
        
        //console.log( {id: Number(referenceId), label: tmp.join('}')})
        //return {id: referenceId, label: tmp.join('}')}
         return {id: referenceId, label: basicToBlockFontConverter(label)}
        }
      
    })
      referencesBlocks=referencesBlocks.filter(item=>item!==undefined && item!==null)
 //console.log( referencesBlocks)
    return {typeOfBlock: 'references', blockContent: referencesBlocks as referencesElementType[]}
}
