import { Dispatch, SetStateAction } from 'react';
import { FaArrowDown, FaArrowUp, FaRegTrashAlt } from 'react-icons/fa';
import { IoMdMore } from 'react-icons/io';
import { LuHeading1, LuHeading2 } from 'react-icons/lu';
import { MdOutlineAdd } from 'react-icons/md';
import { PiTextTBold } from 'react-icons/pi';
import { TbForbid2 } from 'react-icons/tb';
import { Badge, Box, Button, Flex, Menu, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
//import { blocksList } from '../oldBlocksList';
import { blocksList } from '@/pages/Document/blocksList';
import { blockType } from '@/Types';
import classes from '../blocks.module.css';

type ButtonsOfMarkedBlockPropsType = {
  idx: number;
  activeBlockState: [number, Dispatch<SetStateAction<number>>];
  blockName: string;
  blockContentState: [blockType[], Dispatch<SetStateAction<blockType[]>>];
  typeOfAddBlockFunction: 'above' | 'below';
  activeTextInputState: [string, Dispatch<SetStateAction<string>>];
  deleteModalHandlers: any;
};

export default function ButtonsOfMarkedBlock({
  idx,
  activeBlockState,
  blockName,
  blockContentState,
  typeOfAddBlockFunction,
  activeTextInputState,
  deleteModalHandlers,
}: ButtonsOfMarkedBlockPropsType) {
  //const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  const [activeBlock, setActiveBlock] = activeBlockState;
  const [sectionsContent, setSectionsContent] = blockContentState;
  const [activeTextInput, setActiveTextInput] = activeTextInputState;

  const moveBlockUp = () => {
    let blocks = [...sectionsContent];
    const [block] = blocks.splice(activeBlock, 1);
    blocks.splice(activeBlock - 1, 0, block);
    setSectionsContent(blocks);
    setActiveBlock(activeBlock - 1);
    setActiveTextInput('');
  };
  const moveBlockDown = () => {
    let blocks = [...sectionsContent];
    const [block] = blocks.splice(activeBlock, 1);
    blocks.splice(activeBlock + 1, 0, block);
    setSectionsContent(blocks);
    setActiveBlock(activeBlock + 1);
    setActiveTextInput('');
  };

  const addBlockBelow = (block: blockType) => {
    let blocks = [...sectionsContent];
    blocks.splice(activeBlock + 1, 0, block);
    setSectionsContent(blocks);
    setActiveBlock(activeBlock + 1);
  };

  const addBlockAbove = (block: blockType) => {
    let blocks = [...sectionsContent];
    blocks.splice(activeBlock, 0, block);
    setSectionsContent(blocks);
  };

  const addBlockFunction = typeOfAddBlockFunction === 'above' ? addBlockAbove : addBlockBelow;

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
            <Menu>
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
                      leftSection={<block.Icon />}
                    >
                      {block.blockName}
                    </Menu.Item>
                  );
                })}
                {/* <Menu.Item
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
                </Menu.Item> */}
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
                    disabled={activeBlock === 1 ? true : false}
                    onClick={moveBlockUp}
                  >
                    Move up
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<FaArrowDown />}
                    disabled={activeBlock === sectionsContent.length - 1 ? true : false}
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
                onClick={() => setActiveBlock(0)}
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
        <Box h="42px" />
      )}
    </>
  );
}
