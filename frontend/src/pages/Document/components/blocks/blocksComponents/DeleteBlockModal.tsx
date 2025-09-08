import { Dispatch, SetStateAction } from 'react';
import { cloneDeep } from 'lodash';
import { FaRegTrashAlt } from 'react-icons/fa';
import sanitizeHtml from 'sanitize-html';
import { Button, Flex, Group, Modal, SimpleGrid, Stack, Text } from '@mantine/core';
import {
  useActiveBlockContext,
  useBlocksContentContext,
} from '@/pages/Document/DocumentContextProviders';
import { blockTypeToOfficialName } from '@/pages/Document/documentHandlers';
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
    setActiveBlock(0);
    setBlocksContent(blocks);
  };

  const getDeleteBlockContent = () => {
    const blockType = blocksContent[activeBlock].typeOfBlock;
    const docuimentclass = blocksContent[0].blockContent;
    switch (blockType as unknown as string) {
      case 'documentclass':
        return 'Document type';
      case 'titlePage':
        if (docuimentclass === 'letter') {
          return (
            <Flex>
              <Stack mr="md" gap="0px" c="var(--mantine-color-gray-6)">
                <Text>Address:</Text> <Text>Date:</Text>
              </Stack>
              <Stack gap="0px">
                <Text className={classes.trunckedText}>
                  {sanitizeHtml(blocksContent[activeBlock].blockContent.author, {
                    allowedTags: [],
                  })}
                </Text>

                <Text className={classes.trunckedText}>
                  {sanitizeHtml(blocksContent[activeBlock].blockContent.date, { allowedTags: [] })}
                </Text>
              </Stack>
            </Flex>
          );
        }
        return (
          <Flex>
            <Stack mr="md" gap="0px" c="var(--mantine-color-gray-6)">
              <Text>Title: </Text>
              <Text>Author:</Text> <Text>Date:</Text>
            </Stack>
            <Stack gap="0px">
              <Text className={classes.trunckedText} m="0px" p="0px">
                {sanitizeHtml(blocksContent[activeBlock].blockContent.title, { allowedTags: [] })}
              </Text>

              <Text className={classes.trunckedText}>
                {sanitizeHtml(blocksContent[activeBlock].blockContent.author, { allowedTags: [] })}
              </Text>

              <Text className={classes.trunckedText}>
                {sanitizeHtml(blocksContent[activeBlock].blockContent.date, { allowedTags: [] })}
              </Text>
            </Stack>
          </Flex>
        );
      case 'tableOfContents':
        return '';
      case 'pageBreak':
        if (docuimentclass === 'beamer') {
          return (
            <Flex>
              <Stack mr="md" gap="0px" c="var(--mantine-color-gray-6)">
                <Text>Slide title:</Text> <Text>Slide subtitle</Text>
              </Stack>
              <Stack gap="0px">
                <Text className={classes.trunckedText}>
                  {sanitizeHtml(blocksContent[activeBlock].blockContent.title, {
                    allowedTags: [],
                  })}
                </Text>

                <Text className={classes.trunckedText}>
                  {sanitizeHtml(blocksContent[activeBlock].blockContent.subtitle, {
                    allowedTags: [],
                  })}
                </Text>
              </Stack>
            </Flex>
          );
        }
        return '';
      case 'equation':
        return (
          <Text className={classes.trunkTo3Lines}>
            {sanitizeHtml(blocksContent[activeBlock].blockContent.content, { allowedTags: [] })}
          </Text>
        );
      case 'table':
        return (
          <Text className={classes.trunkTo3Lines}>
            {sanitizeHtml(blocksContent[activeBlock].blockContent.label, { allowedTags: [] })}
          </Text>
        );
      case 'figure':
        return (
          <Text className={classes.trunkTo3Lines}>
            {sanitizeHtml(blocksContent[activeBlock].blockContent.label, { allowedTags: [] })}
          </Text>
        );
      case 'references':
        return (
          <>
            <Stack gap="0px">
              <Text className={classes.trunkTo3Lines}>
                {sanitizeHtml(['[1] ', blocksContent[activeBlock].blockContent[0].label].join(''), {
                  allowedTags: [],
                })}
              </Text>
              {blocksContent[activeBlock].blockContent.length > 1 && (
                <Flex>
                  <Text mr="xs">. . .</Text>
                  <Text c="var(--mantine-color-gray-6)">
                    ({blocksContent[activeBlock].blockContent.length - 1} more)
                  </Text>
                </Flex>
              )}
            </Stack>
          </>
        );
      default:
        return (
          <Text className={classes.trunkTo3Lines}>
            {sanitizeHtml(blocksContent[activeBlock].blockContent, { allowedTags: [] })}
          </Text>
        );
    }
  };

  return (
    <Modal
      opened={deleteModalOpened}
      onClose={deleteModalHandlers.close}
      transitionProps={{ transition: 'fade-up' }}
      centered
      size="xl"
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
            verticalSpacing="1rem"
            pt="0px"
            pb="md"
            w="100%"
            spacing="xl"
          >
            <b>Type:</b>
            {
              //blocksContent[activeBlock] ? blocksContent[activeBlock].typeOfBlock : ' '

              blockTypeToOfficialName(
                blocksContent[activeBlock].typeOfBlock,
                blocksContent[0].blockContent
              )
            }
            <b>Content: </b>

            {
              getDeleteBlockContent()
              //sanitizeHtml(sectionsContent[activeSection].blockContent, { allowedTags: [] })
            }
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
