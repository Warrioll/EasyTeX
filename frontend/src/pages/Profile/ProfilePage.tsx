import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight, FaLock, FaRegTrashAlt, FaRegUser } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdDriveFileRenameOutline, MdLockOutline, MdOutlineImage } from 'react-icons/md';
import {
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ChangePasswordModal from './components/ChangePasswordModal';
import DeleteAccountModal from './components/DeleteAccountModal';
import EditAccountDetailsModal from './components/EditAccountDetailsModal';
import classes from './profilePage.module.css';

export default function ProfilePage() {
  const [userData, setUserData] = useState<{
    user: { _id: any; userName: string; email: string };
    documents: number;
    figures: number;
  } | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get('http://localhost:8100/user', { withCredentials: true });
      setUserData(response.data);
      console.log(response.data);
    };
    getUserData();
  }, []);

  const [deleteAccountModalOpened, deleteAccountModalHandlers] = useDisclosure(false);
  const [changePasswordModalOpened, changePasswordModalHandlers] = useDisclosure(false);
  const [editProfileDetailsModalOpened, editProfileDetailsModalHandlers] = useDisclosure(false);

  const UserAccountData = () => {
    return (
      <>
        {' '}
        <Text fw="500" c="var(--mantine-color-gray-6)">
          Documents:
        </Text>
        <Text ml="xs" fw="500" c="var(--mantine-color-cyan-7)">
          {userData && userData.documents},
        </Text>
        <Text fw="500" ml="md" c="var(--mantine-color-gray-6)">
          Assets:
        </Text>
        <Text fw="500" ml="xs" c="var(--mantine-color-cyan-7)">
          {userData && userData.figures}
        </Text>
      </>
    );
  };

  const EditAccountButtons = () => {
    return (
      <>
        {' '}
        <Button
          variant="outline"
          leftSection={<MdDriveFileRenameOutline />}
          onClick={editProfileDetailsModalHandlers.open}
        >
          Edit account details
        </Button>
        <Button
          variant="outline"
          color="red"
          leftSection={<MdLockOutline />}
          onClick={changePasswordModalHandlers.open}
        >
          Change password
        </Button>
        <Button
          color="red"
          leftSection={<FaRegTrashAlt />}
          onClick={deleteAccountModalHandlers.open}
        >
          Delete account
        </Button>
      </>
    );
  };

  const NavLinks = () => {
    return (
      <>
        <Anchor fw={500} href="/dashboard">
          <Center>
            <FaArrowLeft />
            <Text fw="500" ml="xs" mr="xs">
              See your documents
            </Text>
            <IoDocumentTextOutline />
          </Center>
        </Anchor>
        <Anchor href="/assetsLibrary" fw={500}>
          <Center>
            <MdOutlineImage />
            <Text fw="500" mr="xs" ml="xs">
              See your assets
            </Text>
            <FaArrowRight />
          </Center>
        </Anchor>
      </>
    );
  };

  return (
    <>
      <Center h="calc(100vh - 50px)" mb="0px">
        <BackgroundImage
          h="100%"
          src="./bg13.png"
          //radius="md"
          //m="md"
          mt="0px"
          //style={{ borderTop: '1px solid var(--mantine-color-cyan-6)' }}
          // style={{
          //   background:
          //     'linear-gradient(to  top, rgba(0,0,0,0),var(--mantine-color-gray-1)), url(./bg13.png) ',
          // }}
        >
          <Center h="100%" mih="max-content">
            <Flex
              bg="var(--mantine-color-white)"
              bd="1px solid var(--mantine-color-gray-5)"
              style={{ borderRadius: 'var(--mantine-radius-md)' }}
              //m="xl"
              //mb="0px"
              //mt="0px"
              //h="calc(100vh - 8rem)"
              h={{ base: '50rem', md: '40rem' }}
              w="70vw"
              mih="40rem"
              direction="column"
            >
              <Flex
                justify="start"
                m="lg"
                ml="xl"
                mb="0px"
                fw="500"
                c="var(--mantine-color-cyan-9)"
              >
                Your account
              </Flex>
              <Center h="40rem">
                <Flex
                  justify="center"
                  m="5rem"
                  mb="0px"
                  direction="column"
                  align="center"
                  c="var(--mantine-color-cyan-9)"
                >
                  <Center>
                    <Text fz="3rem" mt="8px">
                      <FaRegUser />
                    </Text>
                    <Title m="xl">{userData && userData.user.userName}</Title>
                  </Center>
                  <Box w="40vw" ta="center" m="xl" mt="md">
                    <ScrollArea>
                      <Text fw="500" c="var(--mantine-color-gray-6)">
                        Email:
                      </Text>
                      <Title order={3}>{userData && userData.user.email}</Title>
                      <Flex visibleFrom="sm" justify="center" mt="xl">
                        <UserAccountData />
                      </Flex>
                      <Stack hiddenFrom="sm" justify="center" mt="xl">
                        <UserAccountData />
                      </Stack>
                    </ScrollArea>
                  </Box>
                  <Flex visibleFrom="md" gap="xl" m="xl">
                    <EditAccountButtons />
                  </Flex>
                  <Stack hiddenFrom="md" gap="xl" m="xl">
                    <EditAccountButtons />
                  </Stack>
                </Flex>
              </Center>
              <Flex
                justify="space-between"
                visibleFrom="sm"
                align="flex-end"
                m="4rem"
                mt="xl"
                mb="4rem"
                h="39vh"
              >
                <NavLinks />
              </Flex>

              <Stack
                justify="center"
                hiddenFrom="sm"
                align="center"
                m="4rem"
                mt="xl"
                mb="4rem"
                h="39vh"
              >
                <NavLinks />
              </Stack>
            </Flex>
          </Center>
        </BackgroundImage>
      </Center>

      <ChangePasswordModal
        userData={userData}
        modalHandlers={[changePasswordModalOpened, changePasswordModalHandlers]}
      />

      <DeleteAccountModal
        userData={userData}
        modalHandlers={[deleteAccountModalOpened, deleteAccountModalHandlers]}
      />
      <EditAccountDetailsModal
        userData={userData}
        modalHandlers={[editProfileDetailsModalOpened, editProfileDetailsModalHandlers]}
      />
    </>
  );
}
