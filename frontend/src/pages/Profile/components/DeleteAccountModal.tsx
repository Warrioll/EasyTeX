import { useState } from 'react';
import axios from 'axios';
import { FaRegTrashAlt } from 'react-icons/fa';
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
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ErrorMessage from '@/components/ErrorInfos/ErrorMessage';

type deleteAccountModalPropsType = {
  userData: any;
  modalHandlers: readonly [
    boolean,
    {
      readonly open: () => void;
      readonly close: () => void;
      readonly toggle: () => void;
    },
  ];
};

export default function DeleteAccountModal({
  userData,
  modalHandlers,
}: deleteAccountModalPropsType) {
  const [errorMessageOpened, errorMessageHandlers] = useDisclosure(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [disableVerifyPasswdButton, setDisableVerifyPasswdButton] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  //const [currentPasswordError, setCurrentPasswordError] = useState<string>('');
  //const [isPasswordVerfied, setIsPasswordVerfied] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<0 | 1>(0);
  const [deletionPhrase, setDeletionPhrase] = useState<string>('');

  const closeModal = () => {
    modalHandlers[1].close();
    setModalContent(0);
    //setIsPasswordVerfied(false);
    setCurrentPassword('');
    //setCurrentPasswordError('');
    setDeletionPhrase('');
    //setCurrentPasswordError('');
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

  const handlePasswordVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setDisableVerifyPasswdButton(true);
      //setCurrentPasswordError('');
      await errorMessageHandlers.close();
      await new Promise((resolve) => setTimeout(resolve, 200));
      const status = await verifyPassword();
      if (status === 200) {
        setModalContent(1);
        //setCurrentPasswordError('');
      } else {
        throw new Error('Status not 200!');
      }
      //setIsPasswordVerfied(true);
      setDisableVerifyPasswdButton(false);
    } catch (error) {
      console.log(error.status);
      if (error.status === 403) {
        //setCurrentPasswordError('Invalid password!');
        setErrorMessage('Invalid password!');
        await errorMessageHandlers.open();
      } else {
        //setCurrentPasswordError('Something went wrong');
        setErrorMessage('Something went wrong!');
        await errorMessageHandlers.open();
      }
      setDisableVerifyPasswdButton(false);
      console.log('verify password error: ', error);
    }
  };

  const deleteAccount = async (): Promise<number> => {
    const response = await axios.delete(`http://localhost:8100/user/deleteAccount`, {
      withCredentials: true,
    });
    return response.status;
    //console.log(response);
  };

  const handleDeleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setDisableVerifyPasswdButton(true);
      await errorMessageHandlers.close();
      await new Promise((resolve) => setTimeout(resolve, 200));
      if (deletionPhrase === 'delete my account') {
        const status = await deleteAccount();
        if (status === 200) {
          window.location.href = '/login';
        } else {
          throw new Error('Status not 200!');
        }
      } else {
        setErrorMessage('The phrase does not match!');
        await errorMessageHandlers.open();
        //setCurrentPasswordError('The phrase does not match!');
      }

      setDisableVerifyPasswdButton(false);
    } catch (error) {
      console.log(error.status);
      //setCurrentPasswordError('Something went wrong');
      setErrorMessage('Something went wrong!');
      await errorMessageHandlers.open();
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
          <Text c="var(--mantine-color-error)">
            <b> Delete account</b>
          </Text>
        }
        centered
      >
        {modalContent === 0 ? (
          <Box h="22rem">
            <form>
              <Center p="0px" h="15rem" m="xl" mb="xs">
                <Stack w="100%" justify="space-around">
                  <Text ta="center" c="var(--mantine-color-gray-6)">
                    To delete account, first verify your password.
                  </Text>

                  <PasswordInput
                    h="5rem"
                    variant="filled"
                    label="Password"
                    placeholder="Password"
                    value={currentPassword}
                    onChange={(event) => {
                      //setCurrentPasswordError('');
                      setCurrentPassword(event.currentTarget.value);
                    }}
                  />
                </Stack>
              </Center>
              <ErrorMessage errorMessage={errorMessage} errorMessageOpened={errorMessageOpened} />
              <Flex justify="center" m="lg" mt="xl" gap="xl">
                <Button
                  type="submit"
                  w="15vw"
                  onClick={handlePasswordVerification}
                  disabled={disableVerifyPasswdButton}
                  color="var(--mantine-color-error)"
                >
                  {disableVerifyPasswdButton ? <Loader size={20} /> : <> Verify password</>}
                </Button>
                <Button
                  w="15vw"
                  color="var(--mantine-color-error)"
                  variant="outline"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </Flex>
            </form>
          </Box>
        ) : (
          <>
            <Box h="22rem">
              <Box h="15rem" m="xl" mb="xs">
                <Stack justify="center" align="center" h="100%" ta="center" m="md" gap="xs">
                  <Title order={3}>Are you sure you want to delete your account?</Title>
                  <Text c="var(--mantine-color-gray-6)">
                    All data and files connected with this account will be deleted.
                  </Text>
                  <Text c="var(--mantine-color-error)" w="800">
                    <b>This action is irreversable!</b>
                  </Text>
                  <Text c="var(--mantine-color-gray-6)" mt="xl" mb="md">
                    To proceed type in below "delete my account" and click "Yes, delete my account"
                    button.
                  </Text>
                  <TextInput
                    placeholder="Enter phrase to proceed"
                    variant="filled"
                    w="100%"
                    // error={
                    //   currentPasswordError !== 'Something went wrong' ? currentPasswordError : ''
                    // }
                    value={deletionPhrase}
                    onChange={(event) => {
                      //setCurrentPasswordError('');
                      setDeletionPhrase(event.currentTarget.value);
                    }}
                  />
                </Stack>
              </Box>
              <ErrorMessage errorMessage={errorMessage} errorMessageOpened={errorMessageOpened} />
              <Flex justify="center" m="lg" mt="xl" gap="xl">
                <Button
                  w="15vw"
                  onClick={handleDeleteAccount}
                  disabled={disableVerifyPasswdButton}
                  //type="submit"
                  color="var(--mantine-color-error)"
                  leftSection={!disableVerifyPasswdButton && <FaRegTrashAlt />}
                >
                  {disableVerifyPasswdButton ? <Loader size={20} /> : <>Yes, delete my account</>}
                </Button>
                <Button
                  w="15vw"
                  variant="outline"
                  color="var(--mantine-color-error)"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </Flex>
            </Box>
          </>
        )}
      </Modal>
    </>
  );
}
