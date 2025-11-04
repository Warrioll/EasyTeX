import { RiErrorWarningFill, RiErrorWarningLine } from 'react-icons/ri';
import { Box, Button, Flex, Paper, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useActiveBlockContext, useBlocksContentContext } from '../../DocumentContextProviders';
import { blockTypeToOfficialName } from '../../hooksAndUtils/documentUtils';
import ButtonsOfMarkedBlock from './blocksComponents/ButtonsOfMarkedBlock';
import DeleteBlockModal from './blocksComponents/DeleteBlockModal';
import classes from './blocks.module.css';

type UnavailableBlockPropsType = {
  idx: number;
};

export default function UnavailableBlock({ idx }: UnavailableBlockPropsType) {
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
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
          miw='40rem'
          className={
            idx === Math.floor(activeBlock) ? classes.blockFrameStyle : classes.unmarkedFramePaper
          }
          bg="var(--mantine-color-red-0)"
        >
          <ButtonsOfMarkedBlock
            idx={idx}
            blockName={
              blocksContent[idx].typeOfBlock &&
              blocksContent[0].blockContent &&
              blocksContent[0].blockContent.class
                ? blockTypeToOfficialName(
                    blocksContent[idx].typeOfBlock,
                    blocksContent[0].blockContent.class
                  )
                : '???'
            }
            typeOfAddBlockFunction="above"
            deleteModalHandlers={deleteModalHandlers}
          />
          <Box
            className={
              idx === Math.floor(activeBlock) ? classes.sectionBlockStyle : classes.unmarkedFrame
            }
            p="0px"
            bg="var(--mantine-color-red-0)"
            c="var(--mantine-color-red-6)"
          >
            <Title ta="center" fz="xl">
              <Flex justify="center" align="center">
                <Box m="xs" mt="md">
                  <RiErrorWarningFill />
                </Box>
                This block is unavailable!
              </Flex>
            </Title>

            <Text ta="center" fz="sm">
              Something went wrong converting this block from LaTeX.
            </Text>
            <Text ta="center" fz="sm">
              Delete it or try reloading the page.
            </Text>

            {
              // or coś tak że nie nie dostępny w typ typie dokumentu
            }
            <Flex justify="center" mt="sm">
              <Button
                m="xs"
                w="9rem"
                bg="var(--mantine-color-red-1)"
                c="var(--mantine-color-red-6)"
                onClick={() => window.location.reload()}
              >
                Reload page
              </Button>
              <Button
                m="xs"
                w="9rem"
                color="red"
                bg="var(--mantine-color-red-1)"
                c="var(--mantine-color-red-6)"
                onClick={deleteModalHandlers.open}
              >
                Delete this block
              </Button>
            </Flex>
          </Box>
          <ButtonsOfMarkedBlock
            idx={idx}
            blockName={
              blocksContent[idx].typeOfBlock &&
              blocksContent[0].blockContent &&
              blocksContent[0].blockContent.class
                ? blockTypeToOfficialName(
                    blocksContent[idx].typeOfBlock,
                    blocksContent[0].blockContent.class
                  )
                : '???'
            }
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
