export type blockType = {
  typeOfBlock: 'textfield' | 'section' | 'subsection' | 'documentclass' | null | undefined;
  blockContent: string | object | null | undefined;
};
