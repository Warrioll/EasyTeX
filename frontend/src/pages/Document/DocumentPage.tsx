import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FaRegSave } from 'react-icons/fa';
import { TbFileSad, TbFileX, TbMoodSadSquint, TbRefresh } from 'react-icons/tb';
import { Document, Page, pdfjs } from 'react-pdf';
import ErrorBanner from '@/components/ErrorInfos/ErrorBanner';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import Split from '@uiw/react-split';
import { useParams } from 'react-router-dom';
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
  useBlocksContentContext,
  useZoomsContext,
} from './DocumentContextProviders';
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

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export default function DocumentPage() {
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();
  const { pdfZoom, setPdfZoom, workspaceZoom, setWorkspaceZoom } = useZoomsContext();
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
      const response = await putDocumentContent(id as string, blocksContent);
      if (response.status === 200) {
        const reload = await setPdfFile();
        setIsNotSaved(false);
      }
    } catch (error) {
      console.error('Save docuemnt error:', error, 'blocks: ', blocksContent);
      if (axios.isAxiosError(error)) {
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
        }
      } else {
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

      const pdfObjectURL = URL.createObjectURL(await response.data);
      setPdf(pdfObjectURL);

      const document = await pdfjs.getDocument(pdfObjectURL).promise;
      setPagesNumber(document.numPages);

      setPdfLoaded(true);
    } catch (error) {
      setPdf(null);
      console.error('Load pdf error:', error, 'blocks: ', blocksContent);
      if (axios.isAxiosError(error)) {
        switch (error.status) {
          case 422:
            setPdfError({
              title: 'Document content contains errors!',
              description: [
                'If you are using a LaTeX expression block or the LaTeX formula tab in the equation editor, make sure that the code contained therein is valid.',
                'If you are using image block make sure it references an image that exists in your assets library (if not, choose other image from assets library, upload new one, or delete this image block).',
                'If you are using special characters other than those included in the available language alphabets and the list of special characters, try removing them.',
                'If none of these apply, try saving the document, refreshing the page, or contacting support.',
              ].join(' '),
              icon: () => (
                <Box mb="-1.5rem">
                  <TbFileSad />
                </Box>
              ),
              buttonLabel: 'Save document content',
              buttonFunction: async () => {
                await saveDocumentContent();
              },
              buttonIcon: () => <FaRegSave />,
            });

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
        }
      } else {
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
      setBlocksContent(response.data);
      setWorkspaceLoaded(true);
    } catch (error) {
      console.error('Load blocks error:', error, 'blocks: ', blocksContent);
      if (axios.isAxiosError(error)) {
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
      } else {
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

  const renderBlock = (item: blockType, idx: number) => {
    try {
      switch (item.typeOfBlock) {
        case 'titlePage':
          if (blocksContent[0].blockContent.class === 'letter') {
            return <AddressAndDateBlock idx={idx} />;
          }
          return <TitlePageBlock idx={idx} />;
        case 'tableOfContents':
          return <TableOfContentsBlock idx={idx} />;
        case 'pageBreak':
          if (blocksContent[0].blockContent.class === 'beamer') {
            return <SlideBreakBlock idx={idx} />;
          }
          return <PageBreakBlock idx={idx} />;
        case 'textfield':
          return <TextfieldBlock idx={idx} />;
        case 'section':
          return <SectionBlock idx={idx} />;
        case 'subsection':
          if (blocksContent[0].blockContent.class === 'letter') {
            return <OpeningBlock idx={idx} />;
          }
          return <SubsectionBlock idx={idx} />;
        case 'subsubsection':
          if (blocksContent[0].blockContent.class === 'letter') {
            return <ClosingBlock idx={idx} />;
          }
          return <SubsubsectionBlock idx={idx} />;
        case 'subsubsubsection':
          if (blocksContent[0].blockContent.class === 'book') {
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
      console.error('render block error: ', e);
      return <UnavailableBlock idx={idx} />;
    }
  };

  useEffect(() => {
    pdfZoomValue[1](Number(pdfZoom));
  }, [pdfZoom]);

  useEffect(() => {
    workspaceZoomValue[1](Number(workspaceZoom));
  }, [workspaceZoom]);

  useEffect(() => {
    const checkLogged = async () => {
      await checkIfLoggedIn();
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
              <EditorProvider>
                <Box
                  maw="100vw"
                  mah="100vh"
                  miw="48rem"
                  style={{ overflow: 'visible', overflowX: 'hidden', flexShrink: '0' }}
                  bg="var(--mantine-color-gray-0)"
                >
                  <Header
                    saveDocumentContent={saveDocumentContent}
                    setPdfFile={setPdfFile}
                    pdfLoaded={pdfLoaded}
                  />
                  <Box
                    h={{ base: 'calc(100vh - 5.3rem - 15px)', sm: 'calc(100vh - 5.3rem)' }}
                    m="0px"
                  >
                    <Split
                      lineBar
                      style={{
                        width: '100vw',
                        minWidth: '48rem',
                        border: 'none',
                      }}
                      renderBar={({ onMouseDown, ...props }) => {
                        return (
                          <div {...props} style={{ boxShadow: 'none' }}>
                            <div onMouseDown={onMouseDown} />
                          </div>
                        );
                      }}
                    >
                      <Center
                        w="100vw"
                        h={{ base: 'calc(100vh - 5.3rem - 15px)', sm: 'calc(100vh - 5.3rem)' }}
                        p="0px"
                        pos="relative"
                      >
                        <LoadingOverlay
                          visible={!workspaceLoaded}
                          zIndex={100}
                          overlayProps={{
                            radius: 'sm',
                            blur: 1,
                            color: 'var(--mantine-color-gray-0)',
                          }}
                          loaderProps={{ color: 'cyan' }}
                          mr="2px"
                        />
                        <ScrollArea
                          h="100%"
                          w="100%"
                          styles={{
                            viewport: {
                              backgroundColor: 'var(--mantine-color-gray-2)',
                              borderRadius: 'var(--mantine-radius-md)',
                              border: '1px solid var(--mantine-color-gray-3)',
                            },
                          }}
                          pt="5px"
                          p="12px"
                        >
                          <Box
                            h="100%"
                            w="100%"
                            m="xl"
                            style={{
                              transform: `scale(${workspaceZoomValue[0]})`,
                              transformOrigin: 'top left',
                            }}
                            p="0px"
                            miw="max-content"
                          >
                            {blocksError && (
                              <Box h="80vh">
                                <ErrorBanner
                                  title={blocksError.title}
                                  description={blocksError.description}
                                  Icon={blocksError.icon}
                                  ButtonIcon={blocksError.buttonIcon}
                                  buttonLabel={blocksError.buttonLabel}
                                  buttonFunction={blocksError.buttonFunction}
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
                                  miw="40rem"
                                  h="50px"
                                />

                                {blocksLoaded && blocksContent.length > 0 ? (
                                  blocksContent.map((item: blockType, idx: number) => (
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
                                  miw="40rem"
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
                            color: 'var(--mantine-color-gray-0)',
                          }}
                          loaderProps={{ color: 'cyan' }}
                          ml="2px"
                        />

                        {pdfError && (
                          <Box h="80vh" px="5rem">
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
                            styles={{
                              viewport: {
                                backgroundColor: 'var(--mantine-color-gray-2)',
                                borderRadius: 'var(--mantine-radius-md)',
                                border: '1px solid var(--mantine-color-gray-3)',
                              },
                            }}
                            pt="5px"
                            p="12px"
                            h={{ base: 'calc(100vh - 5.3rem - 15px)', sm: 'calc(100vh - 5.3rem)' }}
                            scrollbars="xy"
                            w="100%"
                            miw="100%"
                            offsetScrollbars
                          >
                            <Center p="lg" mt="4px" miw="max-content" mih="85vh">
                              <Document
                                file={pdf}
                                loading={
                                  <Center m="0px" p="0px">
                                    <Loader size={5} />
                                  </Center>
                                }
                              >
                                {Array.from(new Array(pagesNumber), (_el, index) => (
                                  <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    className={classes.page}
                                    scale={pdfZoomValue[0]}
                                    loading={
                                      <Center bg="var(--mantine-color-gray-1)">
                                        <Loader size={10} />
                                      </Center>
                                    }
                                  />
                                ))}
                              </Document>
                            </Center>
                          </ScrollArea>
                        )}
                      </Box>
                    </Split>
                  </Box>
                </Box>
              </EditorProvider>
            </ActiveTextfieldProvider>
          </ActiveTableCellProvider>
        </ActiveBlockProvider>
      ) : (
        <MainLayout whiteBackground content={<UnavailableDocument />} />
      )}
    </>
  );
}
