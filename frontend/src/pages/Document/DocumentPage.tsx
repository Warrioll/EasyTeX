//import { IconBold, IconItalic } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import LinkTiptap from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios, { AxiosResponse } from 'axios';
import { FaRegSave } from 'react-icons/fa';
import { TbFileSad, TbFileX, TbMoodSadSquint, TbRefresh } from 'react-icons/tb';
//import { Document, Page, pdfjs } from 'react-pdf';
import { Document, Page, pdfjs } from 'react-pdf';
import ErrorBanner from '@/components/ErrorInfos/ErrorBanner';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import Split from '@uiw/react-split';
import { cloneDeep } from 'lodash';
import { useParams } from 'react-router-dom';
//import Split from 'react-split';
import { Box, Center, Loader, LoadingOverlay, Paper, ScrollArea, Stack } from '@mantine/core';
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
import UnavailableDocument from './components/UnavailableDocument';
import {
  ActiveBlockProvider,
  ActiveTableCellProvider,
  ActiveTextfieldProvider,
  EditorProvider,
  //ReferencesListProvider,
  useActiveBlockContext,
  useActiveTableCellContext,
  useBlocksContentContext,
} from './DocumentContextProviders';
import { saveBasicTextInputChanges } from './hooksAndUtils/documentHooks';
//import pdfClasses from './components/pdfDocument.module.css';
import { chceckIfBlockContentEmpty } from './hooksAndUtils/documentUtils';
import classes from './documentPage.module.css';

import 'katex/dist/katex.min.css';

import { ErrorBoundary } from 'react-error-boundary';
import { checkIfLoggedIn } from '@/ApiHandlers/AuthHandler';
import MainLayout from '@/components/Layout/MainLayout/MainLayout';
import AddressAndDateBlock from './components/blocks/AddressAndDateBlock';
import ClosingBlock from './components/blocks/ClosingBlock';
import LatexExpressionBlock from './components/blocks/LatexExpressionBlock';
import OpeningBlock from './components/blocks/OpeningBlock';
import ReferencesBlock from './components/blocks/ReferencesBlock';
import SlideBreakBlock from './components/blocks/SlideBreakBlock';
import SubsubsubsectionBlock from './components/blocks/SubsubsubsectionBlock';
import UnavailableBlock from './components/blocks/UnavailableBlock';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export default function DocumentPage() {
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(true);

  const [blocksLoaded, setBlocksLoaded] = useState<boolean>(true);

  const [pdfLoaded, setPdfLoaded] = useState(true);
  const [workspaceLoaded, setWorkspaceLoaded] = useState<boolean>(false);
  const [pagesNumber, setPagesNumber] = useState<number>(0);
  const [pdf, setPdf] = useState<any>(null);

  const [pdfError, setPdfError] = useState<{
    title: string;
    icon?: React.FC;
    description?: string;
    buttonLabel?: string;
    buttonIcon?: React.FC;
    buttonFunction?: () => void;
  } | null>(null);
  const [blocksError, setBlocksError] = useState<{
    title: string;
    icon?: React.FC;
    description?: string;
    buttonLabel?: string;
    buttonIcon?: React.FC;
    buttonFunction?: () => void;
  } | null>(null);

  const pdfZoom = useState<string | null>('1');
  const workspaceZoom = useState<string | null>('1');
  const pdfZoomValue = useState<number>(1);
  const workspaceZoomValue = useState<number>(1);

  const { id } = useParams();

  const putDocumentContent = async (
    documentId: string,
    blocks: blockType
  ): Promise<AxiosResponse<any, any>> => {
    return await axios.put(`http://localhost:8100/document/documentContent/${documentId}`, blocks, {
      withCredentials: true,
    });
  };

  const saveDocumentContent = async () => {
    setPdfLoaded(false);
    setPdfError(null);
    try {
      const blocks = blocksContent.filter((block: blockType) => {
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
          case 'equation':
            //return chceckIfBlockContentEmpty(block.blockContent.label as string);
            return true;
          // case 'figure':
          //   return chceckIfBlockContentEmpty(block.blockContent.label as string);
          //   case 'equation':
          //   return chceckIfBlockContentEmpty(block.blockContent.label as string);
          case 'references':
            //FIXME - sprawdzanie czy nie są puste
            return true;
          case 'tableOfContents':
            return true;
          case 'pageBreak':
            return true;
          case 'figure':
            //TODO
            return true;
          case 'table':
            //FIXME - sprawdzanie czy nie są puste
            //return chceckIfBlockContentEmpty(block.blockContent.label as string);
            return true;
          default:
            return !chceckIfBlockContentEmpty(block.blockContent);
        }
      });

      const response = await putDocumentContent(id, blocks);
      //console.log('send changes', response.status);
      if (response.status === 200) {
        const reload = await setPdfFile();
        setIsNotSaved(false);
      }
    } catch (error) {
      console.log('Save error:', error, 'blocks: ', blocksContent);
      switch (error.status) {
        case 403:
          localStorage.setItem('unavailableDocument', 'true');
          break;
        case 404:
          localStorage.setItem('unavailableDocument', 'true');
          break;
        default:
          setPdfError({
            title: 'Something went wrong!',
            buttonLabel: 'Refresh',
            buttonIcon: () => <TbRefresh />,
            icon: () => (
              <Box mb="-1.5rem">
                <TbMoodSadSquint />
              </Box>
            ),
            buttonFunction: setPdfFile,
          });
        //setPdfError('Something went wrong!');
      }
    }
    setPdfLoaded(true);
  };

  const getPdfFile = async (pdfId: string): Promise<AxiosResponse<any, any>> => {
    return await axios.get(`http://localhost:8100/document/getPdf/${pdfId}`, {
      withCredentials: true,
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
  };

  const setPdfFile = async () => {
    try {
      setPdfError(null);
      setPdfLoaded(false);
      const response = await getPdfFile(id as string);
      //console.log(response);

      const pdfObjectURL = URL.createObjectURL(await response.data);
      setPdf(pdfObjectURL);

      const document = await pdfjs.getDocument(pdfObjectURL).promise;
      setPagesNumber(document.numPages);
      //console.log('pages:', pagesNumber);
      setPdfLoaded(true);
    } catch (error) {
      setPdf(null);
      switch (error.status) {
        case 422:
          //setPdfError(<ErrorBanner title="Document content contains errors!" description="" />);
          //TODO description czy jest pozwalana składnia latex? jesli nie to zmienic
          setPdfError({
            title: 'Document content contains errors!',
            description:
              //"If you're intentionally using LaTeX syntax, make sure it's correct and error-free. If not, try saving the document or contact support.",
              ['If you are using LaTeX expression block, make sure within it code is valid.',
               'If you are using image block make sure it references an image that exists in your assets library (if not, delete this image block).',
               'If none of these apply, try saving the document, refreshing the page, or contacting support.'].join(' '),
            icon: () => (
              <Box mb="-1.5rem">
                <TbFileSad />
              </Box>
            ),
            buttonLabel: 'Save document content',
            buttonFunction: async () => {
              await saveDocumentContent();
              //await setPdfFile();
            },
            buttonIcon: () => <FaRegSave />,
          });
          //setPdfError('Document content contains errors. Cannot generate pdf!');
          break;
        case 403:
          localStorage.setItem('unavailableDocument', 'true');
          break;
        case 404:
          localStorage.setItem('unavailableDocument', 'true');
          setPdfError({
            title: 'This document does not exists!',
            icon: () => (
              <Box mb="-1.5rem">
                <TbFileX />
              </Box>
            ),
          });
          break;
        case 410:
          setPdfError({
            title: 'This document does not exists!',
            description:
              'The .tex has not been found. Try saving this document or contact tech support',
            icon: () => (
              <Box mb="-1.5rem">
                <TbFileX />
              </Box>
            ),
          });
          break;
        default:
          setPdfError({
            title: 'Something went wrong!',
            buttonLabel: 'Refresh',
            buttonIcon: () => <TbRefresh />,
            icon: () => (
              <Box mb="-1.5rem">
                <TbMoodSadSquint />
              </Box>
            ),
            buttonFunction: setPdfFile,
          });
        //setPdfError('Something went wrong!');
      }
      setPdfLoaded(true);
    }
  };

  const getBlocksContent = async (documentId: string): Promise<AxiosResponse<any, any>> => {
    return await axios.get(`http://localhost:8100/document/getDocumentContent/${documentId}`, {
      withCredentials: true,
    });
  };

  const setBlocks = async () => {
    try {
      setWorkspaceLoaded(false);
      setBlocksError(null);
      const response = await getBlocksContent(id as string);
      console.log('co z tym', response.data);
      setBlocksContent(response.data);
      setWorkspaceLoaded(true);
    } catch (error) {
      //console.log('co z tym', error);
      switch (error.status) {
        case 400:
          // localStorage.setItem('unavailableDocument', 'true');
          // location.reload();
          setIsPageLoaded(false);
          break;
        case 403:
          // localStorage.setItem('unavailableDocument', 'true');
          // location.reload();
          setIsPageLoaded(false);
          break;
        case 404:
          // localStorage.setItem('unavailableDocument', 'true');
          // location.reload();
          setIsPageLoaded(false);
          setBlocksError({
            title: 'This document does not exists!',
            icon: () => (
              <Box mb="-1.5rem">
                <TbFileX />
              </Box>
            ),
          });
          break;
        case 410:
          setBlocksError({
            title: 'This document does not exists!',
            description:
              'The .tex has not been found. Try saving this document or contact tech support',
            icon: () => (
              <Box mb="-1.5rem">
                <TbFileX />
              </Box>
            ),
          });
          break;
        default:
          setBlocksError({
            title: 'Something went wrong!',
            buttonLabel: 'Refresh',
            buttonIcon: () => <TbRefresh />,
            icon: () => (
              <Box mb="-1.5rem">
                <TbMoodSadSquint />
              </Box>
            ),
            buttonFunction: setBlocks,
          });
      }
    }
    setWorkspaceLoaded(true);
  };

  const renderBlock = (item, idx) => {
    try {
      switch (item.typeOfBlock) {
        case 'titlePage':
          if (blocksContent[0].blockContent === 'letter') {
            return <AddressAndDateBlock idx={idx} />;
          }
          return <TitlePageBlock idx={idx} />;
        case 'tableOfContents':
          return <TableOfContentsBlock idx={idx} />;
        case 'pageBreak':
          if (blocksContent[0].blockContent === 'beamer') {
            return <SlideBreakBlock idx={idx} />;
          }
          return <PageBreakBlock idx={idx} />;
        case 'textfield':
          return <TextfieldBlock idx={idx} />;
        case 'section':
          return <SectionBlock idx={idx} />;
        case 'subsection':
          if (blocksContent[0].blockContent === 'letter') {
            return <OpeningBlock idx={idx} />;
          }
          return <SubsectionBlock idx={idx} />;
        case 'subsubsection':
          if (blocksContent[0].blockContent === 'letter') {
            return <ClosingBlock idx={idx} />;
          }
          return <SubsubsectionBlock idx={idx} />;
        case 'subsubsubsection':
          if (blocksContent[0].blockContent === 'book') {
            return <SubsubsubsectionBlock idx={idx} />;
          }
          return <UnavailableBlock idx={idx} />;
        case 'equation':
          return <EquationBlock idx={idx} />;
        case 'table':
          return <TableBlock idx={idx} />;
        case 'figure':
          return <FigureBlock idx={idx} />;
        case 'references':
          return <ReferencesBlock idx={idx} />;
        case 'latex':
          return <LatexExpressionBlock idx={idx} />;
        default:
          return null;
      }
    } catch (e) {
      console.error('renderBlock error: ', e);
      return <UnavailableBlock idx={idx} />;
    }
  };

  useEffect(() => {
    pdfZoomValue[1](1.4 * Number(pdfZoom[0]));
  }, [pdfZoom[0]]);

  useEffect(() => {
    workspaceZoomValue[1](Number(workspaceZoom[0]));
  }, [workspaceZoom[0]]);

  useEffect(() => {
    const checkLogged = async () => {
      const userId = await checkIfLoggedIn();
    };
    checkLogged();
    setPdfFile();
    setBlocks();
  }, []);

  return (
    <>
      {isPageLoaded ? (
        <ActiveBlockProvider>
          <ActiveTableCellProvider>
            <ActiveTextfieldProvider>
              {/* <ReferencesListProvider> */}
              <EditorProvider>
                <Header
                  //editFunctions={editFunctions}
                  saveDocumentContent={saveDocumentContent}
                  //editor={editor}
                  pdfZoom={pdfZoom}
                  workspaceZoom={workspaceZoom}
                  setPdfFile={setPdfFile}
                  pdfLoaded={pdfLoaded}
                />
                <Box maw="100vh">
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
                    <Center w="100vw" h="90vh" p="0px" pos="relative">
                      <LoadingOverlay
                        visible={!workspaceLoaded}
                        zIndex={100}
                        overlayProps={{
                          radius: 'sm',
                          blur: 1,
                          color: 'var(--mantine-color-gray-1)',
                        }}
                        loaderProps={{ color: 'cyan' }}
                      />
                      <ScrollArea h="100%" w="100%">
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
                          {blocksError && (
                            <Box h="80vh">
                              <ErrorBanner
                                title={blocksError.title}
                                description={blocksError.description}
                                Icon={blocksError.icon}
                                ButtonIcon={blocksError.buttonIcon}
                                buttonLabel={blocksError.buttonLabel}
                                buttonFunction={() => blocksError.buttonFunction}
                              />
                            </Box>
                          )}
                          {workspaceLoaded && !blocksError && (
                            <Stack h="100%" w="100%" align="center" justify="center" gap="0%">
                              <Paper
                                radius="0px"
                                pt="0px"
                                pb="0px"
                                pl="lg"
                                pr="lg"
                                w="40vw"
                                h="50px"
                              />

                              {blocksLoaded && blocksContent.length > 0 ? (
                                blocksContent.map((item, idx) => (
                                  <div key={idx}>
                                    <ErrorBoundary fallback={<UnavailableBlock idx={idx} />}>
                                      {renderBlock(item, idx)}
                                    </ErrorBoundary>
                                  </div>
                                ))
                              ) : (
                                <></>
                              )}
                              <Paper
                                radius="0px"
                                pt="0px"
                                pb="0px"
                                pl="lg"
                                pr="lg"
                                w="40vw"
                                h="50px"
                              />
                            </Stack>
                          )}
                        </Box>
                      </ScrollArea>
                    </Center>
                    <Box w="100%" pos="relative" style={{ overflow: 'hidden' }}>
                      <LoadingOverlay
                        visible={!pdfLoaded}
                        zIndex={100}
                        overlayProps={{
                          radius: 'sm',
                          blur: 1,
                          color: 'var(--mantine-color-gray-1)',
                        }}
                        loaderProps={{ color: 'cyan' }}
                      />
                     
                          {pdfError && (
                            <Box h="80vh" px='5rem'>
                              <ErrorBanner
                                title={pdfError.title}
                                description={pdfError.description}
                                Icon={pdfError.icon}
                                ButtonIcon={pdfError.buttonIcon}
                                buttonLabel={pdfError.buttonLabel}
                                buttonFunction={pdfError.buttonFunction}
                              />
                            </Box>
                          )}
                          {pdf && (
                             <ScrollArea
                        h="90vh"
                        //p="xs"
                        pb="10px"
                        pr="10px"
                        scrollbars="xy"
                        bg="transparent"
                        //style={{ overflow: 'visible' }} // miw='50vw'
                      >
                        <Center
                          p={0}
                          w={`calc(100% * ${pdfZoomValue[0] / 1.4})`}
                          miw="100%"
                          mih="85vh"
                        >
                            <Document
                              file={pdf}
                              loading={
                                <Center>
                                  <Loader size={5} />
                                </Center>
                              }
                              //onLoadSuccess={onDocumentLoadSuccess}
                              //options={options}
                            >
                              {Array.from(new Array(pagesNumber), (_el, index) => (
                                <Page
                                  key={`page_${index + 1}`}
                                  pageNumber={index + 1}
                                  className={classes.page}
                                  scale={pdfZoomValue[0]}
                                  // width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                                />
                              ))}
                            </Document>
                             </Center>

                        {/* </Grid.Col> */}
                        {/* </Grid> */}
                      </ScrollArea>
                          )}
                       
                    </Box>
                  </Split>
                </Box>
              </EditorProvider>
              {/* </ReferencesListProvider> */}
            </ActiveTextfieldProvider>
          </ActiveTableCellProvider>
        </ActiveBlockProvider>
      ) : (
        <MainLayout whiteBackground content={<UnavailableDocument />} />
      )}
    </>
  );
}
