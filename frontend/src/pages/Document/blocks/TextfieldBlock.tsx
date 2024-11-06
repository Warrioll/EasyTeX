import React, { Dispatch, SetStateAction } from 'react';
import { Editor } from '@tiptap/react';
import parse from 'html-react-parser';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';

type TextfieldBlock = {
  idx: number;
  block: blockType;
  activeSection: number;
  setActiveSecion: Dispatch<SetStateAction<number>>;
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
  editor: Editor;
  // editorContent;
};

export default function TextfieldBlock({
  idx,
  block,
  activeSection,
  setActiveSecion,
  sectionsContent,
  setSectionsContent,
  editor,
  //editorContent,
}) {
  return (
    <div
      key={idx}
      tabIndex={idx}
      onFocus={async () => {
        setActiveSecion(idx);
        block.blockContent ? await editor?.commands.setContent(block.blockContent) : null;
        console.log('onFocus', block);
      }}
      onBlur={() => {
        let content = sectionsContent;
        content[idx].blockContent = editor?.getHTML();
        setSectionsContent(content);
        //console.log('OnBlur', editorContent);
      }}
    >
      {activeSection === idx ? (
        <RichTextEditor editor={editor}>
          <RichTextEditor.Content />
        </RichTextEditor>
      ) : sectionsContent[idx].blockContent ? (
        parse(sectionsContent[idx].blockContent)
      ) : null}
    </div>
  );
}
