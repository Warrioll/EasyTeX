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
  //{ documentClass: 'slides', label: 'Slides', icon: RiSlideshow2Fill },
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
        {/* 
        <div className={classes.footer}>
          <a href="/assetsLibrary" className={classes.link}>
           
            <span>Assets library</span>
          </a>
        </div> */}
      </nav>

      {createDocumentModal.modal}
    </>
  );
}
