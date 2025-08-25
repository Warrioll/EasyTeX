import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';
import { FaArrowLeft, FaRegTrashAlt } from 'react-icons/fa';
import { RiErrorWarningFill } from 'react-icons/ri';
import {
  Box,
  Button,
  Flex,
  Group,
  Loader,
  LoadingOverlay,
  Modal,
  SimpleGrid,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ErrorMessage from '../ErrorInfos/ErrorMessage';
import InfoErrorDialog from '../ErrorInfos/InfoErrorDialog';

type renameModalPropsType = {
  renameModalHandlers: readonly [
    boolean,
    {
      readonly open: () => void;
      readonly close: () => void;
      readonly toggle: () => void;
    },
  ];
  thingToRename: string;
  renameState: [string, Dispatch<SetStateAction<string>>];
  renameFunction: () => Promise<void>;
};

export default function RenameModal({
  renameModalHandlers,
  thingToRename,
  renameFunction,

  renameState,
}: renameModalPropsType) {
  //const [renameErrorInfo, setRenameErrorInfo] = useState<string | null>(null);
  const [disableRenameButton, setDisableRenameButton] = useState<boolean>(false);
  const [errorDialogOpened, errorDialogHandlers] = useDisclosure(false);
  const [documentName, setDocumentName] = renameState;

  const [errorMessageOpened, errorMessageHandlers] = useDisclosure(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  //const nameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9. _!@#$%^&-]{3,255}(?<![_.])$/g;
  const closeModal = () => {
    renameModalHandlers[1].close();
    errorDialogHandlers.close();
    errorMessageHandlers.close();
    setErrorMessage('');
  };

  const renameThing = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setDisableRenameButton(true);
      errorDialogHandlers.close();
      await errorMessageHandlers.close();
      await new Promise((resolve) => setTimeout(resolve, 200));
      await renameFunction();
      //setRenameErrorInfo(null);
      renameModalHandlers[1].close();
      errorDialogHandlers.close();
      setDisableRenameButton(false);
    } catch (e) {
      console.log(`Rename ${thingToRename} error:`, e);
      if (e.status === 422) {
        setErrorMessage('Invalid name format!');
        errorMessageHandlers.open();
        errorDialogHandlers.open();
      } else {
        //setRenameErrorInfo('Something went wrong');
        setErrorMessage('Something went wrong!');
        errorMessageHandlers.open();
      }

      setDisableRenameButton(false);
    }
  };

  // useEffect(() => {
  //   setRenameErrorInfo(null);
  // }, [renameModalHandlers[0]]);

  return (
    <>
      <Modal
        opened={renameModalHandlers[0]}
        onClose={closeModal}
        transitionProps={{ transition: 'fade-up' }}
        size="lg"
        //yOffset="15%"
        centered
        title={
          <Text c="var(--mantine-color-cyan-8)">
            <b>Rename {thingToRename.toLocaleLowerCase()}</b>
          </Text>
        }
      >
        <SimpleGrid mt="0px" cols={1} verticalSpacing="xl" p="xl" pt="md" pb="md">
          <form>
            <Box h="4.5rem" m="xl" mb="xs" mt="0px">
              <TextInput
                mt="lg"
                label={`${thingToRename} name`}
                placeholder="Your document name"
                variant="filled"
                required
                value={documentName}
                onChange={(event) => {
                  setDocumentName(event.currentTarget.value);
                  //setRenameErrorInfo(null);
                  // if (nameRegex.test(event.currentTarget.value)) {
                  //   setRenameErrorInfo(null);
                  // } else {
                  //   setRenameErrorInfo('Invalid name');
                  // }
                }}
                // key={form.key('email')}
                // {...form.getInputProps('email')}
              />
            </Box>
            <ErrorMessage errorMessage={errorMessage} errorMessageOpened={errorMessageOpened} />
            <SimpleGrid cols={2} spacing="xl" mt="md">
              <Button onClick={renameThing} type="submit" disabled={disableRenameButton}>
                {disableRenameButton ? <Loader size={20} /> : <> Rename</>}
              </Button>
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
            </SimpleGrid>
          </form>
        </SimpleGrid>
      </Modal>

      <InfoErrorDialog
        title={`${thingToRename} name requirement`}
        errorDialogHandlers={errorDialogHandlers}
        errorDialogOpened={errorDialogOpened}
        content={
          <Box mb="sm">
            <b>{thingToRename} name</b> must:
            <li> be 3-255 characters long</li>
            <li>
              not contain any other special{' '}
              <span style={{ marginLeft: '1.25rem' }}>characters than ._!@#$%^&-</span>
            </li>
            <li>
              not start or end with ._ special{' '}
              <span style={{ marginLeft: '1.25rem' }}>characters</span>
            </li>
          </Box>
        }
      />
    </>
  );
}
