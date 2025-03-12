import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import parse from 'html-react-parser';
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  FocusTrap,
  Group,
  Input,
  Menu,
  Stack,
  TextInput,
  Title,
  Text
} from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';
import BasicTexfield from './basicTextfield';
import MarkedBlockFrame from './MarkedBlockFrame';
import classes from './blocks.module.css';

type SectionBlockProps = {
  idx: number;
  activeBlockState: [number, Dispatch<SetStateAction<number>>];
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
  editor: Editor;
  activeTextInputState: [string, Dispatch<SetStateAction<string>>];
};

export default function TitlePageBlock({
  idx,
  activeBlockState,
  sectionsContent,
  setSectionsContent,
  editor,
  activeTextInputState,
}: SectionBlockProps) {
  const [activeTextfield, setActiveTextfield] = useState<string>('');
  const [focusTrap, { toggle }] = useDisclosure(false);
  const [activeBlock, setActiveBlock] = activeBlockState;

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

  return (
    <div
      // key={idx}
      // tabIndex={idx}
      // onFocus={async () => {
      //   toggle();
      //   setActiveBlock(idx);
      // }}

      // onFocus={async () => {
      //   setActiveSecion(idx);
      //   // sectionsContent[idx].blockContent
      //   //   ?
      //   await editor?.commands.setContent(sectionsContent[idx].blockContent);
      //   //: null;
      //   //console.log('onFocus', block);
      // }}
      // onBlur={() => {
      //   let content = sectionsContent;
      //   content[idx].blockContent = editor?.getHTML();
      //   setSectionsContent(content);
      //   //console.log('OnBlur', editorContent);
      // }}
    >
      <Flex>
        <MarkedBlockFrame
          idx={idx}
          activeBlockState={activeBlockState}
          blockName="Title, author, date"
          sectionsContent={sectionsContent}
          setSectionsContent={setSectionsContent}
        >
          <Stack justify="center" align="flex-start"  pt="xl" pb="xl" m="xl" className={classes.titlePage}>
            <Text fw={500} size='sm'>Title</Text>
  
            <BasicTexfield
              idx={idx}
              activeBlockState={activeBlockState}
              contentToRead={sectionsContent[idx].blockContent.title}
              editor={editor}
              activeTextInputState={activeTextInputState}
              idxInput={idx.toString().concat('title')}
              sectionsContent={sectionsContent}
              setSectionsContent={setSectionsContent}
            />
             <Text fw={500} size='sm'>Author</Text>
            <BasicTexfield
              idx={idx}
              activeBlockState={activeBlockState}
              contentToRead={sectionsContent[idx].blockContent.author}
              editor={editor}
              activeTextInputState={activeTextInputState}
              idxInput={idx.toString().concat('author')}
              sectionsContent={sectionsContent}
              setSectionsContent={setSectionsContent}
            />
      <Text fw={500} size='sm'>Date</Text>
      <BasicTexfield
              idx={idx}
              activeBlockState={activeBlockState}
              contentToRead={sectionsContent[idx].blockContent.date}
              editor={editor}
              activeTextInputState={activeTextInputState}
              idxInput={idx.toString().concat('date')}
              sectionsContent={sectionsContent}
              setSectionsContent={setSectionsContent}
            />
          </Stack>
        </MarkedBlockFrame>
      </Flex>
    </div>
  );
}
