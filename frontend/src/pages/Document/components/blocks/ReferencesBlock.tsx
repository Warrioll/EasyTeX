import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdOutlineAdd } from 'react-icons/md';
import { Box, Button, Flex, Popover, Stack, Text, Title } from '@mantine/core';
import { referencesElementType } from '@/Types';
import { useActiveBlockContext, useBlocksContentContext } from '../../DocumentContextProviders';
import { useEditTextfields } from '../../hooksAndUtils/documentHooks';
import { getReferenceForEditor } from '../../hooksAndUtils/documentUtils';
import BasicTexfield from './blocksComponents/BasicTextfield';
import BlockReferenceId from './blocksComponents/BlockReferenceId';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import DeleteReferencePopover from './refrencesBlockComponents/DeleteReferencePopover';

type ReferencesBlockPropsType = {
  idx: number;
};

export default function ReferencesBlock({ idx }: ReferencesBlockPropsType) {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();

  const [openedDeleteConfirmation, setOpenedDeleteConfirmation] = useState(false);
  const [amountOfReferences, setAmoutOfReferences] = useState<number>(0);

  const { editTextfields } = useEditTextfields();

  const addReference = () => {
    const assignedNumbers: number[] = [];
    for (const reference of blocksContent[idx].blockContent) {
      assignedNumbers.push(Number(reference.id.replace('bib', '')));
    }
    //assignedNumbers.sort();
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
    // const blocksCopy = cloneDeep(blocksContent);
    // let refId = 0;
    // for (const i of blocksCopy[idx].blockContent) {
    //   const iId = Number(i.id.split('ref')[1]);
    //   if (refId <= iId) {

    //     refId = iId + 1;
    //   }
    // }

    // blocksCopy[idx].blockContent = [
    //   ...blocksCopy[idx].blockContent,
    //   { id: 'ref'.concat(refId.toString()), label: 'New reference' },
    // ];
    // setBlocksContent(blocksCopy);
  };

  const deleteReference = (idxToDelete: number) => {
    const refId = blocksContent[idx].blockContent[idxToDelete].id;

    const blocksCopy = editTextfields(getReferenceForEditor(refId), '');
    //console.log('copy: ', blocksCopy);

    //console.log('delete ref', refId, idxToDelete, blocksCopy[idx].blockContent);
    blocksCopy[idx].blockContent.splice(idxToDelete, 1);
    setBlocksContent(blocksCopy);
    setAmoutOfReferences((prev) => prev - 1);
  };

  return (
    <>
      <Flex>
        <MarkedBlockFrame idx={idx} blockName="Bibliography / References">
          <Text mb="md" fw="bold" fz="xl" c="var(--mantine-color-gray-6)">
            {blocksContent[0].blockContent === 'report' || blocksContent[0].blockContent === 'book'
              ? 'Bibliography'
              : 'References'}
          </Text>
          <Stack m="md">
            {amountOfReferences >= 0
              ? blocksContent[idx].blockContent.map((item: referencesElementType, referenceId) => {
                  //console.log('reference:', item, 'input id:', idx.toString() + 'ref' + item.id);
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
                        <DeleteReferencePopover idx={idx} referenceId={referenceId} />
                      ) : (
                        <Box w="2rem" />
                      )}
                    </Flex>
                  );
                })
              : null}

            {activeBlock === idx ? (
              <Button
                bg="var(--mantine-color-gray-1)"
                c="var(--mantine-color-gray-6)"
                leftSection={<MdOutlineAdd />}
                onClick={addReference}
                m="0px"
                h="2rem"
              >
                Add entry
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
