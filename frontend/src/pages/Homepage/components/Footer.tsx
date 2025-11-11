import { MdAccountCircle } from 'react-icons/md';
import { RxGithubLogo } from 'react-icons/rx';
import { Button, Center, Flex, Group, Stack, Text } from '@mantine/core';
import Logo from '@/svg/Logo';
import classes from '../hompage.module.css';

export default function Footer() {
  const text =
    'This application was developed as part of a student engineering thesis conducted at the Rzeszow University of Technology • Author: Karol Nowak';

  const LogoWithText = () => {
    return (
      <Flex justify="center" align="center">
        <Logo width="1.6rem" />
        <Text mt="0.1rem" c="var(--mantine-color-yellow-8)" fz="xl" fw="700" ml="sm">
          Easy
        </Text>
        <Text mt="0.1rem" fz="xl" fw="700" c="var(--mantine-color-cyan-9)">
          TeX
        </Text>
      </Flex>
    );
  };

  const Buttons = () => {
    return (
      <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
        <Button
          color="gray"
          fz="2rem"
          p="0px"
          variant="transparent"
          onClick={() => {
            window.location = 'https://github.com/Warrioll/EasyTeX';
          }}
        >
          <RxGithubLogo />
        </Button>
        <Button
          ml="md"
          color="gray"
          fz="2.4rem"
          p="0px"
          variant="transparent"
          onClick={() => {
            window.location = 'https://github.com/Warrioll/';
          }}
        >
          <MdAccountCircle />
        </Button>
      </Group>
    );
  };

  return (
    <>
      <Center className={classes.footer} mih="6rem" w="100%" visibleFrom="md">
        <Flex className={classes.inner} w="90vw" justify="space-between" align="center" py="xl">
          <LogoWithText />
          <Text color="var(--mantine-color-gray-6)" fz="sm">
            {text}
          </Text>
          <Buttons />
        </Flex>
      </Center>

      <Center className={classes.footer} mih="14rem" w="100%" hiddenFrom="md">
        <Stack
          className={classes.inner}
          w="90vw"
          mih="14rem"
          justify="center"
          align="center"
          py="xl"
        >
          <LogoWithText />
          <Text color="var(--mantine-color-gray-6)" fz="sm" ta="center" px="md">
            {text}
          </Text>
          <Buttons />
        </Stack>
      </Center>
    </>
  );
}
