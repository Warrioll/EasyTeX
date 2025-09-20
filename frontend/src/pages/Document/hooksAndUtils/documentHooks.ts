import { useState } from "react"
import { blockType, documentClassType } from "@/Types"
import { cloneDeep } from "lodash"
import { useActiveBlockContext, useBlocksContentContext } from "../DocumentContextProviders"
import { chceckIfBlockContentEmpty } from "./documentUtils"
import axios from "axios"
import { AxiosResponse } from "axios"


  export const useAddBlock = (): {addBlock: (block: blockType, distanceFromMarkedBlock:number)=>void} => {

    const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();
    const { activeBlock, setActiveBlock } = useActiveBlockContext();

    const addBlock =(block: blockType, distanceFromMarkedBlock:number)=>{


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
    //console.log(activeBlock, blocksContent[activeBlock]);
    //console.log('container', activeBlockContainer);
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
        //block.blockContent.label=block.blockContent.label.replaceAll(toReplace, replacement)
        break
      case 'titlePage':
          block.blockContent.title=block.blockContent.title.replaceAll(toReplace, replacement)
           block.blockContent.author=block.blockContent.author.replaceAll(toReplace, replacement)
          block.blockContent.date=block.blockContent.date.replaceAll(toReplace, replacement)
        break;
      case 'table':
        block.blockContent.label=block.blockContent.label.replaceAll(toReplace, replacement)
        //console.log('tab', block.blockContent.content)
        for (const r of block.blockContent.content){
          //console.log('editTextfields r', r)
          for(let i=0; i<r.length ; i++){
            //console.log('editTextfields c before', r[i])
            r[i]=r[i].replaceAll(toReplace, replacement)
            //console.log('editTextfields cafter', r[i])
          }
        }
        break;
      case 'references':
       /// console.log(' editing references')
         for (const r of block.blockContent){
            //console.log(r)
            r.label=r.label.replaceAll(toReplace, replacement)
            //console.log(' replaceeee: ', r.label.replaceAll(toReplace, replacement))
          
        }
        break;
      default:
        block.blockContent=block.blockContent.replaceAll(toReplace, replacement);
        break;
    }
    }
    return blocksContentCopy;
    //console.log('textfield edited')
  };

  return {editTextfields}
  }


//   export const useSaveDocumentContent = (): {saveDocumentContent: ()=>AxiosResponse<any, any>} =>{

//  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();

//   const saveDocumentContent = async () => {
//       try {
//         const blocks = blocksContent.filter((block) => {
//           switch (block.typeOfBlock) {
//             case 'titlePage':
//               if (
//                 chceckIfBlockContentEmpty(block.blockContent.title as string) &&
//                 chceckIfBlockContentEmpty(block.blockContent.author as string) &&
//                 chceckIfBlockContentEmpty(block.blockContent.date as string)
//               ) {
//                 return false;
//               }
//               return true;
//             case 'equation':
//               //return chceckIfBlockContentEmpty(block.blockContent.label as string);
//               return true;
//             // case 'figure':
//             //   return chceckIfBlockContentEmpty(block.blockContent.label as string);
//             //   case 'equation':
//             //   return chceckIfBlockContentEmpty(block.blockContent.label as string);
//             case 'references':
//               //FIXME - sprawdzanie czy nie są puste
//               return true;
//             case 'tableOfContents':
//               return true;
//             case 'pageBreak':
//               return true;
//             case 'figure':
//               //TODO
//               return true;
//             case 'table':
//               //FIXME - sprawdzanie czy nie są puste
//               //return chceckIfBlockContentEmpty(block.blockContent.label as string);
//               return true;
//             default:
//               return !chceckIfBlockContentEmpty(block.blockContent);
//           }
//         });
  
//         const response = await axios.put(
//           `http://localhost:8100/document/documentContent/${id}`,
//           blocks,
//           { withCredentials: true }
//         );
//         return response
//         // if (response.status === 200) {
//         //   const reload = await setPdfFile();
//         //   setIsNotSaved(false);
//         // }

//       } catch (error) {
//         throw error
//         //return null
//         console.log('save and reaload error:', error, 'blocks: ', blocksContent);
//       }
//     };
//     return {saveDocumentContent}
//   }

