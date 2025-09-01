import React, { ReactNode, useEffect, useState } from 'react';
import { Extension } from '@tiptap/core';
import { Editor } from '@tiptap/react';
import axios from 'axios';
import { BiFont } from 'react-icons/bi';
import {
  FaBold,
  FaCode,
  FaItalic,
  FaList,
  FaRegSave,
  FaStrikethrough,
  FaSubscript,
  FaSuperscript,
  FaUnderline,
} from 'react-icons/fa';
import { FaListOl } from 'react-icons/fa6';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import {
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
  MdOutlineLibraryBooks,
  MdOutlineTitle,
} from 'react-icons/md';
import { PiTextTBold } from 'react-icons/pi';
import { RiFileDownloadFill, RiFileDownloadLine, RiSplitCellsHorizontal } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
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
import { useBlocksList } from '../../blocksList';
import {
  useActiveBlockContext,
  useBlocksContentContext,
  useEditorContext,
} from '../../DocumentContextProviders';
import { useAddBlock } from '../../documentHandlers';
import FontTab from './FontTab';
import TableToolsTab from './TableToolsTab';
import TabTemplate from './TabTemplate';
import TextfieldToolsTab from './TextfieldToolsTab';
import { useTextTools } from './TextTools';
import ZoomTools from './ZoomTools';
// import {
//   IconNotification,
//   IconCode,
//   IconBook,
//   IconChartPie3,
//   IconFingerprint,
//   IconCoin,
//   IconChevronDown,
// } from '@tabler/icons-react';
import classes from './Header.module.css';

type headerProps = {
  editFunctions: Record<string, (...args: any[]) => any>;
  //editor: Editor;
  saveElementChanges: () => void;
  pdfZoom: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
  workspaceZoom: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
  // activeSection: number;
  //sectionsContent: blockType[];
  //activeTableCellState: [[number, number], React.Dispatch<React.SetStateAction<[number, number]>>];
};

const Header: React.FC<headerProps> = ({
  editFunctions,
  //editor,
  saveElementChanges,
  pdfZoom,
  workspaceZoom,
  //activeSection,
  // sectionsContent,
  //activeTableCellState,
}) => {
  //const theme = useMantineTheme();
  //const []

  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  //const {editor}= useEditorContext();

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('insert');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };
  const [documentName, setDocumentName] = useState<{ name: string; documentClass: string }>({
    name: '',
    documentClass: '',
  });

  const { id } = useParams();

  //const [zoomValue, setZoomValue] = pdfZoom;

  // const combobox = useCombobox({
  //   onDropdownClose: () => combobox.resetSelectedOption(),
  // });
  // const zoomValuesList = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  // const options = zoomValuesList.map((item) => (
  //   <Combobox.Option value={item.toString()} key={item.toString()}>
  //     {item * 100}%
  //   </Combobox.Option>
  // ));

  const blocksList = useBlocksList();

  const insertTools = (
    <TabTemplate
      buttons={blocksList}
      iconSize="var(--mantine-font-size-lg)"
      getToottipText={(label: string) => `Add ${label.toLocaleLowerCase()}`}
    />
  );
  // const insertTools = (
  //   <>
  //     {blocksList.map((item) => {
  //       return (
  //         <Tooltip
  //           label={item.blockName}
  //           color="cyan"
  //           position="bottom"
  //           offset={5}
  //           withArrow
  //           arrowOffset={50}
  //           arrowSize={7}
  //           arrowRadius={2}
  //         >
  //           <Button
  //             variant="format"
  //             fz="var(--mantine-font-size-lg)"
  //             //TODO obsługa tego
  //             //onClick={item..addPageBreak}
  //           >
  //             <item.Icon />
  //           </Button>
  //         </Tooltip>
  //       );
  //     })}
  //   </>
  // );

  // const fontTools = (
  //   <FontTab
  //     editFunctions={editFunctions}

  //     //saveElementChanges={saveElementChanges}
  //   />
  // );
  const textTools = useTextTools();
  const fontTools = (
    <TabTemplate
      buttons={textTools}
      iconSize="var(--mantine-font-size-sm)"
      dontRenderButtons={[6, 7, 8, 9]}
    />
  );

  const textFieldTools = (
    <TextfieldToolsTab
    //editFunctions={editFunctions}
    //saveElementChanges={saveElementChanges}
    />
  );

  const tableTools = <TableToolsTab editFunctions={editFunctions} />;

  const viewTools = (
    <>
      <ZoomTools zoomState={workspaceZoom} />
    </>
  );

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

  const chooseModifyTabTools = (): ReactNode => {
    if (activeBlock !== 0) {
      switch (blocksContent[activeBlock].typeOfBlock) {
        case 'textfield':
          return textFieldTools;
        case 'table':
          return tableTools;
        default:
          return '';
      }
    }
    return '';
  };

  const tabs = [
    {
      value: 'font',
      label: 'Text',
      tools: fontTools,
    },
    {
      value: 'insert',
      label: 'Blocks',
      tools: insertTools,
    },

    {
      value: 'view',
      label: 'View',
      tools: viewTools,
    },
    {
      value: 'modify',
      label: `${chooseModifyTabName()}`,
      tools: chooseModifyTabTools(),
    },
  ];

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

  useEffect(() => {
    setValue('insert');
  }, [activeBlock]);

  useEffect(() => {
    const getTitle = async () => {
      try {
        const response = await axios.get(`http://localhost:8100/document/${id}`, {
          withCredentials: true,
        });
        //console.log(response.data);
        setDocumentName({
          name: response.data.name,
          documentClass: response.data.documentClass,
        });
      } catch (error) {
        console.log('doc page get doc Name error:', error);
      }
    };
    getTitle();
  }, []);

  return (
    <Box h="10vh">
      {/* <header> */}
      <Tabs radius="sm" variant="none" value={value} onChange={setValue}>
        <SimpleGrid cols={5} h="5vh" pl="lg" pr="lg" ml="xs" mr="xs">
          <Group h="100%" w="100%">
            <Anchor href="/dashboard" className={classes.anchor} pl="xs" pr="xs">
              <Flex justify="center" align="center">
                <Logo width="1.3rem" />
                <Text mt="0.1rem" c="var(--mantine-color-yellow-8)" fz="md" fw="700" ml="sm">
                  Easy
                </Text>
                <Text mt="0.1rem" fz="md" fw="700" c="var(--mantine-color-cyan-9)">
                  TeX
                </Text>
              </Flex>
            </Anchor>
          </Group>
          <Group h="100%">
            <Tabs.List ref={setRootRef} className={classes.list}>
              {tabs.map((tab) => (
                <Tabs.Tab
                  value={tab.value}
                  ref={setControlRef(tab.value)}
                  className={classes.tab}
                  disabled={isDisabledtab(tab.value)}
                >
                  {tab.label}
                </Tabs.Tab>
              ))}
              <FloatingIndicator
                target={value ? controlsRefs[value] : null}
                parent={rootRef}
                className={classes.indicator}
              />
            </Tabs.List>
          </Group>

          <Center>
            <HoverCard
              //color="cyan"
              position="bottom"
              offset={5}
              withArrow
              arrowOffset={50}
              arrowSize={7}
              arrowRadius={2}
            >
              <HoverCard.Target>
                <Button variant="transparent">
                  <Text mr="xs" c={documentColor(documentName.documentClass)}>
                    <b>{documentMainLabels(documentName.documentClass)}</b>
                  </Text>{' '}
                  |
                  <Text className={classes.documentName} ml="xs" c="var(--mantine-color-gray-7)">
                    <b> {documentName.name}</b>
                  </Text>
                </Button>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Box maw="20vw">
                  <Flex>
                    <b>Type:</b>
                    <Text ml="lg" c={documentColor(documentName.documentClass)}>
                      {documentMainLabels(documentName.documentClass)}
                    </Text>
                  </Flex>
                  <Flex>
                    <b>Name:</b>
                    <Text ml="xs" c="var(--mantine-color-gray-7)">
                      {documentName.name}
                    </Text>
                  </Flex>
                </Box>
              </HoverCard.Dropdown>
            </HoverCard>
          </Center>
          <Group justify="end" gap="0px">
            {/* <Button variant="transparent">
              <RiSplitCellsHorizontal />
            </Button> */}
            <Button
              variant="transparent"
              leftSection={<RiFileDownloadLine />}
              onClick={downloadTex}
            >
              .tex
            </Button>
            <Button
              variant="transparent"
              leftSection={<RiFileDownloadFill />}
              onClick={downloadPdf}
            >
              .pdf
            </Button>
          </Group>
          <Group justify="end" h="100%" w="100%">
            <Button variant="default" size="xs">
              Profile
            </Button>
          </Group>
        </SimpleGrid>

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
              <Tabs.Panel value={tab.value}>{tab.tools}</Tabs.Panel>
            ))}
          </Center>
          <Center
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
            pl="lg"
            pr="lg"
            ml="xs"
            mr="lg"
            className={classes.band}
          >
            <Box ml="2rem" mr="2rem">
              <Button
                variant="format"
                leftSection={<FaRegSave />}
                onClick={editFunctions.sendChanges}
              >
                Save
              </Button>
              <Button
                variant="format"
                leftSection={<LuRefreshCcw />}
                onClick={editFunctions.reloadPdf}
              >
                Reload PDF
              </Button>
            </Box>
            <ZoomTools zoomState={pdfZoom} />
          </Center>
        </SimpleGrid>

        {/* <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" /> */}
      </Tabs>
      {/* </header> */}

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
