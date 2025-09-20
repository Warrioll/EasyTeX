import { CgProfile } from 'react-icons/cg';
import { FaSquareGithub } from 'react-icons/fa6';
import { MdAccountCircle } from 'react-icons/md';
import { RxGithubLogo } from 'react-icons/rx';
import { ActionIcon, Box, Button, Center, Container, Flex, Group, Text } from '@mantine/core';
import Logo from '@/svg/Logo';
import classes from '../hompage.module.css';

export default function Footer() {
  return (
    <Center className={classes.footer} w="100%">
      <Box className={classes.inner} w="90vw">
        <Flex justify="center" align="center">
          <Logo width="1.6rem" />
          <Text mt="0.1rem" c="var(--mantine-color-yellow-8)" fz="xl" fw="700" ml="sm">
            Easy
          </Text>
          <Text mt="0.1rem" fz="xl" fw="700" c="var(--mantine-color-cyan-9)">
            TeX
          </Text>
        </Flex>
        <Text color="var(--mantine-color-gray-6)" fz="sm">
          This application is a student procject developed as an engineering thesis. • Author: Karol
          Nowak
        </Text>
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
      </Box>
    </Center>
  );
}
