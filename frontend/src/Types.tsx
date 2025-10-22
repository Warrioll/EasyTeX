export type blockType = {
  typeOfBlock: typeOfBlockType; //'textfield' | 'section' | 'subsection' | 'documentclass' | null | undefined;
  blockContent:
    | string
    | titleSectionType //title section
    | string[][] //table
    | referencesElementType[] //references
    | blockAbleToRef
    | slideBreak
    | null
    | undefined;
};

export type typeOfBlockType =
  | 'textfield'
  | 'section'
  | 'subsection'
  | 'subsubsection'
  | 'documentclass'
  | 'titlePage'
  | 'tableOfContents'
  | 'pageBreak'
  | 'equation'
  | 'table'
  | 'figure'
  | 'references'
  | 'subsubsubsection'
  | 'latex'
  | null
  | undefined;



export type referencesElementType = {
  id: string;
  label: string;
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


export type documentClassType ='article' | 'report' | 'book' | 'letter' | 'beamer' | 'slides'

export type documentType = {
  class: documentClassType,
  fontSize: '10pt' | '11pt' | '12pt',
  fontType: 'roman' | 'sans' | 'typewriter',
  pageSize: 'a4paper' | 'a5papper' | 'b5paper' | 'letterpaper',
  orientation: 'landscape' | ''
}

export type listElementType = {
  value: string | object | null;
  function?: () => void;
  Icon: React.FC;
  label: string;
  belonging?: string[];
  disabledFunction?: () => boolean;
  backgroundColor?: string;
};

export type slideBreak = {
  title: string;
  subtitle: string;
};

export type listType = listElementType[];

export type groupedListType = {
  label: string;
  group: listType;
}[];

export type equationsSpecialCharactersStyle = {
  value: string;
  label: string;
  latexRepresentation: string;
};
