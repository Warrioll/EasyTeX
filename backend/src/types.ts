export type blockType = {
    typeOfBlock: 'textfield' | 'section' | 'subsection' | 'subsubsection' | "documentclass" | null | undefined;
    blockContent: string | object |null | undefined; 
  };