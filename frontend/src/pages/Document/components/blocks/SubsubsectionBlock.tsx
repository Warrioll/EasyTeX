import React, { Dispatch, SetStateAction } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { Badge, Button, Flex, FocusTrap, Group, Input, Menu } from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';
import MarkedBlockFrame from './MarkedBlockFrame';
import styles from './blocks.module.css';
import BasicTexfield from './basicTextfield';

type SectionBlockProps = {
  idx: number;
  activeBlockState: [number, Dispatch<SetStateAction<number>>];
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
  editor: Editor;
  activeTextInputState: [string, Dispatch<SetStateAction<string>>];
};

export default function SubsubsectionBlock({
  idx,
  activeBlockState,
  sectionsContent,
  setSectionsContent,
  editor,
  activeTextInputState
}: SectionBlockProps) {
  const [focusTrap, { toggle }] = useDisclosure(false);
  const [activeBlock, setActiveBlock] = activeBlockState;

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
          activeBlockState={activeBlockState}
          blockName="Subsubsection"
          sectionsContent={sectionsContent}
          setSectionsContent={setSectionsContent}
        >
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
        </MarkedBlockFrame>
      </Flex>
    </div>
  );
}
