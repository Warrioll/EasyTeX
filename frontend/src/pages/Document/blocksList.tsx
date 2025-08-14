import { BiFont } from 'react-icons/bi';
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
import { blockAbleToRef, blockType, documentClassType, groupedListType } from '@/Types';
import { useAddBlock } from './documentHandlers';

// type blockListType = {
//   blockName: string;
//   Icon: React.FC;
//   blockToAdd: blockType;
//   documentClasses: documentClassType[];
// };

let equationCounter = 0;
let figureCounter = 0;
let imageCounter = 0;

const texfiledValue: blockType = { typeOfBlock: 'textfield', blockContent: '<p>New textfield</p>' };
const sectionValue: blockType = {
  typeOfBlock: 'section',
  blockContent: '<p><strong>New section</strong></p>',
};
const subsectionValue: blockType = {
  typeOfBlock: 'subsection',
  blockContent: '<p><strong>New subsection</strong></p>',
};
const subsubsectionValue: blockType = {
  typeOfBlock: 'subsubsection',
  blockContent: '<p><strong>New subsubsection</strong></p>',
};
const equationValue: blockType = {
  typeOfBlock: 'equation',
  blockContent: {
    id: 'eq'.concat(equationCounter.toString()),
    label: 'New equation',
    content: 'New equation',
  },
};
const tableValue: blockType = {
  typeOfBlock: 'table',
  blockContent: [
    ['<p>&nbsp;</p>', '<p>&nbsp;</p>'],
    ['<p>&nbsp;</p>', '<p>&nbsp;</p>'],
  ],
};
const figureValue: blockType = { typeOfBlock: 'figure', blockContent: '' };
const titleSectionValue: blockType = {
  typeOfBlock: 'titlePage',
  blockContent: { title: 'Title', author: 'Author', date: 'Date' },
};
const referencesValue: blockType = { typeOfBlock: 'references', blockContent: [] };
const tableOfContentsValue: blockType = { typeOfBlock: 'tableOfContents', blockContent: '' };
const pageBreakValue: blockType = { typeOfBlock: 'pageBreak', blockContent: '' };

export const useBlocksList = (): groupedListType => {
  const { addBlock } = useAddBlock();
  const blocksList: groupedListType = [
    {
      label: 'Text',
      group: [
        {
          label: 'Textfield',
          function: () => {
            addBlock(texfiledValue, 1);
          },
          Icon: () => <BiFont />,
          value: texfiledValue,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
      ],
    },

    {
      label: 'Sections',
      group: [
        {
          label: 'Section',
          Icon: () => <LuHeading1 />,
          function: () => {
            addBlock(sectionValue, 1);
          },
          value: sectionValue,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
        {
          label: 'Subsection',
          Icon: () => <LuHeading2 />,
          function: () => {
            addBlock(subsectionValue, 1);
          },
          value: subsectionValue,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
        {
          label: 'Subsubsection',
          Icon: () => <LuHeading3 />,
          function: () => {
            addBlock(subsubsectionValue, 1);
          },
          value: subsubsectionValue,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
      ],
    },

    {
      label: 'Contents',
      group: [
        {
          label: 'Equation',
          Icon: () => <MdFunctions />,
          function: () => {
            equationCounter++;
            (equationValue.blockContent as blockAbleToRef).id = `eq${equationCounter}`;
            addBlock(equationValue, 1);
          },
          value: equationValue,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
        {
          label: 'Table',
          Icon: () => <LuTable />,
          function: () => {
            addBlock(tableValue, 1);
          },
          value: tableValue,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
        {
          label: 'Image',
          Icon: () => <LuImage />,
          function: () => {
            addBlock(figureValue, 1);
          },
          value: figureValue,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
      ],
    },

    {
      label: 'Structure',
      group: [
        {
          label: 'Title section',
          Icon: () => <MdOutlineTitle />,
          function: () => {
            addBlock(titleSectionValue, 1);
          },
          value: {
            typeOfBlock: 'titlePage',
            blockContent: titleSectionValue,
          },
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
        {
          label: 'References',
          Icon: () => <MdOutlineLibraryBooks />,
          function: () => {
            addBlock(referencesValue, 1);
          },
          value: referencesValue,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
        {
          label: 'Table of contents',
          Icon: () => <MdFormatListNumberedRtl />,
          function: () => {
            addBlock(tableOfContentsValue, 1);
          },
          value: tableOfContentsValue,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
      ],
    },

    {
      label: 'Other',
      group: [
        {
          label: 'Page break',
          Icon: () => <MdOutlineInsertPageBreak />,
          function: () => {
            addBlock(pageBreakValue, 1);
          },
          value: pageBreakValue,
          belonging: ['article', 'beamer', 'book', 'letter', 'report'],
        },
      ],
    },
  ];

  return blocksList;
};

//export const blocksList = useBlocksList();
