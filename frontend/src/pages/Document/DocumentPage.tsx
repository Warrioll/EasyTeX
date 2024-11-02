//import { IconBold, IconItalic } from '@tabler/icons-react';
import { useState } from 'react';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import parse from 'html-react-parser';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Button, Grid, Input, Paper, ScrollArea, Textarea, Title } from '@mantine/core';
import { useTextSelection } from '@mantine/hooks';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { theme } from '@/theme';
import Header from './components/Header';
import pdfClasses from './components/pdfDocument.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

type chapterType = {
  head: string | null | undefined;
  body: string | undefined;
};

//pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function DocumentPage() {
  const [sectionsContent, setSectionContent] = useState<chapterType[]>([]);

  const [activeSection, setActiveSecion] = useState(0);
  const [editorContent, setEditorContent] = useState(sectionsContent[activeSection]);

  const [pdfLoaded, setPdfLoaded] = useState(true);

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

  //to to przeanalizowania
  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const saveChanges = async () => {
    await setPdfLoaded(false);
    const response = await axios.put(
      'http://localhost:8100/document/lines/671396c35547c1fc316c1a06',
      { sections: sectionsContent }
    );
    console.log(response);
    //kurka przy 800ms działa ale to za długo
    //await delay(800);
    await setPdfLoaded(true);
  };

  const addSection = () => {
    setSectionContent([
      ...sectionsContent,
      { head: 'New Chapter', body: '<h6>Write</h6> here...' },
    ]);
    console.log(sectionsContent);
  };

  const reloadPdf = async () => {
    await setPdfLoaded(false);
    await setTimeout(() => {
      console.log('timeout');
    }, 5000);
    await setPdfLoaded(true);
  };

  const editFunctions = {
    addSection,
    saveChanges,
    reloadPdf,
  };

  return (
    <>
      <Header editFunctions={editFunctions} />

      <ScrollArea h="89vh" w="100vw" offsetScrollbars type="always">
        <Grid>
          <Grid.Col span={6} bd="solid 1px var(--mantine-color-gray-4)" h="100%">
            {/* <button type="button" onClick={replaceSelectedText} style={{ marginTop: '10px' }}>
              Podmień zaznaczony tekst
            </button> */}
            {/* 
            <Button onClick={send}>Send</Button> */}
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
            <Box m="xl">
              {pdfLoaded ? (
                <Document
                  file="http://localhost:8100/document/getPdf/671396c35547c1fc316c1a06"
                  className={pdfClasses.annotationLayer}
                >
                  <Page
                    pageNumber={1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className={pdfClasses.page}
                    scale={1.31}
                  />
                </Document>
              ) : (
                <>PDF Not found</>
              )}
            </Box>
          </Grid.Col>
        </Grid>
      </ScrollArea>
    </>
  );
}
