import React, { Dispatch, SetStateAction } from 'react';
import { Editor } from '@tiptap/react';
import parse from 'html-react-parser';
import { Badge, Button, Flex, FocusTrap, Group, Input, Menu } from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';
import MarkedBlockFrame from './MarkedBlockFrame';
import styles from './blocks.module.css';

type SectionBlockProps = {
  idx: number;
  activeSection: number;
  setActiveSecion: Dispatch<SetStateAction<number>>;
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
};

export default function SubsubsectionBlock({
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
          activeSection={activeSection}
          setActiveSecion={setActiveSecion}
          blockName="Subsubsection"
          sectionsContent={sectionsContent}
          setSectionsContent={setSectionsContent}
        >
          <FocusTrap active={focusTrap}>
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
          </FocusTrap>
        </MarkedBlockFrame>
      </Flex>
    </div>
  );
}
