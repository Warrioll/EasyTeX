import { useEffect, useState } from 'react';
import { Flex, Text } from '@mantine/core';
import { useActiveBlockContext, useBlocksContentContext } from '../../DocumentContextProviders';
import BasicTexfield from './blocksComponents/BasicTextfield';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';

type ClosingBlockPropsType = {
  idx: number;
};

export default function ClosingBlock({ idx }: ClosingBlockPropsType) {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const [sectionNumber, setSectionNumber] = useState<string>('');

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
    <div>
      <Flex>
        <MarkedBlockFrame idx={idx} blockName="Closing">
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
              Closing:
            </Text>
            <BasicTexfield
              idx={idx}
              contentToRead={blocksContent[idx].blockContent as string}
              idxInput={idx.toString()}
            />
          </Flex>
        </MarkedBlockFrame>
      </Flex>
    </div>
  );
}
