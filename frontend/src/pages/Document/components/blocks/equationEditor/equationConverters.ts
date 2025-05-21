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
               console.log('expr',array)
               tmp=tmp.replaceAll(' ', '\\ ')
                for(let i of specialCharacters){
                    //console.log('value: ', i.group)
                    for(let j of i.group ){
                        tmp=tmp.replaceAll(j.value, ` ${j.latexRepresentation} `)
                    }
                    
                }
                 
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
                formula+=`\\lim_{${elementsToTex(array[i].children[0].children)}}`
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
            // case 'Case structure (left curly bracket)':
            //     formula+=`\\left\\{\\begin{array}{ll}${elementsToTex(array[i].children[0].children)}&${elementsToTex(array[i].children[1].children)}\\\\${elementsToTex(array[i].children[2].children)}&${elementsToTex(array[i].children[3].children)}\\end{array}\\right.`   
            //     break;
            // case 'Case structure (right curly bracket)':
            //     formula+=`\\left.\\begin{array}{ll}${elementsToTex(array[i].children[0].children)}&${elementsToTex(array[i].children[1].children)}\\\\${elementsToTex(array[i].children[2].children)}&${elementsToTex(array[i].children[3].children)}\\end{array}\\right\\}`   
            //     break;
            // case 'Case structure (curly brackets)':
            //     formula+=`\\left\\{\\begin{array}{ll}${elementsToTex(array[i].children[0].children)}&${elementsToTex(array[i].children[1].children)}\\\\${elementsToTex(array[i].children[2].children)}&${elementsToTex(array[i].children[3].children)}\\end{array}\\right\\}`   
            //     break;
            case 'Row (2 elements, left aligned)':
                formula+=`\\left.\\begin{array}{ll}{${elementsToTex(array[i].children[0].children)}}&{${elementsToTex(array[i].children[1].children)}}\\end{array}\\right.`   
                break;
            case 'Row (3 elements, left aligned)':
                formula+=`\\left.\\begin{array}{lll}{${elementsToTex(array[i].children[0].children)}}&{${elementsToTex(array[i].children[1].children)}}&{${elementsToTex(array[i].children[2].children)}}\\end{array}\\right.`   
                break;
            case 'Column (2 elements, left aligned)':
                formula+=`\\left.\\begin{array}{ll}{${elementsToTex(array[i].children[0].children)}}\\\\{${elementsToTex(array[i].children[1].children)}}\\end{array}\\right.`   
                break;
            case 'Column (3 elements, left aligned)':
                formula+=`\\left.\\begin{array}{lll}{${elementsToTex(array[i].children[0].children)}}\\\\{${elementsToTex(array[i].children[1].children)}}\\\\{${elementsToTex(array[i].children[2].children)}}\\end{array}\\right.`   
                break;
            case 'Row (2 elements, centered)':
                formula+=`\\left.\\begin{array}{cc}{${elementsToTex(array[i].children[0].children)}}&{${elementsToTex(array[i].children[1].children)}}\\end{array}\\right.`   
                break;
            case 'Row (3 elements, centered)':
                formula+=`\\left.\\begin{array}{ccc}{${elementsToTex(array[i].children[0].children)}}&{${elementsToTex(array[i].children[1].children)}}&{${elementsToTex(array[i].children[2].children)}}\\end{array}\\right.`   
                break;
            case 'Column (2 elements, centered)':
                formula+=`\\left.\\begin{array}{cc}{${elementsToTex(array[i].children[0].children)}}\\\\{${elementsToTex(array[i].children[1].children)}}\\end{array}\\right.`   
                break;
            case 'Column (3 elements, centered)':
                formula+=`\\left.\\begin{array}{ccc}{${elementsToTex(array[i].children[0].children)}}\\\\{${elementsToTex(array[i].children[1].children)}}\\\\{${elementsToTex(array[i].children[2].children)}}\\end{array}\\right.`   
                break;
            case 'Big left curly bracket':
                formula+=`\\left\\lbrace{${elementsToTex(array[i].children[0].children)}}\\right.`   
                break;
            case 'Big right curly bracket':
                formula+=`\\left.{${elementsToTex(array[i].children[0].children)}}\\right\\rbrace `   
                break;
            case 'Big left square bracket':
                formula+=`\\left[{${elementsToTex(array[i].children[0].children)} }\\right.`   
                break;
            case 'Big right square bracket':
                formula+=`\\left.{${elementsToTex(array[i].children[0].children)}}\\right]`   
                break;
            case 'Big left regular bracket':
                formula+=`\\left({${elementsToTex(array[i].children[0].children)}}\\right.`   
                break;
            case 'Big right regular bracket':
                formula+=`\\left.{${elementsToTex(array[i].children[0].children)}}\\right)`   
                break;
            case 'Big regular brackets':
                formula+=`\\left({${elementsToTex(array[i].children[0].children)}}\\right)`   
                break;
            case 'Big curly brackets':
                formula+=`\\left\\lbrace{${elementsToTex(array[i].children[0].children)}}\\right\\rbrace `   
                break;
            case 'Big square brackets':
                formula+=`\\left[{${elementsToTex(array[i].children[0].children)}}\\right]`   
                break;
            default:
                break;
        } 
    }



    return formula;
}


export function texToElements(originalString:string):any{
        //originalString=originalString.replaceAll('\r','').replaceAll('\n','').replaceAll('\t','')
        try{
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
        
            parts=parts.filter(part=>part!=='' && part!==' ' )
        
        //console.log('original: ', originalString, 'parts: ',parts)
        
        // for(let i=0; i<parts.length; i++){
        //     parts[i]=splitByBrackets( parts[i])
        // }
        let elements=[]
        let i =0
          console.log('parts:', parts)
        while(i<parts.length){
           
            try{
            // if(parts[i]===undefined){
                
            //     i++
            //     continue
            // }
            if(parts[i].includes('\\frac') || parts[i].includes('\\binom')){
                let expr={...elementsPrototypes.expression.elementPrototype}
                let nfrac
                if(parts[i].includes('\\frac') ){
                    expr.content=texToElementsSpecialCHaractersConvertion(parts[i].replace('\\frac', ''))
                    nfrac={...elementsPrototypes.fraction.elementPrototype}
                }
                if(parts[i].includes('\\binom') ){
                    expr.content=texToElementsSpecialCHaractersConvertion(parts[i].replace('\\binom', ''))
                    nfrac={...elementsPrototypes.combination.elementPrototype}
                }
                
               
                nfrac.children[0].children=cloneDeep(texToElements(parts[i+1]))
                nfrac.children[1].children=cloneDeep(texToElements(parts[i+2]))
                if(expr.content==='' || expr.content===' '){
                    elements=[...elements, nfrac]
                }else{
                    elements=[...elements, expr, nfrac]
                }
                i=i+3
                continue
            }
            // if(parts[i].includes('\\sum')){
            //     let nsum={...elementsPrototypes.sum.elementPrototype}
            //      let tmp =parts[i].split('\\sum')
            //      let expr={...elementsPrototypes.expression.elementPrototype}
            //     expr.content=tmp[0]
            //      if(tmp[1]==='^'){
            //          nsum.children[0].children=texToElements(parts[i+1])
            //          nsum.children[1].children=texToElements(parts[i+3])
            //          //console.log(parts[i+3])
            //      }else{
                     
            //          nsum.children[1].children=texToElements(parts[i+1])
            //          nsum.children[0].children=texToElements(parts[i+3])
            //      }
            //      if(expr.content==='' || expr.content===' '){
            //         elements=[...elements,  nsum]
            //     }else{
            //         elements=[...elements, expr,  nsum]
            //     }
            //      //elements=[...elements,expr, nsum]
            //      i=i+4
            //      continue
            // }

            // if(parts[i].includes('\\int')){
            //     let nint={...elementsPrototypes.integral.elementPrototype}
            //     let tmp =parts[i].split('\\int')
            //     let expr={...elementsPrototypes.expression.elementPrototype}
            //    expr.content=tmp[0]
            //     if(tmp[1]==='^'){
            //        nint.children[0].children=texToElements(parts[i+1])
            //        nint.children[1].children=texToElements(parts[i+3])
            //         //console.log(parts[i+3])
            //     }else{
                    
            //        nint.children[1].children=texToElements(parts[i+1])
            //        nint.children[0].children=texToElements(parts[i+3])
            //     }
            //     if(expr.content==='' || expr.content===' '){
            //        elements=[...elements,  nint]
            //    }else{
            //        elements=[...elements, expr,  nint]
            //    }
            //     //elements=[...elements,expr, nsum]
            //     i=i+4
            //     continue
            // }
            // if(parts[i].includes('\\oint')){
            //     let nint={...elementsPrototypes.lineIntegral.elementPrototype}
            //      let tmp =parts[i].split('\\oint')
            //      let expr={...elementsPrototypes.expression.elementPrototype}
            //     expr.content=tmp[0]
            //      if(tmp[1]==='^'){
            //         nint.children[0].children=texToElements(parts[i+1])
            //         nint.children[1].children=texToElements(parts[i+3])
            //          //console.log(parts[i+3])
            //      }else{
                     
            //         nint.children[1].children=texToElements(parts[i+1])
            //         nint.children[0].children=texToElements(parts[i+3])
            //      }
            //      if(expr.content==='' || expr.content===' '){
            //         elements=[...elements,  nint]
            //     }else{
            //         elements=[...elements, expr,  nint]
            //     }
            //      //elements=[...elements,expr, nsum]
            //      i=i+4
            //      continue
            // }
            if(parts[i].includes('\\sqrt')){
                let indexAndExpr=parts[i].split('\\sqrt')
                console.log('indx&expr: ',indexAndExpr)
                
                let expr={...elementsPrototypes.expression.elementPrototype}
                expr.content=texToElementsSpecialCHaractersConvertion(indexAndExpr[0])
                const index=indexAndExpr[1].replaceAll(']','').replaceAll('[','')
                
                let nfrac={...elementsPrototypes.root.elementPrototype}
                nfrac.children[0].children=cloneDeep(texToElements(index))
                nfrac.children[1].children=cloneDeep(texToElements(parts[i+1]))
                if(expr.content==='' || expr.content===' '){
                    elements=[...elements, nfrac]
                }else{
                    elements=[...elements, expr, nfrac]
                }
                i=i+2
                continue
            }
            // if(parts[i].includes('\\prod')){
            //     let nsum={...elementsPrototypes.product.elementPrototype}
            //      let tmp =parts[i].split('\\prod')
            //      let expr={...elementsPrototypes.expression.elementPrototype}
            //     expr.content=tmp[0]
            //      if(tmp[1]==='^'){
            //          nsum.children[0].children=texToElements(parts[i+1])
            //          nsum.children[1].children=texToElements(parts[i+3])
            //          //console.log(parts[i+3])
            //      }else{
                     
            //          nsum.children[1].children=texToElements(parts[i+1])
            //          nsum.children[0].children=texToElements(parts[i+3])
            //      }
            //      if(expr.content==='' || expr.content===' '){
            //         elements=[...elements,  nsum]
            //     }else{
            //         elements=[...elements, expr,  nsum]
            //     }
            //      //elements=[...elements,expr, nsum]
            //      i=i+4
            //      continue
            // }
            if(parts[i].includes('\\lim')){
                let expr={...elementsPrototypes.expression.elementPrototype}
                expr.content=texToElementsSpecialCHaractersConvertion(parts[i].replace('\\lim', '').replace('_', ''))
                
                let nfrac={...elementsPrototypes.limes.elementPrototype}
                nfrac.children[0].children=cloneDeep(texToElements(parts[i+1]))
                if(expr.content==='' || expr.content===' '){
                    elements=[...elements, nfrac]
                }else{
                    elements=[...elements, expr, nfrac]
                }
                i=i+2
                continue
            }
            if( parts[i].includes('\\int')
                ||parts[i].includes('\\oint') 
                ||parts[i].includes('\\sum') 
                ||parts[i].includes('\\prod') 
                ||parts[i].includes('\\bigcup') 
                || parts[i].includes('\\bigcap')
                || parts[i].includes('\\bigvee')
                || parts[i].includes('\\bigwedge')){
                    console.log('part: ', i, ' - ',parts[i])
                let nsum
                let tmp
                if(parts[i].includes('\\int')){
                    nsum={...elementsPrototypes.integral.elementPrototype}
                    tmp =parts[i].split('\\int')
                }
                if(parts[i].includes('\\oint')){
                    nsum={...elementsPrototypes.lineIntegral.elementPrototype}
                    tmp =parts[i].split('\\oint')
                }
                if(parts[i].includes('\\sum')){
                    nsum={...elementsPrototypes.sum.elementPrototype}
                    tmp =parts[i].split('\\sum')
                }
                if(parts[i].includes('\\prod')){
                    nsum={...elementsPrototypes.product.elementPrototype}
                    tmp =parts[i].split('\\prod')
                }
                if(parts[i].includes('\\bigcup')){
                    nsum={...elementsPrototypes.bigUnion.elementPrototype}
                    tmp =parts[i].split('\\bigcup')
                }
                if(parts[i].includes('\\bigcap')){
                    nsum={...elementsPrototypes.bigIntersection.elementPrototype}
                    tmp =parts[i].split('\\bigcap')
                }
                if(parts[i].includes('\\bigvee')){
                    nsum={...elementsPrototypes.bigDisjunction.elementPrototype}
                    tmp =parts[i].split('\\bigvee')
                }
                if(parts[i].includes('\\bigwedge')){
                    nsum={...elementsPrototypes.bigConjunction.elementPrototype}
                    tmp =parts[i].split('\\bigwedge')
                }
                let expr={...elementsPrototypes.expression.elementPrototype}
                   expr.content=texToElementsSpecialCHaractersConvertion(tmp[0])
                    if(tmp[1]==='^'){
                        nsum.children[0].children=texToElements(parts[i+1])
                        nsum.children[1].children=texToElements(parts[i+3])
                        //console.log(parts[i+3])
                    }else{
                        
                        nsum.children[1].children=texToElements(parts[i+1])
                        nsum.children[0].children=texToElements(parts[i+3])
                    }
                    if(expr.content==='' || expr.content===' '){
                       elements=[...elements,  nsum]
                       //console.log('yolo')
                   }else{
                       elements=[...elements, expr,  nsum]
                       //console.log('yolo2')
                   }
                    //elements=[...elements,expr, nsum]
                    i=i+4
                    continue
            }
             if(parts[i].includes('\\left.\\begin')){
                 console.log('actual i:', i)
                  console.log('part[i]:', parts[i])
                let expr={...elementsPrototypes.expression.elementPrototype}
                //let tmp=parts[i].split()
                expr.content=texToElementsSpecialCHaractersConvertion(parts[i].replace('\\left.\\begin', ''))
                let nfrac
                //console.log('i+2: ', parts[i+2])
                if(parts[i+2]==='ll'){
                   if(parts[i+4]==='&'){
                        
                        nfrac=cloneDeep(elementsPrototypes.row2ElementsLeft.elementPrototype)
                        nfrac.children[0].children=cloneDeep(texToElements(parts[i+3]))
                        nfrac.children[1].children=cloneDeep(texToElements(parts[i+5]))
                    }else{
                        nfrac=cloneDeep(elementsPrototypes.column2ElementsLeft.elementPrototype)
                        nfrac.children[0].children=cloneDeep(texToElements(parts[i+3]))
                        nfrac.children[1].children=cloneDeep(texToElements(parts[i+5]))
            }
                }
                if(parts[i+2]==='lll'){
                    if(parts[i+4]==='&' && parts[i+6]==='&'){
                        
                        nfrac=cloneDeep(elementsPrototypes.row3ElementsLeft.elementPrototype)
                        nfrac.children[0].children=cloneDeep(texToElements(parts[i+3]))
                        nfrac.children[1].children=cloneDeep(texToElements(parts[i+5]))
                        nfrac.children[2].children=cloneDeep(texToElements(parts[i+7]))
                    }else{
                        nfrac=cloneDeep(elementsPrototypes.column3ElementsLeft.elementPrototype)
                        nfrac.children[0].children=cloneDeep(texToElements(parts[i+3]))
                        nfrac.children[1].children=cloneDeep(texToElements(parts[i+5]))
                        nfrac.children[2].children=cloneDeep(texToElements(parts[i+7]))
            }
                }
                if(parts[i+2]==='cc'){
                      if(parts[i+4]==='&'){
                        nfrac=cloneDeep(elementsPrototypes.row2ElementsCenter.elementPrototype)
                        nfrac.children[0].children=cloneDeep(texToElements(parts[i+3]))
                        nfrac.children[1].children=cloneDeep(texToElements(parts[i+5]))
                    }else{
                        nfrac=cloneDeep(elementsPrototypes.column2ElementsCenter.elementPrototype)
                        nfrac.children[0].children=cloneDeep(texToElements(parts[i+3]))
                        nfrac.children[1].children=cloneDeep(texToElements(parts[i+5]))
            }
                }
                if(parts[i+2]==='ccc'){
                    if(parts[i+4]==='&' && parts[i+6]==='&'){
                        
                        nfrac=cloneDeep(elementsPrototypes.row3ElementsCenter.elementPrototype)
                        nfrac.children[0].children=cloneDeep(texToElements(parts[i+3]))
                        nfrac.children[1].children=cloneDeep(texToElements(parts[i+5]))
                        nfrac.children[2].children=cloneDeep(texToElements(parts[i+7]))
                    }else{
                        nfrac=cloneDeep(elementsPrototypes.column3ElementsCenter.elementPrototype)
                        nfrac.children[0].children=cloneDeep(texToElements(parts[i+3]))
                        nfrac.children[1].children=cloneDeep(texToElements(parts[i+5]))
                        nfrac.children[2].children=cloneDeep(texToElements(parts[i+7]))
            }
                }
               
                if(parts[i+2]!=='ll' && parts[i+2]!=='lll' && parts[i+2]!=='cc' && parts[i+2]!=='ccc'){
                    console.log('not a latex array')
                    nfrac={...elementsPrototypes.expression.elementPrototype}
                    nfrac.content=parts[i]
                    i++
                }else{
                    if(parts[i+2]==='cc' || parts[i+2]==='ll'){
                         parts[i+8]=parts[i+8].replace('\\right.', '')
                         console.log('right erased 2')
                         i+=8
                    }else{
                         parts[i+10]=parts[i+10].replace('\\right.', '')
                          i+=10
                           console.log('right erased 3')
                    }              
                }
                if(expr.content==='' || expr.content===' ' || expr.content===undefined ){
                    elements=[...elements, cloneDeep(nfrac)]
                }else{
                    elements=[...elements, expr, cloneDeep(nfrac)]
                }
                continue
             }
             if(parts[i].endsWith('\\left\\lbrace')){
                let nfrac
                let  expr={...elementsPrototypes.expression.elementPrototype}
                if(parts[i+2].startsWith('\\right.')){
                    
                    expr.content=texToElementsSpecialCHaractersConvertion(parts[i].replace('\\left\\lbrace', ''))
                    nfrac={...elementsPrototypes.bigLeftCurlyBracket.elementPrototype}
                    nfrac.children[0].children=cloneDeep(texToElements(parts[i+1]))
                    parts[i+2]=parts[i+2].replace('\\right.', '')
                }else{
                if(parts[i+2].startsWith('\\right\\rbrace')){
                   
                    expr.content=texToElementsSpecialCHaractersConvertion(parts[i].replace('\\left\\lbrace', ''))
                    nfrac={...elementsPrototypes.bigCurlyBrackets.elementPrototype}
                    nfrac.children[0].children=cloneDeep(texToElements(parts[i+1]))
                    parts[i+2]=parts[i+2].replace('\\right\\rbrace', '')
                }else{
                    nfrac={...elementsPrototypes.expression.elementPrototype}
                    nfrac.content=texToElementsSpecialCHaractersConvertion(parts[i+1])
                }
            }
                if(expr.content==='' || expr.content===' '){
                    elements=[...elements, nfrac]
                }else{
                    elements=[...elements, expr, nfrac]
                }
                i+=2
                continue
             }
             if(parts[i].endsWith('\\left(')){
                let nfrac
                let expr={...elementsPrototypes.expression.elementPrototype}
                if(parts[i+2].startsWith('\\right.')){
                    
                    expr.content=texToElementsSpecialCHaractersConvertion(parts[i].replace('\\left(', ''))
                    nfrac={...elementsPrototypes.bigLeftRegularBracket.elementPrototype}
                    nfrac.children[0].children=cloneDeep(texToElements(parts[i+1]))
                    parts[i+2]=parts[i+2].replace('\\right.', '')
                }else{
                if(parts[i+2].startsWith('\\right)')){
                   
                    expr.content=texToElementsSpecialCHaractersConvertion(parts[i].replace('\\left(', ''))
                    nfrac={...elementsPrototypes.bigRegularBrackets.elementPrototype}
                    nfrac.children[0].children=cloneDeep(texToElements(parts[i+1]))
                    parts[i+2]=parts[i+2].replace('\\right)', '')
                }else{
                    nfrac={...elementsPrototypes.expression.elementPrototype}
                    nfrac.content=texToElementsSpecialCHaractersConvertion(parts[i+1])
                }
            }
                if(expr.content==='' || expr.content===' '){
                    elements=[...elements, nfrac]
                }else{
                    elements=[...elements, expr, nfrac]
                }
                i+=2
                continue
             }
             if(parts[i].endsWith('\\left[')){
                let nfrac
                let expr={...elementsPrototypes.expression.elementPrototype}
                if(parts[i+2].startsWith('\\right.')){
                    
                    expr.content=texToElementsSpecialCHaractersConvertion(parts[i].replace('\\left[', ''))
                    nfrac={...elementsPrototypes.bigLeftSquareBracket.elementPrototype}
                    nfrac.children[0].children=cloneDeep(texToElements(parts[i+1]))
                    parts[i+2]=parts[i+2].replace('\\right.', '')
                }else{
                if(parts[i+2].startsWith('\\right]')){
                   
                    expr.content=texToElementsSpecialCHaractersConvertion(parts[i].replace('\\left[', ''))
                    nfrac={...elementsPrototypes.bigSquareBrackets.elementPrototype}
                    nfrac.children[0].children=cloneDeep(texToElements(parts[i+1]))
                    parts[i+2]=parts[i+2].replace('\\right]', '')
                }else{
                    nfrac={...elementsPrototypes.expression.elementPrototype}
                    nfrac.content=texToElementsSpecialCHaractersConvertion(parts[i+1])
                }
            }
                if(expr.content==='' || expr.content===' '){
                    elements=[...elements, nfrac]
                }else{
                    elements=[...elements, expr, nfrac]
                }
                i+=2
                continue
             }
             if(parts[i].endsWith('\\left.')){
                let nfrac
                let expr={...elementsPrototypes.expression.elementPrototype}
                expr.content=texToElementsSpecialCHaractersConvertion(parts[i].replace('\\left', ''))
                if(parts[i+2].startsWith('\\right}')){
                    nfrac={...elementsPrototypes.bigRightCurlyBracket.elementPrototype}
                    nfrac.children[0].children=cloneDeep(texToElements(parts[i+1]))
                }
                if(parts[i+2].startsWith('\\right)')){
                    nfrac={...elementsPrototypes.bigRightRegularBracket.elementPrototype}
                    nfrac.children[0].children=cloneDeep(texToElements(parts[i+1]))
                }
                if(parts[i+2].startsWith('\\right]')){
                    nfrac={...elementsPrototypes.bigRightSquareBracket.elementPrototype}
                    nfrac.children[0].children=cloneDeep(texToElements(parts[i+1]))
                }
                if(expr.content==='' || expr.content===' '){
                    elements=[...elements, nfrac]
                }else{
                    elements=[...elements, expr, nfrac]
                }
                i+=2
                continue

             }
            if(parts[i].endsWith('^')){
                let expr={...elementsPrototypes.expression.elementPrototype}
                expr.content=texToElementsSpecialCHaractersConvertion(parts[i].replace('^', ''))
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
                expr.content=texToElementsSpecialCHaractersConvertion(parts[i].replace('_', ''))
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
            
            if(parts[i]!=='' || parts[i]!==' '){
            let expr={...elementsPrototypes.expression.elementPrototype}
            expr.content=texToElementsSpecialCHaractersConvertion(parts[i])
            elements=[...elements,expr]
            }
           
            
            
        //TODO
        //i++
            
        }catch(e){
            console.log('texToElements conversion error (in loop): ', e)
            let expr={...elementsPrototypes.expression.elementPrototype}
            expr.content=texToElementsSpecialCHaractersConvertion(parts[i])
            elements=[...elements,expr]
        }
        i++
    }
        elements=elements.filter((ele)=>{if((ele!==undefined || ele!==null) && ele.label==='Expression'){
            const unikatowe= new Set(ele.content)
            if(ele.content==='' || (unikatowe.size===1 && unikatowe.has(' '))){
                return false
            }
        } 
            return true
        })
        return elements
    }
        if(originalString===undefined ){
            return null
        }
        let expr={...elementsPrototypes.expression.elementPrototype}
        expr.content=texToElementsSpecialCHaractersConvertion(originalString)
        return [expr]
    }catch(e){
        console.log('texToElements conversion error (in loop): ', e)
        let expr={...elementsPrototypes.expression.elementPrototype}
        expr.content=texToElementsSpecialCHaractersConvertion(originalString)
        return [expr]

    }
    }
    

export const texToElementsSpecialCHaractersConvertion=(originalString: string):string=>{
    let converterString=originalString

    converterString=converterString.replaceAll('\\ ', ' ')
    for(let i =0; i<specialCharacters.length; i++){
        for(let j=0; j<specialCharacters[i].group.length; j++){
            converterString=converterString.replaceAll(specialCharacters[i].group[j].latexRepresentation, specialCharacters[i].group[j].value)
        }
    }
    return converterString
}