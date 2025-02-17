import { useState } from 'react';
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
import styles from './registerPage.module.css';

export default function LoginPage() {
  //const [opened1, { toggle, open, close }] = useDisclosure(false);
  const [errorMsgOpened, errorMsgHandlers] = useDisclosure(false);
  const [errorDialogOpened, errorDialogHandlers] = useDisclosure(false);
  const [modalOpened, modalHandlers] = useDisclosure(false);
  const form = useForm({
    mode: 'controlled',
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
    } catch (error) {
      console.log('register error: ', error);
    }
    //open();
  };

  return (
    <>
      <BackgroundImage src="./bg13.png" radius="xs">
        <Stack h="100vh" align="stretch" justify="center">
          <Container w={840}>
            <Paper withBorder shadow="md" p={30} mt={40} radius="md" className={styles.paper}>
              <Title ta="center" className={styles.title}>
                Sign up!
                {/* Sign up to <span style={{color: 'var(--mantine-color-yellow-8)'}}>Easy</span><span style={{color: 'var(--mantine-color-cyan-8)'}}>Tex</span>! */}
              </Title>
              <Text c="dimmed" size="sm" ta="center" mt={5} mb={20}>
                Create your EasyTeX Account!
              </Text>
              <form onSubmit={form.onSubmit((values) => register(values))}>
                <SimpleGrid cols={2} spacing={100} verticalSpacing="0.3rem" p="md" pl="xl" pr="xl">
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
                <Box h={30}>
                  <Transition
                    mounted={errorMsgOpened}
                    transition="fade-up"
                    duration={200}
                    timingFunction="ease"
                    keepMounted
                  >
                    {(styles) => (
                      <Flex justify="center" align="center" style={styles}>
                        {' '}
                        <Text ta="center" size="md" c="var(--mantine-color-error)">
                          <RiErrorWarningFill />
                        </Text>
                        <Text ta="center" ml={5} mb={3} size="sm" c="var(--mantine-color-error)">
                          {' '}
                          Invalid sign up data!
                        </Text>
                      </Flex>
                    )}
                  </Transition>
                </Box>
                <Flex justify="center" pl={210} pr={210} mt="xl">
                  <Button
                    type="submit"
                    fullWidth
                    onClick={async () => {
                      errorMsgHandlers.close();

                      setTimeout(() => {
                        errorMsgHandlers.open();
                        if (!form.isValid('password') || !form.isValid('name')) {
                          errorDialogHandlers.open();
                        } else {
                          errorDialogHandlers.close();
                        }
                      }, 150);
                    }}
                  >
                    Sign up
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
          <Dialog
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
          </Dialog>
          <Modal
            opened={modalOpened}
            onClose={modalHandlers.close}
            withCloseButton={false}
            yOffset="20vh"
            size="45%"
            closeOnClickOutside={false}
            overlayProps={{ blur: 7 }}
            transitionProps={{ transition: 'fade-up' }}
          >
            <Flex justify="center" align="center" direction="column" gap="xs" p="xl">
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
