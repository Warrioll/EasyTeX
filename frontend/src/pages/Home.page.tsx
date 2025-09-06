import { Button, Center, Stack, Text } from '@mantine/core';
import Logo from '@/svg/Logo';

export function HomePage() {
  return (
    <Stack justify="center" align="center" h="100%">
      <Center fz="xl" mt="30vh" h="100%">
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
      <Text fz="xl" m="xl">
        Here will be homepage
      </Text>
      <Center>
        <Button
          onClick={() => {
            window.location = '/login';
          }}
          m="xl"
          w="10rem"
        >
          Sign in
        </Button>
        <Button
          w="10rem"
          m="xl"
          onClick={() => {
            window.location = '/register';
          }}
        >
          Sign up
        </Button>
      </Center>
    </Stack>
  );
}
