import { useEffect, useState } from 'react';
import axios from 'axios';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Box, Button, Flex, Loader, Modal, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ErrorMessage from '@/components/ErrorInfos/ErrorMessage';
import InfoErrorDialog from '@/components/ErrorInfos/InfoErrorDialog';
import UsernameEmailRequirements from '@/components/ErrorInfos/UsernameRequirements';

type editAccountDetailsModalPropsType = {
  userData: {
    user: { _id: any; userName: string; email: string };
    documents: number;
    figures: number;
  } | null;
  modalHandlers: readonly [
    boolean,
    {
      readonly open: () => void;
      readonly close: () => void;
      readonly toggle: () => void;
    },
  ];
};

export default function EditAccountDetailsModal({
  userData,
  modalHandlers,
}: editAccountDetailsModalPropsType) {
  const [errorDialogOpened, errorDialogHandlers] = useDisclosure(false);
  const [errorMessageOpened, errorMessageHandlers] = useDisclosure(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [usernameErrorInfo, setUsernameErrorInfo] = useState<string | null>(null);
  const [emailErrorInfo, setEmailErrorInfo] = useState<string | null>(null);
  const [disableRenameButton, setDisableRenameButton] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');

  const usernameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._!@#$%^&*?\-]{3,30}(?<![_.])$/;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

  const editAccountDetails = async () => {
    const response = await axios.put(
      `http://localhost:8100/user/editUserDetails`,
      { userName: username, email },
      {
        withCredentials: true,
      }
    );
    console.log(response);
  };

  const closeModal = () => {
    modalHandlers[1].close();
    setEmailErrorInfo(null);
    setUsernameErrorInfo(null);
    errorDialogHandlers.close();
    errorMessageHandlers.close();
  };

  const saveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      //setErrorMessage('');
      setDisableRenameButton(true);
      setEmailErrorInfo(null);
      setUsernameErrorInfo(null);

      errorDialogHandlers.close();
      await errorMessageHandlers.close();
      await new Promise((resolve) => setTimeout(resolve, 200));
      await editAccountDetails();
      //setUsernameErrorInfo(null);
      //setEmailErrorInfo(null);
      modalHandlers[1].close();
      errorDialogHandlers.close();
      setDisableRenameButton(false);
      location.reload();
    } catch (e) {
      console.log(`Edit account details error:`, e);
      if (e.status === 400) {
        setErrorMessage('Invalid account data!');
        if (!emailRegex.test(email as string)) {
          setEmailErrorInfo('Invalid email');
        }
        if (!usernameRegex.test(username as string)) {
          errorDialogHandlers.open();
          setUsernameErrorInfo('Invalid username');
        }
      } else {
        setErrorMessage('Something went wrong!');
      }

      setDisableRenameButton(false);
      errorMessageHandlers.open();
    }
  };

  useEffect(() => {
    setEmail(userData?.user.email);
    setUsername(userData?.user.userName);
  }, [userData, modalHandlers[0]]);

  return (
    <>
      <Modal
        opened={modalHandlers[0]}
        onClose={closeModal}
        transitionProps={{ transition: 'fade-up' }}
        centered
        //yOffset="13%"
        size="50vw"
        title={
          <Text c="var(--mantine-color-cyan-8)">
            <b>Edit account details</b>
          </Text>
        }
      >
        <form>
          <TextInput
            h="5rem"
            label="Username"
            placeholder="Username"
            value={username}
            error={usernameErrorInfo}
            onChange={(event) => {
              setUsernameErrorInfo(null);
              setUsername(event.currentTarget.value);
            }}
            variant="filled"
            m="lg"
          />
          <TextInput
            h="5rem"
            variant="filled"
            label="Email"
            placeholder="Email"
            value={email}
            error={emailErrorInfo}
            onChange={(event) => {
              setEmailErrorInfo(null);
              setEmail(event.currentTarget.value);
            }}
            m="lg"
          />

          <ErrorMessage errorMessage={errorMessage} errorMessageOpened={errorMessageOpened} />
          <Flex justify="center" m="lg" mt="xl" gap="xl">
            <Button w="15vw" type="submit" onClick={saveChanges} disabled={disableRenameButton}>
              {disableRenameButton ? <Loader size={20} /> : <> Save changes</>}
            </Button>
            <Button w="15vw" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
          </Flex>
        </form>
      </Modal>
      <InfoErrorDialog
        title="Edit account details"
        errorDialogHandlers={errorDialogHandlers}
        errorDialogOpened={errorDialogOpened}
        content={<UsernameEmailRequirements />}
      />
    </>
  );
}
