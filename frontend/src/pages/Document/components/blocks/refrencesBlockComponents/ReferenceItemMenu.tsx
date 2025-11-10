import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { FaArrowDown, FaArrowUp, FaRegTrashAlt } from 'react-icons/fa';
import { IoMdMore } from 'react-icons/io';
import { MdOutlineAdd } from 'react-icons/md';
import { Box, Button, Menu, Text } from '@mantine/core';
import CustomTooltip from '@/components/other/CustomTooltip';
import {
  useActiveBlockContext,
  useBlocksContentContext,
} from '@/pages/Document/DocumentContextProviders';
import classes from '../blocks.module.css';

type DeleteReferencePopoverPropsType = {
  idx: number;
  referenceId: number;
};

export default function ReferenceItemMenu({ idx, referenceId }: DeleteReferencePopoverPropsType) {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();

  const [openedMenu, setOpenedMenu] = useState<boolean>(false);

  // const addReference = () => {
  //   const assignedNumbers: number[] = [];
  //   for (const reference of blocksContent[idx].blockContent) {
  //     assignedNumbers.push(Number(reference.id.replace('bib', '')));
  //   }
  //   //assignedNumbers.sort();
  //   let counter = 1;
  //   while (assignedNumbers.includes(counter)) {
  //     counter++;
  //   }
  //   const referencesList = cloneDeep(blocksContent[idx].blockContent);
  //   blocksContent[idx].blockContent = [
  //     ...referencesList,
  //     {
  //       id: 'bib'.concat(counter.toString()),
  //       label: 'New entry',
  //     },
  //   ];
  //   setIsNotSaved(true);
  //   setAmoutOfReferences((prev) => prev + 1);
  // };

  const moveReference = (amount: number) => {
    const copy = cloneDeep(blocksContent);
    const toMove = copy[idx].blockContent.splice(referenceId, 1);
    console.log('to move', toMove);
    if (referenceId + amount >= 0 && referenceId + amount <= copy[idx].blockContent.length) {
      copy[idx].blockContent.splice(referenceId + amount, 0, ...toMove);
      setBlocksContent(copy);
    }
  };

  return (
    <Menu
      opened={openedMenu}
      onChange={setOpenedMenu}
      position="left-start"
      //withArrow
      arrowSize={8}
      styles={{ arrow: { border: ' 1px solid var(--mantine-color-cyan-2)' } }}
    >
      <Menu.Target>
        <CustomTooltip label="More">
          {/* <Tooltip
                    label="More"
                    //label={buttonsNotToRender.includes(idx) ? 'true' : 'false'}
                    color="cyan"
                    position="bottom"
                    offset={5}
                    withArrow
                    arrowOffset={50}
                    arrowSize={7}
                    arrowRadius={2}
                  > */}
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
          {/* </Tooltip> */}
        </CustomTooltip>
      </Menu.Target>
      <Menu.Dropdown bg="var(--mantine-color-cyan-0)" bd=" 1px solid var(--mantine-color-cyan-3)">
        <Menu.Item
          leftSection={<FaArrowUp />}
          disabled={referenceId === 0}
          //onClick={moveBlockUp}
          className={classes.markedBlockFrameMoreButton}
          onClick={() => {
            moveReference(-1);
          }}
        >
          Move up
        </Menu.Item>
        <Menu.Item
          leftSection={<FaArrowDown />}
          disabled={blocksContent[idx].blockContent.length - 1 === referenceId}
          //onClick={moveBlockDown}
          className={classes.markedBlockFrameMoreButton}
          onClick={() => {
            moveReference(1);
          }}
        >
          Move down
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
