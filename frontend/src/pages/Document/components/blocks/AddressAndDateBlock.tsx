import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
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
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';
import {
  useActiveBlockContext,
  useBlocksContentContext,
  useEditorContext,
} from '../../DocumentContextProviders';
import BasicTexfield from './blocksComponents/BasicTextfield';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import classes from './blocks.module.css';

type AddressAndDateBlockPropsType = {
  idx: number;
};

export default function AddressAndDateBlock({ idx }: AddressAndDateBlockPropsType) {
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  //const { activeTextfield, setActiveTextfield } = useActiveTextInputContext();
  //const [activeTextfield, setActiveTextfield] = useState<string>('');
  const [focusTrap, { toggle }] = useDisclosure(false);

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
          blockName="Address & date"
          //sectionsContent={sectionsContent}
          //setSectionsContent={setSectionsContent}
          //activeTextInputState={activeTextInputState}
        >
          <Stack
            justify="center"
            align="flex-start"
            pt="xl"
            pb="xl"
            m="xl"
            className={classes.titlePage}
            ml="xs"
          >
            <Flex w="100%">
              <Text
                ta="left"
                miw="3rem"
                mr="xs"
                mt="xs"
                fz="xs"
                fw="500"
                c="var(--mantine-color-cyan-6)"
              >
                Address:
              </Text>

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
            </Flex>
            <Flex w="100%">
              <Text
                ta="left"
                miw="3rem"
                mr="xs"
                mt="xs"
                fz="xs"
                fw="500"
                c="var(--mantine-color-cyan-6)"
              >
                Date:
              </Text>

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
            </Flex>
          </Stack>
        </MarkedBlockFrame>
      </Flex>
    </div>
  );
}
