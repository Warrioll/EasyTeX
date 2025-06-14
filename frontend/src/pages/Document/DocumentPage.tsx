//import { IconBold, IconItalic } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import LinkTiptap from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
//import { Document, Page, pdfjs } from 'react-pdf';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import Split from '@uiw/react-split';
import { cloneDeep } from 'lodash';
import { useParams } from 'react-router-dom';
//import Split from 'react-split';
import { Box, Center, LoadingOverlay, Paper, ScrollArea, Stack } from '@mantine/core';
import { blockType } from '@/Types';
import EquationBlock from './components/blocks/EquationBlock';
import FigureBlock from './components/blocks/FigureBlock';
import PageBreakBlock from './components/blocks/PageBreakBlock';
import SectionBlock from './components/blocks/SectionBlock';
import SubsectionBlock from './components/blocks/SubsectionBlock';
import SubsubsectionBlock from './components/blocks/SubsubsectionBlock';
import TableBlock from './components/blocks/TableBlock';
import TableOfContentsBlock from './components/blocks/TableOfContentsBlock';
import TextfieldBlock from './components/blocks/TextfieldBlock';
import TitlePageBlock from './components/blocks/TitlePageBlock';
import Header from './components/header/Header';
import { chceckIfBlockContentEmpty, saveBasicTextInputChanges } from './documentHandlers';
import pdfClasses from './components/pdfDocument.module.css';
import classes from './documentPage.module.css';

import 'katex/dist/katex.min.css';

import Latex from 'react-latex-next';

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
  const blocksContentState = useState<blockType[]>([]);
  const [sectionsContent, setSectionsContent] = blocksContentState;
  const [blocksLoaded, setBlocksLoaded] = useState<boolean>(true);

  const activeBlockState = useState<number>(0);
  const [activeBlock, setActiveBlock] = activeBlockState;
  const activeTextInputState = useState<string>('');
  const [activeTextInput, setActiveTextInput] = activeTextInputState;

  const [editorContent, setEditorContent] = useState(sectionsContent[activeBlock]);

  const [pdfLoaded, setPdfLoaded] = useState(true);
  const [pagesNumber, setPagesNumber] = useState<number>(0);
  const [pdf, setPdf] = useState<any>(null);
  const pdfZoom = useState<string | null>('1');
  const workspaceZoom = useState<string | null>('1');
  const pdfZoomValue = useState<number>(1);
  const workspaceZoomValue = useState<number>(1);

  const activeTableCellState = useState<[number, number]>([0, 0]); //[row, column]
  const [activeTableCell, setActiveTableCell] = activeTableCellState;

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

  // const saveFontTextInputChanges = () => {
  //   saveBasicTextInputChanges(
  //     activeBlock,
  //     activeTextInput,
  //     blocksContentState,
  //     editor?.getHTML() as string
  //   );
  //   // let content = sectionsContent;
  //   // content[activeBlock].blockContent = editor?.getHTML();
  //   // setSectionsContent(content);

  //   //console.log('OnBlur', editorContent);
  // };

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

  const addTitlePage = () => {
    if (activeBlock === 0) {
      setSectionsContent([
        ...sectionsContent,
        {
          typeOfBlock: 'titlePage',
          blockContent: { title: 'Title', author: 'Author', date: 'Date' },
        },
      ]);
    } else {
      let blocks = [...sectionsContent];
      blocks.splice(activeBlock + 1, 0, {
        typeOfBlock: 'titlePage',
        blockContent: { title: 'Title', author: 'Author', date: 'Date' },
      });
      setSectionsContent(blocks);
    }
  };

  const addTableOfContents = () => {
    if (activeBlock === 0) {
      setSectionsContent([
        ...sectionsContent,
        {
          typeOfBlock: 'tableOfContents',
          blockContent: '',
        },
      ]);
    } else {
      let blocks = [...sectionsContent];
      blocks.splice(activeBlock + 1, 0, {
        typeOfBlock: 'tableOfContents',
        blockContent: '',
      });
      setSectionsContent(blocks);
    }
  };

  const addPageBreak = () => {
    if (activeBlock === 0) {
      setSectionsContent([
        ...sectionsContent,
        {
          typeOfBlock: 'pageBreak',
          blockContent: '',
        },
      ]);
    } else {
      let blocks = [...sectionsContent];
      blocks.splice(activeBlock + 1, 0, {
        typeOfBlock: 'pageBreak',
        blockContent: '',
      });
      setSectionsContent(blocks);
    }
  };

  const addEquation = () => {
    if (activeBlock === 0) {
      setSectionsContent([
        ...sectionsContent,
        {
          typeOfBlock: 'equation',
          blockContent: 'New equation',
        },
      ]);
    } else {
      let blocks = [...sectionsContent];
      blocks.splice(activeBlock + 1, 0, {
        typeOfBlock: 'equation',
        blockContent: 'New equation',
      });
      setSectionsContent(blocks);
    }
  };

  const addTable = () => {
    if (activeBlock === 0) {
      setSectionsContent([
        ...sectionsContent,
        {
          typeOfBlock: 'table',
          blockContent: [
            ['<p>&nbsp;</p>', '<p>&nbsp;</p>'],
            ['<p>&nbsp;</p>', '<p>&nbsp;</p>'],
          ],
        },
      ]);
    } else {
      let blocks = [...sectionsContent];
      blocks.splice(activeBlock + 1, 0, {
        typeOfBlock: 'table',
        blockContent: [
          ['<p>&nbsp;</p>', '<p>&nbsp;</p>'],
          ['<p>&nbsp;</p>', '<p>&nbsp;</p>'],
        ],
      });
      setSectionsContent(blocks);
    }
  };

  const addFigure = () => {
    if (activeBlock === 0) {
      setSectionsContent([
        ...sectionsContent,
        {
          typeOfBlock: 'figure',
          blockContent: 'New figure',
        },
      ]);
    } else {
      let blocks = [...sectionsContent];
      blocks.splice(activeBlock + 1, 0, {
        typeOfBlock: 'figure',
        blockContent: 'New figure',
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
      const blocks = sectionsContent.filter((block) => {
        switch (block.typeOfBlock) {
          case 'titlePage':
            if (
              chceckIfBlockContentEmpty(block.blockContent.title as string) &&
              chceckIfBlockContentEmpty(block.blockContent.author as string) &&
              chceckIfBlockContentEmpty(block.blockContent.date as string)
            ) {
              return false;
            }
            return true;
          case 'tableOfContents':
            return true;
          case 'pageBreak':
            return true;
          case 'table':
            //TODO:
            return true;
          default:
            return !chceckIfBlockContentEmpty(block.blockContent);
        }
      });

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

  const addRowAbove = () => {
    console.log('Row Add');
    if (activeTableCell[0] !== 0 && activeTableCell[1] !== 0) {
      let blockContentCopy = cloneDeep(sectionsContent);
      let tableCopy = blockContentCopy[activeBlock].blockContent;
      let row = Array(tableCopy[0].length).fill('<p>&nbsp;</p>');
      tableCopy.splice(activeTableCell[0] - 1, 0, row);
      blockContentCopy[activeBlock].blockContent = tableCopy;
      setSectionsContent(blockContentCopy);
      console.log('Row Added');
    }
  };

  const addRowBelow = () => {
    if (activeTableCell[0] !== 0 && activeTableCell[1] !== 0) {
      let blockContentCopy = cloneDeep(sectionsContent);
      let tableCopy = blockContentCopy[activeBlock].blockContent;
      let row = Array(tableCopy[0].length).fill('<p>&nbsp;</p>');
      tableCopy.splice(activeTableCell[0], 0, row);
      blockContentCopy[activeBlock].blockContent = tableCopy;
      setSectionsContent(blockContentCopy);
    }
  };

  const deleteRow = () => {
    if (activeTableCell[0] !== 0 && activeTableCell[1] !== 0) {
      let blockContentCopy = cloneDeep(sectionsContent);
      let tableCopy = blockContentCopy[activeBlock].blockContent;
      //let row = Array(tableCopy[0].length).fill('<p>&nbsp;</p>');
      if (tableCopy.length === 1) {
        tableCopy = [['<p>&nbsp;</p>']];
      } else {
        if (tableCopy.length > activeTableCell[0] - 1) {
          tableCopy.splice(activeTableCell[0] - 1, 1);
        }
      }

      blockContentCopy[activeBlock].blockContent = tableCopy;
      setSectionsContent(blockContentCopy);
    }
  };

  const addColumnFromLeft = () => {
    if (activeTableCell[0] !== 0 && activeTableCell[1] !== 0) {
      let blockContentCopy = cloneDeep(sectionsContent);
      let tableCopy = blockContentCopy[activeBlock].blockContent;

      for (let i = 0; i < tableCopy.length; i++) {
        tableCopy[i].splice(activeTableCell[1] - 1, 0, '<p>&nbsp;</p>');
      }
      blockContentCopy[activeBlock].blockContent = tableCopy;
      setSectionsContent(blockContentCopy);
    }
  };

  const addColumnFromRight = () => {
    if (activeTableCell[0] !== 0 && activeTableCell[1] !== 0) {
      let blockContentCopy = cloneDeep(sectionsContent);
      let tableCopy = blockContentCopy[activeBlock].blockContent;
      for (let i = 0; i < tableCopy.length; i++) {
        tableCopy[i].splice(activeTableCell[1], 0, '<p>&nbsp;</p>');
      }
      blockContentCopy[activeBlock].blockContent = tableCopy;
      setSectionsContent(blockContentCopy);
    }
  };

  const deleteColumn = () => {
    if (activeTableCell[0] !== 0 && activeTableCell[1] !== 0) {
      let blockContentCopy = cloneDeep(sectionsContent);
      let tableCopy = blockContentCopy[activeBlock].blockContent;
      if (tableCopy[0].length === 1) {
        tableCopy = [['<p>&nbsp;</p>']];
      } else {
        for (let i = 0; i < tableCopy.length; i++) {
          tableCopy[i].splice(activeTableCell[1] - 1, 1);
        }
      }
      blockContentCopy[activeBlock].blockContent = tableCopy;
      setSectionsContent(blockContentCopy);
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
    addTitlePage,
    addTableOfContents,
    addPageBreak,
    addEquation,
    addFigure,
    addTable,
    addRowAbove,
    addRowBelow,
    deleteRow,
    addColumnFromLeft,
    addColumnFromRight,
    deleteColumn,
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
        );
      case 'tableOfContents':
        return (
          <TableOfContentsBlock
            idx={idx}
            activeBlockState={activeBlockState}
            blocksContentState={blocksContentState}
            activeTextInputState={activeTextInputState}
          />
        );
      case 'pageBreak':
        return (
          <PageBreakBlock
            idx={idx}
            activeBlockState={activeBlockState}
            blocksContentState={blocksContentState}
            activeTextInputState={activeTextInputState}
          />
        );
      case 'textfield':
        //console.log('textfield');
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
        //console.log('section');
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
        //console.log('section');
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
        //console.log('section');
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
      case 'equation':
        return (
          <EquationBlock
            idx={idx}
            activeBlockState={activeBlockState}
            blocksContentState={blocksContentState}
            activeTextInputState={activeTextInputState}
          />
        );
      case 'table':
        return (
          <TableBlock
            idx={idx}
            activeBlockState={activeBlockState}
            blocksContentState={blocksContentState}
            activeTextInputState={activeTextInputState}
            activeTableCellState={activeTableCellState}
            editor={editor}
          />
        );
      case 'figure':
        return (
          <FigureBlock
            idx={idx}
            activeBlockState={activeBlockState}
            blocksContentState={blocksContentState}
            activeTextInputState={activeTextInputState}
            editor={editor}
          />
        );
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
        saveElementChanges={() => {
          saveBasicTextInputChanges(
            activeBlock,
            activeTextInput,
            blocksContentState,
            editor?.getHTML() as string
          );
        }}
        pdfZoom={pdfZoom}
        workspaceZoom={workspaceZoom}
        activeSection={activeBlock}
        sectionsContent={sectionsContent}
        //activeTableCellState={activeTableCellState}
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
                <Paper radius="0px" pt="0px" pb="0px" pl="lg" pr="lg" w="40vw" h="50px" />
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
                <Paper radius="0px" pt="0px" pb="0px" pl="lg" pr="lg" w="40vw" h="50px" />
              </Stack>
              {/* </Paper> */}
              {/* </Grid.Col> */}
            </Box>
          </ScrollArea>
        </Center>
        <Box w="100vw" pos="relative">
          <LoadingOverlay
            visible={!pdfLoaded}
            zIndex={100}
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
