import { Dispatch, SetStateAction, useState } from 'react';
import { cloneDeep } from 'lodash';
import { FaArrowDown, FaArrowUp, FaRegTrashAlt } from 'react-icons/fa';
import { IoMdMore } from 'react-icons/io';
import { LuHeading1, LuHeading2 } from 'react-icons/lu';
import { MdOutlineAdd } from 'react-icons/md';
import { PiTextTBold } from 'react-icons/pi';
import { TbForbid2 } from 'react-icons/tb';
import { Badge, Box, Button, Center, Flex, Menu, Stack, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AddComboox } from '@/components/other/AddCombobox';
//import { blocksList } from '../oldBlocksList';
import { useBlocksList } from '@/pages/Document/components/blocksList';
import { useAddBlock } from '@/pages/Document/hooksAndUtils/documentHooks';
import { blockType } from '@/Types';
import {
  useActiveBlockContext,
  useActiveTextfieldContext,
  useBlocksContentContext,
} from '../../../DocumentContextProviders';
import classes from '../blocks.module.css';

type ButtonsOfMarkedBlockPropsType = {
  idx: number;
  //activeBlockState: [number, Dispatch<SetStateAction<number>>];
  blockName: string;
  //blockContentState: [blockType[], Dispatch<SetStateAction<blockType[]>>];
  typeOfAddBlockFunction: 'above' | 'below';
  //activeTextInputState: [string, Dispatch<SetStateAction<string>>];
  deleteModalHandlers: any;
};

export default function ButtonsOfMarkedBlock({
  idx,
  //activeBlockState,
  blockName,
  //blockContentState,
  typeOfAddBlockFunction,
  //activeTextInputState,
  deleteModalHandlers,
}: ButtonsOfMarkedBlockPropsType) {
  //const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  //const [activeBlock, setActiveBlock] = activeBlockState;
  //const [sectionsContent, setSectionsContent] = blockContentState;
  //const [activeTextInput, setActiveTextInput] = activeTextInputState;

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
            {/* <Menu>
              <Menu.Target>
                <Button variant="transparent" size="compact-xs" mt="xs" w="2rem" h="1.5rem" m="0px">
                  <MdOutlineAdd />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {blocksList.map((block) => {
                  return (
                    <Menu.Item
                      onClick={() => addBlockFunction(block.blockToAdd)}
                      leftSection={block.Icon ? <block.Icon /> : null}
                    >
                      {block.blockName}
                    </Menu.Item>
                  );
                })}
               
              </Menu.Dropdown>
            </Menu> */}
            <AddComboox
              data={blocksList ? blocksList : []}
              withGroups
              floatingStrategy="fixed"
              placeholder=""
              position="left-start"
              buttonContent={
                <Text
                  w="100%"
                  mt="4px"
                  //mt="11px"
                  p="0px"
                  h="1.5rem"
                  m="0px"
                  //mr="9px"
                  ta="center"
                >
                  <MdOutlineAdd />
                </Text>
              }
              //expressionInputContentState,
              insertFunction={(value) => {
                addBlock(value, typeOfAddBlockFunction === 'above' ? 0 : 1);
              }}
              iconSize="0.8rem"
              tooltip={`Add block ${typeOfAddBlockFunction}`}
              belongingValidator={blocksContent[0].blockContent as string}
            />
            <Flex>
              <Menu
                opened={openedMenu}
                onChange={setOpenedMenu}
                position="left-start"
                //withArrow
                arrowSize={8}
                styles={{ arrow: { border: ' 1px solid var(--mantine-color-cyan-2)' } }}
              >
                <Menu.Target>
                  <Tooltip
                    label="More"
                    //label={buttonsNotToRender.includes(idx) ? 'true' : 'false'}
                    color="cyan"
                    position="bottom"
                    offset={5}
                    withArrow
                    arrowOffset={50}
                    arrowSize={7}
                    arrowRadius={2}
                  >
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
                    >
                      <Text
                        w="100%"
                        mt="5px"
                        //mt="11px"
                        p="0px"
                        h="1.5rem"
                        m="0px"
                        //mr="9px"
                        ta="center"
                      >
                        <IoMdMore />
                      </Text>
                    </Button>
                  </Tooltip>
                </Menu.Target>
                <Menu.Dropdown
                  bg="var(--mantine-color-gray-0)"
                  bd=" 1px solid var(--mantine-color-cyan-3)"
                >
                  <Menu.Item
                    leftSection={<FaArrowUp />}
                    disabled={activeBlock === 1}
                    onClick={moveBlockUp}
                  >
                    Move up
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<FaArrowDown />}
                    disabled={activeBlock === blocksContent.length - 1}
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

              <Tooltip
                label="Unmark block"
                //label={buttonsNotToRender.includes(idx) ? 'true' : 'false'}
                color="cyan"
                position="bottom"
                offset={5}
                withArrow
                arrowOffset={50}
                arrowSize={7}
                arrowRadius={2}
              >
                <Button
                  variant="transparent"
                  //size="compact-sm"
                  //mt="xs"
                  p="0px"
                  //mt="6px"
                  onClick={() => {
                    setActiveBlock(0);
                    //setActiveTextfield('');
                  }}
                  className={classes.stickyElement}
                  w="2rem"
                  //h="1.5rem"
                  m="0px"
                >
                  <Text
                    w="100%"
                    mt="5px"
                    //mt="11px"
                    p="0px"
                    h="1.5rem"
                    m="0px"
                    //mr="9px"
                    ta="center"
                  >
                    {' '}
                    <TbForbid2 />
                  </Text>
                </Button>
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Box h="42px" />
      )}
    </>
  );
}
