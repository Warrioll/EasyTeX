import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import axios from 'axios';
import { FaRegTrashAlt, FaRegWindowClose } from 'react-icons/fa';
import { FaRegImage, FaUpload } from 'react-icons/fa6';
import { Box, Button, Center, Flex, Group, Image, Text } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';

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
};

export default function UploadFigureTab({
  figureState,
  uploadfigureState,
  modalHandlers,
}: UploadFigureTabPropsType) {
  const [figure, setFigure] = figureState;
  const [opened, { open, close }] = modalHandlers;
  const [uploadFigure, setUploadFigure] = uploadfigureState;
  const [figureLabel, setFigureLabel] = useState<ReactNode>(<></>);

  const saveFigure = async () => {
    try {
      const blob = new Blob([uploadFigure[0]], { type: 'image/png' });
      const formData = new FormData();
      formData.append('image', uploadFigure[0]);
      const response = await axios.post('http://localhost:8100/figure', formData, {
        withCredentials: true,
        headers: {
          // 'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Figure uploaded succesfully', response);
      setFigure(response.data._id);
      close();
    } catch (e) {
      setFigureLabel(<Text c="red">File upload failed</Text>);
      console.log('Upload error: ', e);
    }
  };

  return (
    <>
      {uploadFigure === null ? (
        <Dropzone
          onDrop={(files) => {
            setUploadFigure(files);
            setFigureLabel(<></>);
          }}
          onReject={(files) => {
            setFigureLabel(<Text c="red">File is too large or file type is not supported.</Text>);
            console.log('rejected files', files);
          }}
          maxSize={5 * 1024 ** 2}
          accept={['image/png', 'image/jpg', 'image/jpeg']}
          maxFiles={1}
          multiple={false}
          h="65vh"
          bg="var(--mantine-color-gray-1)"

          //{...props}
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
                    {
                      //or is too large
                    }
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
                    {
                      //or is too large
                    }
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
      <Flex justify="center" h="5vh" align="center">
        {figureLabel}
      </Flex>
      <Flex gap="3rem" pt="lg" justify="center">
        <Button
          w="20rem"
          disabled={uploadFigure === null}
          onClick={() => {
            saveFigure();
          }}
        >
          Upload and set image
        </Button>
        <Button
          variant="outline"
          color="red"
          w="20rem"
          disabled={uploadFigure === null}
          onClick={() => {
            setUploadFigure(null);
            setFigureLabel(<></>);
          }}
        >
          <Box mr="0.4rem">
            <FaRegTrashAlt />
          </Box>
          <Box>Delete image</Box>
        </Button>
        <Button w="20rem" variant="outline" onClick={close}>
          Cancel
        </Button>
      </Flex>
    </>
  );
}
