 import { Flex,Group, Box, Text,   RenderTreeNodePayload, ScrollArea, Button, Menu, Tree } from "@mantine/core";
 import classes from './equationEditor.module.css'
 import { Dispatch, SetStateAction } from "react";
 import { MdKeyboardArrowDown, MdOutlineAdd } from 'react-icons/md';
 import cloneDeep from 'lodash/cloneDeep';
 import { FaArrowDown, FaArrowUp, FaRegTrashAlt, FaTrashAlt } from 'react-icons/fa';
 import { elementsPrototypes } from "./equationsElementsPrototypes";

 type elementsTreePropsType = {
    activeTreeElementState: [string, Dispatch<SetStateAction<string>>],
    expressionInputContentState: [string, Dispatch<SetStateAction<string>>],
    elementsContentState: [any, Dispatch<SetStateAction<any>>],
    getElementByIdx: (idx:any, array: any)=>any,
    insertElement: (idx, originAarray, newContent, deleteAmount)=>any
    updateIdx: (array, preIdx)=>any
 }


 
 export default function ElementsTree({activeTreeElementState, expressionInputContentState, elementsContentState, getElementByIdx, insertElement, updateIdx}: elementsTreePropsType){

  const [activeTreeElement, setActiveTreeElement]=activeTreeElementState;
  const [expressionInputContent, setExpressionInputContent]=expressionInputContentState;
  const [elementsContent, setElementsContent]=elementsContentState;


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

 const TreeNode  =({ node, expanded, hasChildren, elementProps, tree }:  RenderTreeNodePayload)=>  {


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


  return(<><Flex justify="center" p="0px" m="0px" h="2rem">
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
          </ScrollArea></>)

}