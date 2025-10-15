import { useRef } from 'react';
import {
  BackgroundImage,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Logo from '@/svg/Logo';
import classes from '../hompage.module.css';

export default function HeroHeader() {
  //Sign up now to create and edit documents based on LaTeX without struggle with syntax!

  return (
    <Stack h="150vh" align="center" pos='relative' style={{zIndex: 1}}>
      <BackgroundImage src="bg13.png" h="89vh" className={classes.heroBg} />
      <Box className={classes.belowBg} h="63vh" w="100%" />

      <Center h="50vh" mt="7rem" mb="xs">
        <Stack justify="center" align="center" className={classes.resetHeroBg} c="black">
          <Center fz="xl" h="100%" className={classes.heroTitle}>
            <Text fz="5rem" fw="700" mr="xl">
              Welcome to
            </Text>

            <Logo width="5rem" />
            <Text mt="0.2rem" fz="5rem" c="var(--mantine-color-yellow-8)" fw="700" ml="sm">
              Easy
            </Text>
            <Text mt="0.2rem" fz="5rem" fw="700" c="var(--mantine-color-cyan-9)">
              TeX
            </Text>
          </Center>
          <Text fz="xl" fw="500" m="xl" mb="xs" w="60%" ta="center">
            The power of LaTeX provided in EASY way! Sign up now to create and edit documents based
            on LaTeX without struggle with syntax!
          </Text>

          {/* <Flex>
            <Logo width="3rem" />
            <Text mt="0.2rem" fz="3rem" c="var(--mantine-color-yellow-8)" fw="700" ml="sm">
              Easy
            </Text>
            <Text mt="0.2rem" fz="3rem" fw="700" c="var(--mantine-color-cyan-9)">
              TeX
            </Text>
          </Flex>
          <Center fz="xl" h="100%" ta="center" m="xl">
            <Title fz="3rem" fw="700">
              The power of
              <span style={{ color: 'var(--mantine-dcolor-cyan-9)' }}> LaTeX </span>
              provided in
              <span style={{ color: 'var(--mantine-dcolor-yellow-8)' }}> EASY </span>
              way!
            </Title>
          </Center>
          <Text fz="xl" m="xl" w="60%" ta="center">
            Sign up now to create and edit documents based on LaTeX without struggle with syntax!
          </Text> */}

          <Center>
            <Button
              size="md"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth',
                });
              }}
              m="xl"
              w="10rem"
            >
              Explore!
            </Button>
            <Button
              size="md"
              w="10rem"
              m="xl"
              //bg="transparent"
              //bd="1px solid var(--mantine-color-cyan-4)"
              //c="var(--mantine-color-cyan-9)"
              //variant="outline"
              onClick={() => {
                window.location = '/register';
              }}
              bd="2px solid var(--mantine-color-cyan-7)"
              bg="rgba(255,255,255,0.5)"
              c="var(--mantine-color-cyan-9)"
            >
              Sign up!
            </Button>
          </Center>
        </Stack>
      </Center>
      <Image src="app2.png" w="70vw" style={{ zIndex: 1 }} className={classes.appImg} />
    </Stack>
  );
}
