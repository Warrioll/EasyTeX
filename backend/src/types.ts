export type blockType = {
    typeOfBlock: 
    'textfield' 
    | 'section' 
    | 'subsection' 
    | 'subsubsection' 
    | "documentclass" 
    |'titlePage'
    | 'tableOfContents'
    | 'pageBreak'
    | 'equation'
    | 'table'
    |'figure'
    | null | undefined;
    blockContent: string | titlePageType | string[][] | null | undefined; 
  };

  export type titlePageType = {
    title: string, author: string, date: string
  }