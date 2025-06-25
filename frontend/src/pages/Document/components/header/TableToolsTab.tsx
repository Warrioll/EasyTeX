import { ReactElement } from 'react';
import {
  PiColumnsPlusLeft,
  PiColumnsPlusRight,
  PiRowsPlusBottom,
  PiRowsPlusTop,
} from 'react-icons/pi';
import {
  TbColumnInsertLeft,
  TbColumnInsertRight,
  TbColumnRemove,
  TbRowInsertBottom,
  TbRowInsertTop,
  TbRowRemove,
} from 'react-icons/tb';
import { Box, Button, Flex, Tooltip } from '@mantine/core';

type buttonType = {
  content: ReactElement;
  clickFunction: () => void | null;
  fontSize: string;
  tooltip: string;
};

type TableToolsTabPropsType = {
  //activeTableCellState: [[number, number], React.Dispatch<React.SetStateAction<[number, number]>>];
  editFunctions: Record<string, (...args: any[]) => any>;
};

export default function TableToolsTab({ editFunctions }: TableToolsTabPropsType) {
  // const [activeCell, setActiveCell] = activeTableCellState;

  const columns: buttonType[] = [
    {
      content: <TbColumnInsertLeft />,
      clickFunction: editFunctions.addColumnFromLeft,
      fontSize: 'var(--mantine-font-size-xl)',
      tooltip: 'Add column on left side',
    },
    {
      content: <TbColumnInsertRight />,
      clickFunction: editFunctions.addColumnFromRight, //editor?.commands.toggleSuperscript(),
      fontSize: 'var(--mantine-font-size-xl)',
      tooltip: 'Add column on right side',
    },
    {
      content: <TbColumnRemove />,
      clickFunction: editFunctions.deleteColumn, //editor?.commands.toggleSuperscript(),
      fontSize: 'var(--mantine-font-size-xl)',
      tooltip: 'Remove column',
    },
  ];

  const rows: buttonType[] = [
    {
      content: <TbRowInsertTop />,
      clickFunction: editFunctions.addRowAbove, //editor?.commands.toggleSubscript(),
      fontSize: 'var(--mantine-font-size-xl)',
      tooltip: 'Add row above',
    },
    {
      content: <TbRowInsertBottom />,
      clickFunction: editFunctions.addRowBelow, //editor?.commands.toggleSuperscript(),
      fontSize: 'var(--mantine-font-size-xl)',
      tooltip: 'Add row below',
    },
    {
      content: <TbRowRemove />,
      clickFunction: editFunctions.deleteRow, //editor?.commands.toggleSuperscript(),
      fontSize: 'var(--mantine-font-size-xl)',
      tooltip: 'Remove row',
    },
  ];

  return (
    <Flex>
      <Tooltip.Group openDelay={100} closeDelay={300}>
        <Box ml="2rem">
          {rows.map((formatButton, idx) => (
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
        </Box>

        <Box ml="2rem" mr="2rem">
          {columns.map((formatButton, idx) => (
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
        </Box>
      </Tooltip.Group>
    </Flex>
  );
}
