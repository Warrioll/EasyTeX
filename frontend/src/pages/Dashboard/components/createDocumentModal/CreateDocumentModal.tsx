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
import InfoErrorDialog from '@/components/ErrorInfos/InfoErrorDialog';
import NameRequirements from '@/components/ErrorInfos/NameRequirements';
import { documentColor, documentMainLabels } from '@/components/other/documentLabelsAndColors';
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
    'var(--mantine-color-blue-5)'
  );
  const [documentName, setDocumentName] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);
  const docuemntNameRegex = /^(?![_. ])(?!.*[_. ]{2})[a-zA-Z0-9. _!@#$%^&-]{3,255}(?<![_. ])$/;
  const [errorDialogOpened, errorDialogHandlers] = useDisclosure(false);

  const createDocument = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
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
        modalHandlers.close();
        errorDialogHandlers.close();
        window.location.href = `/document/${response.data._id}`;
      }
    } catch (error) {
      errorDialogHandlers.open();
      console.log('create dopcument error: ', error);
    }
  };

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => {
          modalHandlers.close();
          errorDialogHandlers.close();
        }}
        transitionProps={{ transition: 'fade-up' }}
        size="xl"
        yOffset="12%"
        title={
          <Text c="var(--mantine-color-cyan-8)">
            <b>Create new document</b>
          </Text>
        }
      >
        <form>
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
                  visibleFrom="sm"
                  mt="lg"
                  value={documentType}
                  withItemsBorders={false}
                  onChange={(value) => {
                    setDocumentType(value);
                    switch (value) {
                      case 'Article':
                        setSegmentedControlColor(
                          `var(--mantine-color-${documentColor('article')}-5)`
                        );
                        break;
                      case 'Report':
                        setSegmentedControlColor(
                          `var(--mantine-color-${documentColor('report')}-5)`
                        );
                        break;
                      case 'Book':
                        setSegmentedControlColor(`var(--mantine-color-${documentColor('book')}-5)`);
                        break;
                      case 'Letter':
                        setSegmentedControlColor(
                          `var(--mantine-color-${documentColor('letter')}-5)`
                        );
                        break;
                      case 'Presentation':
                        setSegmentedControlColor(
                          `var(--mantine-color-${documentColor('beamer')}-5)`
                        );
                        break;
                      case 'Slides':
                        setSegmentedControlColor(
                          `var(--mantine-color-${documentColor('slides')}-5)`
                        );
                        break;
                    }
                  }}
                  fullWidth
                  size="sm"
                  radius="md"
                  data={['Article', 'Report', 'Book', 'Letter', 'Presentation']} //, 'Slides']}
                  color={segmentedControlColor}
                />
                <SegmentedControl
                  hiddenFrom="sm"
                  orientation="vertical"
                  mt="lg"
                  value={documentType}
                  withItemsBorders={false}
                  onChange={(value) => {
                    setDocumentType(value);
                    switch (value) {
                      case 'Article':
                        setSegmentedControlColor(
                          `var(--mantine-color-${documentColor('article')}-5)`
                        );
                        break;
                      case 'Report':
                        setSegmentedControlColor(
                          `var(--mantine-color-${documentColor('report')}-5)`
                        );
                        break;
                      case 'Book':
                        setSegmentedControlColor(`var(--mantine-color-${documentColor('book')}-5)`);
                        break;
                      case 'Letter':
                        setSegmentedControlColor(
                          `var(--mantine-color-${documentColor('letter')}-5)`
                        );
                        break;
                      case 'Presentation':
                        setSegmentedControlColor(
                          `var(--mantine-color-${documentColor('beamer')}-5)`
                        );
                        break;
                      case 'Slides':
                        setSegmentedControlColor(
                          `var(--mantine-color-${documentColor('slides')}-5)`
                        );
                        break;
                    }
                  }}
                  fullWidth
                  size="sm"
                  radius="md"
                  data={['Article', 'Report', 'Book', 'Letter', 'Presentation']} //, 'Slides']}
                  color={segmentedControlColor}
                />
              </Box>
              <Box h="5.5rem">
                <TextInput
                  mt="lg"
                  label="Document name"
                  placeholder="Your document name"
                  variant="filled"
                  required
                  value={documentName}
                  error={nameError}
                  onChange={(event) => {
                    setDocumentName(event.currentTarget.value);
                    if (docuemntNameRegex.test(event.currentTarget.value)) {
                      setNameError(null);
                    } else {
                      setNameError('Invalid name');
                    }
                  }}
                  // key={form.key('email')}
                  // {...form.getInputProps('email')}
                />
              </Box>
              {/* <NativeSelect
              variant="filled"
              radius="md"
              label="Input label"
              withAsterisk
              data={['Article', 'Report', 'Book', 'Letter', 'Presentation', 'Slides']}
            /> */}
            </SimpleGrid>

            <SimpleGrid cols={2} spacing="xl" mt="md">
              <Button onClick={createDocument} type="submit">
                Create
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  modalHandlers.close();
                  errorDialogHandlers.close();
                }}
              >
                Cancel
              </Button>
            </SimpleGrid>
          </SimpleGrid>
        </form>
      </Modal>
      <InfoErrorDialog
        title="Document name requirements"
        errorDialogHandlers={errorDialogHandlers}
        errorDialogOpened={errorDialogOpened}
        content={<NameRequirements thingToName="Document" />}
      />
    </>
  );
}
