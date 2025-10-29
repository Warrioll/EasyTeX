import React, { ReactNode, useEffect, useState } from 'react';
import { Extension } from '@tiptap/core';
import { Editor } from '@tiptap/react';
import axios from 'axios';
import { BiFont, BiFontFamily } from 'react-icons/bi';
import {
  FaBold,
  FaCode,
  FaItalic,
  FaList,
  FaRegSave,
  FaSave,
  FaStrikethrough,
  FaSubscript,
  FaSuperscript,
  FaUnderline,
} from 'react-icons/fa';
import { FaListOl } from 'react-icons/fa6';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { HiDocumentDownload, HiOutlineDocumentDownload } from 'react-icons/hi';
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
import { TbBlocks, TbEye } from 'react-icons/tb';
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
import ZoomTools from './ZoomTools';
import classes from './Header.module.css';

type headerProps = {
  pdfLoaded: boolean;
  saveDocumentContent: () => void;
  setPdfFile: () => void;
  pdfZoom: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
  workspaceZoom: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
};

const Header: React.FC<headerProps> = ({
  saveDocumentContent,
  pdfLoaded,
  pdfZoom,
  workspaceZoom,
  setPdfFile,
}) => {
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { activeTextfield, setActiveTextfield } = useActiveTextfieldContext();
  const { editor } = useEditorContext();
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('blocks');
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
      <ZoomTools zoomState={workspaceZoom} />
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
      value: 'document',
      label: 'Document',
      tools: () => docTools,
      Icon: () => <IoDocumentTextOutline />,
    },
    {
      value: 'view',
      label: 'View',
      tools: () => viewTools,
      Icon: () => <TbEye />,
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

  // const tabsV = [
  //   {
  //     value: 'font',
  //     label: 'Text',
  //     tools: textToolsTab,
  //     Icon: () => <BiFontFamily />,
  //   },
  //   {
  //     value: 'insert',
  //     label: 'Blocks',
  //     tools: insertTools,
  //     Icon: () => <TbBlocks />,
  //   },

  //   {
  //     value: 'view',
  //     label: 'View',
  //     tools: viewTools,
  //     Icon: () => <TbEye />,
  //   },

  //   {
  //     value: 'modify',
  //     label: `${chooseModifyTabName()}`,
  //     tools: chooseModifyTabTools(),
  //     Icon: chooseModifyTabIcon(),
  //   },
  // ];

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
  }, [activeBlock, workspaceZoom[0], editor.state.selection.head, activeTextfield //, blocksContent
]);

  const getTabs = (): any[] => {
    if (blocksContent[activeBlock]) {
      switch (blocksContent[activeBlock].typeOfBlock) {
        case 'textfield':
          return [...basicTabs, textfieldTab];

        case 'table':
          return [...basicTabs, tableTab];

        default:
          if (value === 'modify') {
            //setValue('font');
          }
          return basicTabs;
      }
    } else {
      //setValue('font');
      return basicTabs;
    }
  };

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

  return (
    <Box h="10vh">
      {/* <header> */}
      <Tabs radius="sm" variant="none" value={value} onChange={setValue}>
        <Flex justify="space-between" h="5vh" pl="lg" pr="lg" ml="xs" mr="xs" pb="0px" mb="0px">
          <Group h="100%" w="40vw" mb="0px">
            <Button
              p="0px"
              m="0px"
              variant="transparent"
              onClick={() => {
                window.location.href = '/dashboard';
                //navigate('/dashboard');
              }}
              fz="md"
            >
              <Logo width="1.4rem" />
              {/* <Text mt="0.2rem" c="var(--mantine-color-yellow-8)" fw="700" ml="sm">
                Easy
              </Text>
              <Text mt="0.2rem" fw="700" c="var(--mantine-color-cyan-9)">
                TeX
              </Text> */}
            </Button>
            <Tabs.List ref={setRootRef} className={classes.list} mb="0px" mt="5px">
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
                  <Box visibleFrom="xxl">{tab.label}</Box>
                </Tabs.Tab>
              ))}
              <FloatingIndicator
                target={value ? controlsRefs[value] : null}
                parent={rootRef}
                className={classes.indicator}
              />
            </Tabs.List>
          </Group>
          {/* <Group h="100%">
            
          </Group> */}

          <Center mb="0px" p="0px" w="10vw">
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
                    {documentName.lastUpdate
                      ? dateFormatter(documentName.lastUpdate.toString())
                      : ''}
                  </Text>

                  <Text fw="700" ml="xs">
                    Creation date:
                  </Text>
                  <Text ml="xs" c="var(--mantine-color-gray-7)">
                    {documentName.creationDate
                      ? dateFormatter(documentName.creationDate.toString())
                      : ''}
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
          </Center>

          <Group mb="0px" w="40vw">
            <Group
              justify="end"
              h="100%"
              w="100%"
              ml="xl"
              gap={0}
              visibleFrom="sm"
              mb="0px"
              p="0px"
            >
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
          </Group>
        </Flex>

        <SimpleGrid cols={2} spacing="0px" h="5vh">
          <Center
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
            pl="lg"
            pr="lg"
            ml="lg"
            mr="xs"
            className={classes.band}
          >
            {tabs.map((tab) => (
              <Tabs.Panel value={tab.value}>{tab.tools()()}</Tabs.Panel>
            ))}
          </Center>

          <Group
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
            pl="lg"
            pr="lg"
            ml="xs"
            mr="lg"
            gap="xl"
            className={classes.band}
            justify="center"
          >
            <Box w="12vw">
              <Tooltip
                label={
                  <>
                    <Text fz="sm" ta="center">
                      Save document
                    </Text>
                    <Text fz="sm" ta="center">
                      {!pdfLoaded ? '(Loading...)' : ''}
                    </Text>
                  </>
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
                  variant="format"
                  disabled={!pdfLoaded}
                  leftSection={<FaRegSave />}
                  onClick={saveDocumentContent}
                >
                  Save
                </Button>
              </Tooltip>
              <Tooltip
                label={
                  <>
                    <Text fz="sm" ta="center">
                      Reload PDF without saving
                    </Text>
                    <Text fz="sm" ta="center">
                      {!pdfLoaded ? '(Loading...)' : ''}
                    </Text>
                  </>
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
                  variant="format"
                  disabled={!pdfLoaded}
                  leftSection={<LuRefreshCcw />}
                  onClick={setPdfFile}
                >
                  Reload PDF
                </Button>
              </Tooltip>
            </Box>
            <Box w="12vw">
              <ZoomTools zoomState={pdfZoom} />
            </Box>
            <Group justify="end" gap="0px" w="12vw">
              {/* <Button variant="transparent">
              <RiSplitCellsHorizontal />
            </Button> */}
              <Tooltip
                label="Download .tex file"
                color="cyan"
                position="bottom"
                offset={5}
                withArrow
                arrowOffset={50}
                arrowSize={7}
                arrowRadius={2}
              >
                <Button variant="format" leftSection={<LuDownload />} onClick={downloadTex}>
                  .tex
                </Button>
              </Tooltip>
              <Tooltip
                label="Download .pdf file"
                color="cyan"
                position="bottom"
                offset={5}
                withArrow
                arrowOffset={50}
                arrowSize={7}
                arrowRadius={2}
              >
                <Button variant="format" leftSection={<LuDownload />} onClick={downloadPdf}>
                  .pdf
                </Button>
              </Tooltip>
            </Group>
          </Group>
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
};

export default Header;
