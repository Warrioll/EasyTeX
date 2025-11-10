import React, { Dispatch, memo, SetStateAction, useMemo } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { FocusTrap } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';
import {
  useActiveBlockContext,
  useActiveTextfieldContext,
  useBlocksContentContext,
  useEditorContext,
} from '../../DocumentContextProviders';
import BasicTexfield from './blocksComponents/BasicTextfield';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import styles from './blocks.module.css';

type TextfieldBlockProps = {
  idx: number;
  //activeBlockState: [number, Dispatch<SetStateAction<number>>];
  //activeSection: number;
  //setActiveSecion: Dispatch<SetStateAction<number>>;
  //sectionsContent: blockType[];
  //setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
  //editor: Editor;
  //activeTextInputState: [string, Dispatch<SetStateAction<string>>];
  // editorContent;
};

//const TextfieldBlock = memo(
export default function TextfieldBlock({
  idx,
  //activeBlockState,
  //activeSection,
  //setActiveSecion,
  //sectionsContent,
  //setSectionsContent,
  //editor,
  //activeTextInputState,
  //editorContent,
}: TextfieldBlockProps) {
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  //console.log('render textfield', idx);
  // const thisBlockContent = useMemo(() => {
  //   //console.log('useMemo', idx);
  //   return (
  //     <BasicTexfield
  //       idx={idx}
  //       //activeBlockState={activeBlockState}
  //       contentToRead={blocksContent[idx].blockContent as string}
  //       //editor={editor}
  //       //activeTextInputState={activeTextInputState}
  //       idxInput={idx.toString()}
  //       //sectionsContent={sectionsContent}
  //       //setSectionsContent={setSectionsContent}
  //     />
  //   );
  // }, [blocksContent[idx], blocksContent[idx].blockContent]);

  //const [focusTrap, { toggle }] = useDisclosure(false);
  //const [activeBlock, setActiveBlock] = activeBlockState;

  return (
    <MarkedBlockFrame
      idx={idx}
      //activeBlockState={activeBlockState}
      blockName="Textfield"
      //sectionsContent={sectionsContent}
      //setSectionsContent={setSectionsContent}
      //activeTextInputState={activeTextInputState}
    >
      <BasicTexfield
        idx={idx}
        //activeBlockState={activeBlockState}
        contentToRead={blocksContent[idx].blockContent as string}
        //editor={editor}
        //activeTextInputState={activeTextInputState}
        idxInput={idx.toString()}
        //sectionsContent={sectionsContent}
        //setSectionsContent={setSectionsContent}
      />
    </MarkedBlockFrame>
  );
}
//);

//export default TextfieldBlock;
