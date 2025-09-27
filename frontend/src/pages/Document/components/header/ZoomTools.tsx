import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import {
  Button,
  Center,
  Combobox,
  Flex,
  Input,
  InputBase,
  Tooltip,
  useCombobox,
} from '@mantine/core';
import classes from './Header.module.css';

type zoomToolsPropsType = {
  zoomState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
};

export default function ZoomTools({ zoomState }: zoomToolsPropsType) {
  const [zoomValue, setZoomValue] = zoomState;

  const zoomValuesList = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const options = zoomValuesList.map((item) => (
    <Combobox.Option
      className={classes.zoomToolsDropdownOption}
      value={item.toString()}
      key={item.toString()}
    >
      {item * 100}%
    </Combobox.Option>
  ));

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Flex ml="2rem" mr="2rem">
      <Tooltip
        label="Zoom out"
        //label={buttonsNotToRender.includes(idx) ? 'true' : 'false'}
        color="cyan"
        position="bottom"
        offset={5}
        withArrow
        arrowOffset={50}
        arrowSize={7}
        arrowRadius={2}
      >
        <Button
          variant="format"
          fz="var(--mantine-font-size-lg)"
          onClick={() => {
            const zoomIdx = zoomValuesList.indexOf(Number(zoomValue)) - 1;
            if (zoomIdx >= 0) {
              setZoomValue(zoomValuesList[zoomIdx].toString());
            }
          }}
        >
          <FiZoomOut />
        </Button>
      </Tooltip>
      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          setZoomValue(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <Center>
            <InputBase
              w="4.1rem"
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
              variant="unstyled"
              //bg="var(--mantine-color-cyan-4)"
              p="0px"
              size="xs"
              styles={{
                input: {
                  paddingLeft: '10px',
                  backgroundColor: combobox.dropdownOpened
                    ? 'var(--mantine-color-gray-2)'
                    : 'var(--mantine-color-gray-1)',
                  textAlign: 'center',
                },
              }}
              className={classes.zoomInput}
            >
              {(Number(zoomValue) * 100).toString().concat('%') || (
                <Input.Placeholder>Pick value</Input.Placeholder>
              )}
            </InputBase>
          </Center>
        </Combobox.Target>

        <Combobox.Dropdown
          bg="var(--mantine-color-gray-0)"
          className={classes.zoomToolsDropdown}
          bd=" 1px solid var(--mantine-color-cyan-3)"
        >
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      <Tooltip
        label="Zoom in"
        //label={buttonsNotToRender.includes(idx) ? 'true' : 'false'}
        color="cyan"
        position="bottom"
        offset={5}
        withArrow
        arrowOffset={50}
        arrowSize={7}
        arrowRadius={2}
      >
        <Button
          variant="format"
          fz="var(--mantine-font-size-lg)"
          onClick={() => {
            const zoomIdx = zoomValuesList.indexOf(Number(zoomValue)) + 1;
            if (zoomIdx < zoomValuesList.length) {
              setZoomValue(zoomValuesList[zoomIdx].toString());
            }
          }}
        >
          <FiZoomIn />
        </Button>
      </Tooltip>
    </Flex>
  );
}
