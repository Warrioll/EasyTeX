import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdOutlineAdd } from 'react-icons/md';
import { Box, Button, Flex, Stack, Text, Title } from '@mantine/core';
import { referencesElementType } from '@/Types';
import { useActiveBlockContext, useBlocksContentContext } from '../../DocumentContextProviders';
import { getReferenceForEditor, useEditTextfields } from '../../documentHandlers';
import BasicTexfield from './blocksComponents/BasicTextfield';
import BlockReferenceId from './blocksComponents/BlockReferenceId';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';

type ReferencesBlockPropsType = {
  idx: number;
};

export default function ReferencesBlock({ idx }: ReferencesBlockPropsType) {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();

  const { editTextfields } = useEditTextfields();

  const addReference = () => {
    const blocksCopy = cloneDeep(blocksContent);
    let refId = 0;
    for (const i of blocksCopy[idx].blockContent) {
      const iId = Number(i.id.split('ref')[1]);
      if (refId <= iId) {
        //refId = iId + 1;
        //refId++;
        refId = iId + 1;
      }
    }

    blocksCopy[idx].blockContent = [
      ...blocksCopy[idx].blockContent,
      { id: 'ref'.concat(refId.toString()), label: 'New reference' },
    ];
    setBlocksContent(blocksCopy);
  };

  const deleteReference = (idxToDelete: number) => {
    const refId = blocksContent[idx].blockContent[idxToDelete].id;

    const blocksCopy = editTextfields(getReferenceForEditor(refId), '');
    console.log('copy: ', blocksCopy);

    console.log('delete ref', refId, idxToDelete, blocksCopy[idx].blockContent);
    blocksCopy[idx].blockContent.splice(idxToDelete, 1);
    setBlocksContent(blocksCopy);
  };

  console.log('refs: ', blocksContent[idx]);

  return (
    <>
      <Flex>
        <MarkedBlockFrame idx={idx} blockName="Referrences">
          <Text mb="md" fw="bold" fz="xl">
            References
          </Text>
          <Stack m="md">
            {blocksContent[idx].blockContent.map((item: referencesElementType, referenceId) => {
              console.log('reference:', item, 'input id:', idx.toString() + 'ref' + item.id);
              return (
                <Flex>
                  <Box h="1.4rem" mr="xs" mt="0.7rem">
                    <BlockReferenceId referenceId={item.id} />
                  </Box>
                  <Box mt="0.5rem" mr="md" c="var(--mantine-color-gray-6)" fw="500">
                    [{referenceId + 1}]
                  </Box>
                  <Box maw="29vw" w="100%">
                    <BasicTexfield
                      idx={idx}
                      //FIXME - te toString coś nie tak
                      idxInput={idx.toString() + item.id}
                      contentToRead={item.label}
                    />
                  </Box>
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
