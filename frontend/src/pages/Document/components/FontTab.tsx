import { ReactElement } from 'react';
import {
  FaBold,
  FaCode,
  FaItalic,
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

type headerProps = {
  editFunctions: Record<string, (...args: any[]) => any>;
  editor: Editor;
  saveElementChanges: () => void;
};

const FontTab: React.FC<headerProps> = ({ editFunctions, editor, saveElementChanges }) => {
  type buttonType = {
    content: ReactElement;
    clickFunction: () => void | null;
    fontSize: string;
    tooltip: string;
  };

  const fontStyles: [buttonType] = [
    {
      content: <FaBold />,
      clickFunction: () => editor?.commands.setBold(),
      fontSize: 'var(--mantine-font-size-md)',
      tooltip: 'Bold',
    },
    {
      content: <FaItalic />,
      clickFunction: () => editor?.commands.setItalic(),
      fontSize: 'var(--mantine-font-size-md)',
      tooltip: 'Italic',
    },
    {
      content: <FaUnderline />,
      clickFunction: () => editor?.commands.setLink(),
      fontSize: 'var(--mantine-font-size-md)',
      tooltip: 'Underilne',
    },
    {
      content: <FaStrikethrough />,
      clickFunction: () => editor?.commands.setStrike(),
      tooltip: 'Strikethrough',
    },
    {
      content: <FaCode />,
      clickFunction: () => editor?.commands.setCode(),
      fontSize: 'var(--mantine-font-size-lg)',
      tooltip: 'Typewriter',
    },
  ];

  const indexes: [buttonType] = [
    {
      content: <FaSubscript />,
      clickFunction: null,
      fontSize: 'var(--mantine-font-size-md)',
      tooltip: 'Subscript',
    },
    {
      content: <FaSuperscript />,
      clickFunction: null,
      fontSize: 'var(--mantine-font-size-md)',
      tooltip: 'Superscript',
    },
  ];

  const lists: [buttonType] = [
    {
      content: <FaList />,
      clickFunction: null,
      fontSize: 'var(--mantine-font-size-lg)',
      tooltip: 'Bullet list',
    },
    {
      content: <FaListOl />,
      clickFunction: null,
      fontSize: 'var(--mantine-font-size-lg)',
      tooltip: 'Enumerated list',
    },
  ];

  return (
    <Flex>
      <Tooltip.Group openDelay={100} closeDelay={300}>
        {fontStyles.map((formatButton, idx) => (
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
                saveElementChanges();
              }}
            >
              {formatButton.content}
            </Button>
          </Tooltip>
        ))}
        <Box ml="2rem" mr="2rem">
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
              <Button variant="format" fz={formatButton.fontSize} onClick={() => {}}>
                {formatButton.content}
              </Button>
            </Tooltip>
          ))}
        </Box>

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
            <Button variant="format" fz={formatButton.fontSize} onClick={() => {}}>
              {formatButton.content}
            </Button>
          </Tooltip>
        ))}
      </Tooltip.Group>
    </Flex>
  );
};

export default FontTab;
