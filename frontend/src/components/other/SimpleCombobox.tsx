import { FaAngleDown } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Center, Combobox, Input, InputBase, Tooltip, useCombobox } from '@mantine/core';
import classes from './other.module.css';

type SimpleComboboxPropsType = {
  valueState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
  values: { value: number | string; label: string }[];
  width: string;
  tooltip: string;
  disabled?: boolean;
};

export default function SimpleCombobox({
  valueState,
  values,
  width,
  tooltip,
  disabled,
}: SimpleComboboxPropsType) {
  const [value, setValue] = valueState;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = values.map((item) => {
    return typeof item.value === 'number' ? (
      <Combobox.Option
        className={classes.simpleComboboxDropdownOption}
        value={item.value.toString()}
        key={item.value.toString()}
      >
        {item.label}
      </Combobox.Option>
    ) : (
      <Combobox.Option
        className={classes.simpleComboboxDropdownOption}
        value={item.value}
        key={item.value}
      >
        {item.label}
      </Combobox.Option>
    );
  });

  return (
    <>
      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          setValue(val);
          combobox.closeDropdown();
        }}
        disabled={disabled}
      >
        <Combobox.Target>
          <Center>
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
              <InputBase
                disabled={disabled}
                w={width}
                component="button"
                type="button"
                pointer
                rightSection={<MdOutlineKeyboardArrowDown style={{ marginTop: '2px' }} />}
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
                    //textAlign: 'center',
                  },
                }}
                //className={classes.zoomInput}
              >
                {values.find((val) => val.value === value)?.label || (
                  <Input.Placeholder> </Input.Placeholder>
                )}
              </InputBase>
            </Tooltip>
          </Center>
        </Combobox.Target>

        <Combobox.Dropdown
          bg="var(--mantine-color-gray-0)"
          className={classes.simpleComboboxDropdownOption}
          bd=" 1px solid var(--mantine-color-cyan-3)"
        >
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}
