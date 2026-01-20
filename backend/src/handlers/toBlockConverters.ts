import { blockAbleToRef, blockType, referencesElementType, typeOfBlockType, documentOptionsType, documentClassType } from "../types"
import { specialCharacters } from "../specialCharacters"


export const documentclassToBlock =(line: string) : blockType=>{


    let docBlockContent:documentOptionsType ={class: 'article'}

    if(line.includes('\\documentclass[')){
         line.replace(/\\documentclass\[([,a-z0-9 ]*?)\]\{([a-z]*?)\}/, (wholeFraze, options, docClass)=>{
            docBlockContent.class=docClass
 
            
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

         //columns
            if(docClass!=='beamer'){
             if(options.includes('twocolumn')){
                docBlockContent.columns='twocolumn'
            }
            else {
                docBlockContent.columns='onecolumn'
            }
        }

            return wholeFraze
        }) 

    }else{
        docBlockContent.class=(line.replace(/\\documentclass\{([a-z]*?)\}/, (wholeFraze, docClass)=>{
      
            return docClass 
        }) as documentClassType)
    }
 
    return {typeOfBlock: 'documentclass', blockContent: docBlockContent}
}

export const setLanguageToBlock =  (toConvert: string):string=>{

    
   return  toConvert.replace(/\\AtBeginDocument\{\\selectlanguage\{(.*?)\}\}/g, (wholeFraze, language)=>{
        return language
    })
}

export const specialCharactersToBlockConverter = (toConvert: string):string=>{
   
    toConvert=toConvert.replaceAll('\\textless ',  '&lt;') 
    toConvert=toConvert.replaceAll('\\textgreater ',  '&gt;') 
    toConvert=toConvert.replaceAll('\\#{}',  '#')
    toConvert=toConvert.replaceAll( '\\${}' , '$')
    toConvert=toConvert.replaceAll('\\%{}',  '%')
    toConvert=toConvert.replaceAll('\\^{}' , '^')
    toConvert=toConvert.replaceAll('\\&{}',  '&amp;') 
        toConvert=toConvert.replaceAll('\\_{}', '_')
        toConvert=toConvert.replaceAll('\\textasciitilde ' ,'~' )
          toConvert=toConvert.replaceAll('\\textbar ', '|' )
          toConvert=toConvert.replaceAll('\\{','\\tmpleftcurlybracket', )
  toConvert=toConvert.replaceAll('\\}','\\tmprightcurlybracket')

      for(const specChar of specialCharacters){
          toConvert=toConvert.replaceAll(`$${specChar.latexRepresentation}$`, specChar.value )
      }

   toConvert=toConvert.replaceAll('\\textbackslash ' , '\\') 

    return toConvert
}

const basicToBlockFontConverter = (fontToConvert:string): string=>{



        fontToConvert=fontToConvert.replaceAll(/\\ref\{(.*?)\}/g, (wholeFraze, insideOfFraze)=>{
        let wholeFrazeCopy=wholeFraze

            wholeFrazeCopy =wholeFrazeCopy.replaceAll(`\\ref{${insideOfFraze}}`, `<span class="mention" data-type="mention" data-id="${insideOfFraze}">${insideOfFraze}</span>`)
 
       
        return wholeFrazeCopy

    })



        // refs to bibliography
        fontToConvert=fontToConvert.replaceAll(/\\cite\{(.*?)\}/g, (wholeFraze, insideOfFraze)=>{
        let wholeFrazeCopy=wholeFraze

            wholeFrazeCopy =wholeFrazeCopy.replaceAll(`\\cite{${insideOfFraze}}`, `<span class="mention" data-type="mention" data-id="${insideOfFraze}">${insideOfFraze}</span>`)
 
       


        return wholeFrazeCopy

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
    }
     tmpStack.sort((a,b)=> a.index - b.index)
     stack=[...stack, ...tmpStack]

    if (i!==splitted.length-1)
    {
         const poped = stack.pop()

 
       for( let font of fonts){

       if(( new RegExp(font.reg.source, 'g')).test(poped[0])){
        
          converted = converted+splitted[i]
   
            let splittedPart = converted.split(new RegExp(font.reg.source, 'g'))
           splittedPart[splittedPart.length-1]=`<${font.tag}>`+splittedPart[splittedPart.length-1]
            let joinedPart=splittedPart.join('')+`</${font.tag}>`
           
     
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


     let section = line.replace(/\\chapter\{\\textnormal\{(.*)\}\}/, (wholeFraze, section)=>{
        return section
    })

   

    const sectionBlock: blockType = {typeOfBlock: 'section', blockContent: basicToBlockFontConverter (section)}
    return sectionBlock;
}
export const sectionToBlock =(line: string) : blockType=>{

    let section = line.replace(/\\section\{\\textnormal\{(.*)\}\}/, (wholeFraze, section)=>{
        return section
    })

    const sectionBlock: blockType = {typeOfBlock: 'section', blockContent: basicToBlockFontConverter (section)}
    return sectionBlock;
}

export const bookSectionToBlock =(line: string) : blockType=>{


    let section = line.replace(/\\section\{\\textnormal\{(.*)\}\}/, (wholeFraze, section)=>{
        return section
    })

    const sectionBlock: blockType = {typeOfBlock: 'subsection', blockContent: basicToBlockFontConverter (section)}
    return sectionBlock;
}

export const subsectionToBlock =(line: string) : blockType=>{

    let section = line.replace(/\\subsection\{\\textnormal\{(.*)\}\}/, (wholeFraze, section)=>{
        return section
        })

    const sectionBlock: blockType = {typeOfBlock: 'subsection', blockContent:  basicToBlockFontConverter(section)}
    return sectionBlock;
}

export const bookSubsectionToBlock =(line: string) : blockType=>{

    let section = line.replace(/\\subsection\{\\textnormal\{(.*)\}\}/, (wholeFraze, section)=>{
        return section
        })
    const sectionBlock: blockType = {typeOfBlock: 'subsubsection', blockContent:  basicToBlockFontConverter(section)}
    return sectionBlock;
}

export const subsubsectionToBlock =(line: string) : blockType=>{

    let section = line.replace(/\\subsubsection\{\\textnormal\{(.*)\}\}/, (wholeFraze, section)=>{
        return section
        })
    
    const sectionBlock: blockType = {typeOfBlock: 'subsubsection', blockContent:  basicToBlockFontConverter(section)}
    return sectionBlock;
}
export const bookSubsubsectionToBlock =(line: string) : blockType=>{

    let section = line.replace(/\\subsubsection\{\\textnormal\{(.*)\}\}/, (wholeFraze, section)=>{
        return section
        })


    const sectionBlock: blockType = {typeOfBlock: 'subsubsubsection', blockContent: basicToBlockFontConverter(section)}
    return sectionBlock;
}



export const addressAndDateToBlock =(line: string) : blockType=>{

let address:string
let date: string
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

    let section = line.replace(/\\opening\{(.*)\}/, (wholeFraze, section)=>{
        return section
        })

    const sectionBlock: blockType = {typeOfBlock: 'subsection', blockContent: basicToBlockFontConverter(section)}
    return sectionBlock;
}

export const closingToBlock =(line: string) : blockType=>{

    let section = line.replace(/\\closing\{(.*)\}/, (wholeFraze, section)=>{
        return section
        })

    const sectionBlock: blockType = {typeOfBlock: 'subsubsection', blockContent: basicToBlockFontConverter(section ).replace('\\ ', '')}
    return sectionBlock;
}


export const getTitleFromTex =(line: string) : string=>{

        let title = line.replace(/\\title\{(.*)\}/, (wholeFraze, section)=>{
        return section
        })
   
    return basicToBlockFontConverter(title)
}

export const getAuthorFromTex =(line: string) : string=>{

        let author = line.replace(/\\author\{(.*)\}/, (wholeFraze, section)=>{
        return section
        })
    return basicToBlockFontConverter(author)

}

export const getDateFromTex =(line: string) : string=>{

            let date = line.replace(/\\date\{(.*)\}/, (wholeFraze, section)=>{
        return section
        })
   
    return basicToBlockFontConverter(date)
}


export const textfieldToBlock =(line: string) : blockType=>{

    //bullet and enumerate list
    line = line.replaceAll( /\\begin\{(itemize|enumerate)\}(.*?)\\end\{(itemize|enumerate)\}/g, (wholeFraze, listType, insideOfFraze) => {
        let items:string[] = insideOfFraze.split('\\item ')
        items.shift()
        items=items.map(item=>'<li>'+item+'</li>')
        if(listType==="enumerate"){
            return '<ol>'+items.join('')+'</ol>'
        }
        else { return '<ul>'+items.join('')+'</ul>'}})
    


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
    let tableTeX= line.replace(/\\begin\{table\}\[h!\] \\begin\{center\} \\begin\{tabularx\}\{\\linewidth\}(.*)\\end\{tabularx\}\\end\{center\} \\caption\{(.*)\} \\label\{(.*)\} \\end\{table\}/,(wholeFraze, tab, label, id)=>{
         const labelFormatted = basicToBlockFontConverter(label)
        table = {id:id, label: labelFormatted, content: ''}
        return tab.replaceAll('\\hline', '')
    })

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

    line.replace(/\\begin\{figure\}\[H\] \\centering \\includegraphics\[width=\\linewidth, height=\d*cm, keepaspectratio\]\{(.*)\} \\caption\{(.*)\} \\label\{(.*)\}\\end\{figure\}/, (wholeFraze, fig, label, id)=>{
        const link= fig.split('/')
        const name=link[link.length-1].split('.')
        const labelFormatted = basicToBlockFontConverter(label)
        figure={content: name[0]==='noImage'? null : name[0] , id: id, label: labelFormatted}
        return wholeFraze
    })
    const blockFigure = {typeOfBlock:'figure' as typeOfBlockType, blockContent: figure}

    return blockFigure
}

export const referencesToBlock =(line: string) : blockType=>{ 

    const convertedLine=line

    let references = convertedLine.replace('\\begin{thebibliography}{', '').replace('\\end{thebibliography}', '').split('\\bibitem{')

    let referencesBlocks = references.map((item, id)=>{
         let referenceId:string=''
       
        let label:string=''
        if(id!==0){
            item.replace(/(.*?)\}(.*)/, (wholeFraze, refId, refLabel)=>{
                referenceId=refId
                label=refLabel
                return wholeFraze
            })
         return {id: referenceId, label: basicToBlockFontConverter(label)}
        }
      
    })
      referencesBlocks=referencesBlocks.filter(item=>item!==undefined && item!==null)

    return {typeOfBlock: 'references', blockContent: referencesBlocks as referencesElementType[]}
}
