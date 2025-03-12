//import { IconBold, IconItalic } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import LinkTiptap from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import parse from 'html-react-parser';
//import { Document, Page, pdfjs } from 'react-pdf';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import Split from '@uiw/react-split';
import { useParams } from 'react-router-dom';
//import Split from 'react-split';
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Input,
  LoadingOverlay,
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
import SectionBlock from './components/blocks/SectionBlock';
import SubsectionBlock from './components/blocks/SubsectionBlock';
import SubsubsectionBlock from './components/blocks/SubsubsectionBlock';
import TextfieldBlock from './components/blocks/TextfieldBlock';
import TitlePageBlock from './components/blocks/TitlePageBlock';
import Header from './components/header/Header';
import pdfClasses from './components/pdfDocument.module.css';
import classes from './documentPage.module.css';
import { chceckIfBlockContentEmpty } from './documentHandlers';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url
// ).toString();

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

  const activeBlockState = useState<number>(0);
  const [activeBlock, setActiveBlock] = activeBlockState;
  const activeTextInputState = useState<string>('');

  const [editorContent, setEditorContent] = useState(sectionsContent[activeBlock]);

  const [pdfLoaded, setPdfLoaded] = useState(true);
  const [pagesNumber, setPagesNumber] = useState<number>(0);
  const [pdf, setPdf] = useState<Any>(null);
  const pdfZoom = useState<string | null>('1');
  const workspaceZoom = useState<string | null>('1');
  const pdfZoomValue = useState<number>(1);
  const workspaceZoomValue = useState<number>(1);

  const { id } = useParams();

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
    content[activeBlock].blockContent = editor?.getHTML();
    setSectionsContent(content);
    //console.log('OnBlur', editorContent);
  };

  // const sendChanges = async () => {
  //   const response = await axios.put(
  //     `http://localhost:8100/document/documentContent/${id}`,
  //     sectionsContent
  //   );

  // await setPdfLoaded(false);
  // const response = await axios.put(
  //   'http://localhost:8100/document/lines/671396c35547c1fc316c1a06',
  //   { sections: sectionsContent }
  // );
  // console.log(response);
  // //kurka przy 800ms działa ale to za długo
  // //await delay(800);
  // await setPdfLoaded(true);
  //}

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

    // if (activeSection === 0) {
    //   setSectionsContent([...sectionsContent, { typeOfBlock: 'section', blockContent: '' }]);
    // } else {
    //   let blocks = [...sectionsContent];
    //   blocks.splice(activeSection + 1, 0, { typeOfBlock: 'section', blockContent: '' });
    //   setSectionsContent(blocks);
    // }

    // console.log(sectionsContent);

    if (activeBlock === 0) {
      setSectionsContent([
        ...sectionsContent,
        { typeOfBlock: 'section', blockContent: '<b>New Section</b>' },
      ]);
    } else {
      let blocks = [...sectionsContent];
      blocks.splice(activeBlock + 1, 0, {
        typeOfBlock: 'section',
        blockContent: '<b>New Section</b>',
      });
      setSectionsContent(blocks);
    }
  };

  const addSubsection = () => {
    if (activeBlock === 0) {
      setSectionsContent([
        ...sectionsContent,
        { typeOfBlock: 'subsection', blockContent: 'New Subection' },
      ]);
    } else {
      let blocks = [...sectionsContent];
      blocks.splice(activeBlock + 1, 0, {
        typeOfBlock: 'subsection',
        blockContent: 'New Subsection',
      });
      setSectionsContent(blocks);
    }
  };

  const addSubsubsection = () => {
    if (activeBlock === 0) {
      setSectionsContent([
        ...sectionsContent,
        { typeOfBlock: 'subsection', blockContent: 'New Subsubection' },
      ]);
    } else {
      let blocks = [...sectionsContent];
      blocks.splice(activeBlock + 1, 0, {
        typeOfBlock: 'subsection',
        blockContent: 'New Subsubsection',
      });
      setSectionsContent(blocks);
    }
  };

  //puste text fieldy się nie wyświetlają!!!
  const addTextfield = () => {
    if (activeBlock === 0) {
      setSectionsContent([
        ...sectionsContent,
        { typeOfBlock: 'textfield', blockContent: 'New textfield' },
      ]);
    } else {
      let blocks = [...sectionsContent];
      blocks.splice(activeBlock + 1, 0, {
        typeOfBlock: 'textfield',
        blockContent: 'New textfield',
      });
      setSectionsContent(blocks);
    }
  };

  const reloadPdf = async () => {
    // await setTimeout(() => {
    //   console.log('timeout');
    // }, 5000);
  };

  const setPdfFile = async () => {
    //brak autoryzacji pdf zrobić to jak ogarne odpowiedni viewer
    //console.log()
    await setPdfLoaded(false);
    const response = await axios.get(`http://localhost:8100/document/getPdf/${id}`, {
      withCredentials: true,
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/pdf',
      },
    });

    setPdf(URL.createObjectURL(await response.data));

    const document = await pdfjs.getDocument(pdfLink).promise;
    setPagesNumber(document.numPages);
    console.log('pages:', pagesNumber);
    await setPdfLoaded(true);
  };

  const sendChanges = async () => {
    try {
      const blocks = sectionsContent.filter(block =>{
        switch(block.typeOfBlock){
          case 'titlePage':
            if(chceckIfBlockContentEmpty(block.blockContent.title) && chceckIfBlockContentEmpty(block.blockContent.author) && chceckIfBlockContentEmpty(block.blockContent.date)){
              return false
            }
            return true
          default:
            return !chceckIfBlockContentEmpty(block.blockContent)
        }
       })

      const response = await axios.put(
        `http://localhost:8100/document/documentContent/${id}`,
        blocks,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const reload = await setPdfFile();
      }
    } catch (error) {
      console.log('save and reaload error:', error);
    }
  };

  const editFunctions = {
    // addSection,
    addTextfield,
    sendChanges,
    reloadPdf: setPdfFile,
    addSection,
    addSubsection,
    addSubsubsection,
    //bold,
  };

  useEffect(() => {
    pdfZoomValue[1](1.4 * Number(pdfZoom[0]));
  }, [pdfZoom[0]]);

  useEffect(() => {
    workspaceZoomValue[1](Number(workspaceZoom[0]));
  }, [workspaceZoom[0]]);

  // useEffect(() => {
  //   const setPdfFile = async () => {
  //     //brak autoryzacji pdf zrobić to jak ogarne odpowiedni viewer
  //     const response = await axios.get(`http://localhost:8100/document/getPdf/${id}`, {
  //       withCredentials: true,
  //       responseType: 'blob',
  //       headers: {
  //         'Content-Type': 'application/pdf',
  //       },
  //     });

  //     setPdf(URL.createObjectURL(await response.data));

  //     const document = await pdfjs.getDocument(pdfLink).promise;
  //     setPagesNumber(document.numPages);
  //     console.log('pages:', pagesNumber);
  //   };

  //   setPdfFile();
  // }, [pdfLoaded]);

  useEffect(() => {
    setPdfFile();
  }, []);

  useEffect(() => {
    const setBlocks = async () => {
      const response = await axios.get(`http://localhost:8100/document/getDocumentContent/${id}`, {
        withCredentials: true,
      });
      console.log('doc content', response);
      setSectionsContent(response.data);
    };
    //console.log('SC:', sectionsContent);
    setBlocks();
  }, []);

  const renderBlock = (item, idx) => {
    switch (item.typeOfBlock) {
      case 'titlePage':
        return (
          <TitlePageBlock
            idx={idx}
            activeBlockState={activeBlockState}
            sectionsContent={sectionsContent}
            setSectionsContent={setSectionsContent}
            editor={editor}
            activeTextInputState={activeTextInputState}
          />
          // <>
          //   {item.blockContent.title} | {item.blockContent.author} | {item.blockContent.date}
          // </>
        );
      case 'textfield':
        console.log('textfield');
        return (
          <TextfieldBlock
            idx={idx}
            activeBlockState={activeBlockState}
            sectionsContent={sectionsContent}
            setSectionsContent={setSectionsContent}
            editor={editor}
            activeTextInputState={activeTextInputState}
          />
        );
        break;
      case 'section':
        console.log('section');
        return (
          <SectionBlock
            idx={idx}
            activeBlockState={activeBlockState}
            sectionsContent={sectionsContent}
            setSectionsContent={setSectionsContent}
            editor={editor}
            activeTextInputState={activeTextInputState}
          />
        );
        break;
      case 'subsection':
        console.log('section');
        return (
          <SubsectionBlock
            idx={idx}
            activeBlockState={activeBlockState}
            sectionsContent={sectionsContent}
            setSectionsContent={setSectionsContent}
            editor={editor}
            activeTextInputState={activeTextInputState}
          />
        );
        break;
      case 'subsubsection':
        console.log('section');
        return (
          <SubsubsectionBlock
            idx={idx}
            activeBlockState={activeBlockState}
            sectionsContent={sectionsContent}
            setSectionsContent={setSectionsContent}
            activeTextInputState={activeTextInputState}
            editor={editor}
          />
        );
        break;
      default:
        return <></>;
    }
  };

  //const pageRefs = useRef([]);

  return (
    <>
      <Header
        editFunctions={editFunctions}
        editor={editor}
        saveElementChanges={saveElementChanges}
        pdfZoom={pdfZoom}
        workspaceZoom={workspaceZoom}
        activeSection={activeBlock}
        sectionsContent={sectionsContent}
      />

      <Split
        className={classes.bar}
        lineBar
        style={{ width: '100vw', border: 'none' }}
        renderBar={({ onMouseDown, ...props }) => {
          return (
            <div {...props} style={{ boxShadow: 'none' }}>
              <div onMouseDown={onMouseDown} />
            </div>
          );
        }}
      >
        <Center w="100vw" h="90vh" p="0px">
          <ScrollArea h="100%" w="100%">
            {/* <Grid> */}
            {/* <Grid.Col span={6} p={0} bd="solid 1px var(--mantine-color-gray-4)" h="100%"> */}
            <Box
              h="100%"
              w="100%"
              m="xl"
              style={{
                transform: `scale(${workspaceZoomValue[0]})`,
                transformOrigin: 'top left',
              }}
              p="0px"
            >
              <Stack h="100%" w="100%" align="center" justify="center" gap="0%">
                {/* <TitlePageBlock
                  idx={-1}
                  activeSection={activeSection}
                  setActiveSecion={setActiveSecion}
                  sectionsContent={sectionsContent}
                  setSectionsContent={setSectionsContent}
                /> */}
                {blocksLoaded && sectionsContent.length > 0 ? (
                  sectionsContent.map((item, idx) => <div key={idx}>{renderBlock(item, idx)}</div>)
                ) : (
                  <></>
                )}
              </Stack>
              {/* </Paper> */}
              {/* </Grid.Col> */}
            </Box>
          </ScrollArea>
        </Center>
        <Box w="100vw" pos="relative">
          <LoadingOverlay
            visible={!pdfLoaded}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 1, color: 'var(--mantine-color-gray-1)' }}
            loaderProps={{ color: 'cyan' }}
          />
          <ScrollArea h="90vh">
            {/* <Grid.Col p={0} span={6} bd="solid 1px var(--mantine-color-gray-4)" h="100%"> */}
            <Center m="xl" p={0}>
              {/* {pdfLoaded ? (
                Array(pagesNumber)
                  .fill(1)
                  .map((x, idx) => (
                    <Box mb="sm" key={idx}>
                      <Document file={pdf} className={pdfClasses.annotationLayer}>
                        <div
                          style={{ position: 'relative' }}
                          ref={(el) => (pageRefs.current[idx + 1] = el)}
                        >
                          <Page
                            pageNumber={idx + 1}
                            //renderTextLayer={false}
                            //renderAnnotationLayer={false}
                            className={pdfClasses.page}
                            //scale={1.31}
                            containerRef={pageRefs.current[idx + 1]}
                          />
                        </div>
                      </Document>
                    </Box>
                  ))
              ) : (
                <>PDF Not found</>
              )} */}

              <Document
                file={pdf}
                //onLoadSuccess={onDocumentLoadSuccess}
                //options={options}
              >
                {Array.from(new Array(pagesNumber), (_el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    className={pdfClasses.page}
                    scale={pdfZoomValue[0]}
                    // width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                  />
                ))}
              </Document>
            </Center>

            {/* </Grid.Col> */}
            {/* </Grid> */}
          </ScrollArea>
        </Box>
      </Split>
    </>
  );
}
