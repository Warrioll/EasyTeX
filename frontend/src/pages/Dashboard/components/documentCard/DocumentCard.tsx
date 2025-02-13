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
  const [renameModalOpened, renameModalHandlers] = useDisclosure(false);
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  const [documentName, setDocumentName] = useState(title);
  console.log('doc, id: ', documentId);
  const chooseCardContent = (): { typeLabel: string; icon: any; color: string } => {
    // return <RiArticleFill size={50} stroke={2} color={theme.colors.blue[6]} />;

    switch (type) {
      case 'article':
        return {
          typeLabel: 'Article',
          icon: <RiArticleFill size={50} color="var(--mantine-color-blue-5)" />,
          color: 'var(--mantine-color-blue-5)',
        };
      case 'book':
        return {
          typeLabel: 'Book',
          icon: <RiBook2Fill size={50} color="var(--mantine-color-teal-5)" />,
          color: 'var(--mantine-color-teal-5)',
        };
      case 'beamer':
        return {
          typeLabel: 'Presentation',
          icon: <PiPresentationChartFill size={50} color="var(--mantine-color-orange-5)" />,
          color: 'var(--mantine-color-orange-5)',
        };
      case 'report':
        return {
          typeLabel: 'Report',
          icon: <BiSolidReport size={50} color="var(--mantine-color-grape-5)" />,
          color: 'var(--mantine-color-grape-5)',
        };
      case 'letter':
        return {
          typeLabel: 'Letter',
          icon: <MdEmail size={50} color="var(--mantine-color-lime-5)" />,
          color: 'var(--mantine-color-lime-5)',
        };
      case 'slides':
        return {
          typeLabel: 'Slides',
          icon: <RiSlideshow2Fill size={50} color="var(--mantine-color-pink-5)" />,
          color: 'var(--mantine-color-pink-5)',
        };
      default:
        return { typeLabel: '', icon: null, color: '' };
    }
  };

  const cardContent = chooseCardContent();

  const creationWholeDateSplited: Array<string> = creationDate.toString().split('T');
  const creationDateSplited: Array<string> = creationWholeDateSplited[0].split('-').reverse();
  const creationHourSplited: Array<string> = creationWholeDateSplited[1].split(':');
  const creationDateString: string = `${creationDateSplited.join('.')} | ${creationHourSplited[0]}:${creationHourSplited[1]}`;

  const lastUpdateWholeDateSplited: Array<string> = lastUpdate.toString().split('T');
  const lastUpdateDateSplited: Array<string> = lastUpdateWholeDateSplited[0].split('-').reverse();
  const lastUpdateHourSplited: Array<string> = lastUpdateWholeDateSplited[1].split(':');
  const lastUpdateDateString: string = `${lastUpdateDateSplited.join('.')} | ${lastUpdateHourSplited[0]}:${lastUpdateHourSplited[1]}`;

  const renameDocument = async () => {
    try {
      console.log('renemae work ');
      const response = await axios.put(
        `http://localhost:8100/document/${documentId}`,
        {
          name: documentName,
        },
        { withCredentials: true }
      );

      //console.log('renemae response: ', response);
      renameModalHandlers.close();
      updateReleaser[1](updateReleaser[0] + 1);
    } catch (error) {
      console.log('reneme error: ', error);
    }
  };

  const deleteDocuemnt = () => {};

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
          window.location.href = 'http://localhost:5173/document';
        }}
        bd={cardBorder}
        onMouseEnter={() => setCardBorder(`1px solid ${cardContent.color}`)}
        onMouseLeave={() =>
          setCardBorder(
            `1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))`
          )
        }
        // bg="var(--mantine-color-gray-0)"
      >
        {/* <icon size={50} stroke={2} color={theme.colors.blue[6]} /> */}
        <Group justify="space-between">
          {cardContent.icon}
          <Menu position="right-start" offset={-20}>
            <Menu.Target>
              <Button fz="xl" c="black" variant="transparent" className={classes.cardMoreButton}>
                <IoMdMore />
              </Button>
            </Menu.Target>
            <MenuDropdown>
              <Menu.Item
                onClick={() => {
                  window.location.href = '/document';
                }}
                leftSection={<FaArrowRightFromBracket />}
              >
                Open
              </Menu.Item>
              <Menu.Item onClick={renameModalHandlers.open} leftSection={<FaRegEdit />}>
                Rename
              </Menu.Item>
              <Menu.Item
                onClick={deleteModalHandlers.open}
                leftSection={
                  <Text c="var(--mantine-color-error)">
                    <FaRegTrashAlt />
                  </Text>
                }
              >
                <Text c="var(--mantine-color-error)"> Delete</Text>
              </Menu.Item>
            </MenuDropdown>
          </Menu>
        </Group>

        <Anchor
          onMouseEnter={() => setAnchorColor(cardContent.color)}
          onMouseLeave={() => setAnchorColor('black')}
          fz="lg"
          c={anchorColor}
          fw={500}
          className={classes.cardTitle}
          mt="md"
        >
          {title}
        </Anchor>
        <Box className={classes.underline} bg={cardContent.color} />
        <Text fz="sm" c="dimmed" mt="sm" mb="0.3rem">
          <b>Type: </b> {cardContent.typeLabel}
        </Text>
        <Text fz="sm" c="dimmed" mb="0.3rem">
          <b>Created: </b> {creationDateString}
        </Text>
        <Text fz="sm" c="dimmed">
          <b>Last update: </b> {lastUpdateDateString}
        </Text>
      </Card>
      <Modal
        opened={renameModalOpened}
        onClose={renameModalHandlers.close}
        transitionProps={{ transition: 'fade-up' }}
        size="lg"
        yOffset="14%"
        title={
          <Text c="var(--mantine-color-cyan-8)">
            <b>Rename document</b>
          </Text>
        }
      >
        <SimpleGrid mt="0px" cols={1} verticalSpacing="xl" p="xl" pt="md" pb="md">
          <Text fz="1.3rem" m="xl" mt="0px">
            <TextInput
              mt="lg"
              label="Document name"
              placeholder="Your document name"
              variant="filled"
              required
              value={documentName}
              onChange={(event) => {
                setDocumentName(event.currentTarget.value);
              }}
              // key={form.key('email')}
              // {...form.getInputProps('email')}
            />
          </Text>
          <SimpleGrid cols={2} spacing="xl" mt="md">
            <Button onClick={renameDocument}>Rename</Button>
            <Button variant="outline" onClick={renameModalHandlers.close}>
              Cancel
            </Button>
          </SimpleGrid>
        </SimpleGrid>
      </Modal>
      <Modal
        opened={deleteModalOpened}
        onClose={deleteModalHandlers.close}
        transitionProps={{ transition: 'fade-up' }}
        yOffset="12%"
        size="lg"
        title={
          <Text c="var(--mantine-color-cyan-8)">
            <b>Delete document</b>
          </Text>
        }
      >
        <SimpleGrid mt="0px" cols={1} verticalSpacing="xl" ta="center" p="xl" pt="md" pb="md">
          <Text fz="1.3rem" m="xl">
            Are you sure you want to delete this document?
          </Text>
          <Group justify="center" m="0px" p="0px">
            <SimpleGrid
              ml="xl"
              mr="xl"
              mt="0px"
              cols={2}
              ta="left"
              verticalSpacing="0.1rem"
              pt="md"
              pb="md"
              w="52%"
            >
              <b>Name: </b>
              {title}

              <b>Type: </b>
              {cardContent.typeLabel}

              <b>Created: </b>
              {creationDateString}

              <b>Last update: </b>
              {lastUpdateDateString}
            </SimpleGrid>
          </Group>
          <SimpleGrid cols={2} spacing="xl" mt="md">
            <Button leftSection={<FaRegTrashAlt />} color="red" onClick={deleteDocuemnt}>
              Delete
            </Button>
            <Button color="red" variant="outline" onClick={deleteModalHandlers.close}>
              Cancel
            </Button>
          </SimpleGrid>
        </SimpleGrid>
      </Modal>
    </>
  );
}
