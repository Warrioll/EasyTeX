export type blockType = {
  typeOfBlock: typeOfBlockType; //'textfield' | 'section' | 'subsection' | 'documentclass' | null | undefined;
  blockContent:
    | string
    | titleSectionType //title section
    | string[][] //table
    | referencesElementType[] //references
    | blockAbleToRef
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
  | null
  | undefined;

export type referencesElementType = {
  id: number;
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

export type documentClassType = 'article' | 'report' | 'book' | 'letter' | 'beamer' | 'slides';

export type listElementType = {
  value: string | object | null;
  function?: () => void;
  Icon: React.FC;
  label: string;
  belonging?: string[];
};

export type listType = listElementType[];

export type groupedListType = {
  label: string;
  group: listType;
}[];
