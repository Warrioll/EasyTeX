import { ReactElement, useState } from 'react';
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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

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
  const [deleteErrorInfo, setDeleteErrorInfo] = useState<string | null>(null);
  const [disableDeleteButton, setDisableDeleteButton] = useState<boolean>(false);

  const deleteThing = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setDisableDeleteButton(true);

      setDeleteErrorInfo(null);
      await deleteFunction();
      deleteModalHandlers[1].close();
      setDisableDeleteButton(false);
    } catch (e) {
      console.log(`Delete ${thingToDelete} error:`, e);
      setDeleteErrorInfo('Something went wrong');

      setDisableDeleteButton(false);
    }
  };

  return (
    <Modal
      opened={deleteModalHandlers[0]}
      onClose={deleteModalHandlers[1].close}
      transitionProps={{ transition: 'fade-up' }}
      yOffset="12%"
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
        <Box h="1rem" p="0px" m="0px" c="var(--mantine-color-error)">
          {deleteErrorInfo === null ? (
            <></>
          ) : (
            <Flex justify="center" align="center">
              <Text ta="center" size="md" c="var(--mantine-color-error)">
                <RiErrorWarningFill />
              </Text>
              <Text ta="center" ml={5} mb={4} size="sm" c="var(--mantine-color-error)">
                {deleteErrorInfo}
              </Text>
            </Flex>
          )}
        </Box>
        <SimpleGrid cols={2} spacing="xl" mt="md">
          <form>
            <Button
              leftSection={!disableDeleteButton && <FaRegTrashAlt />}
              color="red"
              onClick={deleteThing}
              disabled={disableDeleteButton}
            >
              {disableDeleteButton ? <Loader color="red" size={20} /> : <> Delete</>}
            </Button>
            <Button color="cyan" variant="outline" onClick={deleteModalHandlers[1].close}>
              Cancel
            </Button>
          </form>
        </SimpleGrid>
      </SimpleGrid>
    </Modal>
  );
}
