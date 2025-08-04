import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MdError } from 'react-icons/md';
import { RiErrorWarningFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  Flex,
  Group,
  Loader,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  Transition,
} from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { checkIfLoggedIn, checkIfNotLoggedIn } from '@/ApiHandlers/AuthHandler';
import ErrorMessage from '@/components/ErrorInfos/ErrorMessage';
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
    // validate: {
    //   email: isEmail('Not an email address'),
    // },
  });

  const login = async (loginData) => {
    console.log('login Data: ', loginData);
    try {
      close();
      setDisableLogInButton(true);
      //console.log('data to - log in:', loginData.email);

      const response = await axios.post('http://localhost:8100/auth/login', loginData, {
        withCredentials: true,
      });
      setDisableLogInButton(false);
      navigate('/dashboard');
    } catch (e) {
      if (e.status === 404 || e.status === 403) {
        setErrorMsg('Invalid password or email!');
        console.log(e.status);
      } else {
        setErrorMsg('Something went wrong!');
        console.log(e.status);
      }

      //close()
      //open();
      await new Promise((resolve) => setTimeout(resolve, 200));
      open();
      setDisableLogInButton(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      //const authCookie = Cookies.get('auth');
      // if (authCookie !== undefined || authCookie != null) {
      //   navigate('/dashboard');
      // }
      await checkIfNotLoggedIn();
      // console.log('userId:', userId);
      // if (userId !== null || userId !== undefined) {
      //   // navigate('/dashboard');
      // }
    };
    checkAuth();
  }, []);

  return (
    // 14 lub 13
    <>
      <BackgroundImage src="./bg13.png" radius="xs">
        <Stack h="100vh" align="stretch" justify="center">
          <Container w={420}>
            <Paper withBorder shadow="xl" p={30} mt={40} radius="md">
              <form onSubmit={form.onSubmit((values) => login(values))}>
                <Title ta="center" className={styles.title}>
                  Welcome back!
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5} mb={20}>
                  Do not have an account yet?{' '}
                  <Anchor size="sm" href="/register" target="_blank">
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
        {/* <Dialog opened={opened}  onClose={close} size="lg" radius="md" p='0px' bg='rgba(255,255,255,0.5)' style={{top: 5}}>
        <Alert variant="light" color="red" radius="xs" title="Alert title" icon='E'>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis, quae tempore necessitatibus placeat saepe.
    </Alert>
      </Dialog> */}
      </BackgroundImage>
    </>
  );
}
