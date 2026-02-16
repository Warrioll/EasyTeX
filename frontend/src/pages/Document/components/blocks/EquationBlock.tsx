import 'katex/dist/katex.min.css';

import { memo, useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import Latex from 'react-latex-next';
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  RemoveScroll,
  ScrollArea,
  SegmentedControl,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useActiveBlockContext, useBlocksContentContext } from '../../DocumentContextProviders';
import BlockReferenceId from './blocksComponents/BlockReferenceId';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import { updateIdx } from './equationEditor/elementsTreeHelpers';
import { elementsToTex, texToElements } from './equationEditor/equationConverters';
import { elementsPrototypes } from './equationEditor/equationsElementsPrototypes';
import LatexFormulaTab from './equationEditor/LatexFormulaTab';
import VisualEditorTab from './equationEditor/VisualEditorTab';
import classes from './blocks.module.css';

type EquationBlockProps = {
  idx: number;
};

const EquationBlock = memo(({ idx }: EquationBlockProps) => {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();
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

  const saveEquationChange = () => {
    let blocks = blocksContent;
    if (editorTab === 'Visual editor') {
      blocks[idx].blockContent.content = elementsToTex(elementsContentState[0]);
    } else {
      blocks[idx].blockContent.content = equationFormula;
    }
    setIsNotSaved(true);
    setBlocksContent(blocks);
    modalHandlers.close();
  };

  useEffect(() => {
    setEquationFormula(blocksContent[idx].blockContent.content as string);

    elementsContentState[1](
      cloneDeep(updateIdx(texToElements(blocksContent[idx].blockContent.content as string), []))
    );

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
      <MarkedBlockFrame idx={idx} blockName="Equation">
        <Center pl="md" pr="md">
          <Box h="1.4rem" mr="xs">
            <BlockReferenceId referenceId={blocksContent[idx].blockContent.id} />
          </Box>

          <Box w="100%" style={{ overflow: 'hidden' }} fz="0.9rem">
            {idx === activeBlock ? (
              <div
                tabIndex={idx}
                role="button"
                onKeyDown={() => {}}
                onClick={() => {
                  setEquationCopies({
                    visualEditor: elementsContentState[0],
                    latexFormula: equationFormula,
                  });

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
        className={RemoveScroll.classNames.zeroRight}
        opened={modalOpened}
        onClose={() => {
          setEquationFormula(eqautionCopies.latexFormula);

          elementsContentState[1]([...eqautionCopies.visualEditor]);
          modalHandlers.close();
        }}
        transitionProps={{ transition: 'fade-up' }}
        yOffset="3.5%"
        size="auto"
        scrollAreaComponent={ScrollArea.Autosize}
        style={{ overflowY: 'hidden', maxHeight: '20vh' }}
        title={
          <Flex justify="space-between" align="center" w="calc(85vw - 1rem)">
            <Text c="var(--mantine-color-cyan-8)" w="8rem">
              <b>Equation editor</b>
            </Text>
            <Flex justify="center">
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
            <Text
              visibleFrom="md"
              style={{ opacity: '0%' }}
              c="var(--mantine-color-cyan-8)"
              w="8rem"
            >
              <b>Equation editor</b>
            </Text>
          </Flex>
        }
      >
        <Center h="70vh" w="85vw" miw="max-content" p="xl" pt="sm">
          {editorTab === 'Visual editor' ? (
            <VisualEditorTab elementsContentState={elementsContentState} />
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
});

export default EquationBlock;
