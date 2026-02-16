import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { FaArrowDown, FaArrowUp, FaRegTrashAlt } from 'react-icons/fa';
import { IoMdMore } from 'react-icons/io';
import { MdOutlineAdd } from 'react-icons/md';
import { TbForbid2 } from 'react-icons/tb';
import { Badge, Box, Button, Flex, Menu, Stack, Text } from '@mantine/core';
import { AddComboox } from '@/components/other/AddCombobox';
import CustomTooltip from '@/components/other/CustomTooltip';
import { useBlocksList } from '@/pages/Document/components/blocksListAndPrototypes';
import { useAddBlock } from '@/pages/Document/hooksAndUtils/documentHooks';
import {
  useActiveBlockContext,
  useActiveTextfieldContext,
  useBlocksContentContext,
} from '../../../DocumentContextProviders';
import classes from '../blocks.module.css';

type ButtonsOfMarkedBlockPropsType = {
  idx: number;

  blockName: string;

  typeOfAddBlockFunction: 'above' | 'below';

  deleteModalHandlers: any;
};

export default function ButtonsOfMarkedBlock({
  idx,

  blockName,

  typeOfAddBlockFunction,

  deleteModalHandlers,
}: ButtonsOfMarkedBlockPropsType) {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();
  const { activeTextfield, setActiveTextfield } = useActiveTextfieldContext();

  const [openedMenu, setOpenedMenu] = useState<boolean>(false);

  const blocksList = useBlocksList();
  const { addBlock } = useAddBlock();

  const moveBlockUp = () => {
    let blocks = cloneDeep(blocksContent);
    const [block] = blocks.splice(activeBlock, 1);
    blocks.splice(activeBlock - 1, 0, block);
    setBlocksContent(blocks);
    setActiveBlock(activeBlock - 1);
    setActiveTextfield('');
    setIsNotSaved(true);
  };
  const moveBlockDown = () => {
    let blocks = cloneDeep(blocksContent);
    const [block] = blocks.splice(activeBlock, 1);
    blocks.splice(activeBlock + 1, 0, block);
    setBlocksContent(blocks);
    setActiveBlock(activeBlock + 1);
    setActiveTextfield('');
    setIsNotSaved(true);
  };

  return (
    <>
      {idx === activeBlock ? (
        <Flex justify="space-between">
          <Stack w="100%" ml="0px" align="flex-start" justify="flex-end">
            <Badge m="xs" ml="md" mt="sm" mr={0} radius="md" color="cyan" variant="transparent">
              {blockName}
            </Badge>
          </Stack>
          <Flex gap="0px">
            <AddComboox
              data={blocksList ? blocksList : []}
              withGroups
              floatingStrategy="fixed"
              placeholder=""
              position="left-start"
              buttonContent={
                <Text w="100%" mt="4px" p="0px" h="1.5rem" m="0px" ta="center">
                  <MdOutlineAdd />
                </Text>
              }
              insertFunction={(value) => {
                addBlock(value, typeOfAddBlockFunction === 'above' ? 0 : 1);
              }}
              iconSize="0.8rem"
              tooltip={`Add block ${typeOfAddBlockFunction}`}
              belongingValidator={blocksContent[0].blockContent.class as string}
            />
            <Flex>
              <Menu
                opened={openedMenu}
                onChange={setOpenedMenu}
                position="left-start"
                arrowSize={8}
                styles={{ arrow: { border: ' 1px solid var(--mantine-color-cyan-2)' } }}
              >
                <Menu.Target>
                  <CustomTooltip label="More">
                    <Button
                      variant="transparent"
                      //mt="xs"
                      //mt="6px"
                      //size="compact-sm"
                      w="2rem"
                      p="0px"
                      //h="1.5rem"
                      m="0px"
                      bg={openedMenu ? 'var(--mantine-color-gray-2)' : ''}
                      onClick={() => {
                        setOpenedMenu((prev) => !prev);
                      }}
                    >
                      <Text w="100%" mt="5px" p="0px" h="1.5rem" m="0px" ta="center">
                        <IoMdMore />
                      </Text>
                    </Button>
                  </CustomTooltip>
                </Menu.Target>
                <Menu.Dropdown
                  bg="var(--mantine-color-cyan-0)"
                  bd=" 1px solid var(--mantine-color-cyan-3)"
                >
                  <Menu.Item
                    leftSection={<FaArrowUp />}
                    disabled={activeBlock === 1}
                    onClick={moveBlockUp}
                    className={classes.markedBlockFrameMoreButton}
                  >
                    Move up
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<FaArrowDown />}
                    disabled={activeBlock === blocksContent.length - 1}
                    onClick={moveBlockDown}
                    className={classes.markedBlockFrameMoreButton}
                  >
                    Move down
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={<FaRegTrashAlt />}
                    onClick={deleteModalHandlers.open}
                  >
                    Remove Block
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <CustomTooltip label="Unmark block">
                <Button
                  variant="transparent"
                  p="0px"
                  onClick={() => {
                    setActiveBlock(0);
                  }}
                  className={classes.stickyElement}
                  w="2rem"
                  m="0px"
                >
                  <Text w="100%" mt="5px" p="0px" h="1.5rem" m="0px" ta="center">
                    {' '}
                    <TbForbid2 />
                  </Text>
                </Button>
              </CustomTooltip>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Box h="42px" />
      )}
    </>
  );
}
