import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { FaArrowDown, FaArrowUp, FaRegTrashAlt, FaTrashAlt } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdOutlineAdd } from 'react-icons/md';
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
  const [latexFormula, setLatexFormula] = useState<string>('yolo');
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

  const deleteElement = (idx) => {
    let array = [...elementsContent];
    const idxs = idx.split('.').map(Number);

    let rest = [];
    let element = array;
    for (let idx of idxs) {
      rest = [element, ...rest];
      Array.isArray(element) ? (element = element[idx]) : (element = element.children[idx]);
    }

    let partOfTree;
    for (let i = 0; i < rest.length; i++) {
      let tmp = rest[i];
      //if(partOfTree!==null){
      if (Array.isArray(tmp)) {
        if (i === 0) {
          tmp.length === 1
            ? tmp.splice(idxs[idxs.length - 1 - i], 1, {
                ...elementsPrototypes.expression.elementPrototype,
              })
            : tmp.splice(idxs[idxs.length - 1 - i], 1);
        } else {
          tmp.splice(idxs[idxs.length - 1 - i], 1, partOfTree);
        }
      } else {
        if (i === 0) {
          tmp.children.length === 1
            ? tmp.children.splice(idxs[idxs.length - 1 - i], 1, {
                ...elementsPrototypes.expression.elementPrototype,
              })
            : tmp.children.splice(idxs[idxs.length - 1 - i], 1);
        } else {
          tmp.children.splice(idxs[idxs.length - 1 - i], 1, partOfTree);
        }
      }
      partOfTree = tmp;
      //  }
    }
    setElementsContent(updateIdx(partOfTree, []));
    setActiveTreeElement('0');
  };

  const moveUpElement = (idx) => {
    //TODO !!!!!!!!!!!!!

    let array = [...elementsContent];
    const idxs = idx.split('.').map(Number);

    let rest = [];
    let element = array;
    for (let idx of idxs) {
      rest = [element, ...rest];
      Array.isArray(element) ? (element = element[idx]) : (element = element.children[idx]);
    }

    let partOfTree; //= newContent;
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

  const TreeNode = ({ node, expanded, hasChildren, elementProps, tree }: RenderTreeNodePayload) => {
    const isExpression = (element) => {
      return element.label === 'Expression';
    };

    const content = node.editable
      ? node.label === 'Expression'
        ? `"${node.content}"`
        : node.children
            ?.map((element) => {
              return element.label === 'Expression'
                ? `"${element.content}"`
                : element.children
                    ?.map((element) => {
                      return element.label === 'Expression'
                        ? `"${element.content}"`
                        : element.label;
                    })
                    .join(' , ');
            })
            .join(' | ')
      : node.children.map((element) => {
          return element.label === 'Expression' ? `"${element.content}"` : element.label;
        });

    return (
      <Group gap="xs" {...elementProps}>
        <Flex w="100%">
          <Box w="1rem" onClick={() => tree.toggleExpanded(node.value)} mt="0.30rem" mr="0.15rem">
            {hasChildren && (
              <MdKeyboardArrowDown
                size={14}
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            )}
          </Box>
          <Box
            p="0.25rem"
            pl="0.35rem"
            miw="11rem"
            onClick={() => {
              node.editable
                ? (setActiveTreeElement(node.value),
                  node.label === 'Expression'
                    ? setExpressionInputContent(
                        getElementByIdx(node.value, elementsContent).content
                      )
                    : null)
                : null;
            }}
            onDoubleClick={() => tree.toggleExpanded(node.value)}
            className={
              activeTreeElement === node.value
                ? classes.markedElement
                : node.editable
                  ? classes.unmarkedelement
                  : classes.noneditableElement
            }
            w="100%"
            //bg="var(--mantine-color-gray-1)"
            m="2px"
          >
            <Flex>
              <Text
                fw={activeTreeElement === node.value ? '500' : ''}
                display="inline-block"
                className={classes.oneLine}
              >
                {node.label}
              </Text>
              <Text
                className={classes.trunckedText}
                ml="sm"
                maw="70%"
                c={activeTreeElement === node.value ? 'var(--mantine-color-gray-1)' : ''}
              >
                {` ${content}`}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Group>
    );
  };

  const chooseElementEditor = () => {
    const element = getElementByIdx(activeTreeElement, elementsContent);
    if (element.label === 'Expression') {
      return (
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
      );
    }
    return <>Expression element is not selected {`(currently selected: ${element.label})`}</>;
  };

  const addElementAbove = (toAdd) => {
    const elementToAdd = cloneDeep(toAdd);
    setElementsContent(
      insertElement(activeTreeElement, elementsContent, elementToAdd, 0) //.map((item) => {
      //   return item;
      // })
    );
  };

  const addElementBelow = (toAdd) => {
    const elementToAdd = cloneDeep(toAdd);
    let idxs = activeTreeElement.split('.').map(Number);
    idxs[idxs.length - 1] = idxs[idxs.length - 1] + 1;

    setElementsContent(
      insertElement(idxs.join('.'), elementsContent, elementToAdd, 0) //.map((item) => {
      //   return item;
      // })
    );

    setActiveTreeElement(idxs.join('.'));
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
        <Flex justify="center" p="0px" m="0px" h="2rem">
          {getElementByIdx(activeTreeElement, elementsContent).editable ? (
            <>
              <Button fz="xs" variant="transparent">
                <FaArrowUp />
              </Button>
              <Button
                fz="xs"
                variant="transparent" //onClick={() => console.log('yolo')}
              >
                <FaArrowDown />
              </Button>
              <Menu>
                <Menu.Target>
                  <Button variant="transparent">
                    <MdOutlineAdd />
                    <Text fz="xs" m="0px">
                      up
                    </Text>
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  {Object.entries(elementsPrototypes).map(([key, value]) => {
                    return (
                      <Menu.Item onClick={() => addElementAbove({ ...value.elementPrototype })}>
                        {value.label}
                      </Menu.Item>
                    );
                  })}
                </Menu.Dropdown>
              </Menu>

              <Menu>
                <Menu.Target>
                  <Button variant="transparent">
                    <MdOutlineAdd />
                    <Text fz="xs" m="0px">
                      down
                    </Text>
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  {Object.entries(elementsPrototypes).map(([key, value]) => {
                    return (
                      <Menu.Item onClick={() => addElementBelow({ ...value.elementPrototype })}>
                        {value.label}
                      </Menu.Item>
                    );
                  })}
                </Menu.Dropdown>
              </Menu>
              <Button
                fz="xs"
                variant="transparent"
                onClick={() => {
                  deleteElement(activeTreeElement);
                }}
              >
                <FaTrashAlt />
              </Button>
            </>
          ) : (
            <></>
          )}
        </Flex>
        <ScrollArea
          h="100%"
          //bg="var(--mantine-color-gray-1)"
          p="sm"
          pt="0px"
          pb="0px"
          //className={classes.elementsTree}
        >
          <Tree
            data={elementsContent}
            renderNode={TreeNode}
            expandOnClick={false}
            levelOffset={20}
          />
          {/* <EquationElementsList tree={elementsContent} />
          {/* <MemoTree /> */}
        </ScrollArea>
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
