export type blockType = {
    typeOfBlock: 'textfield' | 'section' | 'subsection' | 'subsubsection' | "documentclass" |'titlePage'| null | undefined;
    blockContent: string | titlePageType |null | undefined; 
  };

  export type titlePageType = {
    title: string, author: string, date: string
  }