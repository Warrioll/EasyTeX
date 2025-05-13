import { Dispatch, SetStateAction } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { number } from 'prop-types';
import { FaArrowDown, FaArrowUp, FaRegTrashAlt, FaTrashAlt } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdOutlineAdd } from 'react-icons/md';
import Latex from 'react-latex-next';
import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  HoverCard,
  Menu,
  RenderTreeNodePayload,
  ScrollArea,
  Text,
  Tree,
} from '@mantine/core';
import { AddComboox } from './addCombobox';
import { elementsToTex } from './equationConverters';
import { elementsPrototypes } from './equationsElementsPrototypes';
import classes from './equationEditor.module.css';

type elementsTreePropsType = {
  activeTreeElementState: [string, Dispatch<SetStateAction<string>>];
  expressionInputContentState: [string, Dispatch<SetStateAction<string>>];
  elementsContentState: [any, Dispatch<SetStateAction<any>>];
  getElementByIdx: (idx: any, array: any) => any;
  insertElement: (idx, originAarray, newContent, deleteAmount) => any;
  updateIdx: (array, preIdx) => any;
};

export default function ElementsTree({
  activeTreeElementState,
  expressionInputContentState,
  elementsContentState,
  getElementByIdx,
  insertElement,
  updateIdx,
}: elementsTreePropsType) {
  const [activeTreeElement, setActiveTreeElement] = activeTreeElementState;
  const [expressionInputContent, setExpressionInputContent] = expressionInputContentState;
  const [elementsContent, setElementsContent] = elementsContentState;

  const addElementAbove = (toAdd) => {
    const elementToAdd = cloneDeep(toAdd);
    const ec = insertElement(activeTreeElement, elementsContent, elementToAdd, 0);
    setElementsContent(
      cloneDeep(ec)
      //.map((item) => {
      //   return item;
      // })
    );
    //console.log('up insert: ', ec);
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

    setElementsContent((ec) => updateIdx(partOfTree, []));
    setActiveTreeElement('0');
  };

  const moveUp = () => {
    const idxs = activeTreeElement.split('.').map(Number);

    let rest = [];
    let element = cloneDeep(elementsContent);
    let isMoreThan1: boolean = false;
    for (let i = 0; i < idxs.length - 1; i++) {
      rest = [cloneDeep(element), ...rest];
      Array.isArray(element);
      Array.isArray(element)
        ? (element = cloneDeep(element[idxs[i]]))
        : (element = cloneDeep(element.children[idxs[i]]));
    }

    if (Array.isArray(element)) {
      element.length > 1 ? (isMoreThan1 = true) : (isMoreThan1 = false);
    } else {
      element.children.length > 1 ? (isMoreThan1 = true) : (isMoreThan1 = false);
    }
    if (isMoreThan1) {
      if (Array.isArray(element)) {
        const lowerElement = { ...element[idxs[idxs.length - 1]] };
        const upperElement = { ...element[idxs[idxs.length - 1] - 1] };
        element[idxs[idxs.length - 1]] = upperElement;
        element[idxs[idxs.length - 1] - 1] = lowerElement;
      } else {
        const lowerElement = { ...element.children[idxs[idxs.length - 1]] };
        const upperElement = { ...element.children[idxs[idxs.length - 1] - 1] };
        element.children[idxs[idxs.length - 1]] = upperElement;
        element.children[idxs[idxs.length - 1] - 1] = lowerElement;
      }

      let partOfTree = cloneDeep(element);
      for (let i = 0; i < rest.length; i++) {
        let tmp = cloneDeep(rest[i]);
        //if(partOfTree!==null){
        if (Array.isArray(tmp)) {
          tmp.splice(idxs[idxs.length - 2 - i], 1, partOfTree);
        } else {
          tmp.children.splice(idxs[idxs.length - 2 - i], 1, partOfTree);
        }
        partOfTree = cloneDeep(tmp);
        //  }
      }
      setElementsContent(updateIdx(partOfTree, []));
      let newIdxs = [...idxs];
      newIdxs[newIdxs.length - 1] = newIdxs[newIdxs.length - 1] - 1;

      setActiveTreeElement(newIdxs.join('.'));
    }
  };

  const moveDown = () => {
    const idxs = activeTreeElement.split('.').map(Number);

    let rest = [];
    let element = cloneDeep(elementsContent);
    let moreThanLength: boolean = false;
    for (let i = 0; i < idxs.length - 1; i++) {
      rest = [cloneDeep(element), ...rest];
      Array.isArray(element);
      Array.isArray(element)
        ? (element = cloneDeep(element[idxs[i]]))
        : (element = cloneDeep(element.children[idxs[i]]));
    }

    if (Array.isArray(element)) {
      element.length > idxs[idxs.length - 1] ? (moreThanLength = true) : (moreThanLength = false);
    } else {
      element.children.length > idxs[idxs.length - 1]
        ? (moreThanLength = true)
        : (moreThanLength = false);
    }
    //console.log('x1');
    if (moreThanLength) {
      // console.log('x2');
      if (Array.isArray(element)) {
        const lowerElement = { ...element[idxs[idxs.length - 1] + 1] };
        const upperElement = { ...element[idxs[idxs.length - 1]] };
        element[idxs[idxs.length - 1] + 1] = upperElement;
        element[idxs[idxs.length - 1]] = lowerElement;
      } else {
        const lowerElement = { ...element.children[idxs[idxs.length - 1] + 1] };
        const upperElement = { ...element.children[idxs[idxs.length - 1]] };
        element.children[idxs[idxs.length - 1] + 1] = upperElement;
        element.children[idxs[idxs.length - 1]] = lowerElement;
      }

      let partOfTree = cloneDeep(element);
      for (let i = 0; i < rest.length; i++) {
        let tmp = cloneDeep(rest[i]);
        //if(partOfTree!==null){
        if (Array.isArray(tmp)) {
          tmp.splice(idxs[idxs.length - 2 - i], 1, partOfTree);
        } else {
          tmp.children.splice(idxs[idxs.length - 2 - i], 1, partOfTree);
        }
        partOfTree = cloneDeep(tmp);
        //  }
      }
      setElementsContent(updateIdx(partOfTree, []));
      let newIdxs = [...idxs];
      newIdxs[newIdxs.length - 1] = newIdxs[newIdxs.length - 1] + 1;

      setActiveTreeElement(newIdxs.join('.'));
    }
  };

  const TreeNode = ({ node, expanded, hasChildren, elementProps, tree }: RenderTreeNodePayload) => {
    // const isExpression = (element) => {
    //   return element.label === 'Expression';
    // };

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
          <HoverCard
            withArrow
            position="bottom-start"
            openDelay={1000}
            shadow="xs"
            arrowOffset="5.5rem"
          >
            <HoverCard.Target>
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
            </HoverCard.Target>
            {node.editable ? (
              <HoverCard.Dropdown miw="10vw" mih="5vh" bd="1px solid var(--mantine-color-gray-3)">
                <Center w="100%" h="100%" p="0px" fz="1.2rem">
                  <Latex>${elementsToTex([node])}$</Latex>
                </Center>
              </HoverCard.Dropdown>
            ) : (
              <></>
            )}
          </HoverCard>
        </Flex>
      </Group>
    );
  };

  const treeWithTryCatch = () => {
    try {
      console.log('ft: ', elementsContent);
      return (
        <Tree data={elementsContent} renderNode={TreeNode} expandOnClick={false} levelOffset={20} />
      );
    } catch (e) {
      console.log('treeTryCatch');
      return <></>;
    }
  };

  return (
    <>
      <Flex justify="center" p="0px" m="0px" h="2rem">
        {getElementByIdx(activeTreeElement, elementsContent).editable ? (
          <>
            <Button fz="xs" variant="transparent" onClick={moveUp}>
              <FaArrowUp />
            </Button>
            <Button fz="xs" variant="transparent" onClick={moveDown}>
              <FaArrowDown />
            </Button>
            <AddComboox
              insertFunction={addElementAbove}
              placeholder="elements"
              buttonContent={
                <>
                  {' '}
                  <MdOutlineAdd />
                  <Text fz="xs" m="0px">
                    up
                  </Text>
                </>
              }
              data={Object.entries(elementsPrototypes).map(([key, value]) => {
                return {
                  label: value.label,
                  icon: <Latex>$${value.latexRepresentation}$$</Latex>,
                  value: { ...value.elementPrototype },
                };
              })}
              iconSize="0.8rem"
              floatingStrategy=""
              withGroups={false}
            />

            <AddComboox
              insertFunction={addElementBelow}
              placeholder="elements"
              buttonContent={
                <>
                  <MdOutlineAdd />
                  <Text fz="xs" m="0px">
                    down
                  </Text>
                </>
              }
              data={Object.entries(elementsPrototypes).map(([key, value]) => {
                return {
                  label: value.label,
                  icon: <Latex>$${value.latexRepresentation}$$</Latex>,
                  value: { ...value.elementPrototype },
                };
              })}
              iconSize="0.8rem"
              floatingStrategy="absolute"
              withGroups={false}
            />
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
        {/* <Tree data={elementsContent} renderNode={TreeNode} expandOnClick={false} levelOffset={20} />  */}
        {treeWithTryCatch()}
        {/* <EquationElementsList tree={elementsContent} />
            {/* <MemoTree /> */}
      </ScrollArea>
    </>
  );
}
