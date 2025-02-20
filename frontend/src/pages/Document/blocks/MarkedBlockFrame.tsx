import React, { Dispatch, SetStateAction } from 'react';
import { FaArrowDown, FaArrowUp, FaRegTrashAlt } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
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

  return (
    <Flex>
      <Stack w="6vw" align="flex-end" pr="xs">
        {idx === activeSection ? (
          <Badge mt="lg" mr={0} radius="md" color="cyan" variant="light">
            {blockName}
          </Badge>
        ) : (
          <></>
        )}
      </Stack>

      <Paper
        radius="0px"
        p="xl"
        pt="0px"
        pb="0px"
        w="40vw"
        className={idx === activeSection ? styles.blockFrameStyle : ''}
      >
        {idx === activeSection ? (
          <Flex justify="center">
            <Menu>
              <Menu.Target>
                <Button variant="transparent" size="compact-xs" m="xs">
                  <MdOutlineAdd /> Add Block
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => addBlockAbove({ typeOfBlock: 'section', blockContent: '' })}
                  leftSection={<LuHeading1 />}
                >
                  Section
                </Menu.Item>
                <Menu.Item
                  onClick={() => addBlockAbove({ typeOfBlock: 'textfield', blockContent: '' })}
                  leftSection={<PiTextTBold />}
                >
                  Textfield
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        ) : (
          <></>
        )}
        <Box className={idx === activeSection ? styles.sectionBlockStyle : ''} w="100%" p="0px">
          {children}
        </Box>
        {idx === activeSection ? (
          <Flex justify="center">
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
        )}
      </Paper>

      <Box w="3rem">
        {idx === activeSection ? (
          //     <Stack
          //   align="flex-end"
          //   justify="flex-start"
          //   gap="0%"
          // >
          <Stack gap="xs" m="10%">
            <Menu position="left-start">
              <Menu.Target>
                <Button variant="light" mt="xs" size="compact-md">
                  <FiMoreHorizontal />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<FaArrowUp />}>Move up</Menu.Item>
                <Menu.Item leftSection={<FaArrowDown />}>Move down</Menu.Item>
                <Menu.Item leftSection={<FaRegTrashAlt />}>Delete Block</Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Button
              variant="light"
              size="compact-md"
              onClick={() => setActiveSecion(0)}
              className={styles.stickyElement}
            >
              <TbForbid2 />
            </Button>
          </Stack>
        ) : (
          // <Button variant="format" disabled style={{ opacity: '0%' }}>
          //   <FiMoreHorizontal />
          // </Button>
          <></>
        )}
      </Box>
    </Flex>
  );
}
