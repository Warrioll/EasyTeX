import { elementsPrototypes } from "./equationsElementsPrototypes";
import { specialCharacters } from "./SpecialCharacters";
import { cloneDeep } from "lodash";

export function elementsToTex(array:any):string{
    let formula:string ='';
    let tmp
    for (let i=0; i<array.length ; i++){
        switch(array[i].label){
            case 'Expression':
               tmp=array[i].content;
               //console.log('expr', tmp)
                for(let i of specialCharacters){
                    //console.log('value: ', i.group)
                    for(let j of i.group ){
                        tmp=tmp.replaceAll(j.value, ` ${j.latexRepresentation} `)
                    }
                    
                }
                // tmp=tmp.replaceAll('π', '\\pi ')
                // tmp=tmp.replaceAll('Π', '\\Pi ')
                // tmp=tmp.replaceAll('α', '\\alpha ')
                formula+=tmp
                break;
            case 'Fraction':
                formula+=`\\frac{${elementsToTex(array[i].children[0].children)}}{${elementsToTex(array[i].children[1].children)}}`   
                break;
            case 'Integral':
                formula+=`\\int^{${elementsToTex(array[i].children[0].children)}}_{${elementsToTex(array[i].children[1].children)}}`   
                break;
            case 'Line integral':
                   formula+=`\\oint^{${elementsToTex(array[i].children[0].children)}}_{${elementsToTex(array[i].children[1].children)}}`   
                    break;
            case 'Root':
                formula+=`\\sqrt[${elementsToTex(array[i].children[0].children)}]{${elementsToTex(array[i].children[1].children)}}`   
                break;
            case 'Upper index':
                    formula+=`${elementsToTex(array[i].children[1].children)}^{${elementsToTex(array[i].children[0].children)}}`   
                    break;
             case 'Lower index':
                    formula+=`${elementsToTex(array[i].children[1].children)}_{${elementsToTex(array[i].children[0].children)}}`   
                    break;
            case 'Upper & lower index':
                        formula+=`${elementsToTex(array[i].children[2].children)}^{${elementsToTex(array[i].children[0].children)}}_{${elementsToTex(array[i].children[1].children)}}`   
                        break;
            // case 'Upper index':
            //         formula+=`^{${elementsToTex(array[i].children)}}`   
            //         break;
            //  case 'Lower index':
            //         formula+=`_{${elementsToTex(array[i].children)}}`   
            //         break;
            case 'Sum':
                formula+=`\\sum^{${elementsToTex(array[i].children[0].children)}}_{${elementsToTex(array[i].children[1].children)}}`   
                break;
            case 'Product':
                formula+=`\\prod^{${elementsToTex(array[i].children[0].children)}}_{${elementsToTex(array[i].children[1].children)}}`   
                break;
            case 'Limes':
                formula+=`\\lim_{${elementsToTex(array[i].children)}}`
                break;   
            case 'Big union':
                formula+=`\\bigcup^{${elementsToTex(array[i].children[0].children)}}_{${elementsToTex(array[i].children[1].children)}}`   
                break;
            case 'Big intersection':
                formula+=`\\bigcap^{${elementsToTex(array[i].children[0].children)}}_{${elementsToTex(array[i].children[1].children)}}`   
                break;
            case 'Big disjunction':
                formula+=`\\bigvee^{${elementsToTex(array[i].children[0].children)}}_{${elementsToTex(array[i].children[1].children)}}`   
                break;
            case 'Big conjunction':
                formula+=`\\bigwedge^{${elementsToTex(array[i].children[0].children)}}_{${elementsToTex(array[i].children[1].children)}}`   
                break;
            case 'Combination':
                formula+=`\\binom{${elementsToTex(array[i].children[0].children)}}{${elementsToTex(array[i].children[1].children)}}`   
                break;
            default:
                break;
        } 
    }



    return formula;
}


export function texToElements(originalString:string):any{

        let parts=[]
        if( originalString!==undefined &&originalString.includes('{') && originalString.includes('}')){
            let counter=0
            let start=0
            let end=0
            let toSplit=[0]
            for (let i=0; i<originalString.length; i++){
                if(originalString[i]==='{'){
                    if(counter===0){
                        start=i
                }
                counter++
            }
        
            if(originalString[i]==='}'){
                counter--
                if(counter===0){
                    end=i
                    if(end!==start){
                        toSplit=[...toSplit,start,end]
                    }
                }
            }
            }
            toSplit=[...toSplit, originalString.length-1]
    
            parts=[ originalString.slice(toSplit[0], toSplit[1])]
            for(let i=1; i<toSplit.length-2; i++){
                if(i%2===1){
                    let tmp= originalString.slice(toSplit[i], toSplit[i+1]+1).slice(1)
                    tmp=tmp.slice(0,tmp.length-1)
                    parts=[...parts,tmp] 
                }else{
                    parts=[...parts, originalString.slice(toSplit[i]+1, toSplit[i+1])]
                }
            }
    
            parts=[...parts, originalString.slice(toSplit[toSplit.length-2]+1)]
        
            parts=parts.filter(part=>part!=='')
        
        //console.log('original: ', originalString, 'parts: ',parts)
        
        // for(let i=0; i<parts.length; i++){
        //     parts[i]=splitByBrackets( parts[i])
        // }
        let elements=[]
        let i =0
         
        while(i<parts.length){
            // if(parts[i]===undefined){
                
            //     i++
            //     continue
            // }
            if(parts[i].includes('\\frac')){
                let expr={...elementsPrototypes.expression.elementPrototype}
                expr.content=parts[i].replace('\\frac', '')
                
                let nfrac={...elementsPrototypes.fraction.elementPrototype}
                nfrac.children[0].children=cloneDeep(texToElements(parts[i+1]))
                nfrac.children[1].children=cloneDeep(texToElements(parts[i+2]))
                elements=[...elements, expr, nfrac]
                i=i+3
                continue
            }
            if(parts[i].includes('\\sum')){
                let nsum={...elementsPrototypes.sum.elementPrototype}
                 let tmp =parts[i].split('\\sum')
                 let expr={...elementsPrototypes.expression.elementPrototype}
                expr.content=tmp[0]
                 if(tmp[1]==='^'){
                     nsum.children[0].children=texToElements(parts[i+1])
                     nsum.children[1].children=texToElements(parts[i+3])
                     //console.log(parts[i+3])
                 }else{
                     
                     nsum.children[1].children=texToElements(parts[i+1])
                     nsum.children[0].children=texToElements(parts[i+3])
                 }
                 elements=[...elements,expr, sum]
                 i=i+4
                 continue
            }
            
            if(parts[i].endsWith('^')){
                let expr={...elementsPrototypes.expression.elementPrototype}
                expr.content=parts[i].replace('^', '')
                if(parts[i+2]==='_'){
                     let indexes={...elementsPrototypes.upperAndLowerIndex.elementPrototype}
                     indexes.children[0].children=texToElements(parts[i+1])
                     indexes.children[1].children=texToElements(parts[i+3])
                     indexes.children[2].children=[expr]
                     elements=[...elements, indexes]
                     i=i+4
                     continue
                }else{
                    let indexes={...elementsPrototypes.upperIndex.elementPrototype}
                     indexes.children[0].children=texToElements(parts[i+1])
                     indexes.children[1].children=[expr]
                      elements=[...elements, indexes]
                      i=i+2
                     continue
                }
             }
            if(parts[i].endsWith('_')){
                let expr={...elementsPrototypes.expression.elementPrototype}
                expr.content=parts[i].replace('_', '')
                if(parts[i+2]==='^'){
                     let indexes={...elementsPrototypes.upperAndLowerIndex.elementPrototype}
                     indexes.children[0].children=texToElements(parts[i+1])
                     indexes.children[1].children=texToElements(parts[i+3])
                     indexes.children[2].children=[expr]
                      elements=[...elements, indexes]
                      i=i+4
                     continue
                }else{
                    let indexes={...elementsPrototypes.lowerIndex.elementPrototype}
                     indexes.children[0].children=texToElements(parts[i+1])
                     indexes.children[1].children=[expr]
                      elements=[...elements, indexes]
                      i=i+2
                     continue
                }
             }
            
            
            let expr={...elementsPrototypes.expression.elementPrototype}
            expr.content=parts[i]
            elements=[...elements,expr]
            i++
            
            
        //TODO
        //i++
            
        }
        elements=elements.filter(part=>part!=='')
        return elements
    }
        if(originalString===undefined){
            return null
        }
        let expr={...elementsPrototypes.expression.elementPrototype}
        expr.content=originalString
        return expr
    }
    

