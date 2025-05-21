import { Dispatch, SetStateAction, useState } from 'react';
import { MdKeyboardArrowDown, MdOutlineAdd } from 'react-icons/md';
import { Box, Button, Combobox, Flex, useCombobox } from '@mantine/core';

const groceries = [
  { icon: 'π', label: 'Pi' },
  { icon: 'Π', label: 'Capital pi' },
  { icon: 'α', label: 'Alpha' },
];

type addSpecialCharacterComboboxPropsType = {
  expressionInputContentState: [string, Dispatch<SetStateAction<string>>];
  insertElement: (specialCharacter: string) => void;
};

export function AddSpecialCharacterComboox({
  expressionInputContentState,
  insertElement,
}: addSpecialCharacterComboboxPropsType) {
  const [expressionInputContent, setExpressionInputContent] = expressionInputContentState;
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch('');
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const addSpecialCharacter = (specialCharacter: string) => {
    setExpressionInputContent(expressionInputContent.concat(specialCharacter));
    insertElement(expressionInputContent.concat(specialCharacter));
  };

  const options = groceries
    .filter((item) => item.label.toLowerCase().includes(search.toLowerCase().trim()))
    .map((item) => (
      <Combobox.Option
        value={item.label}
        key={item.label}
        onClick={() => {
          addSpecialCharacter(item.icon);
        }}
      >
        <Flex align="center">
          <Box w="2rem" fz="1.1rem" fw={500}>
            {item.icon}
          </Box>
          {item.label}
        </Flex>
      </Combobox.Option>
    ));

  return (
    <>
      <Combobox
        store={combobox}
        width={250}
        withArrow
        withinPortal={false}
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
        zIndex={2000}
        floatingStrategy="fixed"
        position="bottom-end"
      >
        <Combobox.Target withAriaAttributes={false}>
          <Button onClick={() => combobox.toggleDropdown()} variant="transparent">
            <MdOutlineAdd />
          </Button>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search special characters"
          />
          <Combobox.Options>
            {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}
