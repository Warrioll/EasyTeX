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
    | null
    | undefined;


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