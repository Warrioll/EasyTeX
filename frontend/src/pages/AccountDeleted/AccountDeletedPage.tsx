import { FaRegCheckCircle } from 'react-icons/fa';
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

export default function AccountDeletedPage() {
  return (
    <Center h="100vh" w="100vw">
      <Paper withBorder shadow="md" radius="md" p="xl" pl="6rem" pr="6rem">
        <Stack justify="center" align="center" h="100%">
          <Text fz="8rem" c="var(--mantine-color-cyan-4)">
            <FaRegCheckCircle />
          </Text>
          <Title c="var(--mantine-color-gray-7)" mt="-2rem" m="xl" mb="xs">
            Your account has been successfully deleted.
          </Title>
          <Text c="var(--mantine-color-gray-6)" mb="xl">
            Your account and all associated files no longer exist.
          </Text>
          <Button
            bg="var(--mantine-color-cyan-5)"
            w="15vw"
            mb="2rem"
            onClick={() => {
              localStorage.removeItem('accountDeleted');
              window.location = '/';
            }}
          >
            Go to homepage
          </Button>
        </Stack>
      </Paper>
    </Center>
  );
}
