import { FaRegTimesCircle } from 'react-icons/fa';
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';

export default function SessionExpiredPage() {
  return (
    <Center h="100vh" w="100vw">
      <Paper withBorder shadow="md" radius="md" p="xl" pl="6rem" pr="6rem">
        <Stack justify="center" align="center" h="100%">
          <Text fz="8rem" c="var(--mantine-color-red-4)">
            <FaRegTimesCircle />
          </Text>
          <Title c="var(--mantine-color-gray-7)" mt="-2rem" m="xl" mb="xs">
            You are not signed in or your session has expired.
          </Title>
          <Text c="var(--mantine-color-gray-6)" mb="xl">
            Please sign in to your EasyTeX account.
          </Text>
          <Button
            bg="var(--mantine-color-red-5)"
            w="15vw"
            onClick={() => {
              localStorage.removeItem('401');
              window.location = '/login';
            }}
          >
            Sign in here
          </Button>
          <Text c="var(--mantine-color-gray-6)" m="5rem" mb="0px">
            Error code: 401
          </Text>
        </Stack>
      </Paper>
    </Center>
  );
}
