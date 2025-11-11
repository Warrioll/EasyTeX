import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { BiFont, BiFontFamily } from 'react-icons/bi';
import { BsPersonWorkspace } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight, FaRegSave, FaSave } from 'react-icons/fa';
import { FaRegFileLines } from 'react-icons/fa6';
import { IoDocumentsOutline, IoImagesOutline } from 'react-icons/io5';
import { LuDownload, LuRefreshCcw, LuTable } from 'react-icons/lu';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import { TbBlocks } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Flex,
  FloatingIndicator,
  Group,
  HoverCard,
  Loader,
  SimpleGrid,
  Tabs,
  Text,
} from '@mantine/core';
import CustomTooltip from '@/components/other/CustomTooltip';
import { documentColor, documentMainLabels } from '@/components/other/documentLabelsAndColors';
import Logo from '@/svg/Logo';
import { documentClassType } from '@/Types';
import { dateFormatter } from '@/utils/formatters';
import {
  useActiveBlockContext,
  useActiveTextfieldContext,
  useBlocksContentContext,
  useEditorContext,
  useZoomsContext,
} from '../../DocumentContextProviders';
import { useBlocksList } from '../blocksListAndPrototypes';
import DocumentToolsTab from './DocumentToolsTab';
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
};

export default function Header({
  saveDocumentContent,
  pdfLoaded,

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

  const { pdfZoom, setPdfZoom, workspaceZoom, setWorkspaceZoom } = useZoomsContext();
  const pdfZoomState: [string | null, Dispatch<SetStateAction<string | null>>] = [
    pdfZoom,
    setPdfZoom,
  ];

  const [documentName, setDocumentName] = useState<{
    name: string;
    documentClass: documentClassType | '';
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
      <WorkspaceToolsTab />
    </>
  );

  const docTools = () => <DocumentToolsTab zoomState={workspaceZoom} />;

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
  }, [activeBlock, blocksContent, activeTextfield]);

  useEffect(() => {
    const getTitle = async () => {
      try {
        const response = await axios.get(`http://localhost:8100/document/${id}`, {
          withCredentials: true,
        });
        setDocumentName(response.data);
      } catch (error) {
        console.error('get document name error:', error);
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
        position="bottom"
        offset={5}
        arrowOffset={50}
        arrowSize={7}
        arrowRadius={2}
        shadow="sm"
        styles={{
          arrow: {
            border: `1px solid ${documentColor(documentName.documentClass as documentClassType)}`,
          },
        }}
      >
        <HoverCard.Target>
          <Button
            m="0px"
            variant="transparent"
            rightSection={
              isNotSaved ? (
                <Flex c="var(--mantine-color-error)">
                  <Text mt="0.4rem">
                    <FaSave />
                  </Text>
                </Flex>
              ) : null
            }
          >
            <Text
              maw="10rem"
              className={classes.documentName}
              c={documentColor(documentName.documentClass as documentClassType)}
            >
              <b> {documentName.name}</b>
            </Text>
          </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown
          bd={`1px solid ${documentColor(documentName.documentClass as documentClassType)}`}
        >
          <SimpleGrid maw="20vw" cols={2} verticalSpacing="0.3rem">
            <Text ml="xs" fw="700">
              Document type:
            </Text>
            <Text ml="xs" c={documentColor(documentName.documentClass as documentClassType)}>
              {documentMainLabels(documentName.documentClass as documentClassType)}
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
            <Flex justify="center" c="var(--mantine-color-error)" mt="lg">
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
        <Box>
          <CustomTooltip label={savingPdf ? 'Saving document...' : 'Save document'}>
            <Button
              w={{ base: '3rem', sm: '4.6rem' }}
              variant="format"
              disabled={!pdfLoaded}
              leftSection={!savingPdf && <FaRegSave />}
              onMouseUp={() => {
                setSavingPdf(true);
                saveDocumentContent();
              }}
              bg={savingPdf ? 'var(--mantine-color-cyan-7)' : ''}
            >
              {savingPdf ? (
                <Loader color="var(--mantine-color-white)" size={16} />
              ) : (
                <>
                  <span className="mantine-visible-from-sm">Save</span>
                </>
              )}
            </Button>
          </CustomTooltip>

          <CustomTooltip
            label={reloadingPdf ? 'Reloading PDF without saving...' : ' Reload PDF without saving'}
          >
            <Button
              bg={reloadingPdf ? 'var(--mantine-color-cyan-7)' : ''}
              w={{ base: '3rem', sm: '7.3rem' }}
              variant="format"
              disabled={!pdfLoaded}
              leftSection={!reloadingPdf && <LuRefreshCcw />}
              onMouseUp={() => {
                setReloadingPdf(true);
                setPdfFile();
              }}
            >
              {reloadingPdf ? (
                <Loader color="var(--mantine-color-white)" size={16} />
              ) : (
                <span className="mantine-visible-from-sm">Reload PDF</span>
              )}
            </Button>
          </CustomTooltip>
        </Box>
        <ZoomTools tooltip="PDF zoom" zoomState={pdfZoomState} />
        <Group justify="end" gap="0px">
          <CustomTooltip
            label={preparingTexToDownload ? 'Downloading .tex file...' : 'Download .tex file'}
          >
            <Button
              variant="format"
              w="4.2rem"
              disabled={preparingTexToDownload}
              leftSection={!preparingTexToDownload && <LuDownload />}
              bg={preparingTexToDownload ? 'var(--mantine-color-cyan-7)' : ''}
              onMouseUp={() => {
                setPreparingTexToDownload(true);
                downloadTex();
              }}
            >
              {preparingTexToDownload ? (
                <Loader color="var(--mantine-color-white)" size={16} />
              ) : (
                '.tex'
              )}
            </Button>
          </CustomTooltip>
          <CustomTooltip
            label={preparingPdfToDownload ? 'Downloading .pdf file...' : 'Download .pdf file'}
          >
            <Button
              w="4.2rem"
              variant="format"
              leftSection={!preparingPdfToDownload && <LuDownload />}
              onMouseUp={() => {
                setPreparingPdfToDownload(true);
                downloadPdf();
              }}
              disabled={preparingPdfToDownload}
              bg={preparingPdfToDownload ? 'var(--mantine-color-cyan-7)' : ''}
            >
              {preparingPdfToDownload ? (
                <Loader color="var(--mantine-color-white)" size={16} />
              ) : (
                '.pdf'
              )}
            </Button>
          </CustomTooltip>
        </Group>
      </>
    );
  };

  return (
    <Box h="5.3rem" miw="48rem" display="block">
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
              }}
              fz="md"
              pt="7px"
            >
              <Logo width="1.4rem" />
            </Button>
            <Tabs.List ref={setRootRef} className={classes.list} mb="0px" mt="5px" w="max-content">
              {tabs.map((tab) => (
                <Tabs.Tab
                  value={tab.value}
                  ref={setControlRef(tab.value)}
                  className={classes.tab}
                  leftSection={<tab.Icon />}
                  styles={{ tabSection: { marginRight: '6px' } }}
                  style={{ zIndex: '15' }}
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

          <Center visibleFrom="md" mb="0px" p="0px" w="10vw">
            <DocumentName />
          </Center>

          <Flex miw="24rem" mb="0px" w="40vw" style={{ flexShrink: '0' }}>
            <Group justify="end" h="100%" w="100%" ml="xl" gap={0} mb="0px" p="0px">
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

        <SimpleGrid
          cols={2}
          spacing="0px"
          visibleFrom="xl"
          h="3rem"
          miw="48rem"
          mih="2.8rem"
          mah="5vh"
        >
          <Center
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
            pl="lg"
            pr="lg"
            ml="12px"
            mr="xs"
            miw="max-content"
            className={classes.band}
          >
            {tabs.map((tab) => (
              <Tabs.Panel value={tab.value}>{tab.tools()()}</Tabs.Panel>
            ))}
          </Center>

          <Flex
            justify="center"
            align="center"
            pl="lg"
            pr="lg"
            gap="xl"
            miw="max-content"
            ml="xs"
            mr="12px"
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
            className={classes.band}
          >
            <PdfTools />
          </Flex>
        </SimpleGrid>

        <SimpleGrid
          cols={1}
          spacing="0px"
          hiddenFrom="xl"
          h="3rem"
          mih="2.8rem"
          miw="max-content"
          mah="5vh"
        >
          <Flex
            w="100vw"
            justify="center"
            style={{ display: displayBarinMinSize === 'left' ? 'flex' : 'none' }}
            miw="48rem"
          >
            <Center
              w="100%"
              style={{ borderRadius: 'var(--mantine-radius-md)' }}
              pl="lg"
              pr="lg"
              ml="12px"
              mr="xs"
              className={classes.band}
              miw="max-content"
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
              miw="max-content"
            >
              <Button
                variant="format"
                w="2rem"
                onMouseUp={() => {
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
            miw="48rem"
          >
            <Center
              className={classes.band}
              style={{
                borderTopRightRadius: 'var(--mantine-radius-md)',
                borderBottomRightRadius: 'var(--mantine-radius-md)',
              }}
              miw="max-content"
            >
              <Button
                variant="format"
                w="2rem"
                onMouseUp={() => {
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
              mr="12px"
              ml="xs"
              className={classes.band}
              miw="max-content"
            >
              <PdfTools />
            </Center>
          </Flex>
        </SimpleGrid>
      </Tabs>
    </Box>
  );
}
