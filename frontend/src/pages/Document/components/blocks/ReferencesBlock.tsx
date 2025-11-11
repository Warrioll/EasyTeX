import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { MdOutlineAdd } from 'react-icons/md';
import { Box, Button, Center, Flex, Stack, Text } from '@mantine/core';
import { referencesElementType } from '@/Types';
import { useActiveBlockContext, useBlocksContentContext } from '../../DocumentContextProviders';
import BasicTexfield from './blocksComponents/BasicTextfield';
import BlockReferenceId from './blocksComponents/BlockReferenceId';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import DeleteReferencePopover from './refrencesBlockComponents/DeleteReferencePopover';
import ReferenceItemMenu from './refrencesBlockComponents/ReferenceitemMenu';
import classes from './blocks.module.css';

type ReferencesBlockPropsType = {
  idx: number;
};

export default function ReferencesBlock({ idx }: ReferencesBlockPropsType) {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();

  const [amountOfReferences, setAmoutOfReferences] = useState<number>(0);

  const addReference = () => {
    const assignedNumbers: number[] = [];
    for (const reference of blocksContent[idx].blockContent) {
      assignedNumbers.push(Number(reference.id.replace('bib', '')));
    }

    let counter = 1;
    while (assignedNumbers.includes(counter)) {
      counter++;
    }
    const referencesList = cloneDeep(blocksContent[idx].blockContent);
    blocksContent[idx].blockContent = [
      ...referencesList,
      {
        id: 'bib'.concat(counter.toString()),
        label: 'New entry',
      },
    ];
    setIsNotSaved(true);
    setAmoutOfReferences((prev) => prev + 1);
  };

  return (
    <>
      <Flex>
        <MarkedBlockFrame idx={idx} blockName="Bibliography / References">
          <Text mb="md" fw="bold" fz="xl" c="var(--mantine-color-gray-6)">
            {blocksContent[0].blockContent.class === 'report' ||
            blocksContent[0].blockContent.class === 'book'
              ? 'Bibliography'
              : 'References'}
          </Text>
          <Stack m="md">
            {amountOfReferences >= 0
              ? blocksContent[idx].blockContent.map(
                  (item: referencesElementType, referenceId: number) => {
                    return (
                      <Flex justify="space-between">
                        <Box h="1.4rem" mr="xs" mt="0.7rem">
                          <BlockReferenceId referenceId={item.id} />
                        </Box>
                        <Box mt="0.5rem" mr="md" c="var(--mantine-color-gray-6)" fw="500">
                          [{referenceId + 1}]
                        </Box>
                        <Box w="100%" mr="xs">
                          <BasicTexfield
                            idx={idx}
                            idxInput={idx.toString() + item.id}
                            contentToRead={item.label}
                          />
                        </Box>
                        {activeBlock === idx ? (
                          <>
                            <ReferenceItemMenu idx={idx} referenceId={referenceId} />
                            <DeleteReferencePopover idx={idx} referenceId={referenceId} />
                          </>
                        ) : (
                          <Box w="2rem" />
                        )}
                      </Flex>
                    );
                  }
                )
              : null}

            {activeBlock === idx ? (
              <Center w="100%">
                <Button
                  className={classes.buttonWhiteHover}
                  bg="transparent"
                  c="var(--mantine-color-cyan-7)"
                  leftSection={<MdOutlineAdd />}
                  onClick={addReference}
                  m="0px"
                  h="2rem"
                  w="8rem"
                >
                  Add entry
                </Button>
              </Center>
            ) : (
              <Box h="2rem" />
            )}
          </Stack>
        </MarkedBlockFrame>
      </Flex>
    </>
  );
}
