import { useEffect, useState } from 'react';
import axios from 'axios';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Box, Button, Flex, Loader, Modal, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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

  const [usernameErrorInfo, setUsernameErrorInfo] = useState<string | null>(null);
  const [emailErrorInfo, setEmailErrorInfo] = useState<string | null>(null);
  const [disableRenameButton, setDisableRenameButton] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [isSthWrong, setIsSthWrong] = useState<boolean>(false);

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
  };

  const saveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setDisableRenameButton(true);
      setEmailErrorInfo(null);
      setUsernameErrorInfo(null);
      setIsSthWrong(false);
      errorDialogHandlers.close();
      await editAccountDetails();
      //setUsernameErrorInfo(null);
      //setEmailErrorInfo(null);
      modalHandlers[1].close();
      errorDialogHandlers.close();
      setDisableRenameButton(false);
      location.reload();
    } catch (e) {
      console.log(`Edit account details error:`, e);
      if (e.status !== 400) {
        //setRenameErrorInfo('Invalid username or email');
        //   errorDialogHandlers.open();
        // } else {
        //setRenameErrorInfo('Something went wrong');
        setIsSthWrong(true);
      }
      if (!emailRegex.test(email as string)) {
        setEmailErrorInfo('Invalid email');
      }
      if (e.status === 400 && !usernameRegex.test(username as string)) {
        errorDialogHandlers.open();
        setUsernameErrorInfo('Invalid username');
      }

      setDisableRenameButton(false);
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
          <Box h="1rem" p="0px" m="0px" c="var(--mantine-color-error)">
            {isSthWrong ? (
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
