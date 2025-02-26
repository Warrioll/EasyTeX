import { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { BiSolidCategory, BiSolidReport } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { PiPresentationChartFill } from 'react-icons/pi';
import { RiArticleFill, RiBook2Fill, RiSlideshow2Fill } from 'react-icons/ri';
import { Box, Button, Container, Flex, ScrollArea, SimpleGrid, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { checkIfLoggedIn } from '@/ApiHandlers/AuthHandler';
import {
  documentColor,
  DocumentIcon,
  documentMainLabels,
  documentPluralNonCapitalLabels,
} from '@/components/other/documentLabelsAndColors';
import BasicBanner from './components/banners/BasicBanner';
import SearchBanner from './components/banners/searchBanner';
import CreateDocumentModal from './components/createDocumentModal/CreateDocumentModal';
import DocumentCard from './components/documentCard/DocumentCard';
import NavBar from './components/navBar/NavBar';
import classes from './dashboardPage.module.css';

export default function DashboardPage() {
  const activeTab = useState<string>('all');
  const updateReleaser = useState<number>(0);
  const searchType = useState<string>('all');
  const searchName = useState<string>('');
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
        if (activeTab[0] !== 'search') {
          const response = await axios.get(
            `http://localhost:8100/document/user/${userId}/${activeTab[0]}`,
            {
              withCredentials: true,
            }
          );
          //console.log('data ', response.data);
          if (response.data === null || response.data === undefined) {
            setDocumentData(null);
          } else {
            setDocumentData(response.data);
          }
        } else {
          const response = await axios.get(
            `http://localhost:8100/document/user/${userId}/${searchType[0]}`,
            {
              withCredentials: true,
            }
          );

          if (response.data === null || response.data === undefined) {
            setDocumentData(null);
          } else {
            setDocumentData(
              response.data.filter((phrase) =>
                phrase.name.toLowerCase().includes(searchName[0].toLowerCase())
              )
            );
          }
        }
      } catch (error) {
        //console.log('getUserDocuemnts error: ', error);
        setDocumentData(null);
      }
    };
    checkLogged();
  }, [activeTab[0], updateReleaser[0], searchName[0], searchType[0]]);

  const chooseBanner = (): ReactElement => {
    switch (activeTab[0]) {
      case 'all':
        return (
          <BasicBanner
            color="cyan"
            icon={<BiSolidCategory />}
            documentClassName="documents"
            createDocumentModal={createDocumentModal}
          />
        );
      // case 'article':
      //   return (
      //     <BasicBanner
      //       color="blue"
      //       icon={<RiArticleFill />}
      //       documentClassName="articles"
      //       createDocumentModal={createDocumentModal}
      //     />
      //   );
      // case 'report':
      //   return (
      //     <BasicBanner
      //       color="grape"
      //       icon={<BiSolidReport />}
      //       documentClassName="reports"
      //       createDocumentModal={createDocumentModal}
      //     />
      //   ); //basicBanner('grape', <BiSolidReport />, 'reports');
      // case 'book':
      //   return (
      //     <BasicBanner
      //       color="teal"
      //       icon={<RiBook2Fill />}
      //       documentClassName="books"
      //       createDocumentModal={createDocumentModal}
      //     />
      //   ); //basicBanner('teal', <RiBook2Fill />, 'books');
      // case 'letter':
      //   return (
      //     <BasicBanner
      //       color="lime"
      //       icon={<MdEmail />}
      //       documentClassName="letters"
      //       createDocumentModal={createDocumentModal}
      //     />
      //   ); //basicBanner('lime', <MdEmail />, 'letters');
      // case 'beamer':
      //   return (
      //     <BasicBanner
      //       color="orange"
      //       icon={<PiPresentationChartFill />}
      //       documentClassName="presentations"
      //       createDocumentModal={createDocumentModal}
      //     />
      //   ); //basicBanner('orange', <PiPresentationChartFill />, 'presentations');
      // case 'slides':
      //   return (
      //     <BasicBanner
      //       color="pink"
      //       icon={<RiSlideshow2Fill />}
      //       documentClassName="slides"
      //       createDocumentModal={createDocumentModal}
      //     />
      //   ); //basicBanner('pink', <RiSlideshow2Fill />, 'slides');
      case 'search':
        return (
          <SearchBanner
            createDocumentModal={createDocumentModal}
            inputState={searchName}
            comboboxState={searchType}
          />
        );
      default:
        return (
          <BasicBanner
            color={documentColor(activeTab[0])}
            icon={<DocumentIcon type={activeTab[0]} color="var(--mantine-color-white)" size="" />}
            documentClassName={documentPluralNonCapitalLabels(activeTab[0])}
            createDocumentModal={createDocumentModal}
          />
        );
    }
  };

  const toTabLabelConverter = (): any => {
    switch (activeTab[0]) {
      case 'all':
        return 'documents';
      default:
        return documentPluralNonCapitalLabels(activeTab[0]);
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
            <Flex justify="center">{chooseBanner()}</Flex>
            <Flex p="0px" m="0px" justify="center">
              {documentData ? (
                documentData.length !== 0 ? (
                  <SimpleGrid cols={{ base: 1, lg: 2, xl: 3 }} spacing="xs" mt={50}>
                    {documentData.map((doc) => (
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
                    ))}
                  </SimpleGrid>
                ) : (
                  <Flex
                    direction="column"
                    gap="xl"
                    m="xl"
                    w="100%"
                    h="50vh"
                    justify="center"
                    align="center"
                  >
                    <Title c="var(--mantine-color-gray-6)">
                      {activeTab[0] === 'search'
                        ? 'No results found.'
                        : `You have no ${toTabLabelConverter()}.`}
                    </Title>
                    <Button
                      variant="light"
                      color="var(--mantine-color-gray-6)"
                      onClick={createDocumentModal.modalHandlers.open}
                    >
                      Click here to create new document
                    </Button>
                  </Flex>
                )
              ) : (
                <Flex
                  direction="column"
                  gap="xl"
                  m="xl"
                  w="100%"
                  h="50vh"
                  justify="center"
                  align="center"
                >
                  <Title c="var(--mantine-color-gray-6)">Sorry, something went wrong.</Title>
                  <Button
                    variant="light"
                    color="var(--mantine-color-gray-6)"
                    onClick={() => {
                      updateReleaser[1](updateReleaser[0] + 1);
                    }}
                  >
                    Click here to refresh
                  </Button>
                </Flex>
              )}
            </Flex>
          </Container>
        </ScrollArea>
      </Flex>
      {createDocumentModal.modal}
    </>
  );
}
