import { blockType, documentClassType } from "@/Types"
import DOMPurify from 'dompurify';


export const sanitizeBlocksContent = (toSanitize:string):string=>{
 return DOMPurify.sanitize(toSanitize, {
                    ALLOWED_TAGS: [
                      'p',
                      'strong',
                      'em',
                      'code',
                      'u',
                      's',
                      'span',
                      'sub',
                      'sup',
                      'li',
                      'ul',
                      'ol',
                    ],
                    ALLOWED_ATTR: ['class', 'data-type', 'data-id'],
                  })
}

export const chceckIfBlockContentEmpty = (contentToCheck:string):boolean=>{
  //console.log('ifContentEmpty: ', content)
  let content=contentToCheck
    content=content.replaceAll('<p>', '')
    content=content.replaceAll('</p>', '')

    content=content.replaceAll('<strong>', '')
    content=content.replaceAll('</strong>', '')

    content=content.replaceAll('<code>', '')
    content=content.replaceAll('</code>', '')

    content=content.replaceAll('<u>', '')
    content=content.replaceAll('</u>', '')

    content=content.replaceAll('<em>', '')
    content=content.replaceAll('</em>', '')

    content=content.replaceAll('<s>', '')
    content=content.replaceAll('</s>', '')

    // TODO tu jescze wyliczenia i linki itp od textfielda
    if(content===''){
      return true;
    }
    return false;
  }


    export const getReferenceForEditor = (referenceId:string):string =>{
      //return "<span class=\"mention\" data-type=\"mention\" data-id=\"" + referenceId+ "\">"+referenceId+"</span>"
      return ` <span class="mention" data-type="mention" data-id="${referenceId}">${referenceId}</span> `
      //       <span class="mention" data-type="mention" data-id="img1">img1</span>
      //<span class=\"mention\" data-type=\"mention\" data-id=\"img1\" data-mention-suggestion-char=\"@\">img1</span>
      
    }


    export const blockTypeToOfficialName=(blockType: blockType, docuimentclass: documentClassType):string=>{
    switch (blockType as unknown as string){
      case   'textfield':
        return 'Textfield';
      case 'section':
        return 'Section'
      case 'subsection':
           if(docuimentclass === 'letter'){
          return 'Opening'
        }
        return 'Subsection'
      case 'subsubsection':
          if(docuimentclass === 'letter'){
          return 'Closing'
        }
        return 'Subsubsection'
      case 'documentclass' :
        return 'Document type'
      case 'titlePage':
           if(docuimentclass === 'letter'){
          return 'Address & date'
        }
        return 'Title section'
      case 'tableOfContents':
        return 'Table of Contents'
      case 'pageBreak':
        if(docuimentclass === 'beamer'){
          return 'Slide break'
        }
        return 'Page break'
      case 'equation':
        return 'Equation'
      case 'table':
        return 'Table' 
      case  'figure':
        return 'Rigure'
      case 'references':
        return 'References'
      case 'latex':
        return 'LaTeX expression'
      default:
         return '???'
    }
  }