import { useEffect, useState } from 'react';
import axios from 'axios';
import { useErrorBoundary } from 'react-error-boundary';
import { FaRegImage } from 'react-icons/fa6';
import { LuImageOff } from 'react-icons/lu';
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Loader,
  Modal,
  SegmentedControl,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useBlocksContentContext } from '../../DocumentContextProviders';
import BasicTexfield from './blocksComponents/BasicTextfield';
import BlockReferenceId from './blocksComponents/BlockReferenceId';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import LibraryFigureTab from './figureBlockComponents/LibraryFigureTab';
import UploadFigureTab from './figureBlockComponents/UploadFigureTab';

import '@mantine/dropzone/styles.css';

import { cloneDeep } from 'lodash';
import { FileWithPath } from '@mantine/dropzone';

type FigureBlockProps = {
  idx: number;
};

export default function FigureBlock({ idx }: FigureBlockProps) {
  const [isFigureLoading, setIsFigureLoading] = useState<boolean>(true);
  const { showBoundary, resetBoundary } = useErrorBoundary();
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const modalHandlers = useDisclosure(false);
  const [opened, { open, close, toggle }] = modalHandlers;
  const startFigure =
    blocksContent[idx]?.blockContent?.content === ''
      ? null
      : blocksContent[idx]?.blockContent?.content;
  const figureState = useState<string | null>(startFigure);
  const uploadfigureState = useState<FileWithPath[] | null>(null);

  const [figure, setFigure] = figureState;

  const figureTabState = useState<'Upload' | 'Library'>('Upload');
  const [figureTab, setFigureTab] = figureTabState;
  const [figureUrl, setFigureUrl] = useState<string>('');
  const [figureLoaded, setFigureLoaded] = useState<boolean>(false);

  const [figuresCounter, setFiguresCounter] = useState<number>(1);

  const closeModal = () => {
    uploadfigureState[1](null);
    close();
  };

  useEffect(() => {
    try {
      let counter = 1;
      for (let i = 0; i < idx; i++) {
        if (blocksContent[i].typeOfBlock === 'figure') {
          counter++;
        }
        setFiguresCounter(counter);
        setFigure(
          blocksContent[idx]?.blockContent?.content === ''
            ? null
            : blocksContent[idx]?.blockContent?.content
        );
        setFigureLoaded(false);
        setIsFigureLoading(true);
      }
    } catch (e) {
      showBoundary(e);
    }
  }, [blocksContent]);

  useEffect(() => {
    const getFigure = async () => {
      setIsFigureLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8100/figure/user/getFigureFile/${figure}`,
          {
            withCredentials: true,
            responseType: 'blob',
          }
        );
        setFigureUrl(URL.createObjectURL(response.data));
        setFigureLoaded(true);
      } catch (e) {
        console.error('get figure error: ', e);
      }
      setIsFigureLoading(false);
    };
    if (figure) {
      getFigure();
    }
  }, [figure]);

  useEffect(() => {
    try {
      let blocksContentCopy = cloneDeep(blocksContent);
      if (
        !(
          figure === null ||
          figure === '' ||
          figure === blocksContentCopy[idx].blockContent.content
        )
      ) {
        blocksContentCopy[idx].blockContent.content = figure;
        setBlocksContent(blocksContentCopy);
      }
    } catch (e) {
      showBoundary(e);
    }
  }, [figure]);

  return (
    <div>
      <Flex>
        <MarkedBlockFrame idx={idx} blockName="Image">
          <Center>
            <Button
              variant="transparent"
              h="100%"
              w="100%"
              mih="15rem"
              onClick={() => {
                open();
              }}
              bg={
                figureLoaded
                  ? ''
                  : isFigureLoading
                    ? 'var(--mantine-color-gray-1)'
                    : 'var(--mantine-color-red-0)'
              }
              c={figureLoaded ? '' : 'var(--mantine-color-error)'}
              p="0px"
            >
              {figure !== null ? (
                figureLoaded ? (
                  <Image
                    w="24vh"
                    h="24vh"
                    key={blocksContent[idx].blockContent.id}
                    src={figure !== null ? figureUrl : ''}
                    alt=""
                    fit="contain"
                  />
                ) : isFigureLoading ? (
                  <Center w="100%" h="100%">
                    <Loader size="2rem" />
                  </Center>
                ) : (
                  <Center h="5rem" w="100%" style={{ borderRadius: 'var(--mantine-radius-md)' }}>
                    <Center m="xl" fz="3rem">
                      <LuImageOff />
                    </Center>
                    <Text m="xl" fw="500">
                      This asset might have been deleted!
                    </Text>
                  </Center>
                )
              ) : (
                <Center h="5rem" w="100%" style={{ borderRadius: 'var(--mantine-radius-md)' }}>
                  <Center m="xl" fz="3rem" c="dimmed">
                    <FaRegImage />
                  </Center>
                  <Text m="xl" c="dimmed" fw="500">
                    Click here to set image
                  </Text>
                </Center>
              )}
            </Button>
          </Center>
          <Flex justify="center" align="center" pt="xl">
            <Box h="1.4rem" mr="xl" ml="md">
              <BlockReferenceId referenceId={blocksContent[idx].blockContent.id} />
            </Box>
            <Box miw="4rem" c="var(--mantine-color-gray-6)" mr="0px">
              Figure {blocksContent[0].blockContent.class !== 'beamer' && figuresCounter}
            </Box>
            <BasicTexfield
              idx={idx}
              idxInput={idx.toString() + 'figure'}
              contentToRead={blocksContent[idx].blockContent.label}
            />
          </Flex>
        </MarkedBlockFrame>
      </Flex>
      <Modal
        opened={opened}
        onClose={closeModal}
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
            closeModal={closeModal}
          />
        ) : (
          <LibraryFigureTab
            figureState={figureState}
            modalHandlers={[opened, { open, close: closeModal, toggle }]}
          />
        )}
      </Modal>
    </div>
  );
}
