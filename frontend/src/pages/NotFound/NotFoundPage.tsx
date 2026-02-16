import { TbFileNeutral } from 'react-icons/tb';
import { Box, Button, Center, Stack, Text, Title } from '@mantine/core';

export default function NotFoundPage() {
  const title = 'Sorry...';
  const text = 'The page you are trying to open does not exist.';
  const errorCode = ' Error code: 404';

  return (
    <>
      <Center mih="max-content" w="100vw" visibleFrom="md" h="100vh" pt="3rem">
        <Text ta="right" c="var(--mantine-color-gray-5)" fz="30rem" mr="xl">
          <TbFileNeutral />
        </Text>
        <Box mb="6rem" w="30vw">
          <Title fz="6rem" c="var(--mantine-color-gray-6)" m="3rem" ml="3rem">
            {title}
          </Title>
          <Text c="var(--mantine-color-gray-6)" fz="xl" m="md" ml="3rem">
            {text}
          </Text>
          <Text c="var(--mantine-color-gray-6)" ml="3rem">
            {errorCode}
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

      <Stack
        w="100vw"
        justify="center"
        align="center"
        ta="center"
        hiddenFrom="md"
        h="100vh"
        pt="3rem"
        mih="max-content"
      >
        <Text ta="right" mb="0px" c="var(--mantine-color-gray-5)" fz="13rem">
          <TbFileNeutral />
        </Text>
        <Box mt="-5rem">
          <Title fz="5rem" c="var(--mantine-color-gray-6)" m="3rem" w="100%">
            {title}
          </Title>
          <Text c="var(--mantine-color-gray-6)" fz="xl" m="md" w="100%">
            {text}
          </Text>
          <Text c="var(--mantine-color-gray-6)" w="100%">
            {errorCode}
          </Text>
        </Box>
        <Button
          m="lg"
          bg="var(--mantine-color-gray-5)"
          onClick={() => {
            window.location = '/';
          }}
        >
          Go back to homepage
        </Button>
      </Stack>
    </>
  );
}
