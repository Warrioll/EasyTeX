import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import axios from 'axios';
import { FaRegWindowClose } from 'react-icons/fa';
import { FaRegImage, FaUpload } from 'react-icons/fa6';
import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  Image,
  Modal,
  SegmentedControl,
  Text,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { blockType } from '@/Types';
import BasicTexfield from './blocksComponents/basicTextfield';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import LibraryFigureTab from './figureBlockComponents/LibraryFigureTab';
import UploadFigureTab from './figureBlockComponents/UploadFigureTab';

import '@mantine/dropzone/styles.css';

import { cloneDeep } from 'lodash';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

type FigureBlockProps = {
  idx: number;
  activeBlockState: [number, Dispatch<SetStateAction<number>>];
  activeTextInputState: [string, Dispatch<SetStateAction<string>>];
  blocksContentState: [blockType[], Dispatch<SetStateAction<blockType[]>>];
  editor: Editor;
};

export default function FigureBlock({
  idx,
  activeBlockState,
  blocksContentState,
  editor,
  activeTextInputState,
}: FigureBlockProps) {
  const [blocksContent, setBlocksContent] = blocksContentState;
  const modalHandlers = useDisclosure(false);
  const [opened, { open, close }] = modalHandlers;
  const startFigure =
    blocksContent[idx].blockContent === '' ? null : blocksContent[idx].blockContent;
  const figureState = useState<string | null>(startFigure);
  const uploadfigureState = useState<FileWithPath[] | null>(null);
  //const libraryFigureState = useState<FileWithPath[] | null>(null);
  const [figure, setFigure] = figureState;
  const [uploadfigure, setUploadFigure] = uploadfigureState;
  const figureTabState = useState<'Upload' | 'Library'>('Upload');
  const [figureTab, setFigureTab] = figureTabState;
  const [figureUrl, setFigureUrl] = useState<string>('');
  const [figureLoaded, setFigureLoaded] = useState<boolean>(false);

  useEffect(() => {
    const getFigure = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8100/figure/user/getFigureFile/${figure}`,
          {
            withCredentials: true,
            responseType: 'blob',
          }
        );
        setFigureUrl(URL.createObjectURL(response.data));
        //console.log(figure);
        setFigureLoaded(true);
      } catch (e) {
        console.log('block figure getFigure error: ', e);
        se;
      }
    };
    getFigure();
  }, [figure]);

  useEffect(() => {
    let blocksContentCopy = cloneDeep(blocksContent);
    if (!(figure === null || figure === '' || figure === blocksContentCopy[idx].blockContent)) {
      blocksContentCopy[idx].blockContent = figure;
      setBlocksContent(blocksContentCopy);
    }
  }, [figure]);

  return (
    <div>
      <Flex>
        <MarkedBlockFrame
          idx={idx}
          activeBlockState={activeBlockState}
          blockName="Image"
          sectionsContent={blocksContent}
          setSectionsContent={setBlocksContent}
          activeTextInputState={activeTextInputState}
        >
          <Center>
            <Button
              variant="transparent"
              h="100%"
              w="100%"
              mih="10rem"
              onClick={() => {
                open();
              }}
              bg={figureLoaded ? '' : 'var(--mantine-color-gray-1)'}
              c={figureLoaded ? '' : 'var(--mantine-color-error)'}
            >
              {figure !== null ? (
                figureLoaded ? (
                  <Image
                    w="24vh"
                    h="24vh"
                    key={0}
                    src={figure !== null ? figureUrl : ''}
                    alt=""
                    //fit={fitImg}
                    fit="contain"
                  />
                ) : (
                  <>This asset might have been deleted!</>
                )
              ) : (
                <Center h="5rem" w="100%" style={{ borderRadius: 'var(--mantine-radius-md)' }}>
                  <Center m="xl" fz="3rem" c="dimmed">
                    <FaRegImage />
                  </Center>
                  <Text m="xl" c="dimmed" fw="500">
                    Click here to set image{' '}
                  </Text>
                </Center>
              )}
            </Button>
            {/* <BasicTexfield
                    idx={idx}
                    activeBlockState={activeBlockState}
                    contentToRead={blocksContent[idx].blockContent as string}
                    editor={editor}
                    activeTextInputState={activeTextInputState}
                    idxInput={idx.toString()}
                    sectionsContent={blocksContent}
                    setSectionsContent={setBlocksContent}
                  /> */}
          </Center>
        </MarkedBlockFrame>
      </Flex>
      <Modal
        opened={opened}
        onClose={close}
        transitionProps={{ transition: 'fade-up' }}
        yOffset="3.5%"
        size="85vw"
        title={
          <Flex>
            <Text c="var(--mantine-color-cyan-8)">
              <b>Set image</b>
            </Text>
            <Flex justify="flex-end" w="42vw">
              <SegmentedControl
                value={figureTab}
                onChange={(value) => setFigureTab(value)}
                radius="md"
                fullWidth
                withItemsBorders={false}
                color="var(--mantine-color-cyan-8)"
                data={['Upload', 'Library']}
              />
            </Flex>
          </Flex>
        }
      >
        {figureTab === 'Upload' ? (
          <UploadFigureTab
            figureState={figureState}
            uploadfigureState={uploadfigureState}
            modalHandlers={modalHandlers}
          />
        ) : (
          <LibraryFigureTab figureState={figureState} modalHandlers={modalHandlers} />
        )}
      </Modal>
    </div>
  );
}
