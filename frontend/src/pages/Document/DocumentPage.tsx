//import { IconBold, IconItalic } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import Placeholder from '@tiptap/extension-placeholder';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import parse from 'html-react-parser';
import { Button, Grid, Paper, ScrollArea, Textarea, Title } from '@mantine/core';
import { useTextSelection } from '@mantine/hooks';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { theme } from '@/theme';
import Header from './components/Header';

type chapterType = {
  head: string | null | undefined;
  body: string | undefined;
};

export default function DocumentPage() {
  const [sectionsContent, setSectionContent] = useState<chapterType[]>([]);

  const [activeSection, setActiveSecion] = useState(0);
  const [editorContent, setEditorContent] = useState(sectionsContent[activeSection]);

  const editor = useEditor({
    extensions: [
      StarterKit, //, Placeholder.configure({ placeholder: 'This is placeholder' })
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
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

  const send = async () => {
    const response = await axios.put(
      'http://localhost:8100/document/lines/671396c35547c1fc316c1a06',
      { sections: sectionsContent }
    );
    console.log(response);
  };

  return (
    <>
      <Header />
      <ScrollArea h="79vh">
        <Grid>
          <Grid.Col span={6} bd="solid 1px var(--mantine-color-gray-4)" h="100%">
            <button type="button" onClick={replaceSelectedText} style={{ marginTop: '10px' }}>
              Podmień zaznaczony tekst
            </button>
            <Button
              color="var(--mantine-color-cyan-9)"
              variant="filled"
              onClick={() => {
                setSectionContent([
                  ...sectionsContent,
                  { head: 'New Chapter', body: 'Write here...' },
                ]);
                console.log(sectionsContent);
              }}
            >
              Add chapter
            </Button>
            <Button onClick={send}>Send</Button>
            <Paper shadow="md" radius="xs" withBorder p="xl" m="xl" w="48rem" h="69rem">
              <div>
                {sectionsContent.length > 0 ? (
                  sectionsContent.map((item, idx) => (
                    <>
                      <h4>{item.head}</h4>
                      <div
                        key={idx}
                        tabIndex={idx}
                        onFocus={async () => {
                          setActiveSecion(idx);
                          item.body ? await editor?.commands.setContent(item.body) : null;
                          console.log('onFocus', item);
                        }}
                        onBlur={() => {
                          let content = sectionsContent;
                          content[idx].body = editor?.getHTML();
                          setSectionContent(content);
                          console.log('OnBlur', editorContent);
                        }}
                      >
                        {activeSection === idx ? (
                          <RichTextEditor editor={editor}>
                            <RichTextEditor.Content />
                          </RichTextEditor>
                        ) : sectionsContent[idx].body ? (
                          parse(sectionsContent[idx].body)
                        ) : null}
                      </div>
                    </>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6} bd="solid 1px var(--mantine-color-gray-4)" h="100%">
            2
          </Grid.Col>
        </Grid>
      </ScrollArea>
    </>
  );
}
