import { Dispatch, SetStateAction } from 'react';
import { FaArrowDown, FaArrowUp, FaRegTrashAlt } from 'react-icons/fa';
import {
  Accordion,
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
import BasicTexfield from './blocksComponents/BasicTextfield';
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

export default function SlideBreakBlock({
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
        console.log('slide break content', blocksContent[idx]);
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
        {idx > 1 && (
          <>
            <Paper radius="0px" pt="0px" pb="0px" pl="lg" pr="lg" w="calc(40vw-4px)" h="50px">
              <ButtonsOfMarkedBlock
                idx={idx}
                //activeBlockState={activeBlockState}
                blockName="Slide break"
                //blockContentState={blocksContentState}
                typeOfAddBlockFunction="above"
                //activeTextInputState={activeTextInputState}
                deleteModalHandlers={deleteModalHandlers}
              />
            </Paper>
            <Flex justify="center">
              <Text fw={500} size="sm" c="var(--mantine-color-cyan-6)">
                Slide break
              </Text>
            </Flex>
          </>
        )}
        <Paper radius="0px" pt="0px" pb="0px" pl="lg" pr="lg" w="calc(40vw-4px)">
          <Accordion
            className={
              idx === Math.floor(activeBlock) ? classes.sectionBlockStyle : classes.unmarkedFrame
            }
            defaultValue="closed"
            chevronPosition="left"
            styles={{ item: { border: 'none' }, chevron: { color: 'var(--mantine-color-cyan-6)' } }}
          >
            <Accordion.Item key="header" value="header">
              <Accordion.Control>
                <Text fz="sm" fw="500" c="var(--mantine-color-cyan-6)">
                  Slide header
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <>
                  <Flex align="flex-start" mih="2.7rem">
                    <Text
                      miw="3rem"
                      mr="xs"
                      mt="xs"
                      fz="xs"
                      fw="500"
                      c="var(--mantine-color-cyan-6)"
                    >
                      Title:
                    </Text>
                    <BasicTexfield
                      idx={idx}
                      idxInput={idx.toString() + 'SlideTitle'}
                      contentToRead={blocksContent[idx].blockContent.title}
                    />
                  </Flex>
                  <Flex mih="2.7rem" align="flex-start">
                    <Text
                      miw="3rem"
                      mr="xs"
                      mt="xs"
                      fz="xs"
                      fw="500"
                      c="var(--mantine-color-cyan-6)"
                    >
                      Subtitle:
                    </Text>
                    <BasicTexfield
                      idx={idx}
                      idxInput={idx.toString() + 'SlideSubtitle'}
                      contentToRead={blocksContent[idx].blockContent.subtitle}
                    />
                  </Flex>
                </>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <ButtonsOfMarkedBlock
            idx={idx}
            //activeBlockState={activeBlockState}
            blockName="Slide break"
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
