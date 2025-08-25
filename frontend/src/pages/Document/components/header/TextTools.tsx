import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { BiFont } from 'react-icons/bi';
import {
  FaBold,
  FaCode,
  FaItalic,
  FaLink,
  FaList,
  FaStrikethrough,
  FaSubscript,
  FaSuperscript,
  FaUnderline,
} from 'react-icons/fa';
import { FaArrowTurnUp } from 'react-icons/fa6';
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuImage,
  LuRefreshCcw,
  LuTable,
  //LuTableOfContents,
} from 'react-icons/lu';
import {
  MdFormatListNumberedRtl,
  MdFunctions,
  MdOutlineAdd,
  MdOutlineInsertPageBreak,
  MdOutlineLibraryBooks,
  MdOutlineTitle,
} from 'react-icons/md';
import Latex from 'react-latex-next';
import { Box, Center, Flex, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AddComboox } from '@/components/other/AddCombobox';
import {
  blockAbleToRef,
  blockType,
  documentClassType,
  groupedListType,
  listElementType,
  listType,
  referencesElementType,
} from '@/Types';
import { useBlocksContentContext, useEditorContext } from '../../DocumentContextProviders';

// type blockListType = {
//   blockName: string;
//   Icon: React.FC;
//   blockToAdd: blockType;
//   documentClasses: documentClassType[];
// };

export const useTextTools = (): groupedListType => {
  const { editor } = useEditorContext();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();

  const [equationList, setEquationList] = useState<listType>([]);
  const [bibList, setBibList] = useState<listType>([]);
  const [imageList, setImageList] = useState<listType>([]);
  const [tableList, setTableList] = useState<listType>([]);

  const refToEquationElement = {
    label: 'Reference to equation',
    Icon: () => <>{refEquationCombobox}</>,
    function: () => {
      //refEquationHandlers.toggle();
    },
    value: null,
    belonging: ['article', 'beamer', 'book', 'letter', 'report'],
  };

  const refToTableElement = {
    label: 'Reference to table',
    Icon: () => <>{refTableCombobox}</>,
    function: () => {
      //refTableHandlers.toggle();
    },
    value: null,
    belonging: ['article', 'beamer', 'book', 'letter', 'report'],
  };
  const refToImageElement = {
    label: 'Reference to image',
    Icon: () => <>{refFigureCombobox}</>,
    function: () => {
      //refFigureHandlers.toggle();
    },
    value: null,
    belonging: ['article', 'beamer', 'book', 'letter', 'report'],
  };
  const refToBibElement = {
    label: 'Bibliography reference',
    Icon: () => <>{refBibCombobox}</>,
    function: () => {
      //refBibHandlers.toggle();
    },
    value: null,
    belonging: ['article', 'beamer', 'book', 'letter', 'report'],
  };

  const getRefsElement = (item: blockType, label: string): listElementType => {
    // const num = counter;
    //console.log('bc', item.blockContent);
    //console.log('equations', blockCounter);
    return {
      Icon: () => (
        <Center m="xs">
          <Text
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
            //p="0.1rem"
            p="0.3rem"
            pt="0px"
            pb="0px"
            bg="var(--mantine-color-cyan-0)"
            c="var(--mantine-color-cyan-9)"
            fw="500"
            // ml="xs"
            fz="sm"
          >
            {(item.blockContent as blockAbleToRef).id}
          </Text>
        </Center>
      ),
      label: label ? DOMPurify.sanitize(label, { ALLOWED_TAGS: [] }) : '',
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
            //return getRefsElement(item); //, equationCounter);

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
            ]; //, figureCounter);
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
                        //p="0.1rem"
                        p="0.3rem"
                        pt="0px"
                        pb="0px"
                        bg="var(--mantine-color-cyan-0)"
                        c="var(--mantine-color-cyan-9)"
                        fw="500"
                        // ml="xs"
                        fz="sm"
                      >
                        {ref.id}
                      </Text>
                    </Center>
                  ),
                  label: ref.label ? `[${idx + 1}] ${ref.label}` : `[${idx + 1}]`,
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

      // if (temp !== null && temp !== undefined) {
      //   temp = temp.filter((item) => item !== null);
      // }
      //console.log('yolo3', temp);

      //setEquationList(temp);
    }
  }, [blocksContent]);

  const refEquationCombobox = (
    <AddComboox
      data={equationList ? equationList : []}
      withGroups={false}
      floatingStrategy="fixed"
      placeholder=""
      buttonContent={
        <>
          <Text fz="lg" c="black" mb="-0.4rem">
            <MdFunctions />
          </Text>
          <sub style={{ color: 'black' }}>ref</sub>
        </>
      }
      //expressionInputContentState,
      insertFunction={(value) => {
        editor?.commands.insertContent(` <span data-type="mention" data-id="${value}"></span> `);

        console.log(editor?.getHTML());
      }}
      iconSize="0.8rem"
      buttonVariant="format"
      tooltip={refToEquationElement.label}
    />
  );

  const refTableCombobox = (
    <AddComboox
      data={tableList ? tableList : []}
      withGroups={false}
      floatingStrategy="fixed"
      placeholder=""
      buttonContent={
        <>
          <Text fz="lg" c="black" mb="-0.4rem">
            <LuTable />
          </Text>
          <sub style={{ color: 'black' }}>ref</sub>
        </>
      }
      //expressionInputContentState,
      insertFunction={(value) => {
        editor?.commands.insertContent(` <span data-type="mention" data-id="${value}"></span> `);

        console.log(editor?.getHTML());
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
          <Text fz="lg" c="black" mb="-0.4rem">
            <LuImage />
          </Text>
          <sub style={{ color: 'black' }}>ref</sub>
        </>
      }
      //expressionInputContentState,
      insertFunction={(value) => {
        editor?.commands.insertContent(` <span data-type="mention" data-id="${value}"></span> `);

        console.log(editor?.getHTML());
      }}
      iconSize="2rem"
      buttonVariant="format"
      tooltip={refToImageElement.label}
    />
  );

  const refBibCombobox = (
    <AddComboox
      data={bibList ? bibList : []}
      withGroups={false}
      floatingStrategy="fixed"
      placeholder=""
      buttonContent={
        <>
          <Text fz="lg" c="black" mb="-0.4rem">
            <MdOutlineLibraryBooks />
          </Text>
          <sub style={{ color: 'black' }}>ref</sub>
        </>
      }
      //expressionInputContentState,
      insertFunction={(value) => {
        editor?.commands.insertContent(`<span data-type="mention" data-id="${value}"></span>`);
      }}
      iconSize="2rem"
      buttonVariant="format"
      tooltip={refToBibElement.label}
    />
  );

  return [
    {
      label: 'Text',
      group: [
        {
          label: 'Bold',
          Icon: () => <FaBold />,
          function: () => {
            editor?.commands.toggleBold();
          },
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
        {
          label: 'Italic',
          Icon: () => <FaItalic />,
          function: () => {
            editor?.commands.toggleItalic();
          },
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
        {
          label: 'Typewriter',
          Icon: () => <FaCode />,
          function: () => {
            editor?.commands.toggleCode();
          },
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
        {
          label: 'Underilne',
          Icon: () => <FaUnderline />,
          function: () => {
            editor?.commands.toggleUnderline();
          },
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
        {
          label: 'Strikethrough',
          Icon: () => <FaStrikethrough />,
          function: () => {
            editor?.commands.toggleStrike();
          },
          value: null,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
      ],
    },

    {
      label: 'References',
      group: [refToEquationElement, refToTableElement, refToImageElement, refToBibElement],
    },
  ];
};
