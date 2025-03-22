import { useState } from 'react';
import { BiSolidCategory, BiSolidReport } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { PiPresentationChartFill } from 'react-icons/pi';
import { RiArticleFill, RiBook2Fill, RiSlideshow2Fill } from 'react-icons/ri';
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
import CreateDocumentModal from '../createDocumentModal/CreateDocumentModal';
import classes from './navBar.module.css';

const data = [
  { documentClass: 'all', label: 'View all', icon: BiSolidCategory },
  { documentClass: 'search', label: 'Search', icon: FaSearch },
  { documentClass: 'article', label: 'Articles', icon: RiArticleFill },
  { documentClass: 'report', label: 'Reports', icon: BiSolidReport },
  { documentClass: 'book', label: 'Books', icon: RiBook2Fill },
  { documentClass: 'letter', label: 'Letters', icon: MdEmail },
  { documentClass: 'beamer', label: 'Presentaions', icon: PiPresentationChartFill },
  { documentClass: 'slides', label: 'Slides', icon: RiSlideshow2Fill },
];

type navBarPropsType = {
  createDocumentModal: any;
  activeTab: [string, React.Dispatch<React.SetStateAction<string>>];
};

export default function NavBar({ createDocumentModal, activeTab }: navBarPropsType) {
  //to ogarnąć żeby działało
  const [active, setActive] = activeTab;
  //const [active, setActive] = useState('all');

  //const [documentType, setDocumentType] = useState('Article');
  // const [segmentedControlColor, setSegmentedControlColor] = useState(() => {
  //   if (documentType === 'Article') {
  //     return 'var(--mantine-color-cyan-4)';
  //   }
  //   return 'var(--mantine-color-yellow-4)';
  // });

  const links = data.map((item) => (
    <Button
      variant="transparent"
      className={classes.link}
      data-active={item.documentClass === active || undefined}
      key={item.documentClass}
      fullWidth
      onClick={(event) => {
        event.preventDefault();
        setActive(item.documentClass);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Button>
  ));

  return (
    <>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            {/* <MantineLogo size={28} /> */}
            <Button
              variant="filled"
              fullWidth
              leftSection={
                <span style={{ fontSize: '1rem', marginTop: '2px' }}>
                  <IoMdAddCircle />
                </span>
              }
              onClick={() => createDocumentModal.modalHandlers.open()}
            >
              {/* <item.icon className={classes.linkIcon} stroke={1.5} /> */}
              <span>Create new</span>
            </Button>
          </Group>

          {links}
        </div>

        <div className={classes.footer}>
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            {/* <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} /> */}
            <span>My assets</span>
          </a>

          {/* <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}> */}
            {/* <IconLogout className={classes.linkIcon} stroke={1.5} /> */}
            {/* <span>Upload TeX file</span> */}
          {/* </a> */}
        </div>
      </nav>
      {/* <Modal
        opened={createModalOpened}
        onClose={createModalHandlers.close}
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
                      setSegmentedControlColor('var(--mantine-color-cyan-4)');
                      break;
                    case 'Report':
                      setSegmentedControlColor('var(--mantine-color-indigo-4)');
                      break;
                    case 'Book':
                      setSegmentedControlColor('var(--mantine-color-green-4)');
                      break;
                    case 'Letter':
                      setSegmentedControlColor('var(--mantine-color-grape-4)');
                      break;
                    case 'Presentation':
                      setSegmentedControlColor('var(--mantine-color-yellow-4)');
                      break;
                    case 'Slides':
                      setSegmentedControlColor('var(--mantine-color-red-4)');
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
              // key={form.key('email')}
              // {...form.getInputProps('email')}
            />
          </SimpleGrid>

          <SimpleGrid cols={2} spacing="xl" mt="md">
            <Button>Create</Button>
            <Button variant="outline" onClick={createModalHandlers.close}>
              Cancel
            </Button>
          </SimpleGrid>
        </SimpleGrid>
      </Modal> */}
      {createDocumentModal.modal}
    </>
  );
}
