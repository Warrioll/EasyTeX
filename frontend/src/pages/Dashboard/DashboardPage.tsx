import { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { BiSolidCategory, BiSolidReport } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { PiPresentationChartFill } from 'react-icons/pi';
import { RiArticleFill, RiBook2Fill, RiSlideshow2Fill } from 'react-icons/ri';
import {
  BackgroundImage,
  Box,
  Button,
  Container,
  Flex,
  Group,
  ScrollArea,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { checkIfLoggedIn } from '@/ApiHandlers/AuthHandler';
import Logo from '@/svg/Logo';
import { documentClassType } from '@/Types';
import DocumentCard from './components/documentCard/DocumentCard';
import NavBar from './components/navBar/NavBar';
import CreateDocumentModal from './createDocumentModal/CreateDocumentModal';
import classes from './dashboardPage.module.css';

const mockdata = [
  {
    title: 'Extreme perfor mancegwejfhauojgn srtagiujreagujwnagjpanergjksbnrjk',

    type: 'article',
    creationDate: '12.12.2025',
    lastUpdate: '31.12.2025',
    color: '',
  },
  {
    title: 'Privacy focused',

    type: 'book',
    creationDate: '12.12.2025',
    lastUpdate: '31.12.2025',
    color: '',
  },
  {
    title: 'No third parties',
    type: 'beamer',
    creationDate: '12.12.2025',
    lastUpdate: '31.12.2025',
  },
  {
    title: 'Privacy focused',

    type: 'report',
    creationDate: '12.12.2025',
    lastUpdate: '31.12.2025',
    color: '',
  },
  {
    title: 'No third parties',
    type: 'beamer',
    creationDate: '12.12.2025',
    lastUpdate: '31.12.2025',
  },
  {
    title: 'Extreme performanceg',

    type: 'slides',
    creationDate: '12.12.2025',
    lastUpdate: '31.12.2025',
    color: '',
  },
  {
    title: 'Extreme performanceg',

    type: 'letter',
    creationDate: '12.12.2025',
    lastUpdate: '31.12.2025',
    color: '',
  },
  {
    title: 'Extreme performanceg',

    type: 'article',
    creationDate: '12.12.2025',
    lastUpdate: '31.12.2025',
    color: '',
  },
  {
    title: 'Privacy focused',

    type: 'report',
    creationDate: '12.12.2025',
    lastUpdate: '31.12.2025',
    color: '',
  },
  {
    title: 'No third parties',
    type: 'beamer',
    creationDate: '12.12.2025',
    lastUpdate: '31.12.2025',
  },
  {
    title: 'Extreme performanceg',

    type: 'slides',
    creationDate: '12.12.2025',
    lastUpdate: '31.12.2025',
    color: '',
  },
  {
    title: 'Extreme performanceg',

    type: 'letter',
    creationDate: '12.12.2025',
    lastUpdate: '31.12.2025',
    color: '',
  },
  {
    title: 'Extreme performanceg',

    type: 'article',
    creationDate: '12.12.2025',
    lastUpdate: '31.12.2025',
    color: '',
  },
];

export default function DashboardPage() {
  const [bannerBg, setBannerBg] = useState(
    'linear-gradient(to right,var(--mantine-color-cyan-7),var(--mantine-color-cyan-3)'
  );
  const activeTab = useState<string>('all');
  const updateReleaser = useState<number>(0);
  const [documentData, setDocumentData] = useState<any>(null);
  const [createModalOpened, createModalHandlers] = useDisclosure(false);

  const createDocumentModal = {
    modal: (
      <CreateDocumentModal modalOpened={createModalOpened} modalHandlers={createModalHandlers} />
    ),
    modalOpened: createModalOpened,
    modalHandlers: createModalHandlers,
  };

  useEffect(() => {
    const checkLogged = async () => {
      const userId = await checkIfLoggedIn();
      //console.log(userId);
      try {
        const response = await axios.get(
          `http://localhost:8100/document/user/${userId}/${activeTab[0]}`,
          {
            withCredentials: true,
          }
        );
        console.log('response ', response);
        console.log('data ', response.data);
        if (response.data === null || response.data === undefined) {
          setDocumentData(null);
        } else {
          setDocumentData(response.data);
        }
      } catch (error) {
        console.log('getUserDocuemnts error: ', error);
        setDocumentData(null);
      }
    };
    checkLogged();
  }, [activeTab[0], updateReleaser[0]]);

  const basicBanner = (
    color: string,
    icon: ReactElement,
    documentClassName: string
  ): ReactElement => {
    return (
      <Group
        p="xl"
        className={classes.banner}
        w="90%"
        style={{
          background: `linear-gradient(to right,var(--mantine-color-${color}-7),var(--mantine-color-${color}-3)`,
        }}
        c="var(--mantine-color-white)"
        justify="flex-start"
      >
        <Text fz="4.5rem" mr="md" ml="sm" mb="-13px">
          {icon}
        </Text>
        <Box w="90%">
          <Title>Welcome to EasyTeX!</Title>
          <Group justify="space-between">
            <Text>Create and edit {documentClassName} based on LaTeX in EASY way!</Text>
            <Button
              bg="var(--mantine-color-white)"
              c={`var(--mantine-color-${color}-7)`}
              onClick={createModalHandlers.open}
            >
              Create new Document
            </Button>
          </Group>
        </Box>
      </Group>
    );
  };

  const chooseBanner = (): ReactElement => {
    switch (activeTab[0]) {
      case 'all':
        return basicBanner('cyan', <BiSolidCategory />, 'documents');
      case 'article':
        return basicBanner('blue', <RiArticleFill />, 'articles');
      case 'report':
        return basicBanner('grape', <BiSolidReport />, 'reports');
      case 'book':
        return basicBanner('teal', <RiBook2Fill />, 'books');
      case 'letter':
        return basicBanner('lime', <MdEmail />, 'letters');
      case 'beamer':
        return basicBanner('orange', <PiPresentationChartFill />, 'presentations');
      case 'slides':
        return basicBanner('pink', <RiSlideshow2Fill />, 'slides');
      case 'search':
        return <>Search</>;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Flex m="0px" p="0px">
        <NavBar createDocumentModal={createDocumentModal} activeTab={activeTab} />

        <ScrollArea
          bg="var(--mantine-color-white)"
          className={classes.scrollArea}
          mb="10px"
          mr="10px"
          p="0px"
        >
          <Container size="100rem" w="100%" pt="xl" pb="xl">
            <Flex justify="center">
              {/* <Group
                p="xl"
                className={classes.banner}
                w="90%"
                style={{ background: bannerBg }}
                c="var(--mantine-color-white)"
                justify="flex-start"
              >
                <Text fz="4.5rem" mr="md" ml="sm" mb="-13px">
                  <BiSolidCategory />
                </Text>
                <Box w="90%">
                  <Title>Welcome to EasyTeX!</Title>
                  <Group justify="space-between">
                    <Text>Create and edit documents based on LaTeX in EASY way!</Text>
                    <Button
                      bg="var(--mantine-color-white)"
                      c="var(--mantine-color-cyan-7)"
                      onClick={createModalHandlers.open}
                    >
                      Create new Document
                    </Button>
                  </Group>
                </Box>
              </Group> */}
              {chooseBanner()}
            </Flex>
            <Flex p="0px" m="0px" justify="center">
              <SimpleGrid cols={{ base: 1, lg: 2, xl: 3 }} spacing="xs" mt={50}>
                {documentData ? (
                  documentData.map((doc) => (
                    <Box m="sm">
                      <DocumentCard
                        documentId={doc._id}
                        title={doc.name}
                        type={doc.documentClass}
                        creationDate={doc.creationDate}
                        lastUpdate={doc.lastUpdate}
                        updateReleaser={updateReleaser}
                      />
                    </Box>
                  ))
                ) : (
                  <Title>Sorry, something went wrong.</Title>
                )}
              </SimpleGrid>
            </Flex>
          </Container>
        </ScrollArea>
      </Flex>
      {createDocumentModal.modal}
    </>
  );
}
