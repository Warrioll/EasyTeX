import 'katex/dist/katex.min.css';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
  Textarea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { blockType } from '@/Types';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import { updateIdx } from './equationEditor/elementsTreeHelpers';
import { elementsToTex, texToElements } from './equationEditor/equationConverters';
import { elementsPrototypes } from './equationEditor/equationsElementsPrototypes';
import LatexFormulaTab from './equationEditor/LatexFormulaTab';
import VisualEditorTab from './equationEditor/VisualEditorTab';
import classes from './blocks.module.css';

type EquationBlockProps = {
  idx: number;
  activeBlockState: [number, Dispatch<SetStateAction<number>>];
  activeTextInputState: [string, Dispatch<SetStateAction<string>>];
  blocksContentState: [blockType[], Dispatch<SetStateAction<blockType[]>>];
};

export default function EquationBlock({
  idx,
  activeBlockState,
  activeTextInputState,
  blocksContentState,
}: EquationBlockProps) {
  const [blocksContent, setBlocksContent] = blocksContentState;
  const [activeBlock, setActiveBlock] = activeBlockState;
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
  const [eqautionSaved, setEquationSaved] = useState<{
    visualEditor: Array<any>;
    latexFormula: string;
  }>({
    visualEditor: [],
    latexFormula: '',
  });

  const saveEquationChange = () => {
    //setEquationSaved({ visualEditor: elementsContentState[0], latexFormula: equationFormula });
    let blocks = blocksContent;
    if (editorTab === 'Visual editor') {
      blocks[idx].blockContent = elementsToTex(elementsContentState[0]);
    } else {
      blocks[idx].blockContent = equationFormula;
    }

    setBlocksContent(blocks);
    modalHandlers.close();
  };

  useEffect(() => {
    setEquationFormula(blocksContent[idx].blockContent as string);
    elementsContentState[1](
      cloneDeep(updateIdx(texToElements(blocksContent[idx].blockContent as string), []))
    );
    // setEquationSaved({
    //   visualEditor: elementsContentState[0],
    //   latexFormula: blocksContent[activeBlock].blockContent,
    // });
  }, [blocksContent]);

  return (
    <>
      <MarkedBlockFrame
        idx={idx}
        activeBlockState={activeBlockState}
        blockName="Equation"
        sectionsContent={blocksContent}
        setSectionsContent={setBlocksContent}
        activeTextInputState={activeTextInputState}
      >
        <Center>
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
              <Latex>{`$$${blocksContent[idx].blockContent}$$`}</Latex>
            </div>
          ) : (
            <Latex>{`$$${blocksContent[idx].blockContent}$$`}</Latex>
          )}
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
              equationFormulaState={equationFormulaState}
              elementsContentState={elementsContentState}
            />
          ) : (
            <LatexFormulaTab equationFormulaState={equationFormulaState} />
          )}
        </Center>
        <Flex justify="center" mb="sm">
          <Button w="20vw" mr="xl" onClick={saveEquationChange}>
            {editorTab === 'Visual editor' ? (
              <>Set equation (from visual editor)</>
            ) : (
              <>Set equation (from LaTeX formula)</>
            )}
          </Button>
          <Button
            ml="xl"
            variant="outline"
            w="20vw"
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
