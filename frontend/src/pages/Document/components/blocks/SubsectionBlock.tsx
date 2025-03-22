import React, { Dispatch, SetStateAction } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { Badge, Button, Flex, FocusTrap, Group, Input, Menu, Text } from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';
import BasicTexfield from './blocksComponents/basicTextfield';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import { useState, useEffect } from 'react';
import styles from './blocks.module.css';

type SectionBlockProps = {
  idx: number;
  activeBlockState: [number, Dispatch<SetStateAction<number>>];
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
  activeTextInputState: [string, Dispatch<SetStateAction<string>>];
  editor: Editor;
};

export default function SubsectionBlock({
  idx,
  activeBlockState,
  sectionsContent,
  setSectionsContent,
  editor,
  activeTextInputState,
}: SectionBlockProps) {
  const [focusTrap, { toggle }] = useDisclosure(false);
  const [activeBlock, setActiveBlock] = activeBlockState;
    const [sectionNumber, setSectionNumber]=useState<string>('')

  const updateSectionContent = (event) => {
    console.log('section event', event);
    let content = [...sectionsContent];
    console.log('section  event.target.value', event.target.value);
    //content[idx].blockContent = event.target.value;
    content[idx] = {
      ...content[idx],
      //blockContent: { idx: 1, sectionContent: event.target.value },
      blockContent: event.target.value,
    };
    console.log('section content[idx].blockContent', content[idx].blockContent);
    setSectionsContent(content);
  };

  useEffect(()=>{
      let sectionCounter=0
      let subsectionCounter=0
      for(let i=0; i<sectionsContent.length; i++){
        if(sectionsContent[i].typeOfBlock==='section'){
          sectionCounter+=1
          subsectionCounter=0
        }
        if(sectionsContent[i].typeOfBlock==='subsection'){
          subsectionCounter+=1
        }
        if(i===idx){
          setSectionNumber(sectionCounter.toString()+'.'+subsectionCounter.toString()+'.')
          break
        }
      }
    },[activeBlock])

  return (
    <Flex>
      <MarkedBlockFrame
        idx={idx}
        activeBlockState={activeBlockState}
        blockName="Subsection"
        sectionsContent={sectionsContent}
        setSectionsContent={setSectionsContent}
        activeTextInputState={activeTextInputState}
      >
         <Flex align='center'>
                  <Text fz='lg' fw='bold' ml='xl'>{sectionNumber}</Text>
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
      </MarkedBlockFrame>
    </Flex>
  );
}
