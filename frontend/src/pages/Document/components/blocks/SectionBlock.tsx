import { useEffect, useState } from 'react';
import { Flex, Text } from '@mantine/core';
import { useActiveBlockContext, useBlocksContentContext } from '../../DocumentContextProviders';
import BasicTexfield from './blocksComponents/BasicTextfield';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';

type SectionBlockProps = {
  idx: number;
};

export default function SectionBlock({ idx }: SectionBlockProps) {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const [sectionNumber, setSectionNumber] = useState<string>('');

  useEffect(() => {
    let sectionCounter = 0;
    for (let i = 0; i < blocksContent.length; i++) {
      if (blocksContent[i].typeOfBlock === 'section') {
        sectionCounter += 1;
      }
      if (i === idx) {
        setSectionNumber(sectionCounter.toString() + '.');
        break;
      }
    }
  }, [activeBlock]);

  return (
    <>
      <Flex>
        <MarkedBlockFrame idx={idx} blockName="Heading 1">
          <Flex w="100%" ml="xs">
            <Text ta="left" mt="0.65rem" fz="xs" fw="500" c="var(--mantine-color-cyan-6)">
              H1:
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
              contentToRead={blocksContent[idx].blockContent as string}
              idxInput={idx.toString()}
            />
          </Flex>
        </MarkedBlockFrame>
      </Flex>
    </>
  );
}
