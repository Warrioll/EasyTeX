//import { IconCookie, IconGauge, IconUser } from '@tabler/icons-react';

import { useState } from 'react';
import axios from 'axios';
import { BiSolidReport } from 'react-icons/bi';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { IoMdMore } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { PiPresentationChartFill } from 'react-icons/pi';
import { RiArticleFill, RiBook2Fill, RiSlideshow2Fill } from 'react-icons/ri';
import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  Menu,
  MenuDropdown,
  Modal,
  SimpleGrid,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import InfoErrorDialog from '@/components/ErrorInfos/InfoErrorDialog';
import DeleteModal from '@/components/Modals/DeleteModal';
import RenameModal from '@/components/Modals/RenameModal';
import {
  documentColor,
  DocumentIcon,
  documentMainLabels,
} from '@/components/other/documentLabelsAndColors';
import { documentClassType } from '@/Types';
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
  //const theme = useMantineTheme();
  const [anchorColor, setAnchorColor] = useState('black');
  const [cardBorder, setCardBorder] = useState(
    ' 1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))'
  );
  const [errorDialogOpened, errorDialogHandlers] = useDisclosure(false);
  const [renameModalOpened, renameModalHandlers] = useDisclosure(false);
  //const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  const deleteModalHandlers = useDisclosure(false);
  const documentNameState = useState<string>(title);
  const [documentName, setDocumentName] = documentNameState;
  const [renameError, setRenemeError] = useState<string | null>(null);
  const docuemntNameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9. _!@#$%^&-]{3,255}(?<![_.])$/g;
  console.log('doc, id: ', documentId);
  // const chooseCardContent = (): { typeLabel: string; icon: any; color: string } => {
  //   // return <RiArticleFill size={50} stroke={2} color={theme.colors.blue[6]} />;

  //   switch (type) {
  //     case 'article':
  //       return {
  //         typeLabel: 'Article',
  //         icon: <RiArticleFill size={50} color="var(--mantine-color-blue-5)" />,
  //         color: 'var(--mantine-color-blue-5)',
  //       };
  //     case 'book':
  //       return {
  //         typeLabel: 'Book',
  //         icon: <RiBook2Fill size={50} color="var(--mantine-color-teal-5)" />,
  //         color: 'var(--mantine-color-teal-5)',
  //       };
  //     case 'beamer':
  //       return {
  //         typeLabel: 'Presentation',
  //         icon: <PiPresentationChartFill size={50} color="var(--mantine-color-orange-5)" />,
  //         color: 'var(--mantine-color-orange-5)',
  //       };
  //     case 'report':
  //       return {
  //         typeLabel: 'Report',
  //         icon: <BiSolidReport size={50} color="var(--mantine-color-grape-5)" />,
  //         color: 'var(--mantine-color-grape-5)',
  //       };
  //     case 'letter':
  //       return {
  //         typeLabel: 'Letter',
  //         icon: <MdEmail size={50} color="var(--mantine-color-lime-5)" />,
  //         color: 'var(--mantine-color-lime-5)',
  //       };
  //     case 'slides':
  //       return {
  //         typeLabel: 'Slides',
  //         icon: <RiSlideshow2Fill size={50} color="var(--mantine-color-pink-5)" />,
  //         color: 'var(--mantine-color-pink-5)',
  //       };
  //     default:
  //       return { typeLabel: '', icon: null, color: '' };
  //   }
  // };

  // const cardContent = chooseCardContent();

  const creationWholeDateSplited: Array<string> = creationDate.toString().split('T');
  const creationDateSplited: Array<string> = creationWholeDateSplited[0].split('-').reverse();
  const creationHourSplited: Array<string> = creationWholeDateSplited[1].split(':');
  const creationDateString: string = `${creationDateSplited.join('.')} | ${creationHourSplited[0]}:${creationHourSplited[1]}`;

  const lastUpdateWholeDateSplited: Array<string> = lastUpdate.toString().split('T');
  const lastUpdateDateSplited: Array<string> = lastUpdateWholeDateSplited[0].split('-').reverse();
  const lastUpdateHourSplited: Array<string> = lastUpdateWholeDateSplited[1].split(':');
  const lastUpdateDateString: string = `${lastUpdateDateSplited.join('.')} | ${lastUpdateHourSplited[0]}:${lastUpdateHourSplited[1]}`;

  const renameDocument = async () => {
    // try {
    //   const response = await axios.put(
    //     `http://localhost:8100/document/${documentId}`,
    //     {
    //       name: documentName,
    //     },
    //     { withCredentials: true }
    //   );

    //   renameModalHandlers.close();
    //   errorDialogHandlers.close();
    //   updateReleaser[1](updateReleaser[0] + 1);
    // } catch (error) {
    //   errorDialogHandlers.open();
    //   console.log('reneme error: ', error);
    // }

    const response = await axios.put(
      `http://localhost:8100/document/${documentId}`,
      {
        name: documentName,
      },
      { withCredentials: true }
    );

    // renameModalHandlers.close();
    // errorDialogHandlers.close();
    updateReleaser[1](updateReleaser[0] + 1);
  };

  const deleteDocuemnt = async () => {
    const response = await axios.delete(`http://localhost:8100/document/${documentId}`, {
      withCredentials: true,
    });

    //console.log('renemae response: ', response);
    //deleteModalHandlers.close();
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
          window.location.href = `http://localhost:5173/document/${documentId}`;
        }}
        bd={cardBorder}
        onMouseEnter={() => setCardBorder(`1px solid ${choosenDocumentColor}`)}
        onMouseLeave={() =>
          setCardBorder(
            `1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))`
          )
        }
        // bg="var(--mantine-color-gray-0)"
      >
        {/* <icon size={50} stroke={2} color={theme.colors.blue[6]} /> */}
        <Group justify="space-between">
          {
            //cardContent.icon
          }
          <DocumentIcon type={type} color={null} size={50} />
          <Menu position="right-start" offset={-20}>
            <Menu.Target>
              <Button fz="xl" c="black" variant="transparent" className={classes.cardMoreButton}>
                <IoMdMore />
              </Button>
            </Menu.Target>
            <MenuDropdown>
              <Menu.Item
                onClick={() => {
                  window.location.href = `http://localhost:5173/document/${documentId}`;
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
          href={`http://localhost:5173/document/${documentId}`}
        >
          {title}
        </Anchor>
        <Box className={classes.underline} bg={choosenDocumentColor} />
        <Text fz="sm" c="dimmed" mt="sm" mb="0.3rem">
          <b>Type: </b> {choosenDocumentMainLabel}
        </Text>
        <Text fz="sm" c="dimmed" mb="0.3rem">
          <b>Created: </b> {creationDateString}
        </Text>
        <Text fz="sm" c="dimmed">
          <b>Last update: </b> {lastUpdateDateString}
        </Text>
      </Card>
      {/* <Modal
        opened={renameModalOpened}
        onClose={() => {
          renameModalHandlers.close();
          errorDialogHandlers.close();
        }}
        transitionProps={{ transition: 'fade-up' }}
        size="lg"
        yOffset="15%"
        title={
          <Text c="var(--mantine-color-cyan-8)">
            <b>Rename document</b>
          </Text>
        }
      >
        <SimpleGrid mt="0px" cols={1} verticalSpacing="xl" p="xl" pt="md" pb="md">
          <Box h="4.5rem" m="xl" mt="0px">
            <TextInput
              mt="lg"
              label="Document name"
              placeholder="Your document name"
              variant="filled"
              required
              value={documentName}
              error={renameError}
              onChange={(event) => {
                setDocumentName(event.currentTarget.value);
                if (docuemntNameRegex.test(event.currentTarget.value)) {
                  setRenemeError(null);
                } else {
                  setRenemeError('Invalid name');
                }
              }}
              // key={form.key('email')}
              // {...form.getInputProps('email')}
            />
          </Box>

          <SimpleGrid cols={2} spacing="xl" mt="md">
            <Button onClick={renameDocument}>Rename</Button>
            <Button
              variant="outline"
              onClick={() => {
                renameModalHandlers.close();
                errorDialogHandlers.close();
              }}
            >
              Cancel
            </Button>
          </SimpleGrid>
        </SimpleGrid>
      </Modal> */}

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
          {creationDateString}
          <b>Last update: </b>
          {lastUpdateDateString}
        </>
      </DeleteModal>

      <RenameModal
        renameModalHandlers={[renameModalOpened, renameModalHandlers]}
        thingToRename="Document"
        renameFunction={renameDocument}
        renameState={documentNameState}
      />

      {/* <InfoErrorDialog
        title="Document name requirements"
        errorDialogHandlers={errorDialogHandlers}
        errorDialogOpened={errorDialogOpened}
        content={
          <Box mb="sm">
            <b>Document name</b> must:
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
      /> */}
    </>
  );
}
