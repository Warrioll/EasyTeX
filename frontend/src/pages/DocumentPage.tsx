//import { IconBold, IconItalic } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@mantine/tiptap';

export default function DocumentPage() {
  const BoldIcon = () => 'B'; //<IconBold size="1rem" stroke={3.5} />;
  const ItalicIcon = () => 'I'; //<IconItalic size="1rem" stroke={3.5} />;

  const [content, setContent] = useState('yolo');

  const editor = useEditor({
    extensions: [StarterKit],
    content: `${content}`,
    onUpdate: (editor) => console.log(editor.editor.getHTML()),
  });

  const editor2 = useEditor({
    extensions: [StarterKit],
    content: `${content}`,
    onUpdate: (editor) => console.log(editor.editor.getHTML()),
  });

  return (
    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold icon={BoldIcon} />
            <RichTextEditor.Italic icon={ItalicIcon} />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        htf
        <RichTextEditor.Content />
        <div>sdfv</div>
      </RichTextEditor>

      <RichTextEditor editor={editor2}>
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold icon={BoldIcon} />
            <RichTextEditor.Italic icon={ItalicIcon} />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        wututututu
        <RichTextEditor.Content />
        <div>sdfv</div>
      </RichTextEditor>
    </>
  );
}
