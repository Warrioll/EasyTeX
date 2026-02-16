import { BackgroundImage, Button, Center, Stack, Text, Title } from '@mantine/core';

export default function Encouragement() {
  const Banner = () => {
    return (
      <>
        <BackgroundImage
          src="bgPapers.jpg"
          w="100%"
          h="100%"
          radius="lg"
          style={{
            filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.2)) brightness(70%) ',
          }}
          mb="xl"
        />
        <Stack
          align="center"
          justify="center"
          h="100%"
          w="100%"
          c="white"
          ta="center"
          p="5rem"
          pt="2rem"
          gap="3rem"
          pos="absolute"
        >
          <Title fz="3rem">Sign up now!</Title>
          <Text fz="xl" w="40%">
            Create an EasyTeX account to use all it's features and enjoy creating LaTeX documents in
            EASY way!
          </Text>
          <Button
            size="md"
            radius="xl"
            w="15rem"
            bg="white"
            c="var(--mantine-color-cyan-9)"
            onClick={() => {
              window.location = '/register';
            }}
          >
            Create account!
          </Button>
        </Stack>
      </>
    );
  };

  return (
    <>
      <Center
        visibleFrom="sm"
        w="100%"
        h="100vh"
        mih="67rem"
        px="11rem"
        pb="12rem"
        pt="12rem"
        bg="var(--mantine-color-white)"
        style={{ zIndex: '10' }}
        pos="relative"
      >
        <Banner />
      </Center>
      <Center
        mih="67rem"
        hiddenFrom="sm"
        w="100%"
        h="100vh"
        px="4rem"
        pb="12rem"
        pt="12rem"
        bg="var(--mantine-color-white)"
        style={{ zIndex: '10' }}
        pos="relative"
      >
        <Banner />
      </Center>
    </>
  );
}
