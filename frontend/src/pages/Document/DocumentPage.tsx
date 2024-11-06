//import { IconBold, IconItalic } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import parse from 'html-react-parser';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Button, Grid, Input, Paper, ScrollArea, Textarea, Title } from '@mantine/core';
import { useTextSelection } from '@mantine/hooks';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { theme } from '@/theme';
import { blockType } from '@/Types';
import TextfieldBlock from './blocks/TextfieldBlock';
import Header from './components/Header';
import pdfClasses from './components/pdfDocument.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

// type chapterType = {
//   head: string | null | undefined;
//   body: string | undefined;
// };

export default function DocumentPage() {
  const pdfLink = 'http://localhost:8100/document/getPdf/671396c35547c1fc316c1a06';

  // const [sectionsContent, setSectionsContent] = useState<chapterType[]>([]);
  const [sectionsContent, setSectionsContent] = useState<blockType[]>([]);

  const [activeSection, setActiveSecion] = useState<number>(0);
  const [editorContent, setEditorContent] = useState(sectionsContent[activeSection]);

  const [pdfLoaded, setPdfLoaded] = useState(true);
  const [pagesNumber, setPagesNumber] = useState<number>(0);

  const editor = useEditor({
    extensions: [
      StarterKit, //, Placeholder.configure({ placeholder: 'This is placeholder' })
    ],
    //content: editorContent,
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
  });

  // const replaceSelectedText = () => {
  //   const selectedText = editor.state.doc.textBetween(
  //     editor.state.selection.from,
  //     editor.state.selection.to,
  //     ' '
  //   );

  //   if (!selectedText) {
  //     //alert('Brak zaznaczonego tekstu');
  //     return;
  //   }

  //   const replacement = 'wwwwwwwwwwwww'; //prompt('Podaj tekst, który ma zastąpić zaznaczony:', selectedText);

  //   if (replacement !== null) {
  //     // Zastąpienie zaznaczonego tekstu
  //     editor.commands.insertContent(replacement);
  //   }
  // };

  //to to przeanalizowania
  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const saveElementChanges = () => {
    let content = sectionsContent;
    content[activeSection].blockContent = editor?.getHTML();
    setSectionsContent(content);
    //console.log('OnBlur', editorContent);
  };

  const sendChanges = async () => {
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

  // const addSection = () => {
  //   setSectionsContent([...sectionsContent, { head: 'New Chapter', body: '<u>Write</u> here...' }]);
  //   console.log(sectionsContent);
  // };

  const addSection = () => {
    setSectionsContent([
      ...sectionsContent,
      { typeOfBlock: 'section', blockContent: 'Write here...' },
    ]);
    console.log(sectionsContent);
  };

  const addTextfield = () => {
    setSectionsContent([
      ...sectionsContent,
      { typeOfBlock: 'textfield', blockContent: 'Write here...' },
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
    // addSection,
    addTextfield,
    sendChanges,
    reloadPdf,
    //bold,
  };

  useEffect(() => {
    const setPages = async () => {
      const document = await pdfjs.getDocument(pdfLink).promise;
      setPagesNumber(document.numPages);
      console.log('pages:', pagesNumber);
    };
    setPages();
  }, [pdfLoaded]);

  const renderBlock = (item, idx) => {
    switch (item.typeOfBlock) {
      case 'textfield':
        return (
          <TextfieldBlock
            idx={idx}
            block={item}
            activeSection={activeSection}
            setActiveSecion={setActiveSecion}
            sectionsContent={sectionsContent}
            setSectionsContent={setSectionsContent}
            editor={editor}
          />
        );
        break;
      default:
        return <>Block not found</>;
    }
  };

  return (
    <>
      <Header
        editFunctions={editFunctions}
        editor={editor}
        saveElementChanges={saveElementChanges}
      />

      <ScrollArea h="89vh" w="100vw" offsetScrollbars type="always">
        <Grid>
          <Grid.Col span={6} bd="solid 1px var(--mantine-color-gray-4)" h="100%">
            {/* <button type="button" onClick={replaceSelectedText} style={{ marginTop: '10px' }}>
              Podmień zaznaczony tekst
            </button> */}
            {/* 
            <Button onClick={send}>Send</Button> */}
            <Paper shadow="md" radius="xs" withBorder p="xl" m="xl" w="48rem" h="69rem">
              {sectionsContent.length > 0 ? (
                sectionsContent.map((item, idx) =>
                  renderBlock(item, idx)

                  // <>
                  //   {/* <h4>{item.head}</h4> */}
                  //   {/* <div
                  //     key={idx}
                  //     tabIndex={idx}
                  //     onFocus={async () => {
                  //       setActiveSecion(idx);
                  //       item.blockContent
                  //         ? await editor?.commands.setContent(item.blockContent)
                  //         : null;
                  //       console.log('onFocus', item);
                  //     }}
                  //     onBlur={() => {
                  //       let content = sectionsContent;
                  //       content[idx].blockContent = editor?.getHTML();
                  //       setSectionsContent(content);
                  //       //console.log('OnBlur', editorContent);
                  //     }}
                  //   >
                  //     {activeSection === idx ? (
                  //       <RichTextEditor editor={editor}>
                  //         <RichTextEditor.Content />
                  //       </RichTextEditor>
                  //     ) : sectionsContent[idx].blockContent ? (
                  //       parse(sectionsContent[idx].blockContent)
                  //     ) : null}
                  //   </div> */}
                  // </>
                )
              ) : (
                <></>
              )}
            </Paper>
          </Grid.Col>
          <Grid.Col span={6} bd="solid 1px var(--mantine-color-gray-4)" h="100%">
            <Box m="xl">
              {pdfLoaded ? (
                Array(pagesNumber)
                  .fill(1)
                  .map((x, idx) => (
                    <Box mb="sm">
                      <Document file={pdfLink} className={pdfClasses.annotationLayer}>
                        <Page
                          pageNumber={idx + 1}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          className={pdfClasses.page}
                          scale={1.31}
                        />
                      </Document>
                    </Box>
                  ))
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
