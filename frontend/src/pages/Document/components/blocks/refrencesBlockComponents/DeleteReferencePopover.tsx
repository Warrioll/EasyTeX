import { useState } from 'react';
import DOMPurify from 'dompurify';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Box, Button, Flex, Popover, Stack, Text } from '@mantine/core';
import { useBlocksContentContext } from '@/pages/Document/DocumentContextProviders';
import { useEditTextfields } from '../../../hooksAndUtils/documentHooks';
import { getReferenceForEditor } from '../../../hooksAndUtils/documentUtils';
import BlockReferenceId from '../blocksComponents/BlockReferenceId';
import classes from '../blocks.module.css';

type DeleteReferencePopoverPropsType = {
  idx: number;
  referenceId: number;
};

export default function DeleteReferencePopover({
  idx,
  referenceId,
}: DeleteReferencePopoverPropsType) {
  const [openedDeleteConfirmation, setOpenedDeleteConfirmation] = useState(false);

  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();
  const { editTextfields } = useEditTextfields();

  const deleteReference = (idxToDelete: number) => {
    const refId = blocksContent[idx].blockContent[idxToDelete].id;

    const blocksCopy = editTextfields(getReferenceForEditor(refId), '');
    //console.log('copy: ', blocksCopy);

    //console.log('delete ref', refId, idxToDelete, blocksCopy[idx].blockContent);
    blocksCopy[idx].blockContent.splice(idxToDelete, 1);
    setBlocksContent(blocksCopy);
    setOpenedDeleteConfirmation(false);
    setIsNotSaved(true);
    //setAmoutOfReferences((prev) => prev - 1);
  };

  return (
    <Popover
      width={200}
      shadow="md"
      opened={openedDeleteConfirmation}
      onChange={setOpenedDeleteConfirmation}
      position="left"
    >
      <Popover.Target>
        <Button
          w="2rem"
          p="0px"
          variant="transparent"
          c="var(--mantine-color-gray-6)"
          onClick={() => setOpenedDeleteConfirmation((o) => !o)}
          bg={openedDeleteConfirmation ? 'var(--mantine-color-gray-2)' : ''}
          ml="xs"
        >
          <FaRegTrashAlt />
        </Button>
      </Popover.Target>
      <Popover.Dropdown
        w="28vw"
        bg="var(--mantine-color-gray-0)"
        bd=" 1px solid var(--mantine-color-cyan-3)"
      >
        <Stack align="center" p="md" gap="xs">
          <Text fw="700" ta="center">
            Are you sure you want to delete this entry?
          </Text>
          <Text fz="sm" c="var(--mantine-color-gray-7)">
            All references to this entry will be also deleted.
          </Text>

          <Flex gap="0.5rem" w="100%" justify="center" my="md">
            <Text fw="500" mr="md">
              Entry:
            </Text>
            <Box h="1.4rem" mr="xs" mt="0.2rem">
              <BlockReferenceId referenceId={blocksContent[idx].blockContent[referenceId].id} />
            </Box>
            <Text className={classes.trunckedText}>
              [{referenceId + 1}]{' '}
              {DOMPurify.sanitize(blocksContent[idx].blockContent[referenceId].label, {
                ALLOWED_TAGS: [],
                ALLOWED_ATTR: [],
              })}
            </Text>
          </Flex>
          <Flex justify="center">
            <Button
              color="red"
              onClick={() => {
                deleteReference(referenceId);
              }}
              mx="xs"
              w="10rem"
            >
              Delete
            </Button>
            <Button
              w="10rem"
              color="cyan"
              variant="outline"
              mx="xs"
              onClick={() => {
                setOpenedDeleteConfirmation(false);
              }}
            >
              Cancel
            </Button>
          </Flex>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
