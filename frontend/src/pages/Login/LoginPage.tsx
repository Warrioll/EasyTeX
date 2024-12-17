import {
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  Dialog,
  Alert,
  Transition
} from '@mantine/core';
import { MdError } from "react-icons/md";
import { useDisclosure } from '@mantine/hooks';
import styles from './loginPage.module.css';
import { RiErrorWarningFill } from "react-icons/ri";

export default function LoginPage() {
  const [opened, { toggle, close }] = useDisclosure(false);
  return (
    // 14 lub 13
    <>
      <BackgroundImage src="./bg13.png" radius="xs" >
        <Stack h="100vh" align="stretch" justify="center" >
        
              
          <Container w={420} >
            <Paper withBorder shadow="xl" p={30} mt={40} radius="md" >
            <Title ta="center" className={styles.title}>
                Welcome back!
              </Title>
              <Text c="dimmed" size="sm" ta="center" mt={5} mb={20}>
                Do not have an account yet?{' '}
                <Anchor size="sm" href="/register" target="_blank">
                  Create account
                </Anchor>
              </Text>

              <Box  p='sm' pb='md'>
                <TextInput className={styles.input} label="Email" placeholder="you@mantine.dev" variant='filled' required />
                <PasswordInput className={styles.input} label="Password" placeholder="Your password" variant='filled' required mt="md" />
              </Box>
              <Box  h={30}>
              <Transition
        mounted={opened}
        transition='fade-up'
        duration={200}
        timingFunction="ease"
        keepMounted
      >{(styles) => <Flex  justify="center"align="center"style={styles}> <Text ta="center" size='md' c='var(--mantine-color-error)'><RiErrorWarningFill /></Text><Text ta="center" ml={5}mb={3} size='sm' c='var(--mantine-color-error)' > Invalid password or email!</Text></Flex>}
                                   </Transition>
              
              </Box>
              <Button fullWidth mt="xl" onClick={toggle}>
                Sign in
              </Button>
            </Paper>
          </Container>
        </Stack>
        {/* <Dialog opened={opened}  onClose={close} size="lg" radius="md" p='0px' bg='rgba(255,255,255,0.5)' style={{top: 5}}>
        <Alert variant="light" color="red" radius="xs" title="Alert title" icon='E'>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis, quae tempore necessitatibus placeat saepe.
    </Alert>
      </Dialog> */}
      </BackgroundImage>
    </>
  );
}
