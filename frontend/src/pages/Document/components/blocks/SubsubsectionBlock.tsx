import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { cloneDeep } from 'lodash';
import { Badge, Button, Flex, FocusTrap, Group, Input, Menu, Text } from '@mantine/core';
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
import styles from './blocks.module.css';

type SectionBlockProps = {
  idx: number;
  //activeBlockState: [number, Dispatch<SetStateAction<number>>];
  //sectionsContent: blockType[];
  //setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
  //editor: Editor;
  // activeTextInputState: [string, Dispatch<SetStateAction<string>>];
};

export default function SubsubsectionBlock({
  idx,
  //activeBlockState,
  //sectionsContent,
  //setSectionsContent,
  //editor,
  //activeTextInputState,
}: SectionBlockProps) {
  //const [focusTrap, { toggle }] = useDisclosure(false);
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const [sectionNumber, setSectionNumber] = useState<string>('');

  const updateSectionContent = (event) => {
    console.log('section event', event);
    let content = cloneDeep(blocksContent);
    console.log('section  event.target.value', event.target.value);
    //content[idx].blockContent = event.target.value;
    content[idx] = {
      ...content[idx],
      //blockContent: { idx: 1, sectionContent: event.target.value },
      blockContent: event.target.value,
    };
    console.log('section content[idx].blockContent', content[idx].blockContent);
    setBlocksContent(content);
  };

  useEffect(() => {
    let sectionCounter = 0;
    let subsectionCounter = 0;
    let subsubsectionCounter = 0;
    for (let i = 0; i < blocksContent.length; i++) {
      if (blocksContent[i].typeOfBlock === 'section') {
        sectionCounter += 1;
        subsectionCounter = 0;
        subsubsectionCounter = 0;
      }
      if (blocksContent[i].typeOfBlock === 'subsection') {
        subsectionCounter += 1;
        subsubsectionCounter = 0;
      }
      if (blocksContent[i].typeOfBlock === 'subsubsection') {
        subsubsectionCounter += 1;
      }
      if (i === idx) {
        setSectionNumber(
          sectionCounter.toString() +
            '.' +
            subsectionCounter.toString() +
            '.' +
            subsubsectionCounter.toString() +
            '.'
        );
        break;
      }
    }
  }, [activeBlock]);

  return (
    <div
    // key={idx}
    // tabIndex={idx}
    // onFocus={async () => {
    //   setActiveBlock(idx);
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
          //activeBlockState={activeBlockState}
          blockName="Heading 3"
          // sectionsContent={sectionsContent}
          //setSectionsContent={setSectionsContent}
          // activeTextInputState={activeTextInputState}
        >
          <Flex w="100%" ml="xs">
            <Text ta="left" mt="0.65rem" fz="xs" fw="500" c="var(--mantine-color-cyan-6)">
              H3:
            </Text>
            {blocksContent[0].blockContent.class !== 'beamer' && (
              <Text
                fz="xl"
                fw="bold"
                mr="0.3rem"
                mt="0.13rem"
                ml="md"
                c="var(--mantine-color-gray-6)"
              >
                {sectionNumber}
              </Text>
            )}
            <BasicTexfield
              idx={idx}
              //activeBlockState={activeBlockState}
              contentToRead={blocksContent[idx].blockContent as string}
              //editor={editor}
              //activeTextInputState={activeTextInputState}
              idxInput={idx.toString()}
              // sectionsContent={sectionsContent}
              //setSectionsContent={setSectionsContent}
            />
          </Flex>
        </MarkedBlockFrame>
      </Flex>
    </div>
  );
}
