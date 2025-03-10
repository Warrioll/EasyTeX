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
} from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';
import BasicTexfield from './basicTextfield';
import MarkedBlockFrame from './MarkedBlockFrame';
import classes from './blocks.module.css';

type SectionBlockProps = {
  idx: number;
  activeSection: number;
  setActiveSecion: Dispatch<SetStateAction<number>>;
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
  editor: Editor;
};

export default function TitlePageBlock({
  idx,
  activeSection,
  setActiveSecion,
  sectionsContent,
  setSectionsContent,
  editor,
}: SectionBlockProps) {
  const [activeTextfield, setActiveTextfield] = useState<string>('');
  const [focusTrap, { toggle }] = useDisclosure(false);

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

  useEffect(() => {
    //setActiveTextfield('');
  }, [activeSection]);

  return (
    <div
      key={idx}
      tabIndex={idx}
      onFocus={async () => {
        toggle();
        setActiveSecion(idx);
      }}

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
          activeSection={activeSection}
          setActiveSecion={setActiveSecion}
          blockName="Title, author, date"
          sectionsContent={sectionsContent}
          setSectionsContent={setSectionsContent}
        >
          <Stack justify="center" align="center" ta="center" pt="xl" pb="xl" m="xl">
            {/* <TextInput
              className={classes.centeredInput}
              label="Title"
              radius="md"
              placeholder="Title..."
              variant="header1"
              //   value={
              //     sectionsContent[idx].blockContent === undefined
              //       ? ''
              //       : sectionsContent[idx].blockContent
              //     //sectionsContent[idx].blockContent.sectionContent === undefined ? '' : sectionsContent[idx].blockContent.sectionContent
              //   }
              //onChange={(event) => updateSectionContent(event)}
              w="100%"
              style={{ borderRadius: 'var(--mantine-radius-md)', textAlign: 'center' }}
            /> */}
            Title
            <div
              key={idx.toString().concat('title')}
              tabIndex={idx}
              onFocus={async () => {
                setActiveTextfield(idx.toString().concat('title'));
                //setActiveSecion(idx);
                // sectionsContent[idx].blockContent
                //   ?
                console.log(idx.toString().concat('title'));
                console.log(sectionsContent[idx].blockContent.title);
                await editor?.commands.setContent(sectionsContent[idx].blockContent.title);
                //: null;
                //console.log('onFocus', block);
              }}
              onBlur={() => {
                let content = sectionsContent;
                content[idx].blockContent.title = editor?.getHTML();
                setSectionsContent(content);
                //setActiveTextfield('');
                //console.log('OnBlur', editorContent);
              }}
              style={{ backgroundColor: 'pink', padding: '5px' }}
            >
              <BasicTexfield
                idx={idx.toString().concat('title')}
                activeSection={activeTextfield}
                textFieldContent={sectionsContent[activeSection].blockContent.title}
                editor={editor}
              />
            </div>
            <div
              key={idx.toString().concat('author')}
              tabIndex={idx}
              onFocus={async () => {
                setActiveTextfield(idx.toString().concat('author'));
                //setActiveSecion(idx);
                // sectionsContent[idx].blockContent
                //   ?
                await editor?.commands.setContent(sectionsContent[idx].blockContent.author);
                //: null;
                //console.log('onFocus', block);
              }}
              onBlur={() => {
                let content = sectionsContent;
                content[idx].blockContent.author = editor?.getHTML();
                setSectionsContent(content);
                //setActiveTextfield('');
                //console.log('OnBlur', editorContent);
              }}
            >
              <BasicTexfield
                idx={idx.toString().concat('author')}
                activeSection={activeTextfield}
                textFieldContent={sectionsContent[activeSection].blockContent.author}
                editor={editor}
              />
            </div>
            <TextInput
              label="Author"
              radius="md"
              placeholder="Author..."
              variant="header1"
              //   value={
              //     sectionsContent[idx].blockContent === undefined
              //       ? ''
              //       : sectionsContent[idx].blockContent
              //     //sectionsContent[idx].blockContent.sectionContent === undefined ? '' : sectionsContent[idx].blockContent.sectionContent
              //   }
              //onChange={(event) => updateSectionContent(event)}
              w="100%"
              style={{ borderRadius: 'var(--mantine-radius-md)' }}
            />
            <TextInput
              label="Date"
              radius="md"
              placeholder="Date..."
              variant="header1"
              //   value={
              //     sectionsContent[idx].blockContent === undefined
              //       ? ''
              //       : sectionsContent[idx].blockContent
              //     //sectionsContent[idx].blockContent.sectionContent === undefined ? '' : sectionsContent[idx].blockContent.sectionContent
              //   }
              //onChange={(event) => updateSectionContent(event)}
              w="100%"
              style={{ borderRadius: 'var(--mantine-radius-md)' }}
            />
          </Stack>
        </MarkedBlockFrame>
      </Flex>
    </div>
  );
}
