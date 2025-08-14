import { useState } from "react"
import { blockType } from "@/Types"
import { cloneDeep } from "lodash"
import { useActiveBlockContext, useBlocksContentContext } from "./DocumentContextProviders"

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

  export const useAddBlock = (): {addBlock: (block: blockType, distanceFromMarkedBlock:number)=>void} => {

    const { blocksContent, setBlocksContent } = useBlocksContentContext();
    const { activeBlock, setActiveBlock } = useActiveBlockContext();

    const addBlock =(block: blockType, distanceFromMarkedBlock:number)=>{


    let blocks = cloneDeep(blocksContent);
    blocks.splice(activeBlock + distanceFromMarkedBlock, 0, cloneDeep(block));
    setBlocksContent(blocks);
    if(distanceFromMarkedBlock!==0){
      setActiveBlock(activeBlock + distanceFromMarkedBlock);
    }
    }

    
    return {addBlock}
  };


  // export const saveBasicTextInputChanges = (idx: number, idxInput: string, sectionsContentState: any, toSave: string) => {
  //   const [sectionsContent, setSectionsContent] = sectionsContentState
  //   let sectionsContentCopy = sectionsContent;
  //   switch (sectionsContent[idx].typeOfBlock) {
  //     case 'titlePage':
  //       //console.log('titlePageeee');
  //       if (idxInput.includes('title')) {
  //         sectionsContentCopy[idx].blockContent.title = toSave;
  //       }
  //       if (idxInput.includes('author')) {
  //         sectionsContentCopy[idx].blockContent.author = toSave;
  //       }
  //       if (idxInput.includes('date')) {
  //         sectionsContentCopy[idx].blockContent.date = toSave;
  //       }
  //       break;
  //        case 'table':
  //       //console.log('table on blur save');
  //       const tmp = idxInput.split(';');
  //       const cellId=[tmp[0], tmp[1], tmp[2]]   //0 - id tabeli, 1 - rows, 2- columns
  //       sectionsContentCopy[idx].blockContent[cellId[1]-1][cellId[2]-1] = toSave;
  //       break;
  //     default:
  //       //console.log('default on blur save');
  //       sectionsContentCopy[idx].blockContent = toSave;
  //       break;
  //   }
  //   setSectionsContent(sectionsContentCopy);
  // };

  //   export const saveBasicTextInputChangesTitlePage = (idx: number, idxInput: string, sectionsContentState: any, toSave: string) => {
  //   const [sectionsContent, setSectionsContent] = sectionsContentState
  //   let sectionsContentCopy = sectionsContent;
  //   switch (sectionsContent[idx].typeOfBlock) {
  //     case 'titlePage':
  //       //console.log('titlePageeee');
  //       if (idxInput.includes('title')) {
  //         sectionsContentCopy[idx].blockContent.title = toSave;
  //       }
  //       if (idxInput.includes('author')) {
  //         sectionsContentCopy[idx].blockContent.author = toSave;
  //       }
  //       if (idxInput.includes('date')) {
  //         sectionsContentCopy[idx].blockContent.date = toSave;
  //       }
  //       break;
  //        case 'table':
  //       //console.log('table on blur save');
  //       const tmp = toSave.split(';');
  //       const cellId=[tmp[0], tmp[1], tmp[2]]   //0 - id tabeli, 1 - rows, 2- columns
  //       sectionsContentCopy[idx].blockContent[cellId[1]][cellId[2]] = toSave;
  //       break;
  //     default:
  //       //console.log('default on blur save');
  //       sectionsContentCopy[idx].blockContent = toSave;
  //       break;
  //   }
  //   setSectionsContent(sectionsContentCopy);
  // };


