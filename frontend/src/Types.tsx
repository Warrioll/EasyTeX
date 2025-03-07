export type typeOfBlockType =
  | 'textfield'
  | 'section'
  | 'subsection'
   | 'subsubsection'
  | 'documentclass'
  | null
  | undefined;

export type blockType = {
  typeOfBlock: typeOfBlockType; //'textfield' | 'section' | 'subsection' | 'documentclass' | null | undefined;
  blockContent: string | object | null | undefined;
};

export type documentClassType = 'article' | 'report' | 'book' | 'letter' | 'beamer' | 'slides';
