import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { Badge, Button, Flex, FocusTrap, Group, Input, Menu, Text } from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';
import BasicTexfield from './blocksComponents/basicTextfield';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import styles from './blocks.module.css';

type SectionBlockProps = {
  idx: number;
  activeBlockState: [number, Dispatch<SetStateAction<number>>];
  activeTextInputState: [string, Dispatch<SetStateAction<string>>];
  //activeSection: number;
  //setActiveSecion: Dispatch<SetStateAction<number>>;
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
  editor: Editor;
  
};

export default function SectionBlock({
  idx,
  activeBlockState,
  activeTextInputState,
  //activeSection,
  //setActiveSecion,
  sectionsContent,
  setSectionsContent,
  editor,
}: SectionBlockProps) {
  const [focusTrap, { toggle }] = useDisclosure(false);
  const [activeBlock, setActiveBlock] = activeBlockState;
  const [sectionNumber, setSectionNumber]=useState<string>('')

  // const updateSectionContent = (event) => {
  //   console.log('section event', event);
  //   let content = [...sectionsContent];
  //   console.log('section  event.target.value', event.target.value);
  //   //content[idx].blockContent = event.target.value;
  //   content[idx] = {
  //     ...content[idx],
  //     //blockContent: { idx: 1, sectionContent: event.target.value },
  //     blockContent: event.target.value,
  //   };
  //   console.log('section content[idx].blockContent', content[idx].blockContent);
  //   setSectionsContent(content);
  // };

  useEffect(()=>{
    let sectionCounter=0
    for(let i=0; i<sectionsContent.length; i++){
      if(sectionsContent[i].typeOfBlock==='section'){
        sectionCounter+=1
      }
      if(i===idx){
        setSectionNumber(sectionCounter.toString()+'.')
        break
      }
    }
  },[activeBlock])

  return (
    <>
      {
        //     idx===activeSection ?
        //     <Group justify="space-between">
        //   <Badge color="cyan" radius="md" variant='transparent' >Header 1</Badge>
        //  <Flex>
        //   <Button variant='format'><FaRegTrashAlt/></Button>
        //   <Menu>
        //     <Menu.Target><Button variant='format'><FiMoreHorizontal/></Button></Menu.Target>
        //     <Menu.Dropdown>
        //     <Menu.Item leftSection={<FiMoreHorizontal />}>
        //       Settings
        //     </Menu.Item>
        //     </Menu.Dropdown>
        //   </Menu>
        //  </Flex>
        //   </Group>
        //   :
        //   <></>
      }

      <Flex>
        {
          //sectionsContent[idx].blockContent.idx //typ zrobić dla blockContent to może nie będzie errorów
        }
        <MarkedBlockFrame
          idx={idx}
          activeBlockState={activeBlockState}
          blockName="Section"
          sectionsContent={sectionsContent}
          setSectionsContent={setSectionsContent}
          activeTextInputState={activeTextInputState}
        >
          {/* {activeSection === idx ? (
            // <RichTextEditor editor={editor}>
            //   <RichTextEditor.Content />
            // </RichTextEditor>
            <FocusTrap active={focusTrap}>
              <EditorContent editor={editor} />
            </FocusTrap>
          ) : sectionsContent[idx].blockContent ? (
            <div className={styles.textfieldNotFocused}>
              {parse(sectionsContent[idx].blockContent as string)}
            </div>
          ) : null} */}
          <Flex align='center'>
          <Text fz='xl'fw='bold' ml='xl'>{sectionNumber}</Text>
          <BasicTexfield
            idx={idx}
            activeBlockState={activeBlockState}
            contentToRead={sectionsContent[idx].blockContent as string}
            editor={editor}
            activeTextInputState={activeTextInputState}
            idxInput={idx.toString()}
            sectionsContent={sectionsContent}
            setSectionsContent={setSectionsContent}
            
          />
          </Flex>
          {/* <FocusTrap active={focusTrap}>
            <Input
              radius="md"
              placeholder="Header..."
              variant="header1"
              value={
                sectionsContent[idx].blockContent === undefined
                  ? ''
                  : sectionsContent[idx].blockContent
                //sectionsContent[idx].blockContent.sectionContent === undefined ? '' : sectionsContent[idx].blockContent.sectionContent
              }
              onChange={(event) => updateSectionContent(event)}
              w="100%"
              style={{ borderRadius: 'var(--mantine-radius-md)' }}
            /> 
          </FocusTrap>*/}
        </MarkedBlockFrame>
      </Flex>
    </>
  );
}
