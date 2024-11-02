import React, { useState } from 'react';
import { GoListOrdered } from 'react-icons/go';
import { ImBold, ImItalic, ImUnderline } from 'react-icons/im';
import { MdFormatListBulleted } from 'react-icons/md';
import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Flex,
  FloatingIndicator,
  Group,
  HoverCard,
  rem,
  ScrollArea,
  SimpleGrid,
  Tabs,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
//import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
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
};

export default function Header({ editFunctions }: React.FC<headerProps>) {
  //const theme = useMantineTheme();

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('mainTools');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Box h="11vh">
      {/* <header> */}
      <Tabs radius="sm" variant="none" value={value} onChange={setValue}>
        <Center h="5vh" pl="lg" pr="lg" ml="xs" mr="xs">
          <Group justify="space-between" h="100%" w="100%">
            <div>EasyTeX</div>
            <Group h="100%" gap={0} visibleFrom="sm">
              <Tabs.List ref={setRootRef} className={classes.list}>
                <Tabs.Tab value="file" ref={setControlRef('file')} className={classes.tab}>
                  File
                </Tabs.Tab>
                <Tabs.Tab
                  value="mainTools"
                  ref={setControlRef('mainTools')}
                  className={classes.tab}
                >
                  Main Tools
                </Tabs.Tab>

                <FloatingIndicator
                  target={value ? controlsRefs[value] : null}
                  parent={rootRef}
                  className={classes.indicator}
                />
              </Tabs.List>
            </Group>
            <Button variant="default" size="xs">
              Profile
            </Button>
          </Group>
        </Center>

        <Center
          h="6vh"
          style={{ borderRadius: 'var(--mantine-radius-md)' }}
          pl="lg"
          pr="lg"
          ml="lg"
          mr="lg"
          className={classes.band}
        >
          <Tabs.Panel value="file">File tools</Tabs.Panel>

          <Tabs.Panel value="mainTools">
            <Button variant="format">
              <ImBold />
            </Button>
            <Button variant="format">
              <ImItalic />
            </Button>
            <Button variant="format">
              <ImUnderline />
            </Button>
            <Button variant="format">
              <MdFormatListBulleted />
            </Button>
            <Button variant="format">
              <GoListOrdered />
            </Button>
            <Button variant="default" onClick={editFunctions.addSection}>
              Add Section
            </Button>
            <Button variant="default" onClick={editFunctions.saveChanges}>
              Save Changes
            </Button>
            <Button variant="default" onClick={editFunctions.reloadPdf}>
              Reload PDF
            </Button>
          </Tabs.Panel>
        </Center>

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
}
