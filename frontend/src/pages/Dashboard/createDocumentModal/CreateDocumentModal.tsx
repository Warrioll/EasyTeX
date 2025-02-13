import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Code,
  Flex,
  Group,
  Modal,
  NativeSelect,
  SegmentedControl,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './createDocumentModal.module.css';

type createDocumentModalPropsType = {
  modalOpened: boolean;
  modalHandlers: any;
};

export default function CreateDocumentModal({
  modalOpened,
  modalHandlers,
}: createDocumentModalPropsType) {
  const [documentType, setDocumentType] = useState('Article');
  //const [createModalOpened, createModalHandlers] = useDisclosure(false);
  const [segmentedControlColor, setSegmentedControlColor] = useState<string>(
    'var(--mantine-color-cyan-4)'
  );
  const [documentName, setDocumentName] = useState<string>('');

  const createDocument = async () => {
    try {
      let documentClass: string | null = null;
      switch (documentType) {
        case 'Article':
          documentClass = 'article';
          break;
        case 'Report':
          documentClass = 'report';
          break;
        case 'Book':
          documentClass = 'book';
          break;
        case 'Letter':
          documentClass = 'letter';
          break;
        case 'Presentation':
          documentClass = 'beamer';
          break;
        case 'Slides':
          documentClass = 'slides';
          break;
      }

      const response = await axios.post(
        'http://localhost:8100/document',
        {
          name: documentName,
          documentClass,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        window.location.href = '/document';
      }
    } catch (error) {
      console.log('create dopcument error: ', error);
    }
  };

  return (
    <Modal
      opened={modalOpened}
      onClose={modalHandlers.close}
      transitionProps={{ transition: 'fade-up' }}
      size="xl"
      yOffset="12%"
      title={
        <Text c="var(--mantine-color-cyan-8)">
          <b>Create new document</b>
        </Text>
      }
    >
      <SimpleGrid mt="0px" cols={1} verticalSpacing="xl" p="xl" pt="md" pb="md">
        <SimpleGrid cols={1} spacing="xl" pl="xl" pr="xl" m="xl">
          <Box>
            {' '}
            <TextInput
              classNames={{
                input: classes.typePicker,
              }}
              label="Document type"
              required
              disabled
            />
            <SegmentedControl
              mt="lg"
              value={documentType}
              onChange={(value) => {
                setDocumentType(value);
                switch (value) {
                  case 'Article':
                    setSegmentedControlColor('var(--mantine-color-blue-4)');
                    break;
                  case 'Report':
                    setSegmentedControlColor('var(--mantine-color-grape-4)');
                    break;
                  case 'Book':
                    setSegmentedControlColor('var(--mantine-color-teal-4)');
                    break;
                  case 'Letter':
                    setSegmentedControlColor('var(--mantine-color-lime-4)');
                    break;
                  case 'Presentation':
                    setSegmentedControlColor('var(--mantine-color-orange-4)');
                    break;
                  case 'Slides':
                    setSegmentedControlColor('var(--mantine-color-pink-4)');
                    break;
                }
              }}
              fullWidth
              size="sm"
              radius="md"
              data={['Article', 'Report', 'Book', 'Letter', 'Presentation', 'Slides']}
              color={segmentedControlColor}
            />
          </Box>

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

          {/* <NativeSelect
              variant="filled"
              radius="md"
              label="Input label"
              withAsterisk
              data={['Article', 'Report', 'Book', 'Letter', 'Presentation', 'Slides']}
            /> */}
        </SimpleGrid>

        <SimpleGrid cols={2} spacing="xl" mt="md">
          <Button onClick={createDocument}>Create</Button>
          <Button variant="outline" onClick={modalHandlers.close}>
            Cancel
          </Button>
        </SimpleGrid>
      </SimpleGrid>
    </Modal>
  );
}
