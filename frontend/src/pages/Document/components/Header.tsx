import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
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

// const mockdata = [
//   {
//     icon: IconCode,
//     title: 'Open source',
//     description: 'This Pokémon’s cry is very loud and distracting',
//   },
//   {
//     icon: IconCoin,
//     title: 'Free for everyone',
//     description: 'The fluid of Smeargle’s tail secretions changes',
//   },
//   {
//     icon: IconBook,
//     title: 'Documentation',
//     description: 'Yanma is capable of seeing 360 degrees without',
//   },
//   {
//     icon: IconFingerprint,
//     title: 'Security',
//     description: 'The shell’s rounded shape and the grooves on its.',
//   },
//   {
//     icon: IconChartPie3,
//     title: 'Analytics',
//     description: 'This Pokémon uses its flying ability to quickly chase',
//   },
//   {
//     icon: IconNotification,
//     title: 'Notifications',
//     description: 'Combusken battles with the intensely hot flames it spews',
//   },
// ];

export default function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  //   const links = mockdata.map((item) => (
  //     <UnstyledButton className={classes.subLink} key={item.title}>
  //       <Group wrap="nowrap" align="flex-start">
  //         <ThemeIcon size={34} variant="default" radius="md">
  //           <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
  //         </ThemeIcon>
  //         <div>
  //           <Text size="sm" fw={500}>
  //             {item.title}
  //           </Text>
  //           <Text size="xs" c="dimmed">
  //             {item.description}
  //           </Text>
  //         </div>
  //       </Group>
  //     </UnstyledButton>
  //   ));

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {
            //<MantineLogo size={30} />
          }
          <div>EasyTeX</div>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Tabs radius="xs" defaultValue="mainTools">
              <Tabs.List>
                <Tabs.Tab value="file">File</Tabs.Tab>
                <Tabs.Tab value="mainTools">Main Tools</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="file">File tools</Tabs.Panel>

              <Tabs.Panel value="mainTools">
                <Button variant="default">Bold</Button>
                <Button variant="default">Italic</Button>
                <Button variant="default">underline</Button>
              </Tabs.Panel>
            </Tabs>
          </Group>

          <Group visibleFrom="sm">
            <Button variant="default">Profile</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

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
              {/* <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              /> */}
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
      </Drawer>
    </Box>
  );
}
