import { useRef, useState } from 'react';
import axios from 'axios';
import { FaRegCheckCircle } from 'react-icons/fa';
import { RiErrorWarningFill, RiErrorWarningLine } from 'react-icons/ri';
import {
  Alert,
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Dialog,
  Flex,
  Group,
  Loader,
  Modal,
  Paper,
  PasswordInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  Transition,
} from '@mantine/core';
import { transitions } from '@mantine/core/lib/components/Transition/transitions';
import { hasLength, isEmail, matches, matchesField, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import ErrorMessage from '@/components/ErrorInfos/ErrorMessage';
import InfoErrorDialog from '@/components/ErrorInfos/InfoErrorDialog';
import PasswarodRequirements from '@/components/ErrorInfos/PasswordRequirements';
import UsernameEmailRequirements from '@/components/ErrorInfos/UsernameRequirements';
import styles from './registerPage.module.css';

export default function RegisterPage() {
  //const [opened1, { toggle, open, close }] = useDisclosure(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [errorMsgOpened, errorMsgHandlers] = useDisclosure(false);
  const [errorDialogOpened, errorDialogHandlers] = useDisclosure(false);
  const [modalOpened, modalHandlers] = useDisclosure(false);
  const [disableSignUpButton, setDisableSignUpButton] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const form = useForm({
    mode: 'controlled',
    //  onSubmitPreventDefault: 'never',
    initialValues: { name: '', email: '', password: '', repeatedPassword: '' },
    validate: {
      name: matches(
        /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._!@#$%^&*?\-]{3,30}(?<![_.])$/,
        'Invalid username'
      ),
      // email: matches(
      //   /^(?=.{1,320}$)\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})$/g,
      //   'Invalid email address'
      // ),
      email: isEmail('Invalid email address'),
      password: matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,64}$/,
        'Invalid password'
      ),
      repeatedPassword: matchesField('password', 'Passwords are not the same'),
      //password: matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Invalid password')
    },
  });

  const register = async (registerData) => {
    try {
      console.log('registerrrrrrr');
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
      // setTimeout(() => {
      //   open();
      // }, 150);
      //open();
      //...
      setDisableSignUpButton(false);
    } catch (error) {
      switch (error.response.status) {
        case 409:
          setErrorMessage('Provided email or username i already used!');
          break;
        default:
          setErrorMessage('Sorry, something went wrong!');
      }
      //setErrorMessage('Sorry, something went wrong!');
      await new Promise((resolve) => setTimeout(resolve, 200));
      errorMsgHandlers.open();
      console.log('register error: ', error);
      setDisableSignUpButton(false);
    }
    //open();
  };

  return (
    <>
      <BackgroundImage src="./bg13.png" radius="xs" miw="max-content">
        <Stack h="100vh" align="stretch" justify="center" miw="max-content" mih="max-content">
          <Container w={{ base: 500, md: 840 }}>
            <Paper withBorder shadow="md" p={30} mt={40} radius="md" className={styles.paper}>
              <Title ta="center" className={styles.title}>
                Sign up!
                {/* Sign up to <span style={{color: 'var(--mantine-color-yellow-8)'}}>Easy</span><span style={{color: 'var(--mantine-color-cyan-8)'}}>Tex</span>! */}
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
                    //console.log(errorMsgOpened);
                    errorMsgHandlers.close();
                    setErrorMessage('Invalid sign up data!');
                    //console.log('uu', validationErrors);
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
                      //console.log('click');

                      errorDialogHandlers.close();
                      errorMsgHandlers.close();

                      formRef.current?.requestSubmit();
                      //setTimeout(() => {

                      //errorMsgHandlers.open();
                      // if (!form.isValid('password') || !form.isValid('name')) {
                      //   errorDialogHandlers.open();
                      //   setErrorMessage('Invalid sign up data!');
                      //   setDisableSignUpButton(false);
                      //} //else {
                      //   errorDialogHandlers.close();
                      // }
                      // }, 150);
                    }}
                  >
                    {disableSignUpButton ? <Loader size={20} /> : <> Sign up</>}
                  </Button>
                </Flex>
              </form>
              <Group justify="space-between" mt="lg">
                {/* <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor> */}
              </Group>
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
          {/* <Dialog
            opened={errorDialogOpened}
            size="md"
            radius="md"
            p="0px"
            bg="light-dark(rgba(255,255,255,0.7),rgba(50,0,0,0.7))"
            style={{ top: 5 }}
            transitionProps={{ transition: 'pop-bottom-right', duration: 200 }}
          >
            <Alert
              variant="light"
              withCloseButton
              onClose={errorDialogHandlers.close}
              color="red"
              radius="xs"
              title="Form requirements"
              icon={
                <span style={{ fontSize: '1.2rem' }}>
                  <RiErrorWarningFill />
                </span>
              }
            >
              <Box mb="sm">
                <b>Username</b> must:
                <li> be 3-30 characters long</li>
                <li>
                  not contain any other special{' '}
                  <span style={{ marginLeft: '1.25rem' }}>characters than ._!@#$%^&*?-</span>
                </li>
              </Box>
              <Box mb="sm">
                <b>Password</b> must:
                <li>be 8-64 characters long</li>
                <li>contain min. one letter</li>
                <li>contain min. one number</li>
                <li>
                  contain min. one of @$!%*#?&{' '}
                  <span style={{ marginLeft: '1.25rem' }}>special character</span>
                </li>
              </Box>
            </Alert>
          </Dialog> */}
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
              {/* <Text size="8rem" c="#00973c"> */}
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
