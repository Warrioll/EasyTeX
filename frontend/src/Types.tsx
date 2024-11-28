export type typeOfBlockType = 'textfield' | 'section' | 'subsection' | 'documentclass' | null | undefined;

export type blockType = {
  typeOfBlock: typeOfBlockType; //'textfield' | 'section' | 'subsection' | 'documentclass' | null | undefined;
  blockContent: string | object | null | undefined;
};
