import React from 'react';
import { IoLogInOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineLogin } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import {
  AppShell,
  Box,
  Burger,
  Button,
  Flex,
  Group,
  Modal,
  SimpleGrid,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { logout } from '@/ApiHandlers/AuthHandler';
import Logo from '@/svg/Logo';
//import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './MainLayout.module.css';

interface LayoutProps {
  content: React.ReactNode;
}

export default function MainLayout({ content }: LayoutProps) {
  const [burgerOpened, burgerHandlers] = useDisclosure();
  const [logoutModalOpened, logoutModalHandlers] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !burgerOpened } }}
      padding="md"
    >
      <AppShell.Header bd="none">
        <Group h="100%" px="md" justify="space-between" bg="var(--mantine-color-gray-1)">
          <Burger opened={burgerOpened} onClick={burgerHandlers.toggle} hiddenFrom="sm" size="sm" />

          {
            //<MantineLogo size={30} />
          }

          <Group justify="space-between" style={{ flex: 1 }}>
            <Flex ml="sm" justify="center" align="center">
              <Logo width="1.6rem" />
              <Text mt="0.2rem" c="var(--mantine-color-yellow-8)" fz="lg" fw="700" ml="sm">
                Easy
              </Text>
              <Text mt="0.2rem" fz="lg" fw="700" c="var(--mantine-color-cyan-9)">
                TeX
              </Text>
            </Flex>
            {
              //<MantineLogo size={30} />
            }
            <Group ml="xl" gap={0} visibleFrom="sm">
              <Button
                pt="0px"
                pb="0px"
                variant="transparent"
                leftSection={<RxAvatar />}
                className={classes.control}
              >
                Profile
              </Button>
              <Button
                pt="0px"
                pb="0px"
                variant="transparent"
                leftSection={<IoSettingsOutline />}
                className={classes.control}
              >
                Settings
              </Button>
              <Button
                pt="0px"
                pb="0px"
                variant="transparent"
                leftSection={<MdOutlineLogin />}
                className={classes.control}
                onClick={logoutModalHandlers.open}
              >
                Log out
              </Button>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control}>Profile</UnstyledButton>
        <UnstyledButton className={classes.control}>Log out</UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main p="0px" pt={50}>
        {content}
      </AppShell.Main>
      <Modal
        opened={logoutModalOpened}
        onClose={logoutModalHandlers.close}
        transitionProps={{ transition: 'fade-up' }}
        yOffset="16%"
        size="lg"
        title={
          <Text c="var(--mantine-color-cyan-8)">
            <b>Log out</b>
          </Text>
        }
      >
        <SimpleGrid mt="0px" cols={1} verticalSpacing="xl" ta="center" p="xl" pt="md" pb="md">
          <Text fz="1.3rem" m="xl">
            Are you sure you want to log out?
          </Text>
          <SimpleGrid cols={2} spacing="xl" mt="md">
            <Button onClick={logout}>Log out</Button>
            <Button variant="outline" onClick={logoutModalHandlers.close}>
              Cancel
            </Button>
          </SimpleGrid>
        </SimpleGrid>
      </Modal>
    </AppShell>
  );
}
