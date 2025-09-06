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
import classes from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <Center w="100vw" h="100vh" pt="3rem">
      <Text ta="right" c="var(--mantine-color-gray-5)" fz="30rem" mr="xl">
        <TbFileNeutral />
      </Text>
      <Box mb="6rem" w="30vw">
        <Title fz="6rem" c="var(--mantine-color-gray-6)" m="3rem" ml="3rem">
          Sorry...
        </Title>
        <Text c="var(--mantine-color-gray-6)" fz="xl" m="md" ml="3rem">
          The page you are trying to open does not exist.
        </Text>
        <Text c="var(--mantine-color-gray-6)" ml="3rem">
          Error code: 404
        </Text>
        <Button
          bg="var(--mantine-color-gray-5)"
          ml="3rem"
          m="xl"
          onClick={() => {
            window.location = '/';
          }}
        >
          Go back to homepage
        </Button>
      </Box>
    </Center>
  );
}
