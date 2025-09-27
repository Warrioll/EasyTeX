import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { FaArrowDown, FaArrowUp, FaRegTrashAlt, FaTrashAlt } from 'react-icons/fa';
import { TbOmega } from 'react-icons/tb';
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
import { AddComboox } from '../../../../../components/other/AddCombobox';
import { specialCharacters } from '../../SpecialCharacters';
//import { AddSpecialCharacterComboox } from './AddSpecialCharacterCombobox';
import ElementsTree from './ElementsTree';
import { elementsToTex, texToElements } from './equationConverters';
import { elementsPrototypes } from './equationsElementsPrototypes';
import classes from './equationEditor.module.css';

type elementType = {
  label: 'Expression' | 'Integral' | 'Fraction' | 'Numerator' | 'Denominator';
  value: string;
  belonging?: string;
  content?: string;
  nodeProps?: Record<string, any>;
  children?: elementType[];
};

type VisualEditorTabTabPropsType = {
  //  equationFormulaState: [string, Dispatch<SetStateAction<string>>];
  elementsContentState: [Array<any>, Dispatch<SetStateAction<Array<any>>>];
};

export default function VisualEditorTab({
  //equationFormulaState,
  elementsContentState,
}: VisualEditorTabTabPropsType) {
  // const elementsContentState = useState<any[]>([
  //   { ...elementsPrototypes.expression.elementPrototype },
  // ]);
  const [elementsContent, setElementsContent] = elementsContentState;
  //const [latexFormula, setLatexFormula] = equationFormulaState; //useState<string>('yolo');
  const [expressionInputContent, setExpressionInputContent] = useState<string>('');

  const activeTreeElementState = useState<string>('');
  const [activeTreeElement, setActiveTreeElement] = activeTreeElementState;

  const getElementByIdx = (idx, array) => {
    console.log('getelementByIdx array: ', array);
    const idxs = idx.split('.').map(Number);
    console.log('idxs: ', idxs);

    let element = array;
    for (let i of idxs) {
      console.log('i: ', i, 'element: ', element);
      // try {
      //   Array.isArray(element) ? (element = element[i]) : (element = element.children[i]);
      // } catch (e) {
      //   console.log('Too deep or sth wrong: ', e);
      //   break;
      // }

      if (Array.isArray(element)) {
        if (element[i] === undefined) {
          break;
        } else {
          element = element[i];
        }
      } else {
        if (element.children[i] === undefined) {
          break;
        } else {
          element = element.children[i];
        }
        //Array.isArray(element) ? (element = element[i]) : (element = element.children[i]);
      }
    }
    return element;
  };

  const updateIdx = (array, preIdx) => {
    const preIdxCopy = [...preIdx];
    for (let i = 0; i < array.length; i++) {
      let idxs = [...preIdxCopy, i];
      if (array[i] !== null) {
        array[i].value = idxs.join('.');
        if (array[i].label === 'Expression' && array[i].content === undefined) {
          array[i].content = 'undefined!';
        }
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
    if (activeTreeElement === '') {
      return (
        <Text c="var(--mantine-color-gray-6)">
          Expression element is not selected {`(no element is currently selected)`}
        </Text>
      );
    }
    const element = getElementByIdx(activeTreeElement, elementsContent);

    const addSpecialCharacter = (specialCharacter: string) => {
      setExpressionInputContent(expressionInputContent.concat(specialCharacter));
      element.content = element.content.concat(specialCharacter);
      insertElement(element.value, elementsContent, element, 1);
      //insertElement(expressionInputContent.concat(specialCharacter));
    };

    if (element.label === 'Expression') {
      const specialCharacersForCombobox = specialCharacters.map((group) => {
        return {
          label: group.label,
          group: group.group.map((item) => {
            return {
              label: item.label,
              Icon: () => (
                <>
                  {item.latexRepresentation ? <Latex>$${item.latexRepresentation}$$</Latex> : null}
                </>
              ),
              value: item.value,
            };
          }),
        };
      });
      return (
        <Flex w="100%" align="center">
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
          <AddComboox
            insertFunction={addSpecialCharacter}
            placeholder="elements"
            buttonContent={
              <Text fz="1.5rem">
                <TbOmega />
              </Text>
            }
            data={specialCharacersForCombobox}
            iconSize="0.8rem"
            floatingStrategy="fixed"
            withGroups
          />

          {/* <AddSpecialCharacterComboox
            expressionInputContentState={[expressionInputContent, setExpressionInputContent]}
            insertElement={(withSpecialCharacter) =>
              insertElement(element.value, withSpecialCharacter, element, 1)
            }
          /> */}
        </Flex>
      );
    }

    return (
      <Text c="var(--mantine-color-gray-6)">
        Expression element is not selected {`(currently selected: ${element.label})`}
      </Text>
    );
  };

  // useEffect(() => {
  //   setLatexFormula(elementsToTex(elementsContent));
  //   console.log('useEffect');
  // }, [elementsContent, expressionInputContent]);

  useEffect(() => {
    //console.log('texToElements: ', texToElements(latexFormula));
    //setElementsContent(updateIdx(cloneDeep(texToElements(latexFormula)), []));
    //setElementsContent(updateIdx(cloneDeep(texToElements(texToElementsSpecialCHaractersConvertion(latexFormula))), []));
  }, []);

  return (
    <Grid w="100%" h="100%" mt="0px" pt="0">
      <Grid.Col span={4} h="63vh">
        <Text fw={500} size="sm">
          Elements:
        </Text>
        <ElementsTree
          activeTreeElementState={activeTreeElementState}
          expressionInputContentState={[expressionInputContent, setExpressionInputContent]}
          elementsContentState={elementsContentState}
          getElementByIdx={getElementByIdx}
          insertElement={insertElement}
          updateIdx={updateIdx}
        />
      </Grid.Col>
      <Grid.Col span={8}>
        <Stack>
          <Box h="10vh">
            <Text fw={500} size="sm">
              Edit:
            </Text>
            <ScrollArea h="100%" w="100%">
              <Center h="10vh" p="0px">
                {chooseElementEditor()}
              </Center>
            </ScrollArea>
          </Box>
          <Box h="50vh">
            <Text fw={500} size="sm">
              Preview:
            </Text>
            <ScrollArea h="100%">
              <Center w="100%" mih="50vh">
                <Latex>{`$$${elementsToTex(elementsContent)}$$`}</Latex>
              </Center>
            </ScrollArea>
          </Box>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
