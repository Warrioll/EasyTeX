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
  const [renameErrorInfo, setRenameErrorInfo] = useState<string | null>(null);
  const [disableRenameButton, setDisableRenameButton] = useState<boolean>(false);
  const [errorDialogOpened, errorDialogHandlers] = useDisclosure(false);
  const [documentName, setDocumentName] = renameState;

  const nameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9. _!@#$%^&-]{3,255}(?<![_.])$/g;

  const renameThing = async () => {
    try {
      setDisableRenameButton(true);

      await renameFunction();
      setRenameErrorInfo(null);
      renameModalHandlers[1].close();
      errorDialogHandlers.close();
      setDisableRenameButton(false);
    } catch (e) {
      console.log(`Rename ${thingToRename} error:`, e);
      if (e.status === 403) {
        setRenameErrorInfo('Invalid name');
        errorDialogHandlers.open();
      } else {
        setRenameErrorInfo('Something went wrong');
      }

      setDisableRenameButton(false);
    }
  };

  useEffect(() => {
    setRenameErrorInfo(null);
  }, [renameModalHandlers[0]]);

  return (
    <>
      <Modal
        opened={renameModalHandlers[0]}
        onClose={() => {
          renameModalHandlers[1].close();
          errorDialogHandlers.close();
        }}
        transitionProps={{ transition: 'fade-up' }}
        size="lg"
        yOffset="15%"
        title={
          <Text c="var(--mantine-color-cyan-8)">
            <b>Rename {thingToRename.toLocaleLowerCase()}</b>
          </Text>
        }
      >
        <SimpleGrid mt="0px" cols={1} verticalSpacing="xl" p="xl" pt="md" pb="md">
          <Box h="4.5rem" m="xl" mb="xs" mt="0px">
            <TextInput
              mt="lg"
              label={`${thingToRename} name`}
              placeholder="Your document name"
              variant="filled"
              required
              value={documentName}
              error={renameErrorInfo === 'Invalid name' ? renameErrorInfo : null}
              onChange={(event) => {
                setDocumentName(event.currentTarget.value);
                if (nameRegex.test(event.currentTarget.value)) {
                  setRenameErrorInfo(null);
                } else {
                  setRenameErrorInfo('Invalid name');
                }
              }}
              // key={form.key('email')}
              // {...form.getInputProps('email')}
            />
          </Box>
          <Box h="1rem" p="0px" m="0px" c="var(--mantine-color-error)">
            {renameErrorInfo === null || renameErrorInfo === 'Invalid name' ? (
              <></>
            ) : (
              <Flex justify="center" align="center">
                <Text ta="center" size="md" c="var(--mantine-color-error)">
                  <RiErrorWarningFill />
                </Text>
                <Text ta="center" ml={5} mb={4} size="sm" c="var(--mantine-color-error)">
                  {renameErrorInfo}
                </Text>
              </Flex>
            )}
          </Box>
          <SimpleGrid cols={2} spacing="xl" mt="md">
            <Button onClick={renameThing} disabled={disableRenameButton}>
              {disableRenameButton ? <Loader size={20} /> : <> Rename</>}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                renameModalHandlers[1].close();
                errorDialogHandlers.close();
              }}
            >
              Cancel
            </Button>
          </SimpleGrid>
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
