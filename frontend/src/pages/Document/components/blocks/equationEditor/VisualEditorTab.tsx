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

const elementsTypes = [
  {
    label: 'Fraction',
  },
  {
    label: 'Integral',
  },
];

type elementType = {
  label: 'Expression' | 'Integral' | 'Fraction' | 'Numerator' | 'Denominator';
  value: string;
  belonging?: string;
  content?: string;
  nodeProps?: Record<string, any>;
  children?: elementType[];
};

// export function ExpressionInput({ elementsState }) {
//   const combobox = useCombobox({
//     onDropdownClose: () => combobox.resetSelectedOption(),
//   });
//   const [value, setValue] = useState('');
//   const shouldFilterOptions = !elementsTypes.some((item) => item.label === value);
//   const filteredOptions = shouldFilterOptions
//     ? elementsTypes.filter((item) => item.label.toLowerCase().includes(value.toLowerCase().trim()))
//     : elementsTypes;

//   const options = filteredOptions.map((item) => (
//     <Combobox.Option value={item.label} key={item.label}>
//       <Highlight highlight={value} size="sm">
//         {item.label}
//       </Highlight>
//     </Combobox.Option>
//   ));

//   return (
//     <Combobox
//       onOptionSubmit={(optionValue) => {
//         elementsState[1]([optionValue, ...elementsState[0]]);
//         //setValue(optionValue);
//         combobox.closeDropdown();
//       }}
//       withinPortal={false}
//       store={combobox}
//     >
//       <Combobox.Target>
//         <TextInput
//           variant="filled"
//           placeholder="Enter expression"
//           value={value}
//           onChange={(event) => {
//             setValue(event.currentTarget.value);
//             combobox.updateSelectedOptionIndex();
//             combobox.openDropdown();
//           }}
//           onClick={() => combobox.openDropdown()}
//           onFocus={() => combobox.openDropdown()}
//           onBlur={() => combobox.closeDropdown()}
//         />
//       </Combobox.Target>

//       <Combobox.Dropdown>
//         <Combobox.Options>
//           {options.length === 0 ? (
//             <Combobox.Option value="">Add expression</Combobox.Option>
//           ) : (
//             options
//           )}
//         </Combobox.Options>
//       </Combobox.Dropdown>
//     </Combobox>
//   );
// }

type VisualEditorTabTabPropsType = {
  equationFormulaState: [string, Dispatch<SetStateAction<string>>];
};

export default function VisualEditorTab({ equationFormulaState }: VisualEditorTabTabPropsType) {
  // const [activeElement, setActiveElement] = useState<{
  //   value: string;
  //   label: '' | 'Fraction' | 'Integral';
  // }>({ value: '', label: '' });
  const elementsContentState = useState<elementType[]>([
    {
      value: '0',
      label: 'Integral',
      belonging: '',
      content: 'yolo',
      children: [
        {
          value: '0.0',
          label: 'Expression',
          belonging: '',
          content: 'yolo',
          children: [],
        },
        {
          value: '0.1',
          label: 'Fraction',
          belonging: '',
          content: 'yolo',
          children: [
            {
              value: '0.1.0',
              label: 'Numerator',
              belonging: 'up',
              content: 'yolo',
              children: [
                {
                  value: '0.1.0.0',
                  label: 'Expression',
                  belonging: 'down',
                  content: 'yolo',
                  children: [],
                },
              ],
            },
            {
              value: '0.1.1',
              label: 'Denominator',
              belonging: 'up',
              content: 'yolo',
              children: [
                {
                  value: '0.1.1.0',
                  label: 'Expression',
                  belonging: 'down',
                  content: 'yolo',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      value: '1',
      label: 'Expression',
      belonging: '',
      content: 'yolo',
      children: [],
    },
  ]);
  const [elementsContent, setElementsContent] = elementsContentState;

  const activeTreeElementState = useState<string>('0.1.1.0');
  const [activeTreeElement, setActiveTreeElement] = activeTreeElementState;

  const activeEditorElementState = useState<string>('');
  const [activeEditorElement, setActiveEditorElement] = activeEditorElementState;

  const nodeContentState = useState(['']);
  const [nodeContent, setNodeContent] = nodeContentState;

  const getElementIdx = () => {};

  const getElementByIdx = (idx, array) => {
    const idxs = idx.split('.').map(Number);
    console.log('idxs: ', idxs);

    let element = array;
    for (let idx of idxs) {
      console.log('idx: ', idx);
      Array.isArray(element) ? (element = element[idx]) : (element = element.children[idx]);
    }
    return element;
  };

  const updateIdx = (array, preIdx) => {
    for (let i = 0; i < array.length; i++) {
      let idxs = [...preIdx, i];
      array[i].value = idxs.join('.');
      array[i].children = updateIdx(array[i].children, idxs);
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
            onClick={() => setActiveTreeElement(node.value)}
            onDoubleClick={() => tree.toggleExpanded(node.value)}
            className={
              activeTreeElement === node.value ? classes.markedElement : classes.unmarkedelement
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

  // const inputAndAddElement = (
  //   <Flex>
  //     <Input />
  //     <Menu>
  //       <Menu.Target>
  //         <Button variant="outline" size="compact-xs" w="2rem" h="2rem" m="0px" p="0px">
  //           <MdOutlineAdd />
  //         </Button>
  //       </Menu.Target>
  //       <Menu.Dropdown>
  //         {elementsTypes.map((element) => {
  //           return (
  //             <Menu.Item
  //             //onClick={() => addBlockFunction(block.blockToAdd)}
  //             //leftSection={block.icon}
  //             >
  //               {element.label}
  //             </Menu.Item>
  //           );
  //         })}
  //       </Menu.Dropdown>
  //     </Menu>
  //   </Flex>
  // );

  const chooseElementEditor = () => {
    const label = getElementByIdx(activeTreeElement, elementsContent).label;
    if (label === 'Expression') {
      return <Input />;
    }
    return <>Expression element is not selected {`(currently selected: ${label})`}</>;

    // switch (getElementByIdx(activeTreeElement, elementsContent).label) {
    //   case 'Fraction':
    //     return (
    //       <>
    //         {getElementByIdx(activeTreeElement, elementsContent).children.map((item) => {
    //           switch (item.label) {
    //             case 'Fraction':
    //               return (
    //                 <Pill size="xl" withRemoveButton>
    //                   a/b
    //                 </Pill>
    //               );
    //             case 'Integral':
    //               return (
    //                 <Pill size="xl" withRemoveButton>
    //                   ∫dx
    //                 </Pill>
    //               );
    //             default:
    //               return (
    //                 <>
    //                   <Input value={item.content} />
    //                 </>
    //               );
    //           }
    //         })}
    //         {/* <ExpressionInput elementsState={nodeContentState} /> */}
    //       </>
    //     );
    //   case 'Expression':
    //     return <Input value={getElementByIdx(activeTreeElement, elementsContent).content} />;
    //   default:
    //     return <>Default</>;
    // }
    // return <>From chooseElementEditor fun</>;
  };

  const addElementAbove = () => {
    setElementsContent(
      insertElement(
        activeTreeElement,
        elementsContent,
        {
          value: '0',
          label: 'Expression',
          belonging: 'downnnnnn',
          content: 'yolo',
          children: [],
        },
        0
      ) //.map((item) => {
      //   return item;
      // })
    );
  };

  const addElementBelow = () => {
    let idxs = activeTreeElement.split('.').map(Number);
    idxs[idxs.length - 1] = idxs[idxs.length - 1] + 1;

    setElementsContent(
      insertElement(
        idxs.join('.'),
        elementsContent,
        {
          value: '0',
          label: 'Expression',
          belonging: 'downnnnnn',
          content: 'yolo',
          children: [],
        },
        0
      ) //.map((item) => {
      //   return item;
      // })
    );

    setActiveTreeElement(idxs.join('.'));
  };

  return (
    <Grid w="100%" h="100%">
      <Grid.Col span={4}>
        <Text fw={500} size="sm">
          Elements:
        </Text>
        <Flex justify="center" p="0px" m="0px" h="2rem">
          {getElementByIdx(activeTreeElement, elementsContent).label !== 'Numerator' &&
          getElementByIdx(activeTreeElement, elementsContent).label !== 'Denominator' ? (
            <>
              <Button fz="xs" variant="transparent">
                <FaArrowUp />
              </Button>
              <Button fz="xs" variant="transparent" onClick={() => console.log('yolo')}>
                <FaArrowDown />
              </Button>
              <Button variant="transparent" onClick={addElementAbove}>
                <MdOutlineAdd />
                <Text fz="xs" m="0px">
                  up
                </Text>
              </Button>
              <Button variant="transparent" onClick={addElementBelow}>
                <MdOutlineAdd />
                <Text fz="xs" m="0px">
                  down
                </Text>
              </Button>
              <Button
                fz="xs"
                variant="transparent"
                // onClick={() => {
                //     setElementsContent(
                //       insertElement(
                //         activeTreeElement,
                //         elementsContent,
                //         null,
                //         1
                //       )
                //     );}}
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
          pt="xs"
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
            <Text fw={500} size="sm">
              Edit:
            </Text>
            <ScrollArea h="100%" w="100%">
              <Center h="20vh">{chooseElementEditor()}</Center>
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
