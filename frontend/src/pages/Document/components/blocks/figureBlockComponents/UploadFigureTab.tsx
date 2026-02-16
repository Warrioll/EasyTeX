import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import { FaRegTrashAlt, FaRegWindowClose } from 'react-icons/fa';
import { FaRegImage, FaUpload } from 'react-icons/fa6';
import { Box, Button, Center, Flex, Group, Image, Loader, Text } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import ErrorMessage from '@/components/ErrorInfos/ErrorMessage';
import { useBlocksContentContext } from '@/pages/Document/DocumentContextProviders';

type UploadFigureTabPropsType = {
  figureState: [string | null, Dispatch<SetStateAction<string | null>>];
  uploadfigureState: [FileWithPath[] | null, Dispatch<SetStateAction<FileWithPath[] | null>>];
  modalHandlers: readonly [
    boolean,
    {
      readonly open: () => void;
      readonly close: () => void;
      readonly toggle: () => void;
    },
  ];
  closeModal: () => void;
};

export default function UploadFigureTab({
  figureState,
  uploadfigureState,
  modalHandlers,
  closeModal,
}: UploadFigureTabPropsType) {
  const [figure, setFigure] = figureState;
  const [opened, { open, close }] = modalHandlers;
  const [uploadFigure, setUploadFigure] = uploadfigureState;
  const [figureLabel, setFigureLabel] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  const [uploadErrorOpened, uploadErrorHandlers] = useDisclosure();

  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();

  const saveFigure = async () => {
    try {
      uploadErrorHandlers.close();
      const blob = new Blob([uploadFigure[0]], { type: 'image/png' });
      const formData = new FormData();
      formData.append('image', uploadFigure[0]);
      const response = await axios.post('http://localhost:8100/figure', formData, {
        withCredentials: true,
        headers: {},
      });
      setFigure(response.data._id);
      setIsNotSaved(true);
      closeModal();
    } catch (e) {
      setFigureLabel('File upload failed');
      console.error('Upload image error: ', e);
      await new Promise((resolve) => setTimeout(resolve, 200));
      uploadErrorHandlers.open();
    }
    setUploading(false);
  };

  return (
    <>
      {uploadFigure === null ? (
        <Dropzone
          onDrop={(files) => {
            setUploadFigure(files);
            uploadErrorHandlers.close();
            setFigureLabel('');
          }}
          onReject={async (files) => {
            uploadErrorHandlers.close();
            setFigureLabel('File is too large or file type is not supported.');
            await new Promise((resolve) => setTimeout(resolve, 200));
            uploadErrorHandlers.open();
          }}
          maxSize={5 * 1024 ** 2}
          accept={['image/png', 'image/jpg', 'image/jpeg']}
          maxFiles={1}
          multiple={false}
          h="65vh"
          bg="var(--mantine-color-gray-1)"
        >
          <Group
            align="center"
            justify="center"
            gap="xl"
            mih={220}
            h="69vh"
            style={{ pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <Flex gap="xl" justify="center" align="center">
                <Center fz="3rem">
                  <FaUpload />
                </Center>
                <Box>
                  <Text size="xl" inline>
                    Drop file to upload
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach one file in .png, .jpg, or .jpeg format, no larger than 5MB.
                  </Text>
                </Box>
              </Flex>
            </Dropzone.Accept>
            <Dropzone.Reject>
              <Flex gap="xl" justify="center" align="center">
                <Center fz="3rem">
                  <FaRegWindowClose />
                </Center>
                <Box>
                  <Text size="xl" inline>
                    The file type is not supported
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach one file in .png, .jpg, or .jpeg format, no larger than 5MB.
                  </Text>
                </Box>
              </Flex>
            </Dropzone.Reject>
            <Dropzone.Idle>
              <Flex gap="xl" justify="center" align="center">
                <Center fz="3rem" c="dimmed">
                  <FaRegImage />
                </Center>
                <Box>
                  <Text size="xl" inline>
                    Drag image here or click to select file
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach one file in .png, .jpg, or .jpeg format, no larger than 5MB.
                  </Text>
                </Box>
              </Flex>
            </Dropzone.Idle>
          </Group>
        </Dropzone>
      ) : (
        <>
          <Box>
            <Image
              h="65vh"
              key={0}
              src={URL.createObjectURL(uploadFigure[0])}
              onLoad={() => URL.revokeObjectURL(URL.createObjectURL(uploadFigure[0]))}
              fit="contain"
            />
          </Box>
        </>
      )}
      <Flex justify="center" align="center" m="0px" p="0px" mt="lg">
        <ErrorMessage errorMessage={figureLabel} errorMessageOpened={uploadErrorOpened} />
      </Flex>
      <Flex gap="3rem" pt="lg" justify="center">
        <Button
          w="20rem"
          disabled={uploadFigure === null || uploading}
          onClick={() => {
            setUploading(true);
            saveFigure();
          }}
        >
          {uploading ? <Loader size={25} /> : 'Upload and set image'}
        </Button>
        <Button
          variant="outline"
          color="red"
          w="20rem"
          disabled={uploadFigure === null || uploading}
          onClick={() => {
            setUploadFigure(null);

            uploadErrorHandlers.close();
            setFigureLabel('');
          }}
        >
          <Box mr="0.4rem">
            <FaRegTrashAlt />
          </Box>
          <Box>Remove image</Box>
        </Button>
        <Button w="20rem" variant="outline" onClick={closeModal}>
          Cancel
        </Button>
      </Flex>
    </>
  );
}
