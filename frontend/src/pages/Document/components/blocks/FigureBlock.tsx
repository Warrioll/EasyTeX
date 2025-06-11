import { Editor } from "@tiptap/react";
import { blockType } from "@/Types";
import { Dispatch, SetStateAction } from "react";
import { Flex, Button, Modal, Text, Group, Center } from "@mantine/core";
import MarkedBlockFrame from "./blocksComponents/MarkedBlockFrame";
import BasicTexfield from "./blocksComponents/basicTextfield";
import { useDisclosure } from '@mantine/hooks';
import '@mantine/dropzone/styles.css';
import { FaRegImage } from "react-icons/fa6";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';


type FigureBlockProps = {
   idx: number;
  activeBlockState: [number, Dispatch<SetStateAction<number>>];
  activeTextInputState: [string, Dispatch<SetStateAction<string>>];
  blocksContentState: [blockType[], Dispatch<SetStateAction<blockType[]>>];
  editor: Editor;
};

export default function FigureBlock({
  idx,
  activeBlockState,
  blocksContentState,
  editor,
  activeTextInputState,
}: FigureBlockProps){
          const [blocksContent, setBlocksContent] = blocksContentState;
       const [opened, { open, close }] = useDisclosure(false);


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
                        {//TODO
                         <Button variant="default" onClick={open}>
                            Upload
                         </Button>
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
                  <Modal opened={opened} onClose={close} title="Upload figure" transitionProps={{ transition: 'fade-up' }}
        yOffset="3.5%"
        size="60vw">
                   <Dropzone
      onDrop={(files) => console.log('accepted files', files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      //{...props}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
         Image
        </Dropzone.Accept>
        <Dropzone.Reject>
          X
        </Dropzone.Reject>
        <Dropzone.Idle >
          <Center fz='3rem' c="var(--mantine-color-gray-5)"><FaRegImage /></Center>
         
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
      </Modal>
            </div>)
}