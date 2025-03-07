import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { FaArrowDown, FaArrowUp, FaRegTrashAlt } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { IoMdMore } from 'react-icons/io';
import { LuHeading1, LuHeading2 } from 'react-icons/lu';
import { MdOutlineAdd } from 'react-icons/md';
import { PiTextTBold } from 'react-icons/pi';
import { TbForbid2 } from 'react-icons/tb';
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
  Paper,
  Stack,
  VisuallyHidden,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { blockType } from '@/Types';
import styles from './blocks.module.css';

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

  const frameToolBar = (addBlockFunction: (block: blockType) => void): ReactElement => {
    return (
      <>
        {idx === activeSection ? (
          <Flex justify="space-between">
            <Stack w="6vw" ml="0px" justify="flex-end">
              <Badge m="xs" ml="md" mt="sm" mr={0} radius="md" w='100%' color="cyan" variant="transparent">
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
                    <Menu.Item leftSection={<FaArrowUp />}
                    disabled={activeSection===1 ? true : false}
                    >Move up</Menu.Item>
                    <Menu.Item leftSection={<FaArrowDown />}
                     disabled={activeSection===sectionsContent.length-1 ? true : false}
                    >Move down</Menu.Item>
                    <Menu.Item leftSection={<FaRegTrashAlt />}>Delete Block</Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                <Button
                  variant="transparent"
                  size="compact-sm"
                  mt="xs"
                  onClick={() => setActiveSecion(0)}
                  className={styles.stickyElement}
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
        )}{' '}
      </>
    );
  };

  return (
    <Flex>
      <Paper
        radius="0px"
        p="xl"
        pt="0px"
        pb="0px"
        w="40vw"
        className={idx === activeSection ? styles.blockFrameStyle : ''}
      >
        {frameToolBar(addBlockAbove)}
        <Box className={idx === activeSection ? styles.sectionBlockStyle : ''} w="100%" p="0px">
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
  );
}
