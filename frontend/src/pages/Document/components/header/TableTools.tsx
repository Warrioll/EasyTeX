import { ReactElement } from 'react';
import { cloneDeep } from 'lodash';
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
import { groupedListType } from '@/Types';
import {
  useActiveBlockContext,
  useActiveTableCellContext,
  useBlocksContentContext,
} from '../../DocumentContextProviders';

type buttonType = {
  content: ReactElement;
  clickFunction: () => void | null;
  fontSize: string;
  tooltip: string;
};

// type TableToolsTabPropsType = {
//   //activeTableCellState: [[number, number], React.Dispatch<React.SetStateAction<[number, number]>>];
//   editFunctions: Record<string, (...args: any[]) => any>;
// };

export function useTableTools(): groupedListType {
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();
  const { activeTableCell, setActiveTableCell } = useActiveTableCellContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();

  const addRowAbove = () => {
    //console.log('Row Add');
    if (activeTableCell[0] !== 0 && activeTableCell[1] !== 0) {
      let blockContentCopy = cloneDeep(blocksContent);
      let tableCopy = blockContentCopy[activeBlock].blockContent.content;
      let row = Array(tableCopy[0].length).fill('<p>&nbsp;</p>');
      tableCopy.splice(activeTableCell[0] - 1, 0, row);
      blockContentCopy[activeBlock].blockContent.content = tableCopy;
      setBlocksContent(blockContentCopy);
      setIsNotSaved(true);
    }
  };

  const addRowBelow = () => {
    console.log('table:', blocksContent[activeBlock]);
    if (activeTableCell[0] !== 0 && activeTableCell[1] !== 0) {
      let blockContentCopy = cloneDeep(blocksContent);
      let tableCopy = blockContentCopy[activeBlock].blockContent.content;
      let row = Array(tableCopy[0].length).fill('<p>&nbsp;</p>');
      tableCopy.splice(activeTableCell[0], 0, row);
      blockContentCopy[activeBlock].blockContent.content = tableCopy;
      setBlocksContent(blockContentCopy);
      setIsNotSaved(true);
    }
  };

  const deleteRow = () => {
    if (activeTableCell[0] !== 0 && activeTableCell[1] !== 0) {
      let blockContentCopy = cloneDeep(blocksContent);
      let tableCopy = blockContentCopy[activeBlock].blockContent.content;
      //let row = Array(tableCopy[0].length).fill('<p>&nbsp;</p>');
      if (tableCopy.length === 1) {
        tableCopy = [['<p>&nbsp;</p>']];
      } else {
        if (tableCopy.length > activeTableCell[0] - 1) {
          tableCopy.splice(activeTableCell[0] - 1, 1);
        }
      }

      blockContentCopy[activeBlock].blockContent.content = tableCopy;
      setBlocksContent(blockContentCopy);
      setIsNotSaved(true);
    }
  };

  const addColumnFromLeft = () => {
    if (activeTableCell[0] !== 0 && activeTableCell[1] !== 0) {
      let blockContentCopy = cloneDeep(blocksContent);
      let tableCopy = blockContentCopy[activeBlock].blockContent.content;

      for (let i = 0; i < tableCopy.length; i++) {
        tableCopy[i].splice(activeTableCell[1] - 1, 0, '<p>&nbsp;</p>');
      }
      blockContentCopy[activeBlock].blockContent.content = tableCopy;
      setBlocksContent(blockContentCopy);
      setIsNotSaved(true);
    }
  };

  const addColumnFromRight = () => {
    if (activeTableCell[0] !== 0 && activeTableCell[1] !== 0) {
      let blockContentCopy = cloneDeep(blocksContent);
      let tableCopy = blockContentCopy[activeBlock].blockContent.content;
      for (let i = 0; i < tableCopy.length; i++) {
        tableCopy[i].splice(activeTableCell[1], 0, '<p>&nbsp;</p>');
      }
      blockContentCopy[activeBlock].blockContent.content = tableCopy;
      setBlocksContent(blockContentCopy);
      setIsNotSaved(true);
    }
  };

  const deleteColumn = () => {
    if (activeTableCell[0] !== 0 && activeTableCell[1] !== 0) {
      let blockContentCopy = cloneDeep(blocksContent);
      let tableCopy = blockContentCopy[activeBlock].blockContent.content;
      if (tableCopy[0].length === 1) {
        tableCopy = [['<p>&nbsp;</p>']];
      } else {
        for (let i = 0; i < tableCopy.length; i++) {
          tableCopy[i].splice(activeTableCell[1] - 1, 1);
        }
      }
      blockContentCopy[activeBlock].blockContent.content = tableCopy;
      setBlocksContent(blockContentCopy);
      setIsNotSaved(true);
    }
  };

  return [
    {
      label: 'Rows',
      group: [
        {
          Icon: () => <TbRowInsertTop />,
          function: addRowAbove, //editor?.commands.toggleSubscript(),
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
          label: 'Add row above',
        },
        {
          Icon: () => <TbRowInsertBottom />,
          function: addRowBelow, //editor?.commands.toggleSuperscript(),
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
          label: 'Add row below',
        },
        {
          Icon: () => <TbRowRemove />,
          function: deleteRow, //editor?.commands.toggleSuperscript(),
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
          label: 'Remove row',
        },
      ],
    },

    {
      label: 'Columns',
      group: [
        {
          Icon: () => <TbColumnInsertLeft />,
          function: addColumnFromLeft,
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
          label: 'Add column on left side',
        },
        {
          Icon: () => <TbColumnInsertRight />,
          function: addColumnFromRight, //editor?.commands.toggleSuperscript(),
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
          label: 'Add column on right side',
        },
        {
          Icon: () => <TbColumnRemove />,
          function: deleteColumn, //editor?.commands.toggleSuperscript(),
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
          label: 'Remove column',
        },
      ],
    },
  ];
}
