import React, { Dispatch, SetStateAction } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { FocusTrap } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';
import MarkedBlockFrame from './MarkedBlockFrame';
import styles from './blocks.module.css';

type TextfieldBlockProps = {
  idx: number;
  activeBlockState: [number, Dispatch<SetStateAction<number>>];
  //activeSection: number;
  //setActiveSecion: Dispatch<SetStateAction<number>>;
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
  editor: Editor;
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
  //editorContent,
}: TextfieldBlockProps) {
  const [focusTrap, { toggle }] = useDisclosure(false);
  const [activeBlock, setActiveBlock] = activeBlockState;

  return (
    <div
      key={idx}
      tabIndex={idx}
      onFocus={async () => {
        setActiveBlock(idx);
        // sectionsContent[idx].blockContent
        //   ?
        await editor?.commands.setContent(sectionsContent[idx].blockContent);
        //: null;
        //console.log('onFocus', block);
      }}
      onBlur={() => {
        let content = sectionsContent;
        content[idx].blockContent = editor?.getHTML();
        setSectionsContent(content);
        //console.log('OnBlur', editorContent);
      }}
    >
      <MarkedBlockFrame
        idx={idx}
        activeBlockState={activeBlockState}
        blockName="Textfield"
        sectionsContent={sectionsContent}
        setSectionsContent={setSectionsContent}
      >
        {activeBlock === idx ? (
          // <RichTextEditor editor={editor}>
          //   <RichTextEditor.Content />
          // </RichTextEditor>
          <FocusTrap active={focusTrap}>
            <EditorContent editor={editor} />
          </FocusTrap>
        ) : sectionsContent[idx].blockContent ? (
          <div className={styles.textfieldNotFocused}>
            {parse(sectionsContent[idx].blockContent as string)}
          </div>
        ) : null}
      </MarkedBlockFrame>
    </div>
  );
}
