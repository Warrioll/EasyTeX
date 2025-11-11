import { useEffect, useState } from 'react';
import { Box, Flex, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  useActiveBlockContext,
  useActiveTextfieldContext,
  useBlocksContentContext,
} from '../../DocumentContextProviders';
import BasicTexfield from './blocksComponents/BasicTextfield';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import classes from './blocks.module.css';

type SectionBlockProps = {
  idx: number;
};

export default function TitlePageBlock({ idx }: SectionBlockProps) {
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const { activeTextfield, setActiveTextfield } = useActiveTextfieldContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();

  useEffect(() => {
    if (
      activeBlock === idx &&
      activeTextfield !== idx.toString().concat('author') &&
      activeTextfield !== idx.toString().concat('date')
    ) {
      setActiveTextfield(idx.toString().concat('title'));
    }
  }, [activeBlock]);

  return (
    <div>
      <Flex>
        <MarkedBlockFrame
          idx={idx}
          blockName="Title"
          defaultBasicInputId={idx.toString().concat('title')}
        >
          <Stack
            justify="center"
            align="flex-start"
            pt="xl"
            pb="xl"
            m="xl"
            ml="xs"
            mr="xs"
            className={classes.titlePage}
          >
            <Flex ta="left" w="100%">
              <Text miw="3rem" mr="xs" mt="xs" fz="xs" fw="500" c="var(--mantine-color-cyan-6)">
                Title:
              </Text>
              <Box w="calc(100% - 3rem)">
                <BasicTexfield
                  idx={idx}
                  contentToRead={blocksContent[idx].blockContent.title as string}
                  idxInput={idx.toString().concat('title')}
                />
              </Box>
            </Flex>
            <Flex ta="left" w="100%">
              <Text miw="3rem" mr="xs" mt="xs" fz="xs" fw="500" c="var(--mantine-color-cyan-6)">
                Author:
              </Text>
              <Box w="calc(100% - 3rem)">
                <BasicTexfield
                  idx={idx}
                  contentToRead={blocksContent[idx].blockContent.author as string}
                  idxInput={idx.toString().concat('author')}
                />
              </Box>
            </Flex>
            <Flex ta="left" w="100%">
              <Text miw="3rem" mr="xs" mt="xs" fz="xs" fw="500" c="var(--mantine-color-cyan-6)">
                Date:
              </Text>
              <Box w="calc(100% - 3rem)">
                <BasicTexfield
                  idx={idx}
                  contentToRead={blocksContent[idx].blockContent.date as string}
                  idxInput={idx.toString().concat('date')}
                />
              </Box>
            </Flex>
          </Stack>
        </MarkedBlockFrame>
      </Flex>
    </div>
  );
}
