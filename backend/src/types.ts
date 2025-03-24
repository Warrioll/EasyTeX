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
    | null | undefined;
    blockContent: string | titlePageType |null | undefined; 
  };

  export type titlePageType = {
    title: string, author: string, date: string
  }