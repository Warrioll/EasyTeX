import { Dispatch, SetStateAction } from 'react';
import { cloneDeep } from 'lodash';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Button, Group, Modal, SimpleGrid, Text } from '@mantine/core';
import {
  useActiveBlockContext,
  useBlocksContentContext,
} from '@/pages/Document/DocumentContextProviders';
import { blockType } from '@/Types';
import classes from '../blocks.module.css';

type DeleteBlockModalPropsType = {
  deleteModalOpened: boolean;
  deleteModalHandlers: any;
  //blockContentState:[blockType[], Dispatch<SetStateAction<blockType[]>>],
  //activeBlock: number
};

export default function DeleteBlockModal({
  deleteModalOpened,
  deleteModalHandlers, //blockContentState, activeBlock
}: DeleteBlockModalPropsType) {
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();

  //const [sectionsContent, setSectionsContent] = blockContentState;

  const deleteBlock = () => {
    let blocks = cloneDeep(blocksContent);
    blocks.splice(activeBlock, 1);
    deleteModalHandlers.close();
    setBlocksContent(blocks);
  };

  return (
    <Modal
      opened={deleteModalOpened}
      onClose={deleteModalHandlers.close}
      transitionProps={{ transition: 'fade-up' }}
      yOffset="12%"
      size="lg"
      title={
        <Text c="var(--mantine-color-cyan-8)">
          <b>Delete block</b>
        </Text>
      }
    >
      <SimpleGrid mt="0px" cols={1} verticalSpacing="md" ta="center" p="xl" pt="md" pb="md">
        <Text fz="1.3rem" m="lg" mb="0px">
          Are you sure you want to delete this block?
        </Text>
        <Group justify="center" m="0px" mt="lg" p="0px">
          <SimpleGrid
            ml="xl"
            mr="xl"
            mb="md"
            mt="0px"
            cols={2}
            ta="left"
            verticalSpacing="0.1rem"
            pt="0px"
            pb="md"
            w="84%"
            spacing="xl"
          >
            <b>Type:</b>
            {blocksContent[activeBlock].typeOfBlock ? blocksContent[activeBlock].typeOfBlock : ''}
            <b>Content: </b>
            <Text className={classes.trunckedText}>
              {
                //sanitizeHtml(sectionsContent[activeSection].blockContent, { allowedTags: [] })
              }
            </Text>
          </SimpleGrid>
        </Group>
        <SimpleGrid cols={2} spacing="xl" mt="md">
          <Button leftSection={<FaRegTrashAlt />} color="red" onClick={deleteBlock}>
            Delete
          </Button>
          <Button color="cyan" variant="outline" onClick={deleteModalHandlers.close}>
            Cancel
          </Button>
        </SimpleGrid>
      </SimpleGrid>
    </Modal>
  );
}
