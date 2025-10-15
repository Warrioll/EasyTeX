import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { MdKeyboardArrowDown, MdOutlineAdd } from 'react-icons/md';
import {
  Box,
  Button,
  Combobox,
  Flex,
  FloatingPosition,
  ScrollArea,
  Text,
  Tooltip,
  useCombobox,
} from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import classes from './other.module.css';

type addSpecialCharacterComboboxPropsType = {
  data: any; //{ label: string; icon: ReactNode; value: object | string }[];
  placeholder: string;
  buttonContent: ReactNode;
  //expressionInputContentState: [string, Dispatch<SetStateAction<string>>];
  insertFunction: (value: any) => any;
  iconSize: string | number;
  floatingStrategy: 'fixed' | 'absolute';
  withGroups: boolean;
  buttonVariant?: string;
  tooltip?: string;
  belongingValidator?: string;
  position?: FloatingPosition;
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
  buttonVariant,
  tooltip,
  belongingValidator,
  position,
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

  combobox.dropdownOpened;
  const ref = useClickOutside(() => combobox.closeDropdown());

  //   const addSpecialCharacter = (specialCharacter: string) => {
  //     setExpressionInputContent(expressionInputContent.concat(specialCharacter));
  //     insertElement(expressionInputContent.concat(specialCharacter));
  //   };
  //console.log('data:', data);

  const getGroupedElements = () => {
    return data.map((group) => {
      let filtredGroup = group.group;
      //console.log('grouiped', filtredGroup);
      if (belongingValidator) {
        //console.log('validate', belongingValidator);
        filtredGroup = filtredGroup.filter((item) => item.belonging?.includes(belongingValidator));
      }
      return (
        <Combobox.Group label={group.label}>
          {filtredGroup
            .filter((item) => item.label.toLowerCase().includes(search.toLowerCase().trim()))
            .map((item) => {
              // console.log(item.Icon);
              return (
                <Combobox.Option
                  value={item.label}
                  key={item.label}
                  onMouseUp={() => {
                    insertFunction(item.value);
                  }}
                  disabled={item.disabledFunction ? item.disabledFunction() : false}
                >
                  <Flex align="center">
                    <Box w="2rem" fz={iconSize} fw={500} p="0px" m="0px">
                      <item.Icon />
                    </Box>
                    <Text ml="sm"> {item.label}</Text>
                  </Flex>
                </Combobox.Option>
              );
            })}
        </Combobox.Group>
      );
    });
  };

  const getNonGroupedElements = () => {
    let filtredGroup = data;
    if (belongingValidator) {
      filtredGroup = filtredGroup.filter((item) => item.belonging?.includes(belongingValidator));
    }
    return filtredGroup
      .filter((item) => item.label.toLowerCase().includes(search.toLowerCase().trim()))
      .map((item) => {
        //console.log('Icon', item.label, item.Icon);
        return (
          <Combobox.Option
            value={item.label}
            key={item.label}
            onClick={() => {
              insertFunction(item.value);
            }}
            className={classes.hoverButton}
            disabled={item.disabledFunction ? item.disabledFunction() : false}
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
                {/* jeśli Icon to funkcja-komponent */}
                {item.Icon ? <item.Icon /> : 'yolo'}
              </Box>
              <Text ml="sm" ta="left">
                {item.label}
              </Text>
            </Flex>
          </Combobox.Option>
        );
      });
  };

  const options = withGroups ? getGroupedElements() : getNonGroupedElements();

  return (
    <div ref={ref}>
      <Combobox
        store={combobox}
        width={400}
        //withArrow
        withinPortal={false}
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
        zIndex={5000}
        position={position ? position : 'bottom'}
        floatingStrategy={floatingStrategy}
        shadow="md"
        styles={{
          search: { backgroundColor: 'var(--mantine-color-gray-1)' },
          dropdown: {
            arrow: { borderColor: 'var(--mantine-color-cyan-2)' },
            border: '1px solid var(--mantine-color-cyan-3)',
            backgroundColor: 'var(--mantine-color-gray-0)',
          },
          groupLabel: { color: 'var(--mantine-color-cyan-7)' },
        }}
      >
        <Combobox.Target withAriaAttributes={false}>
          {tooltip ? (
            <Tooltip
              label={tooltip}
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
                onClick={() => {
                  //e.stopPropagation();
                  combobox.toggleDropdown();
                }}
                //variant={buttonVariant ? buttonVariant : 'transparent'}
                variant={buttonVariant ? buttonVariant : 'transparent'}
                p=" 0.5rem"
                m="0px"
                px="0.45rem"
                mx="3px"
                bg={combobox.dropdownOpened ? 'var(--mantine-color-gray-2)' : ''}
              >
                {buttonContent}
              </Button>
            </Tooltip>
          ) : (
            <Button
              onClick={() => {
                //e.stopPropagation();
                combobox.toggleDropdown();
              }}
              variant={buttonVariant ? buttonVariant : 'transparent'}
              //p="0px"
              //m="0px"
            >
              {buttonContent}
            </Button>
          )}
        </Combobox.Target>

        <Combobox.Dropdown //bg="var(--mantine-color-gray-1)"
          styles={{ arrow: { backgroundColor: 'var(--mantine-color-cyan-2)' } }}
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
            <ScrollArea
              h="100%"
              styles={{ thumb: { backgroundColor: 'var(--mantine-color-cyan-4)' } }}
            >
              {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
            </ScrollArea>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
