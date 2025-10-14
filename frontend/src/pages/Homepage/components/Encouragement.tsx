import { BackgroundImage, Button, Center, Stack, Text, Title } from '@mantine/core';

export default function Encouragement() {
  return (
    <Center w="100%" h="100vh" px="11rem" pb="12rem" pt="10rem" bg="var(--mantine-color-white)" style={{zIndex: '10'}} pos='relative'>
      <BackgroundImage
        src="bgDesk.jpg"
        w="100%"
        h="100%"
        radius="lg"
        bd="5px solid var(--mantine-color-cyan-9) "
        style={{
          filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.2))',
        }}
        mb="xl"

        //style={{ filter: 'blur(5px)', clipPath: ' inset(0 0 0 0)' }}
      >
        <Stack align="center" justify="center" h="100%" c="white" ta="center" p="5rem" gap="3rem">
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
      </BackgroundImage>
    </Center>
  );
}
