import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Editor } from '@tiptap/react';
import parse from 'html-react-parser';
import { cloneDeep } from 'lodash';
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
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';
import {
  useActiveBlockContext,
  useActiveTextfieldContext,
  useBlocksContentContext,
  useEditorContext,
} from '../../DocumentContextProviders';
import BasicTexfield from './blocksComponents/BasicTextfield';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import classes from './blocks.module.css';

type SectionBlockProps = {
  idx: number;
};

export default function TitlePageBlock({ idx }: SectionBlockProps) {
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const { activeTextfield, setActiveTextfield } = useActiveTextfieldContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  //const [activeTextfield, setActiveTextfield] = useState<string>('');
  const [focusTrap, { toggle }] = useDisclosure(false);
  const [thisBlockContent, setThisBlockContent] = useState(blocksContent[idx].blockContent);

  //const [authorTextfiled, setAuthorTextfiled]

  // const [activeBlock, setActiveBlock] = activeBlockState;

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

  useEffect(() => {
    if (
      activeBlock === idx &&
      activeTextfield !== idx.toString().concat('author') &&
      activeTextfield !== idx.toString().concat('date')
    ) {
      setActiveTextfield(idx.toString().concat('title'));
    }
  }, [activeBlock]);

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
          //activeBlockState={activeBlockState}
          blockName="Title"
          //sectionsContent={sectionsContent}
          //setSectionsContent={setSectionsContent}
          //activeTextInputState={activeTextInputState}
          defaultBasicInputId={idx.toString().concat('title')}
        >
          <Stack
            justify="center"
            align="flex-start"
            pt="xl"
            pb="xl"
            m="xl"
            ml="xs"
            mr="xs"
            className={classes.titlePage}
          >
            <Flex ta="left" w="100%">
              <Text miw="3rem" mr="xs" mt="xs" fz="xs" fw="500" c="var(--mantine-color-cyan-6)">
                Title:
              </Text>
              <Box w="calc(100% - 3rem)">
                <BasicTexfield
                  idx={idx}
                  //activeBlockState={activeBlockState}
                  contentToRead={blocksContent[idx].blockContent.title as string}
                  //editor={editor}
                  //activeTextInputState={activeTextInputState}
                  idxInput={idx.toString().concat('title')}
                  //sectionsContent={sectionsContent}
                  //setSectionsContent={setSectionsContent}
                />
              </Box>
            </Flex>
            <Flex ta="left" w="100%">
              <Text miw="3rem" mr="xs" mt="xs" fz="xs" fw="500" c="var(--mantine-color-cyan-6)">
                Author:
              </Text>
              <Box w="calc(100% - 3rem)">
                <BasicTexfield
                  idx={idx}
                  //activeBlockState={activeBlockState}
                  contentToRead={blocksContent[idx].blockContent.author as string}
                  //editor={editor}
                  //activeTextInputState={activeTextInputState}
                  idxInput={idx.toString().concat('author')}
                  //sectionsContent={sectionsContent}
                  //setSectionsContent={setSectionsContent}
                />
              </Box>
            </Flex>
            <Flex ta="left" w="100%">
              <Text miw="3rem" mr="xs" mt="xs" fz="xs" fw="500" c="var(--mantine-color-cyan-6)">
                Date:
              </Text>
              <Box w="calc(100% - 3rem)">
                <BasicTexfield
                  idx={idx}
                  //activeBlockState={activeBlockState}
                  contentToRead={blocksContent[idx].blockContent.date as string}
                  //editor={editor}
                  //activeTextInputState={activeTextInputState}
                  idxInput={idx.toString().concat('date')}
                  //sectionsContent={sectionsContent}
                  //setSectionsContent={setSectionsContent}
                />
              </Box>
            </Flex>
          </Stack>
        </MarkedBlockFrame>
      </Flex>
    </div>
  );
}
