import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Modal,
  ScrollArea,
  Table,
  TableData,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { blockType } from '@/Types';
import {
  useActiveBlockContext,
  useActiveTableCellContext,
  useActiveTextfieldContext,
  useBlocksContentContext,
  useEditorContext,
} from '../../DocumentContextProviders';
import BasicTexfield from './blocksComponents/BasicTextfield';
import BlockReferenceId from './blocksComponents/BlockReferenceId';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import classes from './blocks.module.css';

type TableBlockProps = {
  idx: number;
};

export default function TableBlock({ idx }: TableBlockProps) {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const { activeTableCell, setActiveTableCell } = useActiveTableCellContext();
  const [tablesCounter, setTablesCounter] = useState<number>(1);

  useEffect(() => {
    let counter = 1;
    for (let i = 0; i < idx; i++) {
      if (blocksContent[i].typeOfBlock === 'table') {
        counter++;
      }
      setTablesCounter(counter);
    }
  }, [blocksContent]);

  const tableWithTryCatch = () => {
    try {
      return (
        <tbody>
          {blocksContent[idx].blockContent.content.map((row, rowId) => {
            return (
              <tr>
                {row.map((cell, columnId) => {
                  return (
                    <td
                      onFocus={() => {
                        setActiveTableCell([rowId + 1, columnId + 1]);
                      }}
                      style={{
                        border: `${activeBlock === idx && rowId + 1 === activeTableCell[0] && columnId + 1 === activeTableCell[1] ? '3px solid var(--mantine-color-cyan-3)' : ''}`,
                        borderCollapse: 'collapse',
                        margin: '0px',
                      }}
                      onBlur={() => {}}
                    >
                      <BasicTexfield
                        idx={idx}
                        contentToRead={
                          blocksContent[idx].blockContent.content[rowId][columnId] as string
                        }
                        idxInput={idx
                          .toString()
                          .concat('tableCell;')
                          .concat((rowId + 1).toString())
                          .concat(';')
                          .concat((columnId + 1).toString())}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      );
    } catch (e) {
      console.error('display table error: ', blocksContent[idx].blockContent);
      return <>blad</>;
    }
  };

  return (
    <div>
      <Flex>
        <MarkedBlockFrame idx={idx} blockName="Table">
          <Center>
            <ScrollArea>
              <table className={classes.table}>{tableWithTryCatch()}</table>
            </ScrollArea>
          </Center>
          <Flex justify="center" align="center" pt="xl">
            <Box h="1.4rem" mr="xl" ml="md">
              <BlockReferenceId referenceId={blocksContent[idx].blockContent.id} />
            </Box>
            <Box miw="4rem" c="var(--mantine-color-gray-6)" mr="0px">
              Table {blocksContent[0].blockContent.class !== 'beamer' && tablesCounter}
            </Box>
            <BasicTexfield
              idx={idx}
              idxInput={idx.toString() + 'tableLabel'}
              contentToRead={blocksContent[idx].blockContent.label}
            />
          </Flex>
        </MarkedBlockFrame>
      </Flex>
    </div>
  );
}
