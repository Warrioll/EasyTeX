import React, { Dispatch, SetStateAction } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import parse from 'html-react-parser';
import { RichTextEditor } from '@mantine/tiptap';
import { blockType } from '@/Types';

type TextfieldBlockProps = {
  idx: number;

  activeSection: number;
  setActiveSecion: Dispatch<SetStateAction<number>>;
  sectionsContent: blockType[];
  setSectionsContent: Dispatch<SetStateAction<blockType[]>>;
  editor: Editor;
  // editorContent;
};

export default function TextfieldBlock({
  idx,

  activeSection,
  setActiveSecion,
  sectionsContent,
  setSectionsContent,
  editor,
  //editorContent,
}: TextfieldBlockProps) {
  return (
    <div
      key={idx}
      tabIndex={idx}
      onFocus={async () => {
        setActiveSecion(idx);
        sectionsContent[idx].blockContent
          ? await editor?.commands.setContent(sectionsContent[idx].blockContent)
          : null;
        //console.log('onFocus', block);
      }}
      onBlur={() => {
        let content = sectionsContent;
        content[idx].blockContent = editor?.getHTML();
        setSectionsContent(content);
        //console.log('OnBlur', editorContent);
      }}
    >
      {activeSection === idx ? (
        // <RichTextEditor editor={editor}>
        //   <RichTextEditor.Content />
        // </RichTextEditor>
        <EditorContent editor={editor} />
      ) : sectionsContent[idx].blockContent ? (
        parse(sectionsContent[idx].blockContent as string)
      ) : null}
    </div>
  );
}
