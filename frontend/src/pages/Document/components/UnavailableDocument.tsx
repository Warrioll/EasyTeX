import { TbFileNeutral, TbFileSad } from 'react-icons/tb';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Group,
  Image,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import classes from './UnavailableDocument.module.css';

export default function UnavailableDocument() {
  return (
    <Center w="99vw" h="calc(100vh - 50px)" pt="3rem">
      <Text ta="right" c="var(--mantine-color-gray-5)" fz="30rem" mr="xl">
        <TbFileNeutral />
      </Text>
      <Box mb="6rem" w="32vw">
        <Title fz="6rem" c="var(--mantine-color-gray-6)" m="3rem" ml="3rem">
          Sorry...
        </Title>
        <Text c="var(--mantine-color-gray-6)" fz="xl" m="md" ml="3rem">
          The document you are trying to open is unavailable.
        </Text>
        <Text c="var(--mantine-color-gray-6)" ml="3rem">
          This document may not exist, you may not have access to it, or something may have gone
          wrong.
        </Text>
        <Button
          bg="var(--mantine-color-gray-5)"
          ml="3rem"
          m="xl"
          onClick={() => {
            window.localStorage.removeItem('unavailableDocument');
            window.location = '/dashboard';
          }}
        >
          Go back to dashboard
        </Button>
      </Box>
    </Center>
  );
}
