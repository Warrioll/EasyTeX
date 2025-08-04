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
import { blockType, documentClassType } from '@/Types';

type blockListType = {
  blockName: string;
  Icon: React.FC;
  blockToAdd: blockType;
  documentClasses: documentClassType[];
};

export const blocksList: blockListType[] = [
  {
    blockName: 'Textfield',
    Icon: () => <BiFont />,
    blockToAdd: { typeOfBlock: 'textfield', blockContent: '<p>New textfield</p>' },
    documentClasses: ['article', 'beamer', 'book', 'letter', 'report'],
  },
  {
    blockName: 'Section',
    Icon: () => <LuHeading1 />,
    blockToAdd: { typeOfBlock: 'section', blockContent: '<p><strong>New section</strong></p>' },
    documentClasses: ['article', 'beamer', 'book', 'letter', 'report'],
  },
  {
    blockName: 'Subsection',
    Icon: () => <LuHeading2 />,
    blockToAdd: {
      typeOfBlock: 'subsection',
      blockContent: '<p><strong>New subsection</strong></p>',
    },
    documentClasses: ['article', 'beamer', 'book', 'letter', 'report'],
  },
  {
    blockName: 'Subsubsection',
    Icon: () => <LuHeading3 />,
    blockToAdd: {
      typeOfBlock: 'subsubsection',
      blockContent: '<p><strong>New subsubsection</strong></p>',
    },
    documentClasses: ['article', 'beamer', 'book', 'letter', 'report'],
  },
  {
    blockName: 'Title section',
    Icon: () => <MdOutlineTitle />,
    blockToAdd: {
      typeOfBlock: 'titlePage',
      blockContent: { title: 'Title', author: 'Author', date: 'Date' },
    },
    documentClasses: ['article', 'beamer', 'book', 'letter', 'report'],
  },
  {
    blockName: 'Equation',
    Icon: () => <MdFunctions />,
    blockToAdd: { typeOfBlock: 'equation', blockContent: 'New equation' },
    documentClasses: ['article', 'beamer', 'book', 'letter', 'report'],
  },
  {
    blockName: 'Table',
    Icon: () => <LuTable />,
    blockToAdd: {
      typeOfBlock: 'equation',
      blockContent: [
        ['<p>&nbsp;</p>', '<p>&nbsp;</p>'],
        ['<p>&nbsp;</p>', '<p>&nbsp;</p>'],
      ],
    },
    documentClasses: ['article', 'beamer', 'book', 'letter', 'report'],
  },
  {
    blockName: 'Image',
    Icon: () => <LuImage />,
    blockToAdd: { typeOfBlock: 'equation', blockContent: '' },
    documentClasses: ['article', 'beamer', 'book', 'letter', 'report'],
  },

  {
    blockName: 'Table of contents',
    Icon: () => <MdFormatListNumberedRtl />,
    blockToAdd: { typeOfBlock: 'tableOfContents', blockContent: '' },
    documentClasses: ['article', 'beamer', 'book', 'letter', 'report'],
  },
  {
    blockName: 'Bibliography',
    Icon: () => <MdOutlineLibraryBooks />,
    blockToAdd: { typeOfBlock: 'bibliography', blockContent: '' },
    documentClasses: ['article', 'beamer', 'book', 'letter', 'report'],
  },
  {
    blockName: 'Page break',
    Icon: () => <MdOutlineInsertPageBreak />,
    blockToAdd: { typeOfBlock: 'pageBreak', blockContent: '' },
    documentClasses: ['article', 'beamer', 'book', 'letter', 'report'],
  },
];
