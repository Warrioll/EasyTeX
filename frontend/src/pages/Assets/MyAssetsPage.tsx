import { ReactElement, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import { FaArrowLeft, FaRegTrashAlt } from 'react-icons/fa';
import { MdArrowBackIosNew, MdDriveFileRenameOutline, MdOutlineZoomOutMap } from 'react-icons/md';
import { TbForbid2 } from 'react-icons/tb';
import {
  Anchor,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  SimpleGrid,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import FiguresLibrary from '@/components/FiguresLibrary/FiguresLibrary';
import DeleteModal from '@/components/Modals/DeleteModal';
import RenameModal from '@/components/Modals/RenameModal';
import classes from './myAssetsPage.module.css';

export default function MyAssetsPage() {
  const figureState = useState<string | null>(null);
  const choosenFigureState = useState<number | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [renameModalOpened, renameModalHandlers] = useDisclosure(false);
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  const renameFigureState = useState<string>('');
  const [renameFigure, setRenameFigure] = renameFigureState;
  const [libraryKey, setLibraryKey] = useState<number>(0);
  const [choosenFigureData, setChoosenFigureData] = useState<{
    _id: string;
    name: string;
    fileType: string;
    creationDate: string;
    url: string | null;
  } | null>(null);

  const getFigureForPreview = async () => {
    try {
      const data = await getFigureData();
      const url = await getFigureURL();

      setChoosenFigureData({
        _id: data.id,
        name: data.name,
        creationDate: data.creationDate,
        fileType: data.fileType,
        url,
      });
    } catch (e) {
      console.log('getFugure Error: ', e);
    }
  };

  const getFigureForDelete = async () => {
    try {
      const data = await getFigureData();
      //const url = await getFigureURL();

      setChoosenFigureData({
        _id: data.id,
        name: data.name,
        creationDate: data.creationDate,
        fileType: data.fileType,
        url: null,
      });
    } catch (e) {
      console.log('getFugure Error: ', e);
    }
  };

  const getFigureData = async (): Promise<{
    id: string;
    name: string;
    creationDate: string;
    fileType: string;
  }> => {
    const responseForData = await axios.get(
      `http://localhost:8100/figure/user/getFigure/${choosenFigureState[0]}`,
      {
        withCredentials: true,
      }
    );
    return {
      id: responseForData.data._id,
      name: responseForData.data.name,
      creationDate: responseForData.data.creationDate as string,
      fileType: responseForData.data.fileType,
    };
  };

  const getFigureURL = async (): Promise<string> => {
    const responseForURL = await axios.get(
      `http://localhost:8100/figure/user/getFigureFile/${choosenFigureState[0]}`,
      {
        withCredentials: true,
        responseType: 'blob',
      }
    );

    return URL.createObjectURL(responseForURL.data);
  };

  const renameFigureFun = async () => {
    const response = await axios.put(
      `http://localhost:8100/figure/user/renameFigure/${choosenFigureState[0]}`,
      { name: renameFigure },
      {
        withCredentials: true,
      }
    );
    setLibraryKey((prev) => prev + 1);
  };

  const deleteDocuemnt = async () => {
    const response = await axios.delete(
      `http://localhost:8100/figure/user/deleteFigure/${choosenFigureState[0]}`,
      {
        withCredentials: true,
      }
    );

    //console.log('renemae response: ', response);
    //deleteModalHandlers.close();
    choosenFigureState[1](null);
    setLibraryKey((prev) => prev + 1);
    setChoosenFigureData(null);
  };

  //   const figurePreview = (): ReactElement => {
  //     return (
  //       <Modal opened={opened} onClose={close} title={`Preview: ${choosenFigureData.name}`}>
  //         <Image
  //           h="65vh"
  //           key={0}
  //           src={choosenFigureData.url}
  //           //onLoad={() => URL.revokeObjectURL(URL.createObjectURL(uploadFigure[0]))}
  //           fit="contain"
  //         />
  //       </Modal>
  //     );
  //   };

  return (
    <>
      <SimpleGrid
        cols={3}
        mb="xs"
        style={{
          background:
            choosenFigureState[0] === null
              ? `var(--mantine-color-white)`
              : `linear-gradient(to right,var(--mantine-color-cyan-7),var(--mantine-color-cyan-3)`,
          borderRadius: 'var(--mantine-radius-md)',
        }}
        ml="xl"
        mr="xl"
        p="xs"
        bd="1px solid var(--mantine-color-gray-3)"
      >
        <Flex align="center" justify="flex-start">
          <Anchor
            variant="transparent"
            c={
              choosenFigureState[0] === null
                ? 'var(--mantine-color-cyan-7)'
                : 'var(--mantine-color-white)'
            }
            ml="sm"
            href="/dashboard"
          >
            <Center>
              <FaArrowLeft />
              <Text fw="500" ml="xs">
                See documents
              </Text>
            </Center>
          </Anchor>
        </Flex>
        <Flex align="center" justify="center">
          <Text
            fz="1.2rem"
            ml="xl"
            mr="xl"
            mt="0px"
            fw="500"
            c={
              choosenFigureState[0] === null
                ? 'var(--mantine-color-cyan-9)'
                : 'var(--mantine-color-white)'
            }
          >
            Assets library
          </Text>
        </Flex>
        <Flex c="var(--mantine-color-gray-7)" justify="flex-end" align="center">
          <Tooltip
            label="Preview"
            color="cyan"
            position="bottom"
            offset={5}
            withArrow
            arrowOffset={50}
            arrowSize={7}
            arrowRadius={2}
            disabled={choosenFigureState[0] === null}
          >
            <Button
              p="0px"
              pr="xs"
              fz="1.3rem"
              variant="transparent"
              m="0px"
              c={
                choosenFigureState[0] === null
                  ? 'var(--mantine-color-gray-3)'
                  : 'var(--mantine-color-white)'
              }
              className={classes.button}
              disabled={choosenFigureState[0] === null}
              onClick={async () => {
                await getFigureForPreview();

                open();
              }}
            >
              <MdOutlineZoomOutMap />
            </Button>
          </Tooltip>
          <Tooltip
            label="Rename"
            color="cyan"
            position="bottom"
            offset={5}
            withArrow
            arrowOffset={50}
            arrowSize={7}
            arrowRadius={2}
            disabled={choosenFigureState[0] === null}
          >
            <Button
              pr="xs"
              p="0px"
              fz="1.3rem"
              variant="transparent"
              m="0px"
              h="100%"
              c={
                choosenFigureState[0] === null
                  ? 'var(--mantine-color-gray-3)'
                  : 'var(--mantine-color-white)'
              }
              className={classes.button}
              disabled={choosenFigureState[0] === null}
              onClick={async () => {
                try {
                  setRenameFigure((await getFigureData()).name);
                } catch (e) {
                  console.log('getFugure Error: ', e);
                }
                renameModalHandlers.open();
              }}
            >
              <MdDriveFileRenameOutline />
            </Button>
          </Tooltip>
          <Tooltip
            label="Unmark"
            color="cyan"
            position="bottom"
            offset={5}
            withArrow
            arrowOffset={50}
            arrowSize={7}
            arrowRadius={2}
            disabled={choosenFigureState[0] === null}
          >
            <Button
              pr="xs"
              fz="1.3rem"
              variant="transparent"
              m="0px"
              p="0px"
              c={
                choosenFigureState[0] === null
                  ? 'var(--mantine-color-gray-3)'
                  : 'var(--mantine-color-white)'
              }
              className={classes.button}
              disabled={choosenFigureState[0] === null}
              onClick={() => {
                choosenFigureState[1](null);
              }}
            >
              <TbForbid2 />
            </Button>
          </Tooltip>
          <Tooltip
            label="Delete"
            color="cyan"
            position="bottom"
            offset={5}
            withArrow
            arrowOffset={50}
            arrowSize={7}
            arrowRadius={2}
            disabled={choosenFigureState[0] === null}
          >
            <Button
              pr="xs"
              fz="1.3rem"
              variant="transparent"
              m="0px"
              p="0px"
              c={
                choosenFigureState[0] === null
                  ? 'var(--mantine-color-gray-3)'
                  : 'var(--mantine-color-white)'
              }
              className={classes.button}
              disabled={choosenFigureState[0] === null}
              onClick={async () => {
                await getFigureForDelete();

                deleteModalHandlers.open();
              }}
            >
              <FaRegTrashAlt />
            </Button>
          </Tooltip>
        </Flex>
      </SimpleGrid>
      <Center
        bg="var(--mantine-color-white)"
        bd="1px solid var(--mantine-color-gray-3)"
        style={{ borderRadius: 'var(--mantine-radius-md)' }}
        m="xl"
        mt="0px"
        h="calc(100vh - 8rem)"
      >
        <FiguresLibrary
          key={libraryKey}
          //figureState={figureState}
          choosenFigureState={choosenFigureState}
          height="calc(100vh - 130px)"
        />
      </Center>

      <Modal
        opened={opened}
        size="96vw"
        onClose={close}
        title={
          <Text c="var(--mantine-color-cyan-8)">
            <b>Preview:</b> {choosenFigureData?.name}
          </Text>
        }
      >
        {choosenFigureData ? (
          <Image
            h="81vh"
            key={0}
            src={choosenFigureData?.url}
            //onLoad={() => URL.revokeObjectURL(URL.createObjectURL(uploadFigure[0]))}
            fit="contain"
          />
        ) : (
          <>
            <Center h="81vh" c="var(--mantine-color-error">
              Something went wrong!
            </Center>
          </>
        )}
      </Modal>

      <RenameModal
        renameModalHandlers={[renameModalOpened, renameModalHandlers]}
        thingToRename="Document"
        renameFunction={renameFigureFun}
        renameState={renameFigureState}
      />

      <DeleteModal
        deleteModalHandlers={[deleteModalOpened, deleteModalHandlers]}
        thingToDelete="document"
        deleteFunction={deleteDocuemnt}
      >
        <>
          {choosenFigureData ? (
            <>
              <b>Name: </b>
              {choosenFigureData?.name}
              <b>Type: </b>
              {choosenFigureData?.fileType}
              <b>Added: </b>
              {choosenFigureData?.creationDate}{' '}
            </>
          ) : (
            <></>
          )}
        </>
      </DeleteModal>
    </>
  );
}
