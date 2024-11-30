//import { IconBold, IconItalic } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import LinkTiptap from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import parse from 'html-react-parser';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  Box,
  Button,
  Grid,
  Group,
  Input,
  Paper,
  ScrollArea,
  Stack,
  Textarea,
  Title,
} from '@mantine/core';
import { useTextSelection } from '@mantine/hooks';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { theme } from '@/theme';
import { blockType } from '@/Types';
import SectionBlock from './blocks/SectionBlock';
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
  const [blocksLoaded, setBlocksLoaded] = useState<boolean>(true);

  const [activeSection, setActiveSecion] = useState<number>(0);
  const [editorContent, setEditorContent] = useState(sectionsContent[activeSection]);

  const [pdfLoaded, setPdfLoaded] = useState(true);
  const [pagesNumber, setPagesNumber] = useState<number>(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Subscript,
      Superscript,
      LinkTiptap,
      //, Placeholder.configure({ placeholder: 'This is placeholder' })
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
    const response = await axios.put(
      'http://localhost:8100/document/documentContent/671396c35547c1fc316c1a06',
      sectionsContent
    );

    // await setPdfLoaded(false);
    // const response = await axios.put(
    //   'http://localhost:8100/document/lines/671396c35547c1fc316c1a06',
    //   { sections: sectionsContent }
    // );
    // console.log(response);
    // //kurka przy 800ms działa ale to za długo
    // //await delay(800);
    // await setPdfLoaded(true);
  };

  // const addSection = () => {
  //   setSectionsContent([...sectionsContent, { head: 'New Chapter', body: '<u>Write</u> here...' }]);
  //   console.log(sectionsContent);
  // };

  const addSection = () => {
    // editor?.commands.setSectionsContent([
    //   ...sectionsContent,
    //   //{ typeOfBlock: 'section', blockContent: { idx: 1, sectionContent: '' } },
    //   { typeOfBlock: 'section', blockContent: '' },
    // ]);
    // console.log(sectionsContent);
    if (activeSection === 0) {
      setSectionsContent([...sectionsContent, { typeOfBlock: 'section', blockContent: '' }]);
    } else {
      let blocks = [...sectionsContent];
      blocks.splice(activeSection + 1, 0, { typeOfBlock: 'section', blockContent: '' });
      setSectionsContent(blocks);
    }

    console.log(sectionsContent);
  };

  const addTextfield = () => {
    if (activeSection === 0) {
      setSectionsContent([...sectionsContent, { typeOfBlock: 'textfield', blockContent: '' }]);
    } else {
      let blocks = [...sectionsContent];
      blocks.splice(activeSection + 1, 0, { typeOfBlock: 'textfield', blockContent: '' });
      setSectionsContent(blocks);
    }
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
    addSection,
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

  useEffect(() => {
    const setBlocks = async () => {
      const response = await axios.get(
        'http://localhost:8100/document/getDocumentContent/671396c35547c1fc316c1a06'
      );
      //console.log('doc content', response);
      setSectionsContent(response.data);
    };
    //console.log('SC:', sectionsContent);
    setBlocks();
  }, []);

  const renderBlock = (item, idx) => {
    switch (item.typeOfBlock) {
      case 'textfield':
        console.log('textfield');
        return (
          <TextfieldBlock
            idx={idx}
            activeSection={activeSection}
            setActiveSecion={setActiveSecion}
            sectionsContent={sectionsContent}
            setSectionsContent={setSectionsContent}
            editor={editor}
          />
        );
        break;
      case 'section':
        console.log('section');
        return (
          <SectionBlock
            idx={idx}
            activeSection={activeSection}
            setActiveSecion={setActiveSecion}
            sectionsContent={sectionsContent}
            setSectionsContent={setSectionsContent}
          />
        );
        break;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Header
        editFunctions={editFunctions}
        editor={editor}
        saveElementChanges={saveElementChanges}
      />

      <ScrollArea h="89vh" w="100%" offsetScrollbars type="always">
        <Grid>
          <Grid.Col span={6} p={0} bd="solid 1px var(--mantine-color-gray-4)" h="100%">
            <Stack w="100%" align="flex-end" gap="0%" pt="xl">
              {blocksLoaded && sectionsContent.length > 0 ? (
                sectionsContent.map((item, idx) => <div key={idx}>{renderBlock(item, idx)}</div>)
              ) : (
                <></>
              )}
            </Stack>
            {/* </Paper> */}
          </Grid.Col>
          <Grid.Col p={0} span={6} bd="solid 1px var(--mantine-color-gray-4)" h="100%">
            <Box m="xl">
              {pdfLoaded ? (
                Array(pagesNumber)
                  .fill(1)
                  .map((x, idx) => (
                    <Box mb="sm" key={idx}>
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
