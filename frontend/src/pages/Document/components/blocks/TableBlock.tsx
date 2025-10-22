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
  //activeBlockState: [number, Dispatch<SetStateAction<number>>];
  //activeTextInputState: [string, Dispatch<SetStateAction<string>>];
  // blocksContentState: [blockType[], Dispatch<SetStateAction<blockType[]>>];
  // activeTableCellState: [[number, number], Dispatch<SetStateAction<[number, number]>>];
  // editor: Editor;
};

export default function TableBlock({
  idx,
  //activeBlockState,
  //blocksContentState,
  //editor,
  //activeTextInputState,
  //activeTableCellState,
}: TableBlockProps) {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const { activeTableCell, setActiveTableCell } = useActiveTableCellContext();
  //const [activeCell, setActiveCell] = activeTableCellState; //[row, column]
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
                      onBlur={() => {
                        //setActiveCell([0, 0]);
                      }}
                    >
                      {
                        //activeCell[0] === rowId + 1 && activeCell[1] === columnId + 1 ? (
                      }
                      {/* <Button
                        variant="transparent"
                        disabled={!(idx === activeBlock)}
                        color="balck"
                        fw="normal"
                        onClick={() => {
                          setActiveCell([rowId + 1, columnId + 1]);
                        }}
                      > */}

                      <BasicTexfield
                        idx={idx}
                        //activeBlockState={activeBlockState}
                        contentToRead={
                          blocksContent[idx].blockContent.content[rowId][columnId] as string
                        }
                        //editor={editor}
                        //activeTextInputState={activeTextInputState}
                        idxInput={idx
                          .toString()
                          .concat('tableCell;')
                          .concat((rowId + 1).toString())
                          .concat(';')
                          .concat((columnId + 1).toString())}
                        // sectionsContent={blocksContent}
                        //setSectionsContent={setBlocksContent}
                      />

                      {/* </Button> */}
                      {
                        //}) : (
                      }
                      {/* <Button
                              variant="transparent"
                              disabled={!(idx === activeBlock)}
                              color="balck"
                              fw="normal"
                              onClick={() => {
                                setActiveCell([rowId + 1, columnId + 1]);
                              }}
                            >
                              {
                                cell
                              }
                            </Button> */}
                      {
                        //)
                      }
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      );
    } catch (e) {
      console.log('try catch table: ', blocksContent[idx].blockContent);
      return <>blad</>;
    }
  };

  return (
    <div>
      <Flex>
        <MarkedBlockFrame
          idx={idx}
          //activeBlockState={activeBlockState}
          blockName="Table"
          //sectionsContent={blocksContent}
          //setSectionsContent={setBlocksContent}
          //activeTextInputState={activeTextInputState}
        >
          <Center>
            <ScrollArea>
              <table className={classes.table}>{tableWithTryCatch()}</table>
              {/* <table>
              <tbody>
                <tr>
                  <td>
                    <Button
                      variant="transparent"
                      onClick={() => {
                        setActiveCell([1, 2]);
                      }}
                    >
                      1
                    </Button>
                  </td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>4</td>
                </tr>
              </tbody>
            </table> */}

              {/* <BasicTexfield
                idx={idx}
                activeBlockState={activeBlockState}
                contentToRead={blocksContent[idx].blockContent as string}
                editor={editor}
                activeTextInputState={activeTextInputState}
                idxInput={idx.toString()}
                sectionsContent={blocksContent}
                setSectionsContent={setBlocksContent}
              /> */}
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
