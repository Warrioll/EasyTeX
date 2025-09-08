import { Dispatch, SetStateAction } from 'react';
import { FaArrowDown, FaArrowUp, FaRegTrashAlt } from 'react-icons/fa';
import {
  Box,
  Button,
  Flex,
  Group,
  Menu,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { blockType } from '@/Types';
import { useActiveBlockContext, useBlocksContentContext } from '../../DocumentContextProviders';
import ButtonsOfMarkedBlock from './blocksComponents/ButtonsOfMarkedBlock';
import DeleteBlockModal from './blocksComponents/DeleteBlockModal';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import classes from './blocks.module.css';

type PageBreakBlockPropsType = {
  idx: number;
  //activeBlockState: [number, Dispatch<SetStateAction<number>>];
  //blocksContentState: [blockType[], Dispatch<SetStateAction<blockType[]>>];
  //activeTextInputState: [string, Dispatch<SetStateAction<string>>];
};

export default function PageBreakBlock({
  idx,
  //activeBlockState,
  //blocksContentState,
  //activeTextInputState
}: PageBreakBlockPropsType) {
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();

  return (
    <div
      key={idx}
      tabIndex={idx}
      onFocus={async () => {
        //toggle();
        setActiveBlock(idx);
      }}
    >
      <Stack
        pt="0px"
        pb="0px"
        pl="0px"
        pr="0px"
        w="40vw"
        justify="center"
        className={idx === Math.floor(activeBlock) ? classes.blockFrameStyle : ''}
      >
        <Paper radius="0px" pt="0px" pb="0px" pl="lg" pr="lg" w="calc(40vw-4px)" h="50px">
          <ButtonsOfMarkedBlock
            idx={idx}
            //activeBlockState={activeBlockState}
            blockName={blocksContent[0].blockContent === 'beamer' ? 'Slide break' : 'Page Break'}
            //blockContentState={blocksContentState}
            typeOfAddBlockFunction="above"
            //activeTextInputState={activeTextInputState}
            deleteModalHandlers={deleteModalHandlers}
          />
        </Paper>
        <Flex justify="center">
          <Text fw={500} size="sm" c="var(--mantine-color-cyan-6)">
            {blocksContent[0].blockContent === 'beamer' ? 'Slide break' : 'Page Break'}
          </Text>
        </Flex>
        <Paper radius="0px" pt="0px" pb="0px" pl="lg" pr="lg" w="calc(40vw-4px)" h="50px">
          <ButtonsOfMarkedBlock
            idx={idx}
            //activeBlockState={activeBlockState}
            blockName={blocksContent[0].blockContent === 'beamer' ? 'Slide break' : 'Page Break'}
            //blockContentState={blocksContentState}
            typeOfAddBlockFunction="below"
            //activeTextInputState={activeTextInputState}
            deleteModalHandlers={deleteModalHandlers}
          />
        </Paper>
      </Stack>
      <DeleteBlockModal
        deleteModalHandlers={deleteModalHandlers}
        deleteModalOpened={deleteModalOpened}
      />
    </div>
  );
}
