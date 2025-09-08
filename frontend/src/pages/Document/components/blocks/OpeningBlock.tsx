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

type OpeningBlockPropsType = {
  idx: number;
};

export default function OpeningBlock({ idx }: OpeningBlockPropsType) {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const [sectionNumber, setSectionNumber] = useState<string>('');

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
        <Flex w="100%" ml="xs">
          <Text
            ta="left"
            miw="3rem"
            mr="xs"
            mt="0.65rem"
            fz="xs"
            fw="500"
            c="var(--mantine-color-cyan-6)"
          >
            Opening:
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
