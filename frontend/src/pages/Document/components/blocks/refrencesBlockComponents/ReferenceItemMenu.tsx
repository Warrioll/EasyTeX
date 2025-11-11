import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { IoMdMore } from 'react-icons/io';
import { Button, Menu, Text } from '@mantine/core';
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

  const moveReference = (amount: number) => {
    const copy = cloneDeep(blocksContent);
    const toMove = copy[idx].blockContent.splice(referenceId, 1);

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
      arrowSize={8}
      styles={{ arrow: { border: ' 1px solid var(--mantine-color-cyan-2)' } }}
    >
      <Menu.Target>
        <CustomTooltip label="More">
          <Button
            variant="transparent"
            w="2rem"
            p="0px"
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
      <Menu.Dropdown bg="var(--mantine-color-cyan-0)" bd=" 1px solid var(--mantine-color-cyan-3)">
        <Menu.Item
          leftSection={<FaArrowUp />}
          disabled={referenceId === 0}
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
