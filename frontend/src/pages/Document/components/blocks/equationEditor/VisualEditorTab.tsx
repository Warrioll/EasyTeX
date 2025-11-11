import { Dispatch, SetStateAction, useState } from 'react';
import { TbOmega } from 'react-icons/tb';
import Latex from 'react-latex-next';
import { Box, Center, Flex, Grid, ScrollArea, Stack, Text, Textarea } from '@mantine/core';
import { AddComboox } from '../../../../../components/other/AddCombobox';
import { specialCharacters } from '../../SpecialCharacters';
import ElementsTree from './ElementsTree';
import { elementsToTex } from './equationConverters';

type VisualEditorTabTabPropsType = {
  elementsContentState: [Array<any>, Dispatch<SetStateAction<Array<any>>>];
};

export default function VisualEditorTab({ elementsContentState }: VisualEditorTabTabPropsType) {
  const [elementsContent, setElementsContent] = elementsContentState;

  const [expressionInputContent, setExpressionInputContent] = useState<string>('');

  const activeTreeElementState = useState<string>('');
  const [activeTreeElement, setActiveTreeElement] = activeTreeElementState;

  const getElementByIdx = (idx, array) => {
    const idxs = idx.split('.').map(Number);

    let element = array;
    for (let i of idxs) {
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
            placeholder="Expression"
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
        </Flex>
      );
    }

    return (
      <Text c="var(--mantine-color-gray-6)">
        Expression element is not selected {`(currently selected: ${element.label})`}
      </Text>
    );
  };

  return (
    <Grid w="100%" h="100%" mt="0px" pt="0" miw="60rem">
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
