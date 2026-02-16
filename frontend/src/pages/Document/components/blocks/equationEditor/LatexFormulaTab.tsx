import { Dispatch, SetStateAction } from 'react';
import Latex from 'react-latex-next';
import { Box, Center, ScrollArea, SimpleGrid, Text, Textarea } from '@mantine/core';
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
        placeholder="LaTeX formula"
        classNames={{ input: classes.formulaTabTextarea }}
        value={equationFormula}
        onChange={(event) => {
          setEquationFormula(event.currentTarget.value);
        }}
      />
      <Box h="40vh">
        <Text fw={500} size="sm">
          Preview:
        </Text>
        <Center w="100%" h="100%">
          <ScrollArea h="100%" miw="40rem" w="100%" maw="78vw">
            <Center mih="40vh" w="100%" miw="max-content">
              <Latex>{'$$' + equationFormula + '$$'}</Latex>
            </Center>
          </ScrollArea>
        </Center>
      </Box>
    </SimpleGrid>
  );
}
