import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { cloneDeep } from 'lodash';
import { Badge, Button, Flex, FocusTrap, Group, Input, Menu, Text } from '@mantine/core';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';
import { useActiveBlockContext, useBlocksContentContext } from '../../DocumentContextProviders';
import BasicTexfield from './blocksComponents/BasicTextfield';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import styles from './blocks.module.css';

type SectionBlockProps = {
  idx: number;
};

export default function SubsectionBlock({ idx }: SectionBlockProps) {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const [sectionNumber, setSectionNumber] = useState<string>('');

  // const updateSectionContent = (event) => {
  //   console.log('section event', event);
  //   let content = cloneDeep(blocksContent);
  //   console.log('section  event.target.value', event.target.value);
  //   //content[idx].blockContent = event.target.value;
  //   content[idx] = {
  //     ...content[idx],
  //     //blockContent: { idx: 1, sectionContent: event.target.value },
  //     blockContent: event.target.value,
  //   };
  //   console.log('section content[idx].blockContent', content[idx].blockContent);
  //   setBlocksContent(content);
  // };

  useEffect(() => {
    let sectionCounter = 0;
    let subsectionCounter = 0;
    for (let i = 0; i < blocksContent.length; i++) {
      if (blocksContent[i].typeOfBlock === 'section') {
        sectionCounter += 1;
        subsectionCounter = 0;
      }
      if (blocksContent[i].typeOfBlock === 'subsection') {
        subsectionCounter += 1;
      }
      if (i === idx) {
        setSectionNumber(sectionCounter.toString() + '.' + subsectionCounter.toString() + '.');
        break;
      }
    }
  }, [activeBlock]);

  return (
    <Flex>
      <MarkedBlockFrame idx={idx} blockName="Subsection">
        <Flex align="center">
          <Text fz="lg" fw="bold" mr="xs" ml="xl" c="var(--mantine-color-gray-6)">
            {sectionNumber}
          </Text>
          <BasicTexfield
            idx={idx}
            contentToRead={blocksContent[idx].blockContent as string}
            idxInput={idx.toString()}
          />
        </Flex>
      </MarkedBlockFrame>
    </Flex>
  );
}
