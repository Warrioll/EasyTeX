import React, { Dispatch, SetStateAction } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { FocusTrap } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';
import MarkedBlockFrame from './MarkedBlockFrame';
import styles from './blocks.module.css';
import BasicTexfield from './basicTextfield';

type TextfieldBlockProps = {
  idx: number;
  activeBlockState: [number, Dispatch<SetStateAction<number>>];
  //activeSection: number;
  //setActiveSecion: Dispatch<SetStateAction<number>>;
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
  editor: Editor;
  activeTextInputState: [string, Dispatch<SetStateAction<string>>];
  // editorContent;
};

export default function TextfieldBlock({
  idx,
  activeBlockState,
  //activeSection,
  //setActiveSecion,
  sectionsContent,
  setSectionsContent,
  editor,
  activeTextInputState
  //editorContent,
}: TextfieldBlockProps) {
  const [focusTrap, { toggle }] = useDisclosure(false);
  const [activeBlock, setActiveBlock] = activeBlockState;

  return (
   
      <MarkedBlockFrame
        idx={idx}
        activeBlockState={activeBlockState}
        blockName="Textfield"
        sectionsContent={sectionsContent}
        setSectionsContent={setSectionsContent}
      >
       <BasicTexfield
                            idx={idx}
                            activeBlockState={activeBlockState}
                            contentToRead={sectionsContent[idx].blockContent as string}
                            editor={editor}
                            activeTextInputState={activeTextInputState}
                            idxInput={idx.toString()}
                            sectionsContent={sectionsContent}
                            setSectionsContent={setSectionsContent}
                          />
      </MarkedBlockFrame>
  );
}
