import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdOutlineAdd } from 'react-icons/md';
import { Box, Button, Flex, Stack, Text, Title } from '@mantine/core';
import { useActiveBlockContext, useBlocksContentContext } from '../../DocumentContextProviders';
import BasicTexfield from './blocksComponents/basicTextfield';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';

type ReferencesBlockPropsType = {
  idx: number;
};

export default function ReferencesBlock({ idx }: ReferencesBlockPropsType) {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();

  const addReference = () => {
    const blocksCopy = cloneDeep(blocksContent);
    blocksCopy[idx].blockContent = [
      ...blocksCopy[idx].blockContent,
      { id: 'ref' + blocksCopy[idx].blockContent.length.toString(), label: 'New reference' },
    ];
    setBlocksContent(blocksCopy);
  };

  const deleteReference = (idxToDelete: number) => {
    const blocksCopy = cloneDeep(blocksContent);
    blocksCopy[idx].blockContent.splice(idxToDelete, 1);
    setBlocksContent(blocksCopy);
  };

  //console.log('refs: ', blocksContent[idx]);

  return (
    <>
      <Flex>
        <MarkedBlockFrame idx={idx} blockName="Referrences">
          <Text mb="md" fw="bold" fz="xl">
            References
          </Text>
          <Stack m="md">
            {blocksContent[idx].blockContent.map((item, referenceId) => {
              //console.log(item);
              return (
                <Flex>
                  <Box h="1rem" mr="xs" mt="0.7rem">
                    <Text
                      miw="2rem"
                      c={
                        idx === activeBlock
                          ? 'var(--mantine-color-white)'
                          : 'var(--mantine-color-cyan-9)'
                      }
                      bg={
                        idx === activeBlock
                          ? 'var(--mantine-color-cyan-4)'
                          : 'var(--mantine-color-cyan-0)'
                      }
                      fw="500"
                      fz="sm"
                      pl="5px"
                      pr="5px"
                      ta="center"
                      //bd="1px solid var(--mantine-color-cyan-5)"
                      style={{ borderRadius: ' var(--mantine-radius-md)' }}
                    >
                      {item.id}
                    </Text>
                  </Box>
                  <Box mt="0.5rem" mr="md" c="var(--mantine-color-gray-6)" fw="500">
                    [{referenceId + 1}]
                  </Box>

                  <BasicTexfield
                    idx={idx}
                    //FIXME - te toString coś nie tak
                    idxInput={idx.toString() + 'ref' + item.id.toString()}
                    contentToRead={item.label}
                  />
                  {activeBlock === idx ? (
                    <Button
                      w="2rem"
                      p="0px"
                      variant="transparent"
                      c="var(--mantine-color-gray-6)"
                      onClick={() => {
                        deleteReference(referenceId);
                      }}
                    >
                      <FaRegTrashAlt />
                    </Button>
                  ) : (
                    <Box w="2rem" />
                  )}
                </Flex>
              );
            })}

            {activeBlock === idx ? (
              <Button
                bg="var(--mantine-color-gray-1)"
                c="var(--mantine-color-gray-6)"
                leftSection={<MdOutlineAdd />}
                onClick={addReference}
                m="0px"
                h="2rem"
              >
                Add an element to the reference list
              </Button>
            ) : (
              <Box h="2rem" />
            )}
          </Stack>
        </MarkedBlockFrame>
      </Flex>
    </>
  );
}
