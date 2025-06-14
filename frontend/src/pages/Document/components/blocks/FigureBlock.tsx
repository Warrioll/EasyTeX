import { Dispatch, SetStateAction, useState } from 'react';
import { Editor } from '@tiptap/react';
import { FaRegWindowClose } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa6';
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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { blockType } from '@/Types';
import BasicTexfield from './blocksComponents/basicTextfield';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import LibraryFigureTab from './figureBlockComponents/LibraryFigureTab';
import UploadFigureTab from './figureBlockComponents/UploadFigureTab';

import '@mantine/dropzone/styles.css';

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
  const figureState = useState<FileWithPath[] | null>(null);
  const [figure, setFigure] = figureState;
  const figureTabState = useState<'Upload' | 'Library'>('Upload');
  const [figureTab, setFigureTab] = figureTabState;

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
          <Flex align="center">
            {
              //TODO
              <Button variant="default" onClick={open}>
                Upload
              </Button>
            }
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
          </Flex>
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
            <Flex justify="center" w="77vw">
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
          <UploadFigureTab figureState={figureState} modalHandlers={modalHandlers} />
        ) : (
          <LibraryFigureTab modalHandlers={modalHandlers} />
        )}
      </Modal>
    </div>
  );
}
