export type typeOfBlockType =
  | 'textfield'
  | 'section'
  | 'subsection'
  | 'subsubsection'
  | 'documentclass'
  | 'titlePage'
  | 'tableOfContents'
  | 'pageBreak'
  | null
  | undefined;

export type blockType = {
  typeOfBlock: typeOfBlockType; //'textfield' | 'section' | 'subsection' | 'documentclass' | null | undefined;
  blockContent: string | { title: string; author: string; date: string } | null | undefined;
};

export type documentClassType = 'article' | 'report' | 'book' | 'letter' | 'beamer' | 'slides';
