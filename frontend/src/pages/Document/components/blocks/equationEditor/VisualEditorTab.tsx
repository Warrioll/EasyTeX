import { Dispatch, SetStateAction, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Latex from 'react-latex-next';
import {
  Box,
  Center,
  Flex,
  Grid,
  Group,
  Input,
  RenderTreeNodePayload,
  ScrollArea,
  Stack,
  Text,
  Tree,
} from '@mantine/core';
import classes from './equationEditor.module.css';

const data = [
  {
    value: 'frac1',
    label: 'Fraction',
    content: '\\frac{8}{9}',
    children: [
      { value: 'src/componddfents', label: 'componentssss' },
      { value: '\\fracccc', label: 'Fraction' },
    ],
  },
  { value: 'src/hooks', label: 'package.jsosssn' },
];

type VisualEditorTabTabPropsType = {
  equationFormulaState: [string, Dispatch<SetStateAction<string>>];
};

export default function VisualEditorTab({ equationFormulaState }: VisualEditorTabTabPropsType) {
  const [activeElement, setActiveElement] = useState<{
    value: string;
    label: '' | 'Fraction' | 'Integral';
  }>({ value: '', label: '' });

  function TreeNode({ node, expanded, hasChildren, elementProps, tree }: RenderTreeNodePayload) {
    return (
      <Group gap="xs" {...elementProps}>
        <Flex w="100%">
          <Box onClick={() => tree.toggleExpanded(node.value)} mt="0.30rem" mr="0.15rem">
            <MdKeyboardArrowDown
              size={14}
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </Box>
          <Box
            p="0.25rem"
            pl="0.35rem"
            onClick={() =>
              setActiveElement({ value: node.value as string, label: node.label as string })
            }
            onDoubleClick={() => tree.toggleExpanded(node.value)}
            className={
              activeElement.value === node.value ? classes.markedElement : classes.unmarkedelement
            }
            w="100%"
            //bg="var(--mantine-color-gray-1)"
            m="2px"
          >
            {node.label}
          </Box>
        </Flex>
      </Group>
    );
  }

  const chooseElementEditor = () => {
    switch (activeElement.label) {
      case 'Fraction':
        return <>Fracion</>;
      default:
        return <>Default</>;
    }
  };

  return (
    <Grid w="100%" h="100%">
      <Grid.Col span={3}>
        <Text fw={500} size="sm">
          Elements:
        </Text>
        <ScrollArea
          h="100%"
          //bg="var(--mantine-color-gray-1)"
          p="sm"
          className={classes.elementsTree}
        >
          <Tree data={data} renderNode={TreeNode} expandOnClick={false} levelOffset={15} />
        </ScrollArea>
      </Grid.Col>
      <Grid.Col span={9}>
        <Stack>
          <Box h="20vh">
            <Text fw={500} size="sm">
              Edit:
            </Text>
            <Center h="20vh">{chooseElementEditor()}</Center>
          </Box>
          <Box h="35vh">
            <Text fw={500} size="sm">
              Preview:
            </Text>
            <ScrollArea h="100%">
              <Center w="100%" mih="35vh">
                <Latex>$$ Latexx $$</Latex>
              </Center>
            </ScrollArea>
          </Box>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
