import { Flex, Paper, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useActiveBlockContext, useBlocksContentContext } from '../../DocumentContextProviders';
import ButtonsOfMarkedBlock from './blocksComponents/ButtonsOfMarkedBlock';
import DeleteBlockModal from './blocksComponents/DeleteBlockModal';
import classes from './blocks.module.css';

type PageBreakBlockPropsType = {
  idx: number;
};

export default function PageBreakBlock({ idx }: PageBreakBlockPropsType) {
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();

  return (
    <div
      key={idx}
      tabIndex={idx}
      onFocus={async () => {
        setActiveBlock(idx);
      }}
    >
      <Stack
        pt="0px"
        pb="0px"
        pl="0px"
        pr="0px"
        w="40vw"
        miw="40rem"
        justify="center"
        className={idx === Math.floor(activeBlock) ? classes.blockFrameStyle : ''}
      >
        <Paper radius="0px" pt="0px" pb="0px" pl="lg" pr="lg" w="calc(40vw-4px)" h="50px">
          <ButtonsOfMarkedBlock
            idx={idx}
            blockName={
              blocksContent[0].blockContent.class === 'beamer' ? 'Slide break' : 'Page Break'
            }
            typeOfAddBlockFunction="above"
            deleteModalHandlers={deleteModalHandlers}
          />
        </Paper>
        <Flex justify="center">
          <Text fw={500} size="sm" c="var(--mantine-color-cyan-6)">
            {blocksContent[0].blockContent.class === 'beamer' ? 'Slide break' : 'Page Break'}
          </Text>
        </Flex>
        <Paper radius="0px" pt="0px" pb="0px" pl="lg" pr="lg" w="calc(40vw-4px)" h="50px">
          <ButtonsOfMarkedBlock
            idx={idx}
            blockName={
              blocksContent[0].blockContent.class === 'beamer' ? 'Slide break' : 'Page Break'
            }
            typeOfAddBlockFunction="below"
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
