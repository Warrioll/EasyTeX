import { useState } from 'react';
import axios from 'axios';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { IoMdMore } from 'react-icons/io';
import { Anchor, Box, Button, Card, Group, Menu, MenuDropdown, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import DeleteModal from '@/components/Modals/DeleteModal';
import RenameModal from '@/components/Modals/RenameModal';
import {
  documentColor,
  DocumentIcon,
  documentMainLabels,
} from '@/components/other/documentLabelsAndColors';
import { documentClassType } from '@/Types';
import { dateFormatter } from '@/utils/formatters';
import classes from './documentCard.module.css';

type documentCardTypeProps = {
  documentId: string;
  title: string;
  type: documentClassType;
  creationDate: Date;
  lastUpdate: Date;
  updateReleaser: [number, React.Dispatch<React.SetStateAction<number>>];
};

export default function DocumentCard({
  documentId,
  title,
  type,
  creationDate,
  lastUpdate,
  updateReleaser,
}: documentCardTypeProps) {
  const [anchorColor, setAnchorColor] = useState('black');
  const [cardBorder, setCardBorder] = useState(
    ' 1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))'
  );
  const [errorDialogOpened, errorDialogHandlers] = useDisclosure(false);
  const [renameModalOpened, renameModalHandlers] = useDisclosure(false);

  const deleteModalHandlers = useDisclosure(false);
  const documentNameState = useState<string>(title);
  const [documentName, setDocumentName] = documentNameState;
  const [renameError, setRenemeError] = useState<string | null>(null);
  const docuemntNameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9. _!@#$%^&-]{3,255}(?<![_.])$/g;

  const renameDocument = async () => {
    const response = await axios.put(
      `http://localhost:8100/document/${documentId}`,
      {
        name: documentName,
      },
      { withCredentials: true }
    );
    updateReleaser[1](updateReleaser[0] + 1);
  };

  const deleteDocuemnt = async () => {
    const response = await axios.delete(`http://localhost:8100/document/${documentId}`, {
      withCredentials: true,
    });

    updateReleaser[1](updateReleaser[0] + 1);
  };

  const choosenDocumentColor = `var(--mantine-color-${documentColor(type)}-5)`;
  const choosenDocumentMainLabel = documentMainLabels(type);

  return (
    <>
      <Card
        w="28rem"
        maw="30rem"
        key={title}
        radius="md"
        className={classes.card}
        padding="xl"
        onDoubleClick={() => {
          window.location.href = `/document/${documentId}`;
        }}
        bd={cardBorder}
        onMouseEnter={() => setCardBorder(`1px solid ${choosenDocumentColor}`)}
        onMouseLeave={() =>
          setCardBorder(
            `1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))`
          )
        }
      >
        <Group justify="space-between">
          <DocumentIcon type={type} color={null} size={50} />
          <Menu
            position="right-start"
            offset={-20}
            arrowOffset={15}
            arrowSize={8}
            styles={{ arrow: { border: ' 1px solid var(--mantine-color-gray-4)' } }}
          >
            <Menu.Target>
              <Button fz="xl" c="black" variant="transparent" className={classes.cardMoreButton}>
                <IoMdMore />
              </Button>
            </Menu.Target>
            <MenuDropdown bd=" 1px solid var(--mantine-color-gray-4)">
              <Menu.Item
                onClick={() => {
                  window.location.href = `/document/${documentId}`;
                }}
                leftSection={<FaArrowRightFromBracket />}
              >
                Open
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setDocumentName(title);
                  if (docuemntNameRegex.test(title)) {
                    setRenemeError(null);
                  } else {
                    setRenemeError('Invalid name');
                  }
                  renameModalHandlers.open();
                }}
                leftSection={<FaRegEdit />}
              >
                Rename
              </Menu.Item>
              <Menu.Item
                onClick={deleteModalHandlers[1].open}
                leftSection={
                  <Text c="var(--mantine-color-error)">
                    <FaRegTrashAlt />
                  </Text>
                }
                color="red"
              >
                <Text> Delete</Text>
              </Menu.Item>
            </MenuDropdown>
          </Menu>
        </Group>

        <Anchor
          onMouseEnter={() => setAnchorColor(choosenDocumentColor)}
          onMouseLeave={() => setAnchorColor('black')}
          fz="lg"
          c={anchorColor}
          fw={500}
          className={classes.cardTitle}
          mt="md"
          href={`/document/${documentId}`}
        >
          {title}
        </Anchor>
        <Box className={classes.underline} bg={choosenDocumentColor} />
        <Text fz="sm" c="dimmed" mt="sm" mb="0.3rem">
          <b>Type: </b> {choosenDocumentMainLabel}
        </Text>
        <Text fz="sm" c="dimmed" mb="0.3rem">
          <b>Created: </b> {dateFormatter(creationDate.toString())}
        </Text>
        <Text fz="sm" c="dimmed">
          <b>Last update: </b> {dateFormatter(lastUpdate.toString())}
        </Text>
      </Card>

      <DeleteModal
        deleteModalHandlers={deleteModalHandlers}
        thingToDelete="document"
        deleteFunction={deleteDocuemnt}
      >
        <>
          <b>Name: </b>

          {title}
          <b>Type: </b>
          {choosenDocumentMainLabel}
          <b>Created: </b>
          {dateFormatter(creationDate.toString())}
          <b>Last update: </b>
          {dateFormatter(lastUpdate.toString())}
        </>
      </DeleteModal>

      <RenameModal
        renameModalHandlers={[renameModalOpened, renameModalHandlers]}
        thingToRename="Document"
        renameFunction={renameDocument}
        renameState={documentNameState}
      />
    </>
  );
}
