import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Container,
  Flex,
  Loader,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { checkIfNotLoggedIn } from '@/ApiHandlers/AuthHandler';
import ErrorMessage from '@/components/ErrorInfos/ErrorMessage';
import Logo from '@/svg/Logo';
import styles from './loginPage.module.css';

export default function LoginPage() {
  const [opened, { toggle, open, close }] = useDisclosure(false);
  const [disableLogInButton, setDisableLogInButton] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState('Invalid password or email!');
  const navigate = useNavigate();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
  });

  const login = async (loginData) => {
    try {
      close();
      setDisableLogInButton(true);
      const response = await axios.post('http://localhost:8100/auth/login', loginData, {
        withCredentials: true,
      });
      setDisableLogInButton(false);
      navigate('/dashboard');
    } catch (e) {
      console.error('Login error: ', e.status);
      if (e.status === 404 || e.status === 403) {
        setErrorMsg('Invalid password or email!');
      } else {
        setErrorMsg('Something went wrong!');
      }

      await new Promise((resolve) => setTimeout(resolve, 200));
      open();
      setDisableLogInButton(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      await checkIfNotLoggedIn();
    };
    checkAuth();
  }, []);

  return (
    <>
      <BackgroundImage src="./bg.png" radius="xs">
        <Stack h="100vh" align="stretch" justify="center" mih="max-content">
          <Container w={420}>
            <Paper withBorder shadow="xl" p={30} mt={40} radius="md">
              <form onSubmit={form.onSubmit((values) => login(values))}>
                <Flex mb="md" mt="-0.5rem" justify="center" align="center">
                  <Logo width="1.5rem" />
                  <Text mt="0.1rem" c="var(--mantine-color-yellow-8)" fz="xl" fw="700" ml="sm">
                    Easy
                  </Text>
                  <Text mt="0.1rem" fz="xl" fw="700" c="var(--mantine-color-cyan-9)">
                    TeX
                  </Text>
                </Flex>
                <Title ta="center" className={styles.title}>
                  Welcome back!
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5} mb={20}>
                  Do not have an account yet?{' '}
                  <Anchor size="sm" href="/register">
                    Create account
                  </Anchor>
                </Text>

                <Box p="sm" pb="md">
                  <TextInput
                    className={styles.input}
                    label="Email"
                    placeholder="you@easytex.com"
                    variant="filled"
                    required
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                  />
                  <PasswordInput
                    className={styles.input}
                    label="Password"
                    placeholder="Your password"
                    variant="filled"
                    required
                    mt="md"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                  />
                </Box>

                <ErrorMessage errorMessage={errorMsg} errorMessageOpened={opened} />
                <Button
                  type="submit"
                  fullWidth
                  mt="xl"
                  onClick={close}
                  disabled={disableLogInButton}
                >
                  {disableLogInButton ? <Loader size={20} /> : <> Sign in</>}
                </Button>
              </form>
            </Paper>
          </Container>
        </Stack>
      </BackgroundImage>
    </>
  );
}
