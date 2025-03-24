import 'katex/dist/katex.min.css';

import { Dispatch, SetStateAction, useState } from 'react';
import Latex from 'react-latex-next';
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ScrollArea,
  SegmentedControl,
  Text,
  Textarea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { blockType } from '@/Types';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
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
  const [editorTab, setEditorTab] = useState<string>('Visual editor');
  const equationFormulaState = useState<string>('');
  const [equationFormula, setEquationFormula] = equationFormulaState;

  const saveEquationChange = () => {
    let blocks = blocksContent;
    blocks[idx].blockContent = equationFormula;
    setBlocksContent(blocks);
    modalHandlers.close();
  };

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
                setEquationFormula(blocksContent[idx].blockContent);
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
        opened={modalOpened}
        onClose={modalHandlers.close}
        transitionProps={{ transition: 'fade-up' }}
        yOffset="3.5%"
        size="85vw"
        scrollAreaComponent={ScrollArea.Autosize}
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
        <Center h="70vh" p="xl">
          {editorTab === 'Visual editor' ? (
            <VisualEditorTab equationFormulaState={equationFormulaState} />
          ) : (
            <LatexFormulaTab equationFormulaState={equationFormulaState} />
          )}
        </Center>
        <Flex justify="center" mb="sm">
          <Button w="20vw" mr="xl" onClick={saveEquationChange}>
            Ok
          </Button>
          <Button ml="xl" variant="outline" w="20vw" onClick={() => modalHandlers.close()}>
            Cancel
          </Button>
        </Flex>
      </Modal>
    </>
  );
}
