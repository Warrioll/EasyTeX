import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
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
  TextInput,
  Tree,
  TreeNodeData,
  useCombobox,
  Textarea
} from '@mantine/core';
import classes from './equationEditor.module.css';
import {elementsPrototypes} from './equationsElementsPrototypes'
import cloneDeep from 'lodash/cloneDeep'



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
 {...elementsPrototypes.expression}
  ]);
  const [elementsContent, setElementsContent] = elementsContentState;

  const activeTreeElementState = useState<string>('0');
  const [activeTreeElement, setActiveTreeElement] = activeTreeElementState;

  const activeEditorElementState = useState<string>('');
  const [activeEditorElement, setActiveEditorElement] = activeEditorElementState;

  const nodeContentState = useState(['']);
  const [nodeContent, setNodeContent] = nodeContentState;

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
    const preIdxCopy=[...preIdx]
    for (let i = 0; i < array.length; i++) {
      let idxs = [...preIdxCopy, i];
      if(array[i]!==null){
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

    let partOfTree
    for (let i = 0; i < rest.length; i++) {
      let tmp = rest[i];
      //if(partOfTree!==null){
      if (Array.isArray(tmp)) {
        i === 0
          ? tmp.splice(idxs[idxs.length - 1 - i], 1)
          : tmp.splice(idxs[idxs.length - 1 - i], 1, partOfTree);
      } else {
        i === 0
          ? tmp.children.splice(idxs[idxs.length - 1 - i], 1)
          : tmp.children.splice(idxs[idxs.length - 1 - i], 1, partOfTree);
      }
      partOfTree = tmp;
  //  }
    } 
    setElementsContent(updateIdx(partOfTree, []))
    setActiveTreeElement('0')
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

    let partOfTree //= newContent;
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
            onClick={() => {node.editable ? (setActiveTreeElement(node.value)):null}}
            onDoubleClick={() => tree.toggleExpanded(node.value)}
            className={
              activeTreeElement === node.value ? classes.markedElement : (node.editable ? classes.unmarkedelement  : classes.noneditableElement ) 
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
  };

  

  const chooseElementEditor = () => {
    const element = getElementByIdx(activeTreeElement, elementsContent);
    if (element.label === 'Expression') {
      return <Textarea variant='filled' w='100%' value={():string=>{return getElementByIdx( element.value, elementsContent).content}} onChange={(e)=>{
        element.content=e.currentTarget.value
        insertElement(element.value, elementsContent,element,1)

      }}/>;
    }
    return <>Expression element is not selected {`(currently selected: ${element.label})`}</>;


  };



  const addElementAbove = (toAdd) => {
    const elementToAdd = cloneDeep(toAdd)
    setElementsContent(
      insertElement(
        activeTreeElement,
        elementsContent,
       elementToAdd,
        0
      ) //.map((item) => {
      //   return item;
      // })
    );
  };

  const addElementBelow = (toAdd) => {
    const elementToAdd = cloneDeep(toAdd)
    let idxs = activeTreeElement.split('.').map(Number);
    idxs[idxs.length - 1] = idxs[idxs.length - 1] + 1;

    setElementsContent(
      insertElement(
        idxs.join('.'),
        elementsContent,
       elementToAdd,
        0
      ) //.map((item) => {
      //   return item;
      // })
    );

    setActiveTreeElement(idxs.join('.'));
  };

  return (
    <Grid w="100%" h="100%" mt='0px' pt='0'>
      <Grid.Col span={4} h='63vh'>
        <Text fw={500} size="sm">
          Elements:
        </Text>
        <Flex justify="center" p="0px" m="0px" h="2rem">
          {getElementByIdx(activeTreeElement, elementsContent).editable ? (
            <>
              <Button fz="xs" variant="transparent">
                <FaArrowUp />
              </Button>
              <Button fz="xs" variant="transparent" //onClick={() => console.log('yolo')}
                >
                <FaArrowDown />
              </Button>  
              <Menu >
                              <Menu.Target>
                              <Button variant="transparent" >
                                  <MdOutlineAdd />
                                  <Text fz="xs" m="0px">
                                   up
                                  </Text>
                                </Button>
                              </Menu.Target>
                              <Menu.Dropdown>
                              <Menu.Item
                                                                   
                                  onClick={()=>addElementAbove({...elementsPrototypes.expression})}
                                >
                                 Expression
                                </Menu.Item>
                                <Menu.Item
                                  
                                  
                                  onClick={()=>addElementAbove({...elementsPrototypes.fraction})}
                                >
                                 Fraction
                                </Menu.Item>
                                <Menu.Item
                                 
                                  onClick={()=>addElementAbove({...elementsPrototypes.integral})}
                                >
                                 Integral
                                </Menu.Item>
                                <Menu.Item
                                  
                                  onClick={()=>addElementAbove({...elementsPrototypes.root})}
                                >
                                 Root
                                </Menu.Item>
                                <Menu.Item
                                  
                                  onClick={()=>addElementAbove({...elementsPrototypes.upperIndex})}
                                >
                                 Upper inrex
                                </Menu.Item>
                                <Menu.Item
                                 
                                  onClick={()=>addElementAbove({...elementsPrototypes.lowerIndex})}
                                >
                                Lower index
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
              
              
              <Menu >
                              <Menu.Target>
                              <Button variant="transparent">
                <MdOutlineAdd />
                <Text fz="xs" m="0px">
                  down
                </Text>
              </Button>
                              </Menu.Target>
                              <Menu.Dropdown>
                              <Menu.Item
                                                                   
                                                                   onClick={()=>addElementAbove({...elementsPrototypes.expression})}
                                                                 >
                                                                  Expression
                                                                 </Menu.Item> 
                                <Menu.Item
                                  
                                  
                                  onClick={()=>addElementBelow({...elementsPrototypes.fraction})}
                                >
                                 Fraction
                                </Menu.Item>
                                <Menu.Item
                                 
                                  onClick={()=>addElementBelow({...elementsPrototypes.integral})}
                                >
                                 Integral
                                </Menu.Item>
                                <Menu.Item 
                                  
                                  onClick={()=>addElementBelow({...elementsPrototypes.root})}
                                >
                                 Root
                                </Menu.Item>
                                <Menu.Item
                                  
                                  onClick={()=>addElementBelow({...elementsPrototypes.upperIndex})}
                                >
                                 Upper inrex
                                </Menu.Item>
                                <Menu.Item
                                 
                                  onClick={()=>addElementBelow({...elementsPrototypes.lowerIndex})}
                                >
                                Lower index
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
              <Button
                fz="xs"
                variant="transparent"
                onClick={() => {
                  deleteElement(activeTreeElement)}}
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
          pb='0px'
          //className={classes.elementsTree}
        >
          <Tree
            data={elementsContent}
            renderNode={TreeNode}
            expandOnClick={false}
            levelOffset={15}
          />
          {/* <EquationElementsList tree={elementsContent} />
          {/* <MemoTree /> */}
        </ScrollArea>
      </Grid.Col>
      <Grid.Col span={8}>
        <Stack>
          <Box h="20vh">
            <Text fw={500} size="sm" >
              Edit:
            </Text>
            <ScrollArea h="100%" w="100%"  >
              <Center h="20vh" p='0px'>{chooseElementEditor()}</Center>
            </ScrollArea>
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
