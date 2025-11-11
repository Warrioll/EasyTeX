import { BiFont } from 'react-icons/bi';
import {
  LuDoorOpen,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuImage,
  LuMapPinned,
  LuTable,
  //LuTableOfContents,
} from 'react-icons/lu';
import {
  MdFormatListNumberedRtl,
  MdFunctions,
  MdOutlineInsertPageBreak,
  MdOutlineLibraryBooks,
  MdOutlineTitle,
} from 'react-icons/md';
import { PiSignature } from 'react-icons/pi';
import { RiFileCodeLine } from 'react-icons/ri';
import { blockType, groupedListType, typeOfBlockType } from '@/Types';
import { useBlocksContentContext } from '../DocumentContextProviders';
import { useAddBlock } from '../hooksAndUtils/documentHooks';

const texfiledValue: blockType = { typeOfBlock: 'textfield', blockContent: '<p>New textfield</p>' };
const sectionValue: blockType = {
  typeOfBlock: 'section',
  blockContent: '<p><strong>New heading 1</strong></p>',
};
const subsectionValue: blockType = {
  typeOfBlock: 'subsection',
  blockContent: '<p><strong>New heading 2</strong></p>',
};
const subsubsectionValue: blockType = {
  typeOfBlock: 'subsubsection',
  blockContent: '<p><strong>New heading 3</strong></p>',
};

const openingValue: blockType = {
  typeOfBlock: 'subsection',
  blockContent: '<p>Opening</p>',
};
const closingValue: blockType = {
  typeOfBlock: 'subsubsection',
  blockContent: '<p>Closing</p>',
};

const equationValue: blockType = {
  typeOfBlock: 'equation',
  blockContent: {
    id: 'eq',
    label: 'New equation',
    content: 'New\\ equation',
  },
};
const tableValue: blockType = {
  typeOfBlock: 'table',
  blockContent: {
    id: 'tab',
    label: 'New table',
    content: [
      ['<p>&nbsp;</p>', '<p>&nbsp;</p>'],
      ['<p>&nbsp;</p>', '<p>&nbsp;</p>'],
    ],
  },
};
const figureValue: blockType = {
  typeOfBlock: 'figure',
  blockContent: { id: 'img', label: 'New image', content: '' },
};
const titleSectionValue: blockType = {
  typeOfBlock: 'titlePage',
  blockContent: { title: 'Title', author: 'Author', date: 'Date' },
};

const addressAndDateValue: blockType = {
  typeOfBlock: 'titlePage',
  blockContent: { title: 'Title', author: 'Address', date: 'Date' },
};

const subsubsubsectionValue: blockType = {
  typeOfBlock: 'subsubsubsection',
  blockContent: '<p><strong>New heading 4</strong></p>',
};

const referencesValue: blockType = { typeOfBlock: 'references', blockContent: [] };
const tableOfContentsValue: blockType = { typeOfBlock: 'tableOfContents', blockContent: '' };
const pageBreakValue: blockType = {
  typeOfBlock: 'pageBreak',
  blockContent: { title: 'Slide title', subtitle: 'Slide subtitle' },
};

const latexExpressionValue: blockType = { typeOfBlock: 'latex', blockContent: '' };

export const useBlocksList = (): groupedListType => {
  const { addBlock } = useAddBlock();
  const { blocksContent } = useBlocksContentContext();

  const disableButtons = (typeOfBlock: typeOfBlockType, allowedCount: number) => {
    let counter = 0;
    for (const i of blocksContent) {
      if (i.typeOfBlock === typeOfBlock) {
        counter++;
      }
      if (counter >= allowedCount) {
        break;
      }
    }
    return counter >= allowedCount;
  };

  const blocksList: groupedListType = [
    {
      label: 'Structure',
      group: [
        {
          label: 'Title',
          Icon: () => <MdOutlineTitle />,
          function: () => {
            addBlock(titleSectionValue, 1);
          },
          value: titleSectionValue,

          belonging: ['article', 'beamer', 'book', 'report'],
          disabledFunction: (): boolean => disableButtons('titlePage', 1),
        },

        {
          label: 'Table of contents',
          Icon: () => <MdFormatListNumberedRtl />,
          function: () => {
            addBlock(tableOfContentsValue, 1);
          },
          value: tableOfContentsValue,
          belonging: ['article', 'beamer', 'book', 'report'],
          disabledFunction: (): boolean => disableButtons('tableOfContents', 1),
        },
        {
          label: 'Address & date',
          Icon: () => <LuMapPinned />,
          function: () => {
            addBlock(addressAndDateValue, 1);
          },
          value: addressAndDateValue,

          belonging: ['letter'],
          disabledFunction: (): boolean => disableButtons('titlePage', 1),
        },
        {
          label: 'Opening',
          Icon: () => <LuDoorOpen />,
          function: () => {
            addBlock(openingValue, 1);
          },
          value: openingValue,
          belonging: [],
          disabledFunction: (): boolean => disableButtons('subsection', 1),
        },
        {
          label: 'Closing',
          Icon: () => <PiSignature />,
          function: () => {
            addBlock(closingValue, 1);
          },
          value: closingValue,
          belonging: ['letter'],
          disabledFunction: (): boolean => disableButtons('subsubsection', 1),
        },
        {
          label: 'Bibliography/References',
          Icon: () => <MdOutlineLibraryBooks />,
          function: () => {
            addBlock(referencesValue, 1);
          },
          value: referencesValue,
          belonging: ['article', 'beamer', 'book', 'report'],
          disabledFunction: (): boolean => disableButtons('references', 1),
        },
      ],
    },
    {
      label: 'Textfield',
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
          label: 'Heading 1',
          Icon: () => <LuHeading1 />,
          function: () => {
            addBlock(sectionValue, 1);
          },
          value: sectionValue,
          belonging: ['article', 'beamer', 'report', 'book'],
        },
        {
          label: 'Heading 2',
          Icon: () => <LuHeading2 />,
          function: () => {
            addBlock(subsectionValue, 1);
          },
          value: subsectionValue,
          belonging: ['article', 'beamer', 'report', 'book'],
        },
        {
          label: 'Heading 3',
          Icon: () => <LuHeading3 />,
          function: () => {
            addBlock(subsubsectionValue, 1);
          },
          value: subsubsectionValue,
          belonging: ['article', 'beamer', 'report', 'book'],
        },

        {
          label: 'Heading 4',
          Icon: () => <LuHeading4 />,
          function: () => {
            addBlock(subsubsubsectionValue, 1);
          },
          value: subsubsectionValue,
          belonging: [],
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
          belonging: ['article', 'beamer', 'book', 'report'],
        },
        {
          label: 'Image',
          Icon: () => <LuImage />,
          function: () => {
            addBlock(figureValue, 1);
          },
          value: figureValue,
          belonging: ['article', 'beamer', 'book', 'report'],
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
          belonging: ['article', 'book', 'letter', 'report'],
        },
        {
          label: 'Slide break',
          Icon: () => <MdOutlineInsertPageBreak />,
          function: () => {
            addBlock(pageBreakValue, 1);
          },
          value: pageBreakValue,
          belonging: ['beamer'],
        },
        {
          label: 'LaTeX expression',
          Icon: () => <RiFileCodeLine />,
          function: () => {
            addBlock(latexExpressionValue, 1);
          },
          value: latexExpressionValue,
          belonging: ['article', 'beamer', 'book', 'report', 'letter'],
        },
      ],
    },
  ];

  return blocksList;
};
