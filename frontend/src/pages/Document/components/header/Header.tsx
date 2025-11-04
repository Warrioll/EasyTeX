import React, { ReactNode, useEffect, useState } from 'react';
import { Extension } from '@tiptap/core';
import { Editor } from '@tiptap/react';
import axios from 'axios';
import { BiFont, BiFontFamily } from 'react-icons/bi';
import { BsPersonWorkspace } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight, FaRegSave, FaSave } from 'react-icons/fa';
import { FaListOl, FaRegFileLines } from 'react-icons/fa6';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { GrDocumentText } from 'react-icons/gr';
import { HiDocumentDownload, HiOutlineDocumentDownload } from 'react-icons/hi';
import { HiMiniWindow, HiOutlineDocumentText } from 'react-icons/hi2';
import {
  IoDocumentsOutline,
  IoDocumentTextOutline,
  IoImagesOutline,
  IoLogInOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
import {
  LuDownload,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuImage,
  LuRefreshCcw,
  LuTable,
  //LuTableOfContents,
} from 'react-icons/lu';
import {
  MdFormatListNumberedRtl,
  MdFunctions,
  MdOutlineAdd,
  MdOutlineInsertPageBreak,
  MdOutlineLibraryAdd,
  MdOutlineLibraryBooks,
  MdOutlineLogin,
  MdOutlineTitle,
} from 'react-icons/md';
import { PiTextTBold } from 'react-icons/pi';
import { RiFileDownloadFill, RiFileDownloadLine, RiSplitCellsHorizontal } from 'react-icons/ri';
import { RxAvatar } from 'react-icons/rx';
import { TbAppWindow, TbBlocks, TbEye } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Combobox,
  Divider,
  Drawer,
  Flex,
  FloatingIndicator,
  Grid,
  Group,
  HoverCard,
  Input,
  InputBase,
  Loader,
  LoadingOverlay,
  rem,
  ScrollArea,
  SimpleGrid,
  Tabs,
  Text,
  ThemeIcon,
  Tooltip,
  UnstyledButton,
  useCombobox,
  useMantineTheme,
} from '@mantine/core';
//import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import { documentColor, documentMainLabels } from '@/components/other/documentLabelsAndColors';
import Logo from '@/svg/Logo';
import { blockType } from '@/Types';
import { dateFormatter } from '@/utils/formatters';
import {
  useActiveBlockContext,
  useActiveTextfieldContext,
  useBlocksContentContext,
  useEditorContext,
} from '../../DocumentContextProviders';
import { useAddBlock } from '../../hooksAndUtils/documentHooks';
import { useBlocksList } from '../blocksListAndPrototypes';
import DocumentToolsTab from './DocumentToolsTab';
import FontTab from './FontTab';
import { useInsertTools } from './InsertTools';
import { useTableTools } from './TableTools';
import TabTemplate from './TabTemplate';
import TextfieldToolsTab from './TextfieldToolsTab';
import { useTextTools } from './TextTools';
import WorkspaceToolsTab from './WorkspaceToolsTab';
import ZoomTools from './ZoomTools';
import classes from './Header.module.css';

type headerPropsType = {
  pdfLoaded: boolean;
  saveDocumentContent: () => void;
  setPdfFile: () => void;
  pdfZoom: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
  workspaceZoom: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
};

export default function Header({
  saveDocumentContent,
  pdfLoaded,
  pdfZoom,
  workspaceZoom,
  setPdfFile,
}: headerPropsType) {
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { activeTextfield, setActiveTextfield } = useActiveTextfieldContext();
  const { editor } = useEditorContext();
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('blocks');
  const [displayBarinMinSize, setDisplayBarinMinSize] = useState<'left' | 'right'>('left');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };
  const [documentName, setDocumentName] = useState<{
    name: string;
    documentClass: string;
    lastUpdate: string;
    creationDate: string;
  }>({
    name: '',
    documentClass: '',
    lastUpdate: '',
    creationDate: '',
  });

  const [preparingPdfToDownload, setPreparingPdfToDownload] = useState<boolean>(false);
  const [preparingTexToDownload, setPreparingTexToDownload] = useState<boolean>(false);

  const [reloadingPdf, setReloadingPdf] = useState<boolean>(false);
  const [savingPdf, setSavingPdf] = useState<boolean>(false);

  const { id } = useParams();

  const blocksList = useBlocksList();

  const blocksTools = () => (
    <TabTemplate
      buttons={blocksList}
      iconSize="var(--mantine-font-size-lg)"
      getToottipText={(label: string) => `Add ${label.toLocaleLowerCase()}`}
      belongingValidator={
        blocksContent[0] && blocksContent[0].blockContent ? blocksContent[0].blockContent.class : ''
      }
    />
  );

  const textTools = useTextTools();
  const textToolsTab = () => (
    <TabTemplate
      buttons={textTools}
      iconSize="var(--mantine-font-size-sm)"
      //dontRenderButtons={[6, 7, 8, 9]}
      belongingValidator={
        blocksContent[0] && blocksContent[0].blockContent ? blocksContent[0].blockContent.class : ''
      }
    />
  );

  const insertTools = useInsertTools();
  const insertToolsTab = () => (
    <TabTemplate
      dontRenderButtons={[1, 2, 3, 4, 5]}
      buttons={insertTools}
      iconSize="var(--mantine-font-size-lg)"
      belongingValidator={
        blocksContent[0] && blocksContent[0].blockContent ? blocksContent[0].blockContent.class : ''
      }
    />
  );

  const textFieldTools = () => <TextfieldToolsTab />;

  const tableTools = useTableTools();
  const tableToolsTab = () => (
    <TabTemplate
      buttons={tableTools}
      iconSize="var(--mantine-font-size-lg)"
      belongingValidator={
        blocksContent[0] && blocksContent[0].blockContent ? blocksContent[0].blockContent.class : ''
      }
    />
  );

  const viewTools = () => (
    <>
      {/* <ZoomTools zoomState={workspaceZoom} /> */}
      <WorkspaceToolsTab workspaceZoom={workspaceZoom} />
    </>
  );

  const docTools = () => <DocumentToolsTab zoomState={workspaceZoom} />;

  const chooseModifyTabName = (): string => {
    if (activeBlock !== 0) {
      switch (blocksContent[activeBlock].typeOfBlock) {
        case 'textfield':
          return 'Textfield ';
        case 'table':
          return 'Table ';
        default:
          return '';
      }
    }
    return '';
  };

  const chooseModifyTabIcon = (): React.FC => {
    if (activeBlock !== 0) {
      switch (blocksContent[activeBlock].typeOfBlock) {
        case 'textfield':
          return () => <BiFont />;
        case 'table':
          return () => <LuTable />;
        default:
          return () => <></>;
      }
    }
    return () => <></>;
  };

  const chooseModifyTabTools = (): React.FC => {
    if (activeBlock !== 0) {
      switch (blocksContent[activeBlock].typeOfBlock) {
        case 'textfield':
          return textFieldTools;
        case 'table':
          return tableToolsTab;
        default:
          return () => '';
      }
    }
    return () => '';
  };

  const basicTabs = [
    {
      value: 'view',
      label: 'Workspace',
      tools: () => viewTools,
      Icon: () => <BsPersonWorkspace />,
    },
    {
      value: 'document',
      label: 'Document',
      tools: () => docTools,
      Icon: () => <FaRegFileLines />,
    },

    {
      value: 'blocks',
      label: 'Blocks',
      tools: () => blocksTools,
      Icon: () => <TbBlocks />,
    },
  ];
  const basicTextfieldTabs = [
    {
      value: 'font',
      label: 'Text',
      tools: () => textToolsTab,
      Icon: () => <BiFontFamily />,
    },
    {
      value: 'insert',
      label: 'Insert',
      tools: () => insertToolsTab,
      Icon: () => <MdOutlineLibraryAdd />,
    },
  ];

  const [tabs, setTabs] = useState(basicTabs);

  const tableTab = {
    value: 'modify',
    label: 'Table',
    tools: () => tableToolsTab,
    Icon: () => <LuTable />,
  };

  const textfieldTab = {
    value: 'modify',
    label: 'Textfield',
    tools: () => textFieldTools,
    Icon: () => <BiFont />,
  };

  const isDisabledtab = (tab: string): boolean => {
    if (
      tab === 'modify' &&
      (activeBlock === 0 ||
        blocksContent[activeBlock].typeOfBlock === 'section' ||
        blocksContent[activeBlock].typeOfBlock === 'subsection' ||
        blocksContent[activeBlock].typeOfBlock === 'subsubsection')
    ) {
      //setValue('insert');
      return true;
    }
    return false;
  };

  const downloadTex = async () => {
    const response = await axios.get(`http://localhost:8100/document/getTex/${id}`, {
      withCredentials: true,
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = documentName.name.concat('.tex');
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    setPreparingTexToDownload(false);
  };

  const downloadPdf = async () => {
    const response = await axios.get(`http://localhost:8100/document/getPdf/${id}`, {
      withCredentials: true,
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = documentName.name.concat('.pdf');
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    setPreparingPdfToDownload(false);
  };

  //let optionsLoaded: boolean=false

  useEffect(() => {
    if (blocksContent[activeBlock]) {
      switch (blocksContent[activeBlock].typeOfBlock) {
        case 'textfield':
          setTabs([...basicTabs, ...basicTextfieldTabs, textfieldTab]);
          break;
        case 'table':
          setTabs([...basicTabs, ...basicTextfieldTabs, tableTab]);
          break;
        default:
          if (value === 'modify') {
            setValue('blocks');
          }
          if (activeTextfield === '') {
            setValue('blocks');
            setTabs(basicTabs);
          } else {
            setTabs([...basicTabs, ...basicTextfieldTabs]);
          }
      }
    } else {
      setValue('blocks');
    }
    //console.log('traning to cvhamge');
  }, [
    activeBlock,
    workspaceZoom[0],
    blocksContent,
    editor.state.selection.head,
    activeTextfield, //, blocksContent
  ]);

  // const getTabs = (): any[] => {
  //   if (blocksContent[activeBlock]) {
  //     switch (blocksContent[activeBlock].typeOfBlock) {
  //       case 'textfield':
  //         return [...basicTabs, textfieldTab];

  //       case 'table':
  //         return [...basicTabs, tableTab];

  //       default:
  //         if (value === 'modify') {
  //           //setValue('font');
  //         }
  //         return basicTabs;
  //     }
  //   } else {
  //     //setValue('font');
  //     return basicTabs;
  //   }
  // };

  useEffect(() => {
    const getTitle = async () => {
      try {
        const response = await axios.get(`http://localhost:8100/document/${id}`, {
          withCredentials: true,
        });
        //console.log(response.data);
        setDocumentName(response.data);
      } catch (error) {
        console.log('doc page get doc Name error:', error);
      }
    };

    if (!isNotSaved) {
      getTitle();
    }
  }, [isNotSaved]);

  useEffect(() => {
    if (pdfLoaded) {
      setSavingPdf(false);
      setReloadingPdf(false);
    }
  }, [pdfLoaded]);

  const DocumentName = () => {
    return (
      <HoverCard
        //color="cyan"
        position="bottom"
        offset={5}
        withArrow
        arrowOffset={50}
        arrowSize={7}
        arrowRadius={2}
        shadow="sm"
        styles={{
          arrow: { border: `1px solid ${documentColor(documentName.documentClass)}` },
        }}
      >
        <HoverCard.Target>
          <Button
            m="0px"
            variant="transparent"
            rightSection={
              isNotSaved ? (
                <Flex c="var(--mantine-color-yellow-8)">
                  <Text mt="0.4rem">
                    <FaSave />
                  </Text>

                  <Text fw="700" mt="0.15rem" ml="0.1rem" fz="lg" w="0.4rem">
                    !
                  </Text>
                </Flex>
              ) : null
            }
          >
            <Text
              maw="10rem"
              className={classes.documentName}
              c={documentColor(documentName.documentClass)}
            >
              <b> {documentName.name}</b>
            </Text>
          </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown bd={`1px solid ${documentColor(documentName.documentClass)}`}>
          <SimpleGrid maw="20vw" cols={2} verticalSpacing="0.3rem">
            <Text ml="xs" fw="700">
              Document type:
            </Text>
            <Text ml="xs" c={documentColor(documentName.documentClass)}>
              {documentMainLabels(documentName.documentClass)}
            </Text>

            <Text ml="xs" fw="700">
              Document name:
            </Text>
            <Text ml="xs" c="var(--mantine-color-gray-7)" mb="sm">
              {documentName.name}
            </Text>

            <Text ml="xs" fw="700">
              Last update:
            </Text>
            <Text ml="xs" c="var(--mantine-color-gray-7)">
              {documentName.lastUpdate ? dateFormatter(documentName.lastUpdate.toString()) : ''}
            </Text>

            <Text fw="700" ml="xs">
              Creation date:
            </Text>
            <Text ml="xs" c="var(--mantine-color-gray-7)">
              {documentName.creationDate ? dateFormatter(documentName.creationDate.toString()) : ''}
            </Text>
          </SimpleGrid>
          {isNotSaved ? (
            <Flex justify="center" c="var(--mantine-color-yellow-8)" mt="lg">
              <Text mt="0.15rem" mr="xs">
                <FaSave />
              </Text>

              <Text fw="500">You have unsaved changes!</Text>
            </Flex>
          ) : (
            <Flex justify="center" c="red" mt="lg">
              <Text c="var(--mantine-color-gray-6)" fw="500">
                No unsaved changes
              </Text>
            </Flex>
          )}
        </HoverCard.Dropdown>
      </HoverCard>
    );
  };

  const PdfTools = () => {
    return (
      <>
        {' '}
        <Box>
          <Tooltip
            label={
              savingPdf ? 'Saving document...' : 'Save document'
              // <>
              //   <Text fz="sm" ta="center">
              //     Save document
              //   </Text>
              //   <Text fz="sm" ta="center">
              //     {!pdfLoaded ? '(Loading...)' : ''}
              //   </Text>
              // </>
            }
            color="cyan"
            position="bottom"
            offset={5}
            withArrow
            arrowOffset={50}
            arrowSize={7}
            arrowRadius={2}
          >
            <Button
              w={{ base: '3rem', sm: '4.6rem' }}
              variant="format"
              disabled={!pdfLoaded}
              leftSection={!savingPdf && <FaRegSave />}
              onClick={() => {
                setSavingPdf(true);
                saveDocumentContent();
              }}
            >
              {savingPdf ? (
                <Loader size={16} />
              ) : (
                <>
                  <span className="mantine-visible-from-sm">Save</span>
                </>
              )}
            </Button>
          </Tooltip>
          <Tooltip
            label={
              reloadingPdf ? 'Reloading PDF without saving...' : ' Reload PDF without saving'
              // <>
              //   <Text fz="sm" ta="center">
              //     Reload PDF without saving
              //   </Text>
              //   <Text fz="sm" ta="center">
              //     {!pdfLoaded ? '(Loading...)' : ''}
              //   </Text>
              // </>
            }
            color="cyan"
            position="bottom"
            offset={5}
            withArrow
            arrowOffset={50}
            arrowSize={7}
            arrowRadius={2}
          >
            <Button
              w={{ base: '3rem', sm: '7.3rem' }}
              variant="format"
              disabled={!pdfLoaded}
              leftSection={!reloadingPdf && <LuRefreshCcw />}
              onClick={() => {
                setReloadingPdf(true);
                setPdfFile();
              }}
            >
              {reloadingPdf ? (
                <Loader size={16} />
              ) : (
                <span className="mantine-visible-from-sm">Reload PDF</span>
              )}
            </Button>
          </Tooltip>
        </Box>
        <ZoomTools tooltip="PDF zoom" zoomState={pdfZoom} />
        <Group justify="end" gap="0px">
          {/* <Button variant="transparent">
              <RiSplitCellsHorizontal />
            </Button> */}
          <Tooltip
            label={preparingTexToDownload ? 'Downloading .tex file...' : 'Download .tex file'}
            color="cyan"
            position="bottom"
            offset={5}
            withArrow
            arrowOffset={50}
            arrowSize={7}
            arrowRadius={2}
          >
            <Button
              variant="format"
              w="4.2rem"
              disabled={preparingTexToDownload}
              leftSection={!preparingTexToDownload && <LuDownload />}
              onClick={() => {
                setPreparingTexToDownload(true);
                downloadTex();
              }}
            >
              {preparingTexToDownload ? <Loader size={16} /> : '.tex'}
            </Button>
          </Tooltip>
          <Tooltip
            label={preparingPdfToDownload ? 'Downloading .pdf file...' : 'Download .pdf file'}
            color="cyan"
            position="bottom"
            offset={5}
            withArrow
            arrowOffset={50}
            arrowSize={7}
            arrowRadius={2}
          >
            <Button
              w="4.2rem"
              variant="format"
              leftSection={!preparingPdfToDownload && <LuDownload />}
              onClick={() => {
                setPreparingPdfToDownload(true);
                downloadPdf();
              }}
              disabled={preparingPdfToDownload}
            >
              {preparingPdfToDownload ? <Loader size={16} /> : '.pdf'}
            </Button>
          </Tooltip>
        </Group>
      </>
    );
  };

  return (
    <Box h="5.5rem" miw="48rem" display="block">
      {/* <header> */}
      <Tabs
        radius="sm"
        variant="none"
        value={value}
        onChange={setValue}
        miw="48rem"
        style={{ flexShrink: '0' }}
      >
        <Flex
          justify="space-between"
          h="2.5rem"
          pl="lg"
          pr="lg"
          ml="xs"
          mr="xs"
          pb="0px"
          mb="0px"
          miw="48rem"
          style={{ flexShrink: '0' }}
        >
          <Flex h="100%" w="40vw" miw="24rem" mb="0px" style={{ flexShrink: '0' }}>
            <Button
              p="0px"
              mr="md"
              variant="transparent"
              onClick={() => {
                window.location.href = '/dashboard';
                //navigate('/dashboard');
              }}
              fz="md"
              pt="7px"
            >
              <Logo width="1.4rem" />
              {/* <Text mt="0.2rem" c="var(--mantine-color-yellow-8)" fw="700" ml="sm">
                Easy
              </Text>
              <Text mt="0.2rem" fw="700" c="var(--mantine-color-cyan-9)">
                TeX
              </Text> */}
            </Button>
            <Tabs.List ref={setRootRef} className={classes.list} mb="0px" mt="5px" w="max-content">
              {tabs.map((tab) => (
                <Tabs.Tab
                  //mr="xs"
                  value={tab.value}
                  ref={setControlRef(tab.value)}
                  className={classes.tab}
                  //disabled={isDisabledtab(tab.value)}
                  leftSection={<tab.Icon />}
                  styles={{ tabSection: { marginRight: '6px' } }}
                >
                  <Box visibleFrom="xxxl">{tab.label}</Box>
                </Tabs.Tab>
              ))}
              <FloatingIndicator
                target={value ? controlsRefs[value] : null}
                parent={rootRef}
                className={classes.indicator}
              />
            </Tabs.List>
          </Flex>
          {/* <Group h="100%">
            
          </Group> */}

          <Center visibleFrom="md" mb="0px" p="0px" w="10vw">
            <DocumentName />
          </Center>

          <Flex miw="24rem" mb="0px" w="40vw" style={{ flexShrink: '0' }} >
            <Group
              justify="end"
              h="100%"
              w="100%"
              ml="xl"
              gap={0}
              
              mb="0px"
              p="0px"
            >
              <Box hiddenFrom="md">
                <DocumentName />
              </Box>
              <Button
                pt="0px"
                pb="0px"
                variant="transparent"
                c="var(--mantine-color-gray-7)"
                leftSection={<IoDocumentsOutline />}
                className={classes.control}
                onClick={() => {
                  window.location.href = '/dashboard';
                }}
               
              >
                <span className="mantine-visible-from-md">Documents</span>
              </Button>
              <Button
                c="var(--mantine-color-gray-7)"
                pt="0px"
                pb="0px"
                variant="transparent"
                leftSection={<IoImagesOutline />}
                className={classes.control}
                onClick={() => {
                  window.location.href = '/assetsLibrary';
                }}
              >
                <span className="mantine-visible-from-md">Assets</span>
              </Button>
              <Button
                c="var(--mantine-color-gray-7)"
                pt="0px"
                pb="0px"
                variant="transparent"
                leftSection={<RxAvatar />}
                className={classes.control}
                onClick={() => {
                  window.location.href = '/profile';
                }}
              >
                <span className="mantine-visible-from-md">Account</span>
              </Button>
            </Group>
          </Flex>
        </Flex>

        <SimpleGrid cols={2} spacing="0px" visibleFrom="xl" h="3rem" miw='48rem' mih="2.8rem" mah="5vh">
          <Center
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
            pl="lg"
            pr="lg"
            ml="lg"
            mr="xs"
            miw='max-content'
            className={classes.band}
          >
            {tabs.map((tab) => (
              <Tabs.Panel value={tab.value}>{tab.tools()()}</Tabs.Panel>
            ))}
          </Center>

          {/* <ScrollArea
            scrollbars="x"
            h="100%"
            offsetScrollbars="x"
            //type="never"

            //justify="center"
          > */}
          <Flex
            //w="100%"
            //h="2.5rem"
            justify="center"
            align="center"
            pl="lg"
            pr="lg"
            gap="xl"
            miw="max-content"
            ml="xs"
            mr="lg"
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
            //gap="xl"
            className={classes.band}
          >
            <PdfTools />
          </Flex>
          {/* </ScrollArea> */}
        </SimpleGrid>

        <SimpleGrid cols={1} spacing="0px" hiddenFrom="xl" h="3rem" mih="2.8rem"  miw='max-content' mah="5vh">
          <Flex
            w="100vw"
            justify="center"
            style={{ display: displayBarinMinSize === 'left' ? 'flex' : 'none' }}
            miw='48rem'
          >
            <Center
              w="100%"
              style={{ borderRadius: 'var(--mantine-radius-md)' }}
              pl="lg"
              pr="lg"
              ml="lg"
              mr="xs"
              className={classes.band}
              miw='max-content'
            >
              {tabs.map((tab) => (
                <Tabs.Panel value={tab.value}>{tab.tools()()}</Tabs.Panel>
              ))}
            </Center>
            <Center
              className={classes.band}
              style={{
                borderTopLeftRadius: 'var(--mantine-radius-md)',
                borderBottomLeftRadius: 'var(--mantine-radius-md)',
              }}
              miw='max-content'
            >
              <Button
                variant="format"
                w="2rem"
                onClick={() => {
                  setDisplayBarinMinSize('right');
                }}
              >
                <FaChevronLeft />
              </Button>
            </Center>
          </Flex>

          <Flex
            w="100vw"
            justify="center"
            style={{ display: displayBarinMinSize === 'left' ? 'none' : 'flex' }}
          
             miw='48rem'
          >
            <Center
              className={classes.band}
              style={{
                borderTopRightRadius: 'var(--mantine-radius-md)',
                borderBottomRightRadius: 'var(--mantine-radius-md)',
              }}
              miw='max-content'
            >
              <Button
                variant="format"
                w="2rem"
                onClick={() => {
                  setDisplayBarinMinSize('left');
                }}
              >
                <FaChevronRight />
              </Button>
            </Center>
            <Center
              w="100%"
              style={{ borderRadius: 'var(--mantine-radius-md)' }}
              pl="lg"
              pr="lg"
              mr="lg"
              ml="xs"
              className={classes.band}
              miw='max-content'
            >
              <PdfTools />
            </Center>
          </Flex>
        </SimpleGrid>

        {/* <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" /> */}
      </Tabs>

      {/* //do Burgera
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>
            {
              //links
            }
          </Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer> */}
    </Box>
  );
}

//export default Header;
