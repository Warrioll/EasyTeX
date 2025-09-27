import { ReactElement } from 'react';
import {
  FaBold,
  FaCode,
  FaItalic,
  FaLink,
  FaList,
  FaStrikethrough,
  FaSubscript,
  FaSuperscript,
  FaUnderline,
} from 'react-icons/fa';
import { FaListOl } from 'react-icons/fa6';
import { LuHeading1, LuHeading2 } from 'react-icons/lu';
import { MdOutlineAdd } from 'react-icons/md';
import { PiTextTBold } from 'react-icons/pi';
import { Box, Button, Flex, Tooltip } from '@mantine/core';
import { blockType } from '@/Types';
import {
  useActiveBlockContext,
  useBlocksContentContext,
  useEditorContext,
} from '../../DocumentContextProviders';

type headerProps = {
  //editFunctions: Record<string, (...args: any[]) => any>;
  //editor: Editor;
  //saveElementChanges: () => void;
  // activeSection: number;
  //sectionsContent: blockType[];
};

type buttonType = {
  content: ReactElement;
  clickFunction: () => void | null;
  fontSize: string;
  tooltip: string;
};

export default function TextfieldToolsTab(
  {
    //editFunctions,
    //editor,
    //saveElementChanges,
    //activeSection,
    // sectionsContent,
  }: headerProps
) {
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { editor } = useEditorContext();

  const codeAndLink: buttonType[] = [
    // {
    //   //trzeba popatrzeć czemu nie działa https://tiptap.dev/docs/editor/extensions/marks/link
    //   content: <FaLink />,
    //   clickFunction: () => editor?.commands.toggleLink(),
    //   fontSize: 'var(--mantine-font-size-md)',
    //   tooltip: 'Link',
    // },
  ];

  const indexes: buttonType[] = [
    {
      content: <FaSubscript />,
      clickFunction: () => editor?.commands.toggleSubscript(),
      fontSize: 'var(--mantine-font-size-md)',
      tooltip: 'Subscript',
    },
    {
      content: <FaSuperscript />,
      clickFunction: () => editor?.commands.toggleSuperscript(),
      fontSize: 'var(--mantine-font-size-md)',
      tooltip: 'Superscript',
    },
  ];

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
      {/* <Box ml="2rem">
        {codeAndLink.map((formatButton, idx) => (
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
                //saveElementChanges();
              }}
            >
              {formatButton.content}
            </Button>
          </Tooltip>
        ))}
      </Box> */}

      {/* <Box ml="2rem" mr="2rem">
        {indexes.map((formatButton, idx) => (
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
                //saveElementChanges();
              }}
            >
              {formatButton.content}
            </Button>
          </Tooltip>
        ))}
      </Box> */}

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
              //saveElementChanges();
            }}
          >
            {formatButton.content}
          </Button>
        </Tooltip>
      ))}
    </>
  );

  const chooseContent = () => {
    console.log('active', activeBlock);
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
