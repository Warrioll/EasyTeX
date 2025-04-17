import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { FaArrowDown, FaArrowUp, FaRegTrashAlt, FaTrashAlt } from 'react-icons/fa';

import Latex from 'react-latex-next';
import {
  Box,
  Button,
  Center,
  CloseButton,
  Combobox,
  Flex,
  Grid,
  Group,
  Highlight,
  Input,
  Menu,
  Pill,
  RenderTreeNodePayload,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  TextInput,
  Tree,
  TreeNodeData,
  useCombobox,
} from '@mantine/core';
import { elementsToTex } from './elementsToTex';
import { elementsPrototypes } from './equationsElementsPrototypes';
import classes from './equationEditor.module.css';
import ElementsTree from './ElementsTree'
import { AddSpecialCharacterComboox } from './AddSpecialCharacterCombobox';

type elementType = {
  label: 'Expression' | 'Integral' | 'Fraction' | 'Numerator' | 'Denominator';
  value: string;
  belonging?: string;
  content?: string;
  nodeProps?: Record<string, any>;
  children?: elementType[];
};

type VisualEditorTabTabPropsType = {
  equationFormulaState: [string, Dispatch<SetStateAction<string>>];
};



export default function VisualEditorTab({ equationFormulaState }: VisualEditorTabTabPropsType) {
  const elementsContentState = useState<any[]>([
    { ...elementsPrototypes.expression.elementPrototype },
  ]);
  const [elementsContent, setElementsContent] = elementsContentState;
  const [latexFormula, setLatexFormula] = equationFormulaState;//useState<string>('yolo');
  const [expressionInputContent, setExpressionInputContent] = useState<string>('');

  const activeTreeElementState = useState<string>('0');
  const [activeTreeElement, setActiveTreeElement] = activeTreeElementState;

  const getElementByIdx = (idx, array) => {
    const idxs = idx.split('.').map(Number);
    //console.log('idxs: ', idxs);

    let element = array;
    for (let idx of idxs) {
      //console.log('idx: ', idx);
      Array.isArray(element) ? (element = element[idx]) : (element = element.children[idx]);
    }
    return element;
  };

  const updateIdx = (array, preIdx) => {
    const preIdxCopy = [...preIdx];
    for (let i = 0; i < array.length; i++) {
      let idxs = [...preIdxCopy, i];
      if (array[i] !== null) {
        array[i].value = idxs.join('.');
        array[i].children = updateIdx(array[i].children, idxs);
      }
    }
    console.log('updateX:', array);
    return array;
  };

  const insertElement = (idx, originAarray, newContent, deleteAmount) => {
    let array = [...originAarray];
    const idxs = idx.split('.').map(Number);

    let rest = [];
    let element = array;
    for (let idx of idxs) {
      rest = [element, ...rest];
      Array.isArray(element) ? (element = element[idx]) : (element = element.children[idx]);
    }

    let partOfTree = newContent;
    for (let i = 0; i < rest.length; i++) {
      let tmp = rest[i];
      //if(partOfTree!==null){
      if (Array.isArray(tmp)) {
        i === 0
          ? tmp.splice(idxs[idxs.length - 1 - i], deleteAmount, partOfTree)
          : tmp.splice(idxs[idxs.length - 1 - i], 1, partOfTree);
      } else {
        i === 0
          ? tmp.children.splice(idxs[idxs.length - 1 - i], deleteAmount, partOfTree)
          : tmp.children.splice(idxs[idxs.length - 1 - i], 1, partOfTree);
      }
      partOfTree = tmp;
      //  }
    }

    return updateIdx(partOfTree, []);
  };




  const chooseElementEditor = () => {
    const element = getElementByIdx(activeTreeElement, elementsContent);
    if (element.label === 'Expression') {
      return (<Flex w='100%'  align='center'>
        <Textarea
          variant="filled"
          w="100%"
          value={expressionInputContent}
          onChange={(e) => {
            setExpressionInputContent(e.currentTarget.value);
            element.content = e.currentTarget.value;
            insertElement(element.value, elementsContent, element, 1);
          }}
        />
        <AddSpecialCharacterComboox/>
        </Flex>
      );
    }
    return <>Expression element is not selected {`(currently selected: ${element.label})`}</>;
  };


  useEffect(() => {
    setLatexFormula(elementsToTex(elementsContent));
    console.log('useEffect');
  }, [elementsContent, expressionInputContent]);

  return (
    <Grid w="100%" h="100%" mt="0px" pt="0">
      <Grid.Col span={4} h="63vh">
        <Text fw={500} size="sm">
          Elements:
        </Text>
        <ElementsTree activeTreeElementState={activeTreeElementState} expressionInputContentState={[expressionInputContent, setExpressionInputContent]} elementsContentState={elementsContentState} getElementByIdx={getElementByIdx} insertElement={insertElement} updateIdx={updateIdx}/>
      </Grid.Col>
      <Grid.Col span={8}>
        <Stack>
          <Box h="20vh">
            <Text fw={500} size="sm">
              Edit:
            </Text>
            <ScrollArea h="100%" w="100%">
              <Center h="20vh" p="0px">
                {chooseElementEditor()}
              </Center>
            </ScrollArea>
          </Box>
          <Box h="35vh">
            <Text fw={500} size="sm">
              Preview:
            </Text>
            <ScrollArea h="100%">
              <Center w="100%" mih="35vh">
                <Latex>{`$$${latexFormula}$$`}</Latex>
              </Center>
            </ScrollArea>
          </Box>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
