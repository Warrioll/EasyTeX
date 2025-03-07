import React, { Dispatch, SetStateAction } from 'react';
import { Editor } from '@tiptap/react';
import parse from 'html-react-parser';
import { Badge, Button, Flex, FocusTrap, Group, Input, TextInput,Box,Center, Stack, Menu, Title } from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';
import MarkedBlockFrame from './MarkedBlockFrame';
import classes from './blocks.module.css';

type SectionBlockProps = {
  idx: number;
  activeSection: number;
  setActiveSecion: Dispatch<SetStateAction<number>>;
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
};

export default function TitlePageBlock({
  idx,
  activeSection,
  setActiveSecion,
  sectionsContent,
  setSectionsContent,
}: SectionBlockProps) {
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

  return (
    <div
      key={idx}
      tabIndex={idx}
      onFocus={async () => {
        toggle();
        setActiveSecion(idx);
      }}

      //ref={ref}
    >
     

      <Flex>
        <MarkedBlockFrame
          idx={idx}
          activeSection={activeSection}
          setActiveSecion={setActiveSecion}
          blockName="Title Page"
          sectionsContent={sectionsContent}
          setSectionsContent={setSectionsContent}
        >
            <Title ta='center' mt='xl' fz='1.3rem'>Title Page</Title>
          <Stack justify='center' align='center' ta='center' pt='xl' pb='xl' m='xl' className={classes.titlePageContent}>
            <TextInput
            className={classes.centeredInput}
            label='Title'
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
              style={{ borderRadius: 'var(--mantine-radius-md)', textAlign: "center"  }}
            />
     
          <TextInput
            label='Author'
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
            label='Date'
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
