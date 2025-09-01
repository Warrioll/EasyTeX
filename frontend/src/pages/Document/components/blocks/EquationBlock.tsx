import 'katex/dist/katex.min.css';

import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import Latex from 'react-latex-next';
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Modal,
  RemoveScroll,
  ScrollArea,
  SegmentedControl,
  Text,
  Textarea,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { blockType } from '@/Types';
import {
  BlocksContentContext,
  useActiveBlockContext,
  useActiveTextfieldContext,
  useBlocksContentContext,
  useEditorContext,
} from '../../DocumentContextProviders';
import BlockReferenceId from './blocksComponents/BlockReferenceId';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import { updateIdx } from './equationEditor/elementsTreeHelpers';
import { elementsToTex, texToElements } from './equationEditor/equationConverters';
import { elementsPrototypes } from './equationEditor/equationsElementsPrototypes';
import LatexFormulaTab from './equationEditor/LatexFormulaTab';
import VisualEditorTab from './equationEditor/VisualEditorTab';
import classes from './blocks.module.css';

//FIXME - gdzieś nie ma clone deep bo protoyp ułamka się nadpisał

type EquationBlockProps = {
  idx: number;
  //activeBlockState: [number, Dispatch<SetStateAction<number>>];
  // activeTextInputState: [string, Dispatch<SetStateAction<string>>];
  //blocksContentState: [blockType[], Dispatch<SetStateAction<blockType[]>>];
};

const EquationBlock = memo(
  ({
    idx,
    //activeBlockState,
    // activeTextInputState,
    //blocksContentState,
  }: EquationBlockProps) => {
    //const thisBlockContent = useContextSelector(BlocksContentContext, (blocks:blockType[])=>blocks[idx])

    const { activeBlock, setActiveBlock } = useActiveBlockContext();
    const { blocksContent, setBlocksContent } = useBlocksContentContext();
    const [modalOpened, modalHandlers] = useDisclosure(false);
    const [editorTab, setEditorTab] = useState<'Visual editor' | 'LaTeX fromula'>('Visual editor');
    const equationFormulaState = useState<string>('');
    const [equationFormula, setEquationFormula] = equationFormulaState;
    const elementsContentState = useState<any[]>([
      cloneDeep(elementsPrototypes.expression.elementPrototype),
    ]);
    const [eqautionCopies, setEquationCopies] = useState<{
      visualEditor: Array<any>;
      latexFormula: string;
    }>({
      visualEditor: [],
      latexFormula: '',
    });

    const [eqautionNumber, setEquationNumber] = useState<number>(1);
    // const [eqautionSaved, setEquationSaved] = useState<{
    //   visualEditor: Array<any>;
    //   latexFormula: string;
    // }>({
    //   visualEditor: [],
    //   latexFormula: '',
    // });

    const saveEquationChange = () => {
      //setEquationSaved({ visualEditor: elementsContentState[0], latexFormula: equationFormula });
      let blocks = blocksContent;
      if (editorTab === 'Visual editor') {
        blocks[idx].blockContent.content = elementsToTex(elementsContentState[0]);
      } else {
        blocks[idx].blockContent.content = equationFormula;
      }

      setBlocksContent(blocks);
      modalHandlers.close();
    };

    useEffect(() => {
      setEquationFormula(blocksContent[idx].blockContent.content as string);
      //setEquationFormula(thisBlockContent.blockContent.content as string);
      elementsContentState[1](
        cloneDeep(updateIdx(texToElements(blocksContent[idx].blockContent.content as string), []))
      );
      // setEquationSaved({
      //   visualEditor: elementsContentState[0],
      //   latexFormula: blocksContent[activeBlock].blockContent,
      // });
      let temp = 1;
      for (let i = 0; i < idx; i++) {
        if (blocksContent[i].typeOfBlock === 'equation') {
          temp++;
        }
      }
      setEquationNumber(temp);
    }, [blocksContent]);

    return (
      <>
        <MarkedBlockFrame
          idx={idx}
          //activeBlockState={activeBlockState}
          blockName="Equation"
          //sectionsContent={blocksContent}
          //setSectionsContent={setBlocksContent}
          //activeTextInputState={activeTextInputState}
        >
          <Center pl="md" pr="md">
            <Box h="1.4rem" mr="xs">
              <BlockReferenceId referenceId={blocksContent[idx].blockContent.id} />
            </Box>

            <Box w="100%">
              {idx === activeBlock ? (
                <div
                  tabIndex={idx}
                  role="button"
                  onKeyDown={() => {}}
                  //style={{ backgroundColor: 'pink' }}
                  onClick={() => {
                    //setEquationFormula(blocksContent[idx].blockContent);

                    // visualEditorCopy = [...elementsContentState[0]];
                    // console.log('open:', visualEditorCopy);
                    // latexFormulaCopy = equationFormula;

                    setEquationCopies({
                      visualEditor: elementsContentState[0],
                      latexFormula: equationFormula,
                    });
                    // elementsContentState[1](eqautionSaved.visualEditor);
                    // setEquationFormula(eqautionSaved.latexFormula);

                    modalHandlers.open();
                  }}
                  className={classes.openEquationEditorButton}
                >
                  <Latex>{`$$${blocksContent[idx].blockContent.content}$$`}</Latex>
                </div>
              ) : (
                <Latex>{`$$${blocksContent[idx].blockContent.content}$$`}</Latex>
              )}
            </Box>
            <Text c="var(--mantine-color-gray-6)">({eqautionNumber})</Text>
          </Center>
        </MarkedBlockFrame>
        <Modal
          //className={RemoveScroll.classNames.fullWidth}
          className={RemoveScroll.classNames.zeroRight}
          opened={modalOpened}
          onClose={() => {
            setEquationFormula(eqautionCopies.latexFormula);
            //console.log('cancel:', visualEditorCopy);
            elementsContentState[1]([...eqautionCopies.visualEditor]);
            modalHandlers.close();
          }}
          transitionProps={{ transition: 'fade-up' }}
          yOffset="3.5%"
          size="85vw"
          scrollAreaComponent={ScrollArea.Autosize}
          style={{ overflowY: 'hidden', maxHeight: '20vh' }}
          title={
            <Flex>
              <Text c="var(--mantine-color-cyan-8)">
                <b>Equation editor</b>
              </Text>
              <Flex justify="center" w="72vw">
                <SegmentedControl
                  value={editorTab}
                  onChange={(value) => setEditorTab(value)}
                  radius="md"
                  fullWidth
                  withItemsBorders={false}
                  color="var(--mantine-color-cyan-8)"
                  data={['Visual editor', 'LaTeX fromula']}
                />
              </Flex>
            </Flex>
          }
        >
          <Center h="70vh" p="xl" pt="sm">
            {editorTab === 'Visual editor' ? (
              <VisualEditorTab
                //equationFormulaState={equationFormulaState}
                elementsContentState={elementsContentState}
              />
            ) : (
              <LatexFormulaTab equationFormulaState={equationFormulaState} />
            )}
          </Center>
          <Flex justify="center" mb="sm">
            <Button w="20rem" mr="xl" onClick={saveEquationChange}>
              {editorTab === 'Visual editor' ? (
                <>Set equation (from visual editor)</>
              ) : (
                <>Set equation (from LaTeX formula)</>
              )}
            </Button>
            <Button
              ml="xl"
              variant="outline"
              w="20rem"
              onClick={() => {
                setEquationFormula(eqautionCopies.latexFormula);
                //console.log('cancel:', visualEditorCopy);
                elementsContentState[1]([...eqautionCopies.visualEditor]);
                modalHandlers.close();
              }}
            >
              Cancel
            </Button>
          </Flex>
        </Modal>
      </>
    );
  }
);

export default EquationBlock;
