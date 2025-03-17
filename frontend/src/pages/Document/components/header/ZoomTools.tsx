import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { Button, Combobox, Flex, Input, InputBase, useCombobox } from '@mantine/core';

type zoomToolsPropsType = {
  zoomState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
};

export default function ZoomTools({ zoomState }: zoomToolsPropsType) {
  const [zoomValue, setZoomValue] = zoomState;

  const zoomValuesList = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const options = zoomValuesList.map((item) => (
    <Combobox.Option value={item.toString()} key={item.toString()}>
      {item * 100}%
    </Combobox.Option>
  ));

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Flex ml="2rem" mr="2rem">
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
      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          setZoomValue(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            w="5rem"
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
            variant="filled"
            p="0px"
          >
            {(Number(zoomValue) * 100).toString().concat('%') || (
              <Input.Placeholder>Pick value</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
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
    </Flex>
  );
}
