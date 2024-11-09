import React, { Dispatch, SetStateAction } from 'react';
import { Editor } from '@tiptap/react';
import parse from 'html-react-parser';
import { Flex, Input } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';

type SectionBlockProps = {
  idx: number;
  activeSection: number;
  setActiveSecion: Dispatch<SetStateAction<number>>;
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
};

export default function SectionBlock({
  idx,
  activeSection,
  setActiveSecion,
  sectionsContent,
  setSectionsContent,
}: SectionBlockProps) {
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
        setActiveSecion(idx);
      }}
    >
      <Flex>
        {
          //sectionsContent[idx].blockContent.idx //typ zrobić dla blockContent to może nie będzie errorów
        }
        <Input
          radius="md"
          placeholder="Header..."
          variant="header1"
          value={
            sectionsContent[idx].blockContent === undefined ? '' : sectionsContent[idx].blockContent
            //sectionsContent[idx].blockContent.sectionContent === undefined ? '' : sectionsContent[idx].blockContent.sectionContent
          }
          onChange={(event) => updateSectionContent(event)}
        />
      </Flex>
    </div>
  );
}
