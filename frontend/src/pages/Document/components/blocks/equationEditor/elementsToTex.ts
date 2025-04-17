export function elementsToTex(array:any):string{
    let formula:string ='';

    for (let i=0; i<array.length ; i++){
        switch(array[i].label){
            case 'Expression':
                formula+=array[i].content
                break;
            case 'Fraction':
                formula+=`\\frac{${elementsToTex(array[i].children[0].children)}}{${elementsToTex(array[i].children[1].children)}}`   
                break;
            case 'Integral':
                formula+=`\\int^{${elementsToTex(array[i].children[0].children)}}_{${elementsToTex(array[i].children[1].children)}}`   
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
            case 'Sum':
                formula+=`$\\sum^{${elementsToTex(array[i].children[0].children)}}_{${elementsToTex(array[i].children[1].children)}}`   
                break;
            default:
                break;
        }
    }



    return formula;
}


export function texToelements(formula:string):any{
return ''

}