import React from 'react';
import { Box, Flex, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  useActiveBlockContext,
  useActiveTextfieldContext,
  useBlocksContentContext,
} from '../../../DocumentContextProviders';
import ButtonsOfMarkedBlock from './ButtonsOfMarkedBlock';
import DeleteBlockModal from './DeleteBlockModal';
import classes from '../blocks.module.css';

type MarkedBlockFrameProps = {
  idx: number;
  blockName: string;
  children: React.ReactNode;
  defaultBasicInputId?: string;
};

export default function MarkedBlockFrame({
  children,
  idx,

  blockName,
  defaultBasicInputId,
}: MarkedBlockFrameProps) {
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { activeTextfield, setActiveTextfield } = useActiveTextfieldContext();
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);

  return (
    <div
      key={idx}
      tabIndex={idx}
      onFocus={async () => {
        setActiveBlock(idx);
      }}
    >
      <Flex miw="max-content">
        <Paper
          radius="0px"
          pt="0px"
          pb="0px"
          pl="lg"
          pr="lg"
          w="40vw"
          miw="40rem"
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
