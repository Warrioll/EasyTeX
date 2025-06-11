import { Editor } from "@tiptap/react";
import { blockType } from "@/Types";
import { Dispatch, SetStateAction } from "react";
import { Flex, Modal, Button } from "@mantine/core";
import MarkedBlockFrame from "./blocksComponents/MarkedBlockFrame";
import BasicTexfield from "./blocksComponents/basicTextfield";
import { useDisclosure } from '@mantine/hooks';

type TableBlockProps = {
   idx: number;
  activeBlockState: [number, Dispatch<SetStateAction<number>>];
  activeTextInputState: [string, Dispatch<SetStateAction<string>>];
  blocksContentState: [blockType[], Dispatch<SetStateAction<blockType[]>>];
  editor: Editor;
};

export default function TableBlock({
  idx,
  activeBlockState,
  blocksContentState,
  editor,
  activeTextInputState,
}: TableBlockProps){
      const [blocksContent, setBlocksContent] = blocksContentState;
      

     
    return( <div
        >
          <Flex>  
            <MarkedBlockFrame
              idx={idx}
              activeBlockState={activeBlockState}
              blockName="Table"
              sectionsContent={blocksContent}
              setSectionsContent={setBlocksContent}
              activeTextInputState={activeTextInputState}
            >
                <Flex align='center'>    
                    table
                    {//TODO
                    
                    }     
              {/* <BasicTexfield
                idx={idx}
                activeBlockState={activeBlockState}
                contentToRead={blocksContent[idx].blockContent as string}
                editor={editor}
                activeTextInputState={activeTextInputState}
                idxInput={idx.toString()}
                sectionsContent={blocksContent}
                setSectionsContent={setBlocksContent}
              /> */}
              </Flex> 
            </MarkedBlockFrame>
          </Flex>
        </div>)
}