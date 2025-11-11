import { blockAbleToRef, blockType, typeOfBlockType } from "@/Types"
import { cloneDeep } from "lodash"
import { useActiveBlockContext, useBlocksContentContext } from "../DocumentContextProviders"




  export const useAddBlock = (): {addBlock: (block: blockType, distanceFromMarkedBlock:number)=>void} => {

    const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();
    const { activeBlock, setActiveBlock } = useActiveBlockContext();

    const addBlock =(block: blockType, distanceFromMarkedBlock:number)=>{
  
      const getAvailableIdNumberForBlockRefId = (
      typeOfBlock: typeOfBlockType,
      idPrefix: string
    ): number => {
      const assignedNumbers: number[] = [];
      for (const block of blocksContent) {
        if (block.typeOfBlock === typeOfBlock) {
          assignedNumbers.push(Number(block.blockContent.id.replace(idPrefix, '')));
        }
      }
      let counter = 1;
      while (assignedNumbers.includes(counter)) {
        counter++;
      }
      return counter;
    };

    switch(block.typeOfBlock){
      case 'equation':
        (block.blockContent as blockAbleToRef).id =
              `eq${getAvailableIdNumberForBlockRefId('equation', 'eq').toString()}`;
      break;
            case 'figure':
        (block.blockContent as blockAbleToRef).id =
              `img${getAvailableIdNumberForBlockRefId('figure', 'img').toString()}`;
      break;
            case 'table':
        (block.blockContent as blockAbleToRef).id =
              `tab${getAvailableIdNumberForBlockRefId('table', 'tab').toString()}`;
      break;
    }



    let blocks = cloneDeep(blocksContent);
    blocks.splice(activeBlock + distanceFromMarkedBlock, 0, cloneDeep(block));
    setBlocksContent(blocks);
    if(distanceFromMarkedBlock!==0){
      setActiveBlock(activeBlock + distanceFromMarkedBlock);
     
    }
     setIsNotSaved(true)
    }

    
    return {addBlock}
  };

  export const useEditTextfields = (): {editTextfields: (toReplace:string, replacement: string)=>blockType[]}=>{

    const { blocksContent, setBlocksContent } = useBlocksContentContext();

    const editTextfields = (toReplace:string, replacement: string) => {
    const blocksContentCopy = cloneDeep(blocksContent);
    for( const block of blocksContentCopy){
        switch (block.typeOfBlock) {
      case 'documentclass':
        break
      case 'equation':
          break
      case 'tableOfContents':
        break
      case 'pageBreak':
        break
      case 'figure':
        break
      case 'titlePage':
          block.blockContent.title=block.blockContent.title.replaceAll(toReplace, replacement)
           block.blockContent.author=block.blockContent.author.replaceAll(toReplace, replacement)
          block.blockContent.date=block.blockContent.date.replaceAll(toReplace, replacement)
        break;
      case 'table':
        block.blockContent.label=block.blockContent.label.replaceAll(toReplace, replacement)
        for (const r of block.blockContent.content){
          for(let i=0; i<r.length ; i++){
            r[i]=r[i].replaceAll(toReplace, replacement)
          }
        }
        break;
      case 'references':
         for (const r of block.blockContent){
            r.label=r.label.replaceAll(toReplace, replacement)          
        }
        break;
      default:
        block.blockContent=block.blockContent.replaceAll(toReplace, replacement);
        break;
    }
    }
    return blocksContentCopy;
  };

  return {editTextfields}
  }

  // export const useGetAvailableIdNumberForBlockRefId = (): {getAvailableIdNumberForBlockRefId: ( typeOfBlock: typeOfBlockType,
  //     idPrefix: string
  //   ) =>number } => {

  //      const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();
  //  const getAvailableIdNumberForBlockRefId = (
  //     typeOfBlock: typeOfBlockType,
  //     idPrefix: string
  //   ): number => {
  //     const assignedNumbers: number[] = [];
  //     for (const block of blocksContent) {
  //       if (block.typeOfBlock === typeOfBlock) {
  //         assignedNumbers.push(Number(block.blockContent.id.replace(idPrefix, '')));
  //       }
  //     }
  //     //assignedNumbers.sort();
  //     let counter = 1;
  //     while (assignedNumbers.includes(counter)) {
  //       counter++;
  //     }
  //     return counter;
  //   };
  // return {getAvailableIdNumberForBlockRefId}
  // }


