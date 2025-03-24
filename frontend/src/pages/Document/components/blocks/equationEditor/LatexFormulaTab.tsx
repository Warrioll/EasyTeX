import { Dispatch, Input, SetStateAction } from 'react';
import Latex from 'react-latex-next';
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ScrollArea,
  SegmentedControl,
  SimpleGrid,
  Text,
  Textarea,
} from '@mantine/core';
import classes from './equationEditor.module.css';

type LatexFormulaTabPropsType = {
  equationFormulaState: [string, Dispatch<SetStateAction<string>>];
};

export default function LatexFormulaTab({ equationFormulaState }: LatexFormulaTabPropsType) {
  const [equationFormula, setEquationFormula] = equationFormulaState;
  return (
    <SimpleGrid cols={1} p="xl" pt="0px" verticalSpacing="xl" w="100%">
      <Textarea
        inputSize="xl"
        variant="filled"
        radius="md"
        label="LaTeX formula:"
        placeholder="Input placeholder"
        classNames={{ input: classes.formulaTabTextarea }}
        value={equationFormula}
        onChange={(event) => {
          setEquationFormula(event.currentTarget.value);
          console.log('equation:', event.currentTarget.value);
        }}
      />
      <Box h="40vh">
        <Text fw={500} size="sm">
          Preview:
        </Text>
        <ScrollArea h="100%">
          <Center mih="40vh" w="100%">
            <Latex>{'$$' + equationFormula + '$$'}</Latex>
          </Center>
        </ScrollArea>
      </Box>
    </SimpleGrid>
  );
}
