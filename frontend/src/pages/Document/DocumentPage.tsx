//import { IconBold, IconItalic } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import parse from 'html-react-parser';
import { Button, Grid, Textarea, Title } from '@mantine/core';
import { useTextSelection } from '@mantine/hooks';
import { Link, RichTextEditor } from '@mantine/tiptap';
import Header from './components/Header';

export default function DocumentPage() {
  const [sectionsContent, setSectionContent] = useState([
    `<div>contetnt 1 </div>`,
    '<p>contetnt<strong> 2</strong></p>',
  ]);

  const [activeSection, setActiveSecion] = useState(0);
  const [editorContent, setEditorContent] = useState(sectionsContent[activeSection]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: editorContent,
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML()); // Zapisuje treść w konsoli po każdej edycji
    },
  });

  const replaceSelectedText = () => {
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    );

    if (!selectedText) {
      //alert('Brak zaznaczonego tekstu');
      return;
    }

    const replacement = 'wwwwwwwwwwwww'; //prompt('Podaj tekst, który ma zastąpić zaznaczony:', selectedText);

    if (replacement !== null) {
      // Zastąpienie zaznaczonego tekstu
      editor.commands.insertContent(replacement);
    }
  };

  return (
    <>
      <Header />
      <Grid>
        <Grid.Col span={6}>
          1
          <div>
            <Button
              variant="filled"
              onClick={() => {
                setSectionContent([...sectionsContent, '<p>New chapter</p>']);
                console.log(sectionsContent);
              }}
            >
              Add chapter
            </Button>

            {sectionsContent.length > 0 ? (
              sectionsContent.map((item, idx) => (
                <div
                  key={idx}
                  tabIndex={idx}
                  onFocus={async () => {
                    setActiveSecion(idx);
                    await editor?.commands.setContent(item);
                    console.log('onFocus', item);
                  }}
                  onBlur={() => {
                    let content: string | undefined = sectionsContent;
                    content[idx] = editor?.getHTML();
                    setSectionContent(content);
                    console.log('OnBlur', editorContent);
                  }}
                >
                  {activeSection === idx ? (
                    <RichTextEditor editor={editor}>
                      <RichTextEditor.Content />
                    </RichTextEditor>
                  ) : (
                    parse(sectionsContent[idx])
                  )}
                </div>
              ))
            ) : (
              <></>
            )}
            {/* <div
        tabIndex={0}
        onFocus={() => {
          setActiveSecion(0);
          editor?.commands.setContent(sectionsContent[0]);
          console.log(activeSection);
        }}
      >
        {activeSection === 0 ? (
          <RichTextEditor editor={editor}>
            <RichTextEditor.Content />
          </RichTextEditor>
        ) : (
          parse(sectionsContent[0])
        )}
      </div>

      <div
        tabIndex={1}
        onFocus={() => {
          setActiveSecion(1);
          editor?.commands.setContent(sectionsContent[1]);
          console.log(activeSection);
        }}
      >
        {activeSection === 1 ? (
          <RichTextEditor editor={editor}>
            <RichTextEditor.Content />
          </RichTextEditor>
        ) : (
          parse(sectionsContent[1])
        )}
      </div> */}

            <button type="button" onClick={replaceSelectedText} style={{ marginTop: '10px' }}>
              Podmień zaznaczony tekst
            </button>
          </div>
        </Grid.Col>
        <Grid.Col span={6}>2</Grid.Col>
      </Grid>
    </>
  );
}
