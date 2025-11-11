import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { LuImage, LuTable } from 'react-icons/lu';
import { MdFunctions, MdOutlineLibraryBooks } from 'react-icons/md';
import { TbOmega } from 'react-icons/tb';
import Latex from 'react-latex-next';
import { Center, Text } from '@mantine/core';
import { AddComboox } from '@/components/other/AddCombobox';
import { blockAbleToRef, blockType, groupedListType, listElementType, listType } from '@/Types';
import { useBlocksContentContext, useEditorContext } from '../../DocumentContextProviders';
import { getReferenceForEditor } from '../../hooksAndUtils/documentUtils';
import { specialCharacters } from '../SpecialCharacters';

export const useInsertTools = (): groupedListType => {
  const { editor } = useEditorContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();

  const [equationList, setEquationList] = useState<listType>([]);
  const [bibList, setBibList] = useState<listType>([]);
  const [imageList, setImageList] = useState<listType>([]);
  const [tableList, setTableList] = useState<listType>([]);

  const refToEquationElement = {
    label: 'Reference to equation',
    Icon: () => <>{refEquationCombobox}</>,
    function: () => {},
    value: null,
    belonging: ['article', 'beamer', 'book', 'letter', 'report'],
  };

  const refToTableElement = {
    label: 'Reference to table',
    Icon: () => <>{refTableCombobox}</>,
    function: () => {},
    value: null,
    belonging: ['article', 'beamer', 'book', 'report'],
  };
  const refToImageElement = {
    label: 'Reference to image',
    Icon: () => <>{refFigureCombobox}</>,
    function: () => {},
    value: null,
    belonging: ['article', 'beamer', 'book', 'report'],
  };
  const refToBibElement = {
    label: 'Bibliography reference',
    Icon: () => <>{refBibCombobox}</>,
    function: () => {},
    value: null,
    belonging: ['article', 'beamer', 'book', 'report'],
  };

  const specialCharacterElement = {
    label: 'Special character',
    Icon: () => <>{specialCharactersCombobox}</>,
    function: () => {},
    value: null,
    belonging: ['article', 'beamer', 'book', 'letter', 'report'],
  };

  const getRefsElement = (item: blockType, label: string): listElementType => {
    return {
      Icon: () => (
        <Center m="xs">
          <Text
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
            p="0.3rem"
            pt="0px"
            pb="0px"
            bg="var(--mantine-color-cyan-0)"
            c="var(--mantine-color-cyan-9)"
            fw="500"
            fz="sm"
          >
            {(item.blockContent as blockAbleToRef).id}
          </Text>
        </Center>
      ),
      label: label ? DOMPurify.sanitize(label, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }) : '',
      value: (item.blockContent as blockAbleToRef).id,
    };
  };

  useEffect(() => {
    if (blocksContent !== undefined && blocksContent !== null && blocksContent.length > 0) {
      let equationCounter = 0;
      let figureCounter = 0;
      let tableCounter = 0;

      let eqList = [];
      let figList = [];
      let tabList = [];
      for (let i = 0; i < blocksContent.length; i++) {
        const item = blocksContent[i];
        switch (item.typeOfBlock) {
          case 'equation':
            equationCounter++;

            eqList = [
              ...eqList,
              getRefsElement(
                item,
                `Equation (${equationCounter}): ${((item.blockContent as blockAbleToRef).content as string).length < 30 ? (item.blockContent as blockAbleToRef).content : ((item.blockContent as blockAbleToRef).content as string).substring(0, 30).concat('...')}`
              ),
            ];
            break;
          case 'figure':
            figureCounter++;
            figList = [
              ...figList,
              getRefsElement(item, (item.blockContent as blockAbleToRef).label),
            ];
            break;
          case 'table':
            tableCounter++;
            tabList = [
              ...tabList,
              getRefsElement(item, (item.blockContent as blockAbleToRef).label),
            ];
            break;
          case 'references':
            setBibList(
              item.blockContent.map((ref, idx) => {
                return {
                  Icon: () => (
                    <Center m="xs">
                      <Text
                        style={{ borderRadius: 'var(--mantine-radius-md)' }}
                        p="0.3rem"
                        pt="0px"
                        pb="0px"
                        bg="var(--mantine-color-cyan-0)"
                        c="var(--mantine-color-cyan-9)"
                        fw="500"
                        fz="sm"
                      >
                        {ref.id}
                      </Text>
                    </Center>
                  ),
                  label: ref.label
                    ? `[${idx + 1}] ${DOMPurify.sanitize(ref.label, {
                        ALLOWED_TAGS: [],
                        ALLOWED_ATTR: [],
                      })}`
                    : `[${idx + 1}]`,
                  value: ref.id,
                };
              })
            );
            break;
          default:
            break;
        }
      }

      setEquationList([...eqList]);
      setImageList([...figList]);
      setTableList([...tabList]);
    }
  }, [blocksContent]);

  const refEquationCombobox = (
    <AddComboox
      openedButtonColor="var(--mantine-color-cyan-7)"
      data={equationList ? equationList : []}
      withGroups={false}
      floatingStrategy="fixed"
      placeholder=""
      buttonContent={
        <>
          <Text fz="lg" c="var(--mantine-color-white)" mb="-0.4rem">
            <MdFunctions />
          </Text>
          <sub style={{ color: 'var(--mantine-color-white)' }}>ref</sub>
        </>
      }
      insertFunction={(value) => {
        editor?.commands.insertContent(getReferenceForEditor(value));
      }}
      iconSize="0.8rem"
      buttonVariant="format"
      tooltip={refToEquationElement.label}
    />
  );

  const refTableCombobox = (
    <AddComboox
      openedButtonColor="var(--mantine-color-cyan-7)"
      data={tableList ? tableList : []}
      withGroups={false}
      floatingStrategy="fixed"
      placeholder=""
      buttonContent={
        <>
          <Text fz="lg" c="var(--mantine-color-white)" mb="-0.4rem">
            <LuTable />
          </Text>
          <sub style={{ color: 'var(--mantine-color-white)' }}>ref</sub>
        </>
      }
      insertFunction={(value) => {
        editor?.commands.insertContent(getReferenceForEditor(value));
      }}
      iconSize="2rem"
      buttonVariant="format"
      tooltip={refToTableElement.label}
    />
  );

  const refFigureCombobox = (
    <AddComboox
      data={imageList ? imageList : []}
      withGroups={false}
      floatingStrategy="fixed"
      placeholder=""
      buttonContent={
        <>
          <Text fz="lg" c="var(--mantine-color-white)" mb="-0.4rem">
            <LuImage />
          </Text>
          <sub style={{ color: 'var(--mantine-color-white)' }}>ref</sub>
        </>
      }
      insertFunction={(value) => {
        editor?.commands.insertContent(getReferenceForEditor(value));
      }}
      iconSize="2rem"
      buttonVariant="format"
      openedButtonColor="var(--mantine-color-cyan-7)"
      tooltip={refToImageElement.label}
    />
  );

  const refBibCombobox = (
    <AddComboox
      data={bibList ? bibList : []}
      withGroups={false}
      floatingStrategy="fixed"
      placeholder=""
      openedButtonColor="var(--mantine-color-cyan-7)"
      buttonContent={
        <>
          <Text fz="lg" c="var(--mantine-color-white)" mb="-0.4rem">
            <MdOutlineLibraryBooks />
          </Text>
          <sub style={{ color: 'var(--mantine-color-white)' }}>ref</sub>
        </>
      }
      insertFunction={(value) => {
        editor?.commands.insertContent(getReferenceForEditor(value));
      }}
      iconSize="2rem"
      buttonVariant="format"
      tooltip={refToBibElement.label}
    />
  );

  const specialCharacersForCombobox = specialCharacters.map((group) => {
    return {
      label: group.label,
      group: group.group.map((item) => {
        return {
          label: item.label,
          Icon: () => (
            <>{item.latexRepresentation ? <Latex>$${item.latexRepresentation}$$</Latex> : null}</>
          ),
          value: item.value,
        };
      }),
    };
  });

  const specialCharactersCombobox = (
    <AddComboox
      insertFunction={(value) => {
        editor?.commands.insertContent(value);
      }}
      placeholder="elements"
      buttonContent={
        <Text fz="lg" c="var(--mantine-color-white)" mb="-0.4rem">
          <TbOmega />
        </Text>
      }
      openedButtonColor="var(--mantine-color-cyan-7)"
      data={specialCharacersForCombobox}
      iconSize="0.8rem"
      floatingStrategy="fixed"
      withGroups
      tooltip={specialCharacterElement.label}
      buttonVariant="format"
    />
  );

  return [
    {
      label: 'Special characters',
      group: [specialCharacterElement],
    },
    {
      label: 'References',
      group: [refToEquationElement, refToTableElement, refToImageElement, refToBibElement],
    },
  ];
};
