import { useRef, useState } from 'react';
import axios from 'axios';
import { FaRegCheckCircle } from 'react-icons/fa';
import {
  BackgroundImage,
  Box,
  Button,
  Container,
  Flex,
  Loader,
  Modal,
  Paper,
  PasswordInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { matches, matchesField, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import ErrorMessage from '@/components/ErrorInfos/ErrorMessage';
import InfoErrorDialog from '@/components/ErrorInfos/InfoErrorDialog';
import PasswarodRequirements from '@/components/ErrorInfos/PasswordRequirements';
import UsernameEmailRequirements from '@/components/ErrorInfos/UsernameRequirements';
import Logo from '@/svg/Logo';
import styles from './registerPage.module.css';

export default function RegisterPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errorMsgOpened, errorMsgHandlers] = useDisclosure(false);
  const [errorDialogOpened, errorDialogHandlers] = useDisclosure(false);
  const [modalOpened, modalHandlers] = useDisclosure(false);
  const [disableSignUpButton, setDisableSignUpButton] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const form = useForm({
    mode: 'controlled',

    initialValues: { name: '', email: '', password: '', repeatedPassword: '' },
    validate: {
      name: matches(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._!@#$^&*?\-]+(?<![_.])$/, 'Invalid username'),

      email: matches(
        /^(?=.{5,320}$)\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        'Invalid email address'
      ),
      password: matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!*#?&])[A-Za-z\d@$!*#?&]{8,}$/,
        'Invalid password'
      ),
      repeatedPassword: matchesField('password', 'Passwords are not the same'),
    },
  });

  const register = async (registerData) => {
    try {
      const response = await axios.post(
        'http://localhost:8100/user/createNewAccount',
        {
          email: registerData.email,
          userName: registerData.name,
          password: registerData.password,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      modalHandlers.open();
      setDisableSignUpButton(false);
    } catch (error) {
      switch (error.response.status) {
        case 406:
          setErrorMessage('Invalid sign up data!');
          await new Promise((resolve) => setTimeout(resolve, 200));
          errorDialogHandlers.open();
          errorMsgHandlers.open();
          break;
        case 409:
          setErrorMessage('Provided email or username i already used!');
          break;
        case 411:
          setErrorMessage('Invalid sign up data!');
          await new Promise((resolve) => setTimeout(resolve, 200));
          errorDialogHandlers.open();
          errorMsgHandlers.open();
          break;
        default:
          setErrorMessage('Sorry, something went wrong!');
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
      errorMsgHandlers.open();
      console.error('register error: ', error);
      setDisableSignUpButton(false);
    }
  };

  return (
    <>
      <BackgroundImage src="./bg.png" radius="xs" miw="max-content">
        <Stack h="100vh" align="stretch" justify="center" miw="max-content" mih="max-content">
          <Container w={{ base: 500, md: 900 }}>
            <Paper withBorder shadow="md" p={30} mt={40} radius="md" className={styles.paper}>
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
                Create account!
              </Title>
              <Text c="dimmed" size="sm" ta="center" mt={5} mb={20}>
                Create your EasyTeX Account!
              </Text>
              <form
                ref={formRef}
                onSubmit={form.onSubmit(
                  async (values) => {
                    setDisableSignUpButton(true);
                    await register(values);
                    setDisableSignUpButton(false);
                  },
                  async (validationErrors, values, event) => {
                    errorMsgHandlers.close();
                    setErrorMessage('Invalid sign up data!');

                    await new Promise((resolve) => setTimeout(resolve, 200));
                    errorDialogHandlers.open();
                    errorMsgHandlers.open();

                    setDisableSignUpButton(false);
                  }
                )}
              >
                <SimpleGrid
                  cols={2}
                  spacing={100}
                  verticalSpacing="0.3rem"
                  p="md"
                  pl="xl"
                  pr="xl"
                  visibleFrom="md"
                >
                  <Box>
                    <Box h="5.5rem">
                      <TextInput
                        {...form.getInputProps('name')}
                        variant="filled"
                        label="Username"
                        placeholder="Username"
                        required
                        tabIndex={0}
                      />
                    </Box>
                    <Box h="5.5rem">
                      <TextInput
                        {...form.getInputProps('email')}
                        variant="filled"
                        label="Email"
                        placeholder="Email"
                        required
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Box h="5.5rem">
                      <PasswordInput
                        {...form.getInputProps('password')}
                        variant="filled"
                        label="Password"
                        placeholder="Your password"
                        required
                      />
                    </Box>

                    <Box h="5.5rem">
                      <PasswordInput
                        {...form.getInputProps('repeatedPassword')}
                        variant="filled"
                        label="Reapat Password"
                        placeholder="Your password"
                        required
                      />
                    </Box>
                  </Box>
                </SimpleGrid>

                <Stack hiddenFrom="md">
                  <Box>
                    <Box h="5.5rem">
                      <TextInput
                        {...form.getInputProps('name')}
                        variant="filled"
                        label="Username"
                        placeholder="Username"
                        required
                        tabIndex={0}
                      />
                    </Box>
                    <Box h="5.5rem">
                      <TextInput
                        {...form.getInputProps('email')}
                        variant="filled"
                        label="Email"
                        placeholder="Email"
                        required
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Box h="5.5rem">
                      <PasswordInput
                        {...form.getInputProps('password')}
                        variant="filled"
                        label="Password"
                        placeholder="Your password"
                        required
                      />
                    </Box>

                    <Box h="5.5rem">
                      <PasswordInput
                        {...form.getInputProps('repeatedPassword')}
                        variant="filled"
                        label="Reapat Password"
                        placeholder="Your password"
                        required
                      />
                    </Box>
                  </Box>
                </Stack>

                <ErrorMessage errorMessage={errorMessage} errorMessageOpened={errorMsgOpened} />
                <Flex justify="center" pl={210} pr={210} mt="xl">
                  <Button
                    type="submit"
                    miw="15rem"
                    fullWidth
                    disabled={disableSignUpButton}
                    onClick={async () => {
                      errorDialogHandlers.close();
                      errorMsgHandlers.close();

                      formRef.current?.requestSubmit();
                    }}
                  >
                    {disableSignUpButton ? <Loader size={20} /> : <> Sign up</>}
                  </Button>
                </Flex>
              </form>
            </Paper>
          </Container>
          <InfoErrorDialog
            title="Form requirements"
            errorDialogHandlers={errorDialogHandlers}
            errorDialogOpened={errorDialogOpened}
            content={
              <>
                <UsernameEmailRequirements />
                <PasswarodRequirements />
              </>
            }
          />
          <Modal
            opened={modalOpened}
            onClose={modalHandlers.close}
            withCloseButton={false}
            centered
            size="auto"
            closeOnClickOutside={false}
            overlayProps={{ blur: 7 }}
            transitionProps={{ transition: 'fade-up' }}
          >
            <Flex
              justify="center"
              align="center"
              direction="column"
              gap="xs"
              p="xl"
              ta="center"
              miw={{ base: '10rem', md: '50rem' }}
            >
              <Title mb="sm" c="var(--mantine-color-cyan-8)">
                Congratulations!
              </Title>
              <Text mt="0px" mb="0px" size="xl">
                <b>Your account has been created succesfully!</b>
              </Text>
              <Text mt="0px" mb="0px">
                Now you can sign in.
              </Text>
              <Text size="6rem" c="var(--mantine-color-cyan-4)" mt="lg" mb="lg">
                <FaRegCheckCircle />
              </Text>

              <Button
                w="50%"
                onClick={() => {
                  window.location.href = '/login';
                }}
              >
                Sign in
              </Button>
            </Flex>
          </Modal>
        </Stack>
      </BackgroundImage>
    </>
  );
}
