export type blockType = {
  typeOfBlock: typeOfBlockType; //'textfield' | 'section' | 'subsection' | 'documentclass' | null | undefined;
  blockContent: blockContentType
};



export type blockContentType =  string
    | titleSectionType //title section
    | string[][] //table
    | referencesElementType[] //references
    | blockAbleToRef
    | slideBreak
    | documentOptionsType
    | null
    | undefined;

export type documentClassType = 'article' | 'report' | 'book' | 'letter' | 'beamer'

export type documentOptionsType = {
  class: documentClassType;
  fontSize?: '10pt' | '11pt' | '12pt';
  fontType?: 'roman' | 'sans' | 'typewriter';
  paperSize?: 'a4paper' | 'a5paper' | 'b5paper' | 'letterpaper' | 'executivepaper' | 'legalpaper';
  orientation?: 'landscape' | '';
  columns?: 'onecolumn' | 'twocolumn';
  language?: string
};
  export type typeOfBlockType =
    | 'textfield'
    | 'section'
    | 'subsection'
    | 'subsubsection'
    | 'subsubsubsection'
    | 'documentclass'
    | 'titlePage'
    | 'tableOfContents'
    | 'pageBreak'
    | 'equation'
    | 'table'
    | 'figure'
    | 'references'
    | 'latex'
    | null
    | undefined;

export type referencesElementType = {
  id: string;
  label: string;
};

export type slideBreak = {
  title: string;
  subtitle: string;
};

export type titleSectionType = {
  title: string;
  author: string;
  date: string;
};

export type blockAbleToRef = {
  id: string;
  label: string;
  content: string | string[][];
};