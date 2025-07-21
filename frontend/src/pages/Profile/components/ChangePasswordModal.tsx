import { useState } from 'react';
import axios from 'axios';
import { FaRegCheckCircle } from 'react-icons/fa';
import { RiErrorWarningFill } from 'react-icons/ri';
import {
  Box,
  Button,
  Center,
  Flex,
  Loader,
  Modal,
  PasswordInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import InfoErrorDialog from '@/components/ErrorInfos/InfoErrorDialog';
import PasswarodRequirements from '@/components/ErrorInfos/PasswordRequirements';

type changePasswordModalPropsType = {
  userData: any;
  modalHandlers: [
    boolean,
    {
      readonly open: () => void;
      readonly close: () => void;
      readonly toggle: () => void;
    },
  ];
};

export default function ChangePasswordModal({
  userData,
  modalHandlers,
}: changePasswordModalPropsType) {
  const [errorDialogOpened, errorDialogHandlers] = useDisclosure(false);

  const [disableVerifyPasswdButton, setDisableVerifyPasswdButton] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [currentPasswordError, setCurrentPasswordError] = useState<string>('');
  //const [isPasswordVerfied, setIsPasswordVerfied] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<0 | 1 | 2>(0);
  const [newPassword, setNewPassword] = useState<{ password: string; repeatedPassword: string }>({
    password: '',
    repeatedPassword: '',
  });
  const [newPasswordError, setNewPasswordError] = useState<{
    password: string;
    repeatedPassword: string;
  }>({
    password: '',
    repeatedPassword: '',
  });

  const closeModal = () => {
    setModalContent(0);
    //setIsPasswordVerfied(false);
    setCurrentPassword('');
    setCurrentPasswordError('');
    setNewPassword({ password: '', repeatedPassword: '' });
    setNewPasswordError({ password: '', repeatedPassword: '' });
    setCurrentPasswordError('');
    errorDialogHandlers.close();
    modalHandlers[1].close();
  };

  const verifyPassword = async (): Promise<number> => {
    const response = await axios.put(
      `http://localhost:8100/auth/verifyPassword`,
      { password: currentPassword },
      {
        withCredentials: true,
      }
    );
    //console.log(response)
    return response.status;
  };

  const handlePasswordVerification = async (e) => {
    try {
      e.preventDefault();
      setDisableVerifyPasswdButton(true);
      setCurrentPasswordError('');
      const status = await verifyPassword();
      if (status === 200) {
        setModalContent(1);
      } else {
        throw new Error('Status not 200!');
      }
      //setIsPasswordVerfied(true);
      setDisableVerifyPasswdButton(false);
    } catch (error) {
      console.log(error.status);
      if (error.status === 403) {
        setCurrentPasswordError('Invalid password!');
      } else {
        setCurrentPasswordError('Something went wrong');
      }
      setDisableVerifyPasswdButton(false);
      console.log('verify password error: ', error);
    }
  };

  const changePassword = async (): Promise<number> => {
    const response = await axios.put(
      `http://localhost:8100/user/changePassword`,
      { password: newPassword.password },
      {
        withCredentials: true,
      }
    );
    return response.status;
    //console.log(response);
  };

  const handlePasswordChange = async (e) => {
    try {
      e.preventDefault();
      setDisableVerifyPasswdButton(true);
      errorDialogHandlers.close();
      setNewPasswordError({ password: '', repeatedPassword: '' });
      if (newPassword.password === newPassword.repeatedPassword) {
        const status = await changePassword();
        if (status === 200) {
          setModalContent(2);
        } else {
          throw new Error('Status not 200!');
        }
      } else {
        setNewPasswordError({
          password: '',
          repeatedPassword: 'Passwords are not the same',
        });
      }
      setDisableVerifyPasswdButton(false);
    } catch (error) {
      console.log(error.status);
      if (error.status === 400) {
        setNewPasswordError({ repeatedPassword: '', password: 'Invalid password format' });
        errorDialogHandlers.open();
      } else {
        setNewPasswordError({ repeatedPassword: '', password: 'Something went wrong' });
      }
      setDisableVerifyPasswdButton(false);
      console.log('verify password error: ', error);
    }
  };

  return (
    <>
      <Modal
        opened={modalHandlers[0]}
        onClose={closeModal}
        transitionProps={{ transition: 'fade-up' }}
        yOffset="3.5%"
        size="50vw"
        title={
          <Text c="var(--mantine-color-cyan-8)">
            <b> Change password</b>
          </Text>
        }
        centered
      >
        {modalContent === 0 ? (
          <Box h="20rem">
            <form>
              <Center p="0px" h="13rem" m="xl" mb="xs">
                <Stack w="100%" justify="space-around">
                  <Text ta="center" c="var(--mantine-color-gray-6)">
                    To change password, first verify the current one.
                  </Text>

                  <PasswordInput
                    h="5rem"
                    variant="filled"
                    label="Current password"
                    placeholder="Password"
                    error={
                      currentPasswordError !== 'Something went wrong' ? currentPasswordError : ''
                    }
                    value={currentPassword}
                    onChange={(event) => {
                      setCurrentPasswordError('');
                      setCurrentPassword(event.currentTarget.value);
                    }}
                  />
                </Stack>
              </Center>
              <Box h="1rem" p="0px" m="0px" c="var(--mantine-color-error)">
                {currentPasswordError === 'Something went wrong' ? (
                  <Flex justify="center" align="center">
                    <Text ta="center" size="md" c="var(--mantine-color-error)">
                      <RiErrorWarningFill />
                    </Text>
                    <Text ta="center" ml={5} mb={4} size="sm" c="var(--mantine-color-error)">
                      Something went wrong
                    </Text>
                  </Flex>
                ) : (
                  <></>
                )}
              </Box>
              <Flex justify="center" m="lg" mt="xl" gap="xl">
                <Button
                  type="submit"
                  w="15vw"
                  onClick={handlePasswordVerification}
                  disabled={disableVerifyPasswdButton}
                >
                  {disableVerifyPasswdButton ? <Loader size={20} /> : <> Verify current password</>}
                </Button>
                <Button w="15vw" variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
              </Flex>
            </form>
          </Box>
        ) : modalContent === 1 ? (
          <Box h="20rem">
            <form>
              <Box h="13rem" m="xl" mb="xs">
                <Flex
                  justify="center"
                  align="center"
                  ta="center"
                  c="var(--mantine-color-gray-6)"
                  m="md"
                  gap="xs"
                >
                  <FaRegCheckCircle /> Password verified successfully. You can now change it.
                </Flex>
                <PasswordInput
                  h="5rem"
                  variant="filled"
                  label="New password"
                  placeholder="Password"
                  error={
                    newPasswordError.password !== 'Something went wrong'
                      ? newPasswordError.password
                      : ''
                  }
                  value={newPassword.password}
                  onChange={(event) => {
                    setNewPassword({ ...newPassword, password: event.currentTarget.value });
                  }}
                />
                <PasswordInput
                  h="5rem"
                  variant="filled"
                  label="Repeat new password"
                  placeholder="Password"
                  error={
                    newPasswordError.password !== 'Something went wrong'
                      ? newPasswordError.repeatedPassword
                      : ''
                  }
                  value={newPassword.repeatedPassword}
                  onChange={(event) => {
                    setNewPassword({ ...newPassword, repeatedPassword: event.currentTarget.value });
                  }}
                />
              </Box>
              <Box h="1rem" p="0px" m="0px" c="var(--mantine-color-error)">
                {newPasswordError.password === 'Something went wrong' ? (
                  <Flex justify="center" align="center">
                    <Text ta="center" size="md" c="var(--mantine-color-error)">
                      <RiErrorWarningFill />
                    </Text>
                    <Text ta="center" ml={5} mb={4} size="sm" c="var(--mantine-color-error)">
                      Something went wrong
                    </Text>
                  </Flex>
                ) : (
                  <></>
                )}
              </Box>
              <Flex justify="center" m="lg" mt="xl" gap="xl">
                <Button
                  w="15vw"
                  onClick={handlePasswordChange}
                  disabled={disableVerifyPasswdButton}
                  type="submit"
                >
                  {disableVerifyPasswdButton ? <Loader size={20} /> : <> Change password</>}
                </Button>
                <Button w="15vw" variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
              </Flex>
            </form>
          </Box>
        ) : (
          <>
            <Center h="20rem" w="100%">
              <Flex direction="column" justify="center" h="100%" align="center">
                <Flex gap="md" m="xl">
                  <Text size="2rem" c="var(--mantine-color-cyan-4)">
                    <FaRegCheckCircle />
                  </Text>
                  <Text mt="0px" mb="0px" size="xl">
                    Your password has been successfully changed!
                  </Text>
                </Flex>

                <Button w="50%" m="xl" mb="0px" onClick={closeModal}>
                  Ok
                </Button>
              </Flex>
            </Center>
          </>
        )}
      </Modal>
      <InfoErrorDialog
        title="Edit account details"
        errorDialogHandlers={errorDialogHandlers}
        errorDialogOpened={errorDialogOpened}
        content={<PasswarodRequirements />}
      />
    </>
  );
}
