import { BiSolidCategory, BiSolidReport } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { PiPresentationChartFill } from 'react-icons/pi';
import { RiArticleFill, RiBook2Fill } from 'react-icons/ri';
import { Button, Group } from '@mantine/core';
import classes from './navBar.module.css';

const data = [
  { documentClass: 'all', label: 'View all', icon: BiSolidCategory },
  { documentClass: 'search', label: 'Search', icon: FaSearch },
  { documentClass: 'article', label: 'Articles', icon: RiArticleFill },
  { documentClass: 'report', label: 'Reports', icon: BiSolidReport },
  { documentClass: 'book', label: 'Books', icon: RiBook2Fill },
  { documentClass: 'letter', label: 'Letters', icon: MdEmail },
  { documentClass: 'beamer', label: 'Presentaions', icon: PiPresentationChartFill },
];

type navBarPropsType = {
  createDocumentModal: any;
  activeTab: [string, React.Dispatch<React.SetStateAction<string>>];
};

export default function NavBar({ createDocumentModal, activeTab }: navBarPropsType) {
  const [active, setActive] = activeTab;

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
              <span>Create new</span>
            </Button>
          </Group>

          {links}
        </div>
      </nav>

      {createDocumentModal.modal}
    </>
  );
}
