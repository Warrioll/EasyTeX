import { ReactElement } from 'react';
import {
    LuHeading1,
    LuHeading2,
    LuHeading3,
    LuRefreshCcw,
    //LuTableOfContents,
  } from 'react-icons/lu';
  import { blockType, typeOfBlockType } from '@/Types';
  import { BiFont } from 'react-icons/bi';
  import {
    MdFormatListNumberedRtl,
    MdOutlineAdd,
    MdOutlineInsertPageBreak,
    MdOutlineTitle,
  } from 'react-icons/md';


  type blockListType ={
    blockName: string,
    icon: ReactElement,
    blockToAdd: blockType
  }

  export const blocksList: blockListType[]=[
    {
      blockName: 'Textfield',
      icon:  <BiFont />,
      blockToAdd: { typeOfBlock: 'textfield', blockContent: '<p>New textfield</p>' }
    },
    {
      blockName: 'Section',
      icon: <LuHeading1 />,
      blockToAdd: { typeOfBlock: 'section', blockContent: '<p><strong>New section</strong></p>' }
    }, 
    {
      blockName: 'Subsection',
      icon: <LuHeading2 />,
      blockToAdd: { typeOfBlock: 'subsection', blockContent: '<p><strong>New subsection</strong></p>' }
    },
    {
      blockName: 'Subsubsection',
      icon: <LuHeading3 />,
      blockToAdd: { typeOfBlock: 'subsubsection', blockContent: '<p><strong>New subsubsection</strong></p>' }
    },
  
    {
      blockName: 'Title section',
      icon:  <MdOutlineTitle />,
      blockToAdd: { typeOfBlock: 'titlePage', blockContent: '' }
    },
    {
      blockName: 'Table of contents',
      icon: <MdFormatListNumberedRtl />,
      blockToAdd: { typeOfBlock: 'tableOfContents', blockContent: '' }
    },
    {
      blockName: 'Page break',
      icon:<MdOutlineInsertPageBreak />,
      blockToAdd: { typeOfBlock: 'pageBreak', blockContent: '' }
    },
    
  ]

//  export const returnBlockLabel =(typeOfBlock:typeOfBlockType):string=>{
//   switch(typeOfBlock){
//     case 'textfield':
//       return 'Textfield'
//     case 'section':
//       return 'Textfield'
//     case 'subsection':
//       return 'Textfield'
//     case 'subsubsection':
//       return 'Textfield'
//     case 'titlePage':
//       return 'Textfield'
//     case 'tableOfContents':
//       return 'Table of contents'
//     case 'pageBreak':
//       return 'Page break'
//     default:
//       return ''
//   }
//  } 