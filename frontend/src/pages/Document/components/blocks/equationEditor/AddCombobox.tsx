import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { MdKeyboardArrowDown, MdOutlineAdd } from 'react-icons/md';
import { Box, Button, Combobox, Flex, ScrollArea, Text, useCombobox } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

type addSpecialCharacterComboboxPropsType = {
  data: any; //{ label: string; icon: ReactNode; value: object | string }[];
  placeholder: string;
  buttonContent: ReactNode;
  //expressionInputContentState: [string, Dispatch<SetStateAction<string>>];
  insertFunction: (value: any) => any;
  iconSize: string | number;
  floatingStrategy: 'fixed' | 'absolute';
  withGroups: boolean;
};

export function AddComboox({
  data,
  placeholder,
  buttonContent,
  //expressionInputContentState,
  insertFunction,
  iconSize,
  floatingStrategy,
  withGroups,
}: addSpecialCharacterComboboxPropsType) {
  //const [expressionInputContent, setExpressionInputContent] = expressionInputContentState;
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

  const ref = useClickOutside(() => combobox.closeDropdown());

  //   const addSpecialCharacter = (specialCharacter: string) => {
  //     setExpressionInputContent(expressionInputContent.concat(specialCharacter));
  //     insertElement(expressionInputContent.concat(specialCharacter));
  //   };
  //console.log(data)
  const options = withGroups
    ? data.map((group) => {
        console.log(group);
        return (
          <Combobox.Group label={group.label}>
            {group.group
              .filter((item) => item.label.toLowerCase().includes(search.toLowerCase().trim()))
              .map((item) => (
                <Combobox.Option
                  value={item.label}
                  key={item.label}
                  onClick={() => {
                    insertFunction(item.value);
                  }}
                >
                  <Flex align="center">
                    <Box w="2rem" fz={iconSize} fw={500} p="0px" m="0px">
                      {item.icon}
                    </Box>
                    <Text ml="sm"> {item.label}</Text>
                  </Flex>
                </Combobox.Option>
              ))}
          </Combobox.Group>
        );
      })
    : data
        .filter((item) => item.label.toLowerCase().includes(search.toLowerCase().trim()))
        .map((item) => (
          <Combobox.Option
            value={item.label}
            key={item.label}
            onClick={() => {
              insertFunction(item.value);
            }}
          >
            <Flex align="center">
              <Box
                miw="4rem"
                fz={iconSize}
                fw={500}
                p="0px"
                m="2px"
                bg="white"
                bd="1px solid var(--mantine-color-gray-1)"
                style={{ borderRadius: 'var(--mantine-radius-md)' }}
              >
                {item.icon}
              </Box>
              <Text ml="sm" ta="left">
                {item.label}
              </Text>
            </Flex>
          </Combobox.Option>
        ));

  return (
    <div
      ref={ref}
    >
      <Combobox
        store={combobox}
        width={400}
        withArrow
        withinPortal={false}
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
        zIndex={2000}
        position="bottom"
        floatingStrategy={floatingStrategy}
        shadow="md"
        styles={{
          search: { backgroundColor: 'var(--mantine-color-gray-1)' },
          dropdown: { border: '1px solid var(--mantine-color-cyan-2)' },
          groupLabel: { color: 'var(--mantine-color-cyan-7)' },
        }}
        
      >
        <Combobox.Target withAriaAttributes={false}>
          <Button onClick={() => combobox.toggleDropdown()} variant="transparent">
            {buttonContent}
          </Button>
        </Combobox.Target>

        <Combobox.Dropdown //bg="var(--mantine-color-gray-1)"
        >
          <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder={`Search ${placeholder}`}
          />
          <Combobox.Options //style={{ overflowY: 'auto' }}
            mah="50vh"
            h="50vh"
            mb="0px"
          >
            <ScrollArea h="100%">
              {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
            </ScrollArea>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
