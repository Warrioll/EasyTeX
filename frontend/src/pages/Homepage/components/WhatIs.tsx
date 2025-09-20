import { FaLongArrowAltRight } from 'react-icons/fa';
import { ImArrowDownRight, ImArrowDownRight2 } from 'react-icons/im';
import { PiArrowBendDownRightFill } from 'react-icons/pi';
import { TbArrowBigRight, TbArrowBigRightFilled } from 'react-icons/tb';
import { WiStars } from 'react-icons/wi';
import { Box, Center, SimpleGrid, Text, Title } from '@mantine/core';
import Logo from '@/svg/Logo';
import FileWithTextIcon from './FileWithTextIcon';
import classes from '../hompage.module.css';

export default function WhatIs() {
  return (
    <Box h="90vh" bg="var(--mantine-color-white)" className={classes.whatIsBg}>
      <SimpleGrid cols={2} h="100%" p="xl" px="7rem">
        <Center className={classes.process} ml="3rem" mb="6rem">
          <Center>
            <Box className={classes.processEle1} w="16rem">
              <Text fw="bold" ml="0.5rem" fz="xl" mt="-1.85rem" c="white">
                . . .
              </Text>
              <Box className={classes.bar} w="100%" h="0.8rem" />
              <Center p="1rem" mr="0.5rem">
                <Logo width="10rem" />
              </Center>
            </Box>
            <Box className={classes.processEle2}>
              <FileWithTextIcon text=".tex" color="yellow" height="18rem" />
            </Box>
            <Box className={classes.processEle3}>
              <FileWithTextIcon text=".pdf" color="cyan" height="18rem" />
            </Box>
          </Center>
          <Box pos="absolute" fz="9rem" c="var(--mantine-color-gray-4)" className={classes.arrow1}>
            <PiArrowBendDownRightFill />
          </Box>
          <Box pos="absolute" fz="9rem" c="var(--mantine-color-gray-4)" className={classes.arrow2}>
            <PiArrowBendDownRightFill />
          </Box>
        </Center>
        <Center p="5rem">
          <Box w="100%" h="100%" ml="9rem" mt="4rem">
            <Title order={2} fz="3rem">
              What is EasyTex?
            </Title>
            <Text mt="4rem" pt="xl" fz="xl" maw="25vw">
              EasyTex is an online editor for creating PDF documents using LaTeX - a powerful tool
              that can be difficult to use. That's where EasyTex comes in! It offers a graphical
              interface that makes using LaTeX easy!
            </Text>
            <Text mt="xl" fz="xl" maw="25vw">
              EasyTex converts your work to a .tex file and then compiles it to deliver you a PDF
              document.
            </Text>
          </Box>
        </Center>
        {/* <Center
          bg="var(--mantine-color-gray-0)"
          style={{ borderRadius: 'var(--mantine-radius-lg)' }}
          m="8rem"
          bd="2px solid var(--mantine-color-cyan-7)"
        >
          <FileWithTextIcon text=".tex" color="cyan" height="15vh" />
          <Text mx="3rem" fz="5rem" c="var(--mantine-color-gray-7)">
            <FaLongArrowAltRight />
          </Text>
          <FileWithTextIcon text=".pdf" color="yellow" height="15vh" />
          
        </Center> */}
      </SimpleGrid>
    </Box>
  );
}
