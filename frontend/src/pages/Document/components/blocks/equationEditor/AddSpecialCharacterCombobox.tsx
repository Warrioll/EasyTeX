import { useState } from "react";
import { Combobox, Box, Flex, Button, useCombobox } from "@mantine/core";
import { MdKeyboardArrowDown, MdOutlineAdd } from 'react-icons/md';

const groceries = [
  {icon: 'π', label: 'Pi'},
  {icon: 'Π', label: 'Capital pi'},
  {icon: 'α', label: 'Alpha'},
];

export function AddSpecialCharacterComboox() {
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

  const options = groceries
    .filter((item) => item.label.toLowerCase().includes(search.toLowerCase().trim()))
    .map((item) => (
      <Combobox.Option value={item.label} key={item.label} onClick={()=>{console.log('combobox')}}>
        <Flex align='center'><Box w='2rem' fz='1.1rem' fw={500}>{item.icon}</Box>{item.label}</Flex>
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
        floatingStrategy='fixed'
  position='bottom-end'
      >
        <Combobox.Target withAriaAttributes={false}>
          <Button onClick={() => combobox.toggleDropdown()} variant='transparent'>< MdOutlineAdd/></Button>
        </Combobox.Target>

        <Combobox.Dropdown >
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