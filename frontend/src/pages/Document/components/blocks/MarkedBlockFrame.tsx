import React, { Children, Dispatch, ReactElement, SetStateAction } from 'react';
import parse from 'html-react-parser';
import { FaArrowDown, FaArrowUp, FaRegTrashAlt } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { IoMdMore } from 'react-icons/io';
import { LuHeading1, LuHeading2 } from 'react-icons/lu';
import { MdOutlineAdd } from 'react-icons/md';
import { PiTextTBold } from 'react-icons/pi';
import { TbForbid2 } from 'react-icons/tb';
import sanitizeHtml from 'sanitize-html';
import {
  Affix,
  Badge,
  Box,
  Button,
  Flex,
  FocusTrap,
  Grid,
  Group,
  Menu,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { blockType } from '@/Types';
import classes from './blocks.module.css';

type MarkedBlockFrameProps = {
  idx: number;
  activeSection: number;
  setActiveSecion: Dispatch<SetStateAction<number>>;
  blockName: string;
  children: React.ReactNode;
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
};

export default function MarkedBlockFrame({
  children,
  idx,
  activeSection,
  setActiveSecion,
  blockName,
  sectionsContent,
  setSectionsContent,
}: MarkedBlockFrameProps) {
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);

  //editor trzeba wyczyszczać czy coś przy dodawaniu textfiesd
  const addBlockBelow = (block: blockType) => {
    let blocks = [...sectionsContent];
    blocks.splice(activeSection + 1, 0, block);
    setSectionsContent(blocks);
    setActiveSecion(activeSection + 1);
  };

  const addBlockAbove = (block: blockType) => {
    let blocks = [...sectionsContent];
    blocks.splice(activeSection, 0, block);
    setSectionsContent(blocks);
  };

  const moveBlockUp = () => {
    let blocks = [...sectionsContent];
    const [block] = blocks.splice(activeSection, 1);
    blocks.splice(activeSection - 1, 0, block);
    setSectionsContent(blocks);
    setActiveSecion(activeSection - 1);
  };
  const moveBlockDown = () => {
    let blocks = [...sectionsContent];
    const [block] = blocks.splice(activeSection, 1);
    blocks.splice(activeSection + 1, 0, block);
    setSectionsContent(blocks);
    setActiveSecion(activeSection + 1);
  };

  const deleteBlock = () => {
    let blocks = [...sectionsContent];
    blocks.splice(activeSection, 1);
    setSectionsContent(blocks);
    deleteModalHandlers.close();
  };

  const frameToolBar = (addBlockFunction: (block: blockType) => void): ReactElement => {
    return (
      <>
        {idx === activeSection ? (
          <Flex justify="space-between">
            <Stack w="100%" ml="0px" align="flex-start" justify="flex-end">
              <Badge m="xs" ml="md" mt="sm" mr={0} radius="md" color="cyan" variant="transparent">
                {blockName}
              </Badge>
            </Stack>
            <Flex gap="0px">
              <Menu>
                <Menu.Target>
                  <Button
                    variant="transparent"
                    size="compact-xs"
                    mt="xs"
                    w="2rem"
                    h="1.5rem"
                    m="0px"
                  >
                    <MdOutlineAdd />
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => addBlockFunction({ typeOfBlock: 'section', blockContent: '' })}
                    leftSection={<LuHeading1 />}
                  >
                    Section
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => addBlockFunction({ typeOfBlock: 'textfield', blockContent: '' })}
                    leftSection={<PiTextTBold />}
                  >
                    Textfield
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Flex>
                <Menu position="left-start">
                  <Menu.Target>
                    <Button
                      variant="transparent"
                      mt="xs"
                      size="compact-sm"
                      w="2rem"
                      h="1.5rem"
                      m="0px"
                    >
                      <IoMdMore />
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<FaArrowUp />}
                      disabled={activeSection === 1 ? true : false}
                      onClick={moveBlockUp}
                    >
                      Move up
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<FaArrowDown />}
                      disabled={activeSection === sectionsContent.length - 1 ? true : false}
                      onClick={moveBlockDown}
                    >
                      Move down
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      leftSection={<FaRegTrashAlt />}
                      onClick={deleteModalHandlers.open}
                    >
                      Delete Block
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                <Button
                  variant="transparent"
                  size="compact-sm"
                  mt="xs"
                  onClick={() => setActiveSecion(0)}
                  className={classes.stickyElement}
                  w="2rem"
                  h="1.5rem"
                  m="0px"
                >
                  <TbForbid2 />
                </Button>
              </Flex>
            </Flex>
          </Flex>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <>
      <Flex>
        <Paper
          radius="0px"
          p="xl"
          pt="0px"
          pb="0px"
          w="40vw"
          className={idx === activeSection ? classes.blockFrameStyle : ''}
        >
          {frameToolBar(addBlockAbove)}
          <Box className={idx === activeSection ? classes.sectionBlockStyle : ''} w="100%" p="0px">
            {children}
          </Box>
          {frameToolBar(addBlockBelow)}
          {/* {idx === activeSection ? (
          <Flex justify="center" >
            <Menu>
              <Menu.Target>
                <Button variant="transparent" size="compact-xs" m="xs">
                  <MdOutlineAdd /> Add Block
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => addBlockBelow({ typeOfBlock: 'section', blockContent: '' })}
                  leftSection={<LuHeading1 />}
                >
                  Section
                </Menu.Item>
                <Menu.Item
                  onClick={() => addBlockBelow({ typeOfBlock: 'textfield', blockContent: '' })}
                  leftSection={<PiTextTBold />}
                >
                  Textfield
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        ) : (
          <></>
        )} */}
        </Paper>
      </Flex>
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
              {
                //sectionsContent[activeSection].typeOfBlock
              }
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
    </>
  );
}
