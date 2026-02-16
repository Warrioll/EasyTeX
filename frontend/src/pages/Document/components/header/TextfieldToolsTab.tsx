import { ReactElement } from 'react';
import { FaList } from 'react-icons/fa';
import { FaListOl } from 'react-icons/fa6';
import { Button, Flex, Tooltip } from '@mantine/core';
import {
  useActiveBlockContext,
  useBlocksContentContext,
  useEditorContext,
} from '../../DocumentContextProviders';

type buttonType = {
  content: ReactElement;
  clickFunction: () => void | null;
  fontSize: string;
  tooltip: string;
};

export default function TextfieldToolsTab() {
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { editor } = useEditorContext();

  const lists: buttonType[] = [
    {
      content: <FaList />,
      clickFunction: () => editor?.commands.toggleBulletList(),
      fontSize: 'var(--mantine-font-size-lg)',
      tooltip: 'Bullet list',
    },
    {
      content: <FaListOl />,
      clickFunction: () => editor?.commands.toggleOrderedList(),
      fontSize: 'var(--mantine-font-size-lg)',
      tooltip: 'Enumerated list',
    },
  ];

  const textfiledTools = (
    <>
      {lists.map((formatButton, idx) => (
        <Tooltip
          label={formatButton.tooltip}
          color="cyan"
          position="bottom"
          offset={5}
          withArrow
          arrowOffset={50}
          arrowSize={7}
          arrowRadius={2}
        >
          <Button
            variant="format"
            fz={formatButton.fontSize}
            onClick={() => {
              formatButton.clickFunction();
            }}
          >
            {formatButton.content}
          </Button>
        </Tooltip>
      ))}
    </>
  );

  const chooseContent = () => {
    switch (blocksContent[activeBlock].typeOfBlock) {
      case 'textfield':
        return textfiledTools;
      default:
        return 'This block has no modifying tools';
    }
  };

  return (
    <Flex>
      <Tooltip.Group openDelay={100} closeDelay={300}>
        {activeBlock === 0 ? 'No block is selected' : chooseContent()}
      </Tooltip.Group>
    </Flex>
  );
}
