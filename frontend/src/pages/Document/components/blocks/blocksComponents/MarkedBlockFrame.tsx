import React, { Children, Dispatch, ReactElement, SetStateAction } from 'react';
import parse from 'html-react-parser';
import { cloneDeep } from 'lodash';
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
import { useActiveBlockContext, useBlocksContentContext } from '../../../DocumentContextProviders';
import ButtonsOfMarkedBlock from './ButtonsOfMarkedBlock';
import DeleteBlockModal from './DeleteBlockModal';
import classes from '../blocks.module.css';

type MarkedBlockFrameProps = {
  idx: number;
  //activeBlockState: [number, Dispatch<SetStateAction<number>>];
  //activeSection: number;
  //setActiveSecion: Dispatch<SetStateAction<number>>;
  blockName: string;
  children: React.ReactNode;
  //sectionsContent: blockType[];
  //setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
  //activeTextInputState: [string, Dispatch<SetStateAction<string>>];
};

export default function MarkedBlockFrame({
  children,
  idx,
  //activeSection,
  //setActiveSecion,
  //activeBlockState,
  blockName,
  //sectionsContent,
  //setSectionsContent,
  //activeTextInputState,
}: MarkedBlockFrameProps) {
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();

  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  //const [activeBlock, setActiveBlock] = activeBlockState;

  //editor trzeba wyczyszczać czy coś przy dodawaniu textfiesd
  const addBlockBelow = (block: blockType) => {
    let blocks = cloneDeep(blocksContent);
    blocks.splice(activeBlock + 1, 0, block);
    setBlocksContent(blocks);
    setActiveBlock(activeBlock + 1);
  };

  const addBlockAbove = (block: blockType) => {
    let blocks = cloneDeep(blocksContent);
    blocks.splice(activeBlock, 0, block);
    setBlocksContent(blocks);
  };

  const moveBlockUp = () => {
    let blocks = cloneDeep(blocksContent);
    const [block] = blocks.splice(activeBlock, 1);
    blocks.splice(activeBlock - 1, 0, block);
    setBlocksContent(blocks);
    setActiveBlock(activeBlock - 1);
  };
  const moveBlockDown = () => {
    let blocks = cloneDeep(blocksContent);
    const [block] = blocks.splice(activeBlock, 1);
    blocks.splice(activeBlock + 1, 0, block);
    setBlocksContent(blocks);
    setActiveBlock(activeBlock + 1);
  };

  const deleteBlock = () => {
    let blocks = cloneDeep(blocksContent);
    blocks.splice(activeBlock, 1);
    setBlocksContent(blocks);
    deleteModalHandlers.close();
  };

  // const frameToolBar = (addBlockFunction: (block: blockType) => void): ReactElement => {
  //   return (
  //     <>
  //       {idx === activeBlock ? (
  //         <Flex justify="space-between">
  //           <Stack w="100%" ml="0px" align="flex-start" justify="flex-end">
  //             <Badge m="xs" ml="md" mt="sm" mr={0} radius="md" color="cyan" variant="transparent">
  //               {blockName}
  //             </Badge>
  //           </Stack>
  //           <Flex gap="0px">
  //             <Menu>
  //               <Menu.Target>
  //                 <Button
  //                   variant="transparent"
  //                   size="compact-xs"
  //                   mt="xs"
  //                   w="2rem"
  //                   h="1.5rem"
  //                   m="0px"
  //                 >
  //                   <MdOutlineAdd />
  //                 </Button>
  //               </Menu.Target>
  //               <Menu.Dropdown>
  //                 <Menu.Item
  //                   onClick={() => addBlockFunction({ typeOfBlock: 'section', blockContent: '' })}
  //                   leftSection={<LuHeading1 />}
  //                 >
  //                   Section
  //                 </Menu.Item>
  //                 <Menu.Item
  //                   onClick={() => addBlockFunction({ typeOfBlock: 'textfield', blockContent: '' })}
  //                   leftSection={<PiTextTBold />}
  //                 >
  //                   Textfield
  //                 </Menu.Item>
  //               </Menu.Dropdown>
  //             </Menu>
  //             <Flex>
  //               <Menu position="left-start">
  //                 <Menu.Target>
  //                   <Button
  //                     variant="transparent"
  //                     mt="xs"
  //                     size="compact-sm"
  //                     w="2rem"
  //                     h="1.5rem"
  //                     m="0px"
  //                   >
  //                     <IoMdMore />
  //                   </Button>
  //                 </Menu.Target>
  //                 <Menu.Dropdown>
  //                   <Menu.Item
  //                     leftSection={<FaArrowUp />}
  //                     disabled={activeBlock === 1 ? true : false}
  //                     onClick={moveBlockUp}
  //                   >
  //                     Move up
  //                   </Menu.Item>
  //                   <Menu.Item
  //                     leftSection={<FaArrowDown />}
  //                     disabled={activeBlock === sectionsContent.length - 1 ? true : false}
  //                     onClick={moveBlockDown}
  //                   >
  //                     Move down
  //                   </Menu.Item>
  //                   <Menu.Item
  //                     color="red"
  //                     leftSection={<FaRegTrashAlt />}
  //                     onClick={deleteModalHandlers.open}
  //                   >
  //                     Delete Block
  //                   </Menu.Item>
  //                 </Menu.Dropdown>
  //               </Menu>

  //               <Button
  //                 variant="transparent"
  //                 size="compact-sm"
  //                 mt="xs"
  //                 onClick={() => setActiveBlock(0)}
  //                 className={classes.stickyElement}
  //                 w="2rem"
  //                 h="1.5rem"
  //                 m="0px"
  //               >
  //                 <TbForbid2 />
  //               </Button>
  //             </Flex>
  //           </Flex>
  //         </Flex>
  //       ) : (
  //         <></>
  //       )}
  //     </>
  //   );
  // };
  //console.log('Markedblock sectionsContent: ', sectionsContent)
  return (
    <div
      key={idx}
      tabIndex={idx}
      onFocus={async () => {
        //toggle();
        setActiveBlock(idx);
      }}
    >
      <Flex>
        <Paper
          radius="0px"
          pt="0px"
          pb="0px"
          pl="lg"
          pr="lg"
          w="40vw"
          className={
            idx === Math.floor(activeBlock) ? classes.blockFrameStyle : classes.unmarkedFramePaper
          }
        >
          <ButtonsOfMarkedBlock
            idx={idx}
            blockName={blockName}
            typeOfAddBlockFunction="above"
            deleteModalHandlers={deleteModalHandlers}
          />
          <Box
            className={
              idx === Math.floor(activeBlock) ? classes.sectionBlockStyle : classes.unmarkedFrame
            }
            p="0px"
          >
            {children}
          </Box>
          <ButtonsOfMarkedBlock
            idx={idx}
            blockName={blockName}
            typeOfAddBlockFunction="below"
            deleteModalHandlers={deleteModalHandlers}
          />
        </Paper>
      </Flex>

      <DeleteBlockModal
        deleteModalHandlers={deleteModalHandlers}
        deleteModalOpened={deleteModalOpened}
      />
    </div>
  );
}
