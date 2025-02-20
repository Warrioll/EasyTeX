import React, { useEffect, useState } from 'react';
import { Extension } from '@tiptap/core';
import { Editor } from '@tiptap/react';
import axios from 'axios';
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
import { LuHeading1, LuHeading2, LuRefreshCcw } from 'react-icons/lu';
import { MdOutlineAdd } from 'react-icons/md';
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
  rem,
  ScrollArea,
  SimpleGrid,
  Tabs,
  Text,
  ThemeIcon,
  UnstyledButton,
  useCombobox,
  useMantineTheme,
} from '@mantine/core';
//import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import Logo from '@/svg/Logo';
import FontTab from './FontTab';
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
  editor: Editor;
  saveElementChanges: () => void;
  pdfZoom: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
};

const Header: React.FC<headerProps> = ({ editFunctions, editor, saveElementChanges, pdfZoom }) => {
  //const theme = useMantineTheme();

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

  const [zoomValue, setZoomValue] = pdfZoom;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const zoomValuesList = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const options = zoomValuesList.map((item) => (
    <Combobox.Option value={item.toString()} key={item.toString()}>
      {item * 100}%
    </Combobox.Option>
  ));

  useEffect(() => {
    const getTitle = async () => {
      try {
        const response = await axios.get(`http://localhost:8100/document/${id}`, {
          withCredentials: true,
        });
        console.log(response.data);
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
              <Tabs.Tab value="file" ref={setControlRef('file')} className={classes.tab}>
                File
              </Tabs.Tab>
              <Tabs.Tab value="insert" ref={setControlRef('insert')} className={classes.tab}>
                Insert
              </Tabs.Tab>
              <Tabs.Tab value="font" ref={setControlRef('font')} className={classes.tab}>
                Font
              </Tabs.Tab>

              <FloatingIndicator
                target={value ? controlsRefs[value] : null}
                parent={rootRef}
                className={classes.indicator}
              />
            </Tabs.List>
          </Group>

          <Center>
            {documentName.documentClass} | {documentName.name}
          </Center>
          <Group justify="end" gap="0px">
            <Button variant="transparent">
              <RiSplitCellsHorizontal />
            </Button>
            <Button variant="transparent" leftSection={<RiFileDownloadLine />}>
              .tex
            </Button>
            <Button variant="transparent" leftSection={<RiFileDownloadFill />}>
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
            <Tabs.Panel value="file">File tools</Tabs.Panel>

            <Tabs.Panel value="insert">
              <Button
                variant="format"
                fz="var(--mantine-font-size-lg)"
                fw="bold"
                onClick={editFunctions.addSection}
              >
                <MdOutlineAdd />
                <LuHeading1 />
              </Button>
              <Button
                variant="format"
                fz="var(--mantine-font-size-lg)"
                onClick={editFunctions.addSection}
              >
                <MdOutlineAdd />
                <LuHeading2 />
              </Button>
              <Button
                variant="format"
                fz="var(--mantine-font-size-lg)"
                onClick={editFunctions.addTextfield}
              >
                <MdOutlineAdd />
                <PiTextTBold />
              </Button>
              {/* <Button variant="format" onClick={editFunctions.sendChanges}>
                Save Changes
              </Button>
              <Button variant="format" onClick={editFunctions.reloadPdf}>
                Reload PDF
              </Button> */}
            </Tabs.Panel>

            <Tabs.Panel value="font">
              <FontTab
                editFunctions={editFunctions}
                editor={editor}
                saveElementChanges={saveElementChanges}
              />
            </Tabs.Panel>
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
            <Flex ml="2rem" mr="2rem">
              <Button
                variant="format"
                fz="var(--mantine-font-size-lg)"
                onClick={() => {
                  const zoomIdx = zoomValuesList.indexOf(Number(zoomValue)) - 1;
                  if (zoomIdx >= 0) {
                    setZoomValue(zoomValuesList[zoomIdx].toString());
                  }
                }}
              >
                <FiZoomOut />
              </Button>
              <Combobox
                store={combobox}
                onOptionSubmit={(val) => {
                  setZoomValue(val);
                  combobox.closeDropdown();
                }}
              >
                <Combobox.Target>
                  <InputBase
                    w="5rem"
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                    variant="filled"
                    p="0px"
                  >
                    {(Number(zoomValue) * 100).toString().concat('%') || (
                      <Input.Placeholder>Pick value</Input.Placeholder>
                    )}
                  </InputBase>
                </Combobox.Target>

                <Combobox.Dropdown>
                  <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
              <Button
                variant="format"
                fz="var(--mantine-font-size-lg)"
                onClick={() => {
                  const zoomIdx = zoomValuesList.indexOf(Number(zoomValue)) + 1;
                  if (zoomIdx < zoomValuesList.length) {
                    setZoomValue(zoomValuesList[zoomIdx].toString());
                  }
                }}
              >
                <FiZoomIn />
              </Button>
            </Flex>
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
