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

  const saveChanges = async () => {
    try {
      setDisableRenameButton(true);
      setIsSthWrong(false);
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
        //setRenameErrorInfo('Invalid username or email');
        errorDialogHandlers.open();
      } else {
        //setRenameErrorInfo('Something went wrong');
        setIsSthWrong(true);
      }

      setDisableRenameButton(false);
    }
  };

  useEffect(() => {
    setEmail(userData?.user.email);
    setUsername(userData?.user.userName);
  }, [userData]);

  return (
    <>
      <Modal
        opened={modalHandlers[0]}
        onClose={modalHandlers[1].close}
        transitionProps={{ transition: 'fade-up' }}
        yOffset="3.5%"
        size="50vw"
        title={
          <Text c="var(--mantine-color-cyan-8)">
            <b>Edit account details</b>
          </Text>
        }
      >
        <TextInput
          h="5rem"
          label="Username"
          placeholder="Username"
          value={username}
          error={usernameErrorInfo}
          onChange={(event) => {
            setUsername(event.currentTarget.value);
            if (usernameRegex.test(event.currentTarget.value)) {
              setUsernameErrorInfo(null);
            } else {
              setUsernameErrorInfo('Invalid username');
            }
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
            setEmail(event.currentTarget.value);
            if (emailRegex.test(event.currentTarget.value)) {
              setEmailErrorInfo(null);
            } else {
              setEmailErrorInfo('Invalid email');
            }
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
          <Button w="15vw" onClick={saveChanges} disabled={disableRenameButton}>
            {disableRenameButton ? <Loader size={20} /> : <> Save changes</>}
          </Button>
          <Button w="15vw" variant="outline" onClick={modalHandlers[1].close}>
            Cancel
          </Button>
        </Flex>
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
