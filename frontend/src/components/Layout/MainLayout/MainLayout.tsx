import React, { useEffect } from 'react';
import {
  IoDocumentsOutline,
  IoImagesOutline,
} from 'react-icons/io5';
import { MdOutlineLogin } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import {
  AppShell,
  Burger,
  Button,
  Flex,
  Group,
  Modal,
  ScrollArea,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { checkIfLoggedIn, logout } from '@/ApiHandlers/AuthHandler';
import Logo from '@/svg/Logo';
import classes from './MainLayout.module.css';

type LayoutPropsType = {
  content: React.ReactNode;
  whiteBackground?: boolean;
};

export default function MainLayout({ content, whiteBackground }: LayoutPropsType) {
  const [burgerOpened, burgerHandlers] = useDisclosure();
  const [logoutModalOpened, logoutModalHandlers] = useDisclosure(false);

  useEffect(() => {
    const checkLogged = async () => {
      const userId = await checkIfLoggedIn();
    };
    checkLogged();
  }, []);

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !burgerOpened } }}
      padding="md"
    >
      <AppShell.Header bd="none">
        <Group
          h="100%"
          px="md"
          justify="space-between"
          bg={whiteBackground ? 'var(--mantine-color-white)' : 'var(--mantine-color-gray-1)'}
          style={{ borderBottom: whiteBackground ? '1px solid var(--mantine-color-gray-3)' : '' }}
        >
          <Burger opened={burgerOpened} onClick={burgerHandlers.toggle} hiddenFrom="sm" size="sm" />

          <Group justify="space-between" style={{ flex: 1 }}>
            <Flex ml="sm" justify="center" align="center" pl="0px">
              <Button
                p="0px"
                m="0px"
                variant="transparent"
                onClick={() => {
                  window.location.href = '/dashboard';
                }}
              >
                <Logo width="1.6rem" />
                <Text mt="0.2rem" c="var(--mantine-color-yellow-8)" fz="lg" fw="700" ml="sm">
                  Easy
                </Text>
                <Text mt="0.2rem" fz="lg" fw="700" c="var(--mantine-color-cyan-9)">
                  TeX
                </Text>
              </Button>
            </Flex>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <Button
                pt="0px"
                pb="0px"
                variant="transparent"
                leftSection={<IoDocumentsOutline />}
                className={classes.control}
                onClick={() => {
                  localStorage.removeItem('401');
                  localStorage.removeItem('accountDeleted');
                  window.localStorage.removeItem('unavailableDocument');
                  window.location.href = '/dashboard';
                }}
              >
                Documents
              </Button>
              <Button
                pt="0px"
                pb="0px"
                variant="transparent"
                leftSection={<IoImagesOutline />}
                className={classes.control}
                onClick={() => {
                  localStorage.removeItem('401');
                  localStorage.removeItem('accountDeleted');
                  window.localStorage.removeItem('unavailableDocument');
                  window.location.href = '/assetsLibrary';
                }}
              >
                Assets
              </Button>
              <Button
                pt="0px"
                pb="0px"
                variant="transparent"
                leftSection={<RxAvatar />}
                className={classes.control}
                onClick={() => {
                  localStorage.removeItem('401');
                  localStorage.removeItem('accountDeleted');
                  window.localStorage.removeItem('unavailableDocument');
                  window.location.href = '/profile';
                }}
              >
                Account
              </Button>
              <Button
                pt="0px"
                pb="0px"
                variant="transparent"
                c="var(--mantine-color-gray-7)"
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
        <ScrollArea>
          <Button
            w="100%"
            mih="3rem"
            pt="0px"
            pb="0px"
            variant="transparent"
            leftSection={<IoDocumentsOutline />}
            className={classes.control}
            onClick={() => {
              localStorage.removeItem('401');
              localStorage.removeItem('accountDeleted');
              window.localStorage.removeItem('unavailableDocument');
              window.location.href = '/dashboard';
            }}
          >
            Documents
          </Button>
          <Button
            w="100%"
            mih="3rem"
            pt="0px"
            pb="0px"
            variant="transparent"
            leftSection={<IoImagesOutline />}
            className={classes.control}
            onClick={() => {
              localStorage.removeItem('401');
              localStorage.removeItem('accountDeleted');
              window.localStorage.removeItem('unavailableDocument');
              window.location.href = '/assetsLibrary';
            }}
          >
            Assets
          </Button>
          <Button
            w="100%"
            mih="3rem"
            pt="0px"
            pb="0px"
            variant="transparent"
            leftSection={<RxAvatar />}
            className={classes.control}
            onClick={() => {
              localStorage.removeItem('401');
              localStorage.removeItem('accountDeleted');
              window.localStorage.removeItem('unavailableDocument');
              window.location.href = '/profile';
            }}
          >
            Account
          </Button>
          <Button
            w="100%"
            mih="3rem"
            pt="0px"
            pb="0px"
            variant="transparent"
            c="var(--mantine-color-gray-7)"
            leftSection={<MdOutlineLogin />}
            className={classes.control}
            onClick={logoutModalHandlers.open}
          >
            Log out
          </Button>
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main p="0px" pt={50}>
        {content}
      </AppShell.Main>
      <Modal
        opened={logoutModalOpened}
        onClose={logoutModalHandlers.close}
        transitionProps={{ transition: 'fade-up' }}
        centered
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
