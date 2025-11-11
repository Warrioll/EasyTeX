import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { Box, Flex, Text } from '@mantine/core';
import { blockType, typeOfBlockType } from '@/Types';
import {
  useActiveBlockContext,
  useActiveTextfieldContext,
  useBlocksContentContext,
} from '../../DocumentContextProviders';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';

type TableOfContentsBlockPropsType = {
  idx: number;
};

export default function TableOfContentsBlock({ idx }: TableOfContentsBlockPropsType) {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();

  const [tableOfContentsContent, setTableOfContentsContent] = useState<
    | { typeOfBlock: typeOfBlockType; blockContent: string; number: ReactElement }[]
    | null
    | undefined
  >();

  useEffect(() => {
    let sectionCounter = 0;
    let subsectionCounter = 0;
    let subsubsectionCounter = 0;
    const sections = blocksContent.filter(
      (block) =>
        block.typeOfBlock === 'section' ||
        block.typeOfBlock === 'subsection' ||
        block.typeOfBlock === 'subsubsection'
    );
    const tableOfContentsData = sections.map((item) => {
      if (item.typeOfBlock === 'section') {
        sectionCounter += 1;
        subsectionCounter = 0;
        subsubsectionCounter = 0;
        const section = {
          typeOfBlock: item.typeOfBlock,
          blockContent: item.blockContent as string,
          number: (
            <Text fw="bold" mr="xs">
              {sectionCounter.toString() + '.'}
            </Text>
          ),
        };

        return section;
      }
      if (item.typeOfBlock === 'subsection') {
        subsectionCounter += 1;
        subsubsectionCounter = 0;
        const subsection = {
          typeOfBlock: item.typeOfBlock,
          blockContent: item.blockContent,
          number: (
            <Text fw="bold" mr="xs" ml="md">
              {sectionCounter.toString() + '.' + subsectionCounter.toString() + '.'}
            </Text>
          ),
        };

        return subsection;
      }
      if (item.typeOfBlock === 'subsubsection') {
        subsubsectionCounter += 1;
        const subsubsection = {
          typeOfBlock: item.typeOfBlock,
          blockContent: item.blockContent,
          number: (
            <Text fw="bold" mr="xs" ml="xl">
              {sectionCounter.toString() +
                '.' +
                subsectionCounter.toString() +
                '.' +
                subsubsectionCounter.toString() +
                '.'}
            </Text>
          ),
        };

        return subsubsection;
      }
      return null;
    });
    setTableOfContentsContent(tableOfContentsData);
  }, [blocksContent, activeBlock]);

  return (
    <MarkedBlockFrame idx={idx} blockName="Table of contents">
      <Box p="xl" c="var(--mantine-color-gray-6)">
        <Text mb="md" fw="bold" fz="xl">
          Contents
        </Text>
        {tableOfContentsContent?.map((block, idx) => {
          if (block !== undefined) {
            let content: string = block.blockContent as string;
            content = content.replaceAll('<p>', '');
            content = content.replaceAll('</p>', '');
            return (
              <Flex>
                {block.number}
                {parse(content)}
              </Flex>
            );
          }
          return null;
        })}
      </Box>
    </MarkedBlockFrame>
  );
}
