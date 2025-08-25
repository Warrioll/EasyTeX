import { ReactElement, useState } from 'react';
import { FaArrowLeft, FaRegTrashAlt } from 'react-icons/fa';
import { RiErrorWarningFill } from 'react-icons/ri';
import {
  Box,
  Button,
  Flex,
  FocusTrap,
  Group,
  Loader,
  LoadingOverlay,
  Modal,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ErrorMessage from '../ErrorInfos/ErrorMessage';

type deleteModalPropsType = {
  deleteModalHandlers: readonly [
    boolean,
    {
      readonly open: () => void;
      readonly close: () => void;
      readonly toggle: () => void;
    },
  ];
  thingToDelete: string;
  children: ReactElement;
  deleteFunction: () => Promise<void>;
};

export default function DeleteModal({
  deleteModalHandlers,
  thingToDelete,
  children,
  deleteFunction,
}: deleteModalPropsType) {
  //const [deleteErrorInfo, setDeleteErrorInfo] = useState<string | null>(null);
  const [disableDeleteButton, setDisableDeleteButton] = useState<boolean>(false);
  const [active, { toggle }] = useDisclosure(false);

  const [errorMessageOpened, errorMessageHandlers] = useDisclosure(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const closeModal = () => {
    deleteModalHandlers[1].close();
    errorMessageHandlers.close();
    setErrorMessage('');
  };

  const deleteThing = async () => {
    try {
      setDisableDeleteButton(true);

      //setDeleteErrorInfo(null);
      await errorMessageHandlers.close();
      await new Promise((resolve) => setTimeout(resolve, 200));
      await deleteFunction();
      deleteModalHandlers[1].close();
      setDisableDeleteButton(false);
    } catch (e) {
      console.log(`Delete ${thingToDelete} error:`, e);
      setErrorMessage('Something went wrong!');
      await errorMessageHandlers.open();

      setDisableDeleteButton(false);
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('deleteButton').click();
    }
  });

  return (
    <Modal
      opened={deleteModalHandlers[0]}
      onClose={closeModal}
      transitionProps={{ transition: 'fade-up' }}
      centered
      size="lg"
      title={
        <Text c="var(--mantine-color-cyan-8)">
          <b>Delete {thingToDelete.toLowerCase()}</b>
        </Text>
      }
    >
      <SimpleGrid mt="0px" cols={1} verticalSpacing="md" ta="center" p="xl" pt="md" pb="md">
        <Text fz="1.3rem" m="lg" mb="0px">
          Are you sure you want to delete this {thingToDelete.toLowerCase()}?
        </Text>
        <Group justify="center" m="0px" p="0px">
          <SimpleGrid
            ml="xl"
            mr="xl"
            mb="md"
            mt="0px"
            cols={2}
            ta="left"
            verticalSpacing="0.1rem"
            pt="0px"
            pb="md"
            w="84%"
            spacing="xl"
          >
            {children}
          </SimpleGrid>
        </Group>
        <ErrorMessage errorMessage={errorMessage} errorMessageOpened={errorMessageOpened} />
        <FocusTrap active={active}>
          <SimpleGrid cols={2} spacing="xl" mt="md">
            <Button
              leftSection={!disableDeleteButton && <FaRegTrashAlt />}
              color="red"
              type="submit"
              onClick={deleteThing}
              disabled={disableDeleteButton}
              id="deleteButton"
            >
              {disableDeleteButton ? <Loader color="red" size={20} /> : <> Delete</>}
            </Button>
            <Button color="cyan" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
          </SimpleGrid>
        </FocusTrap>
      </SimpleGrid>
    </Modal>
  );
}
