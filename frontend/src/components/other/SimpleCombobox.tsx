import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import {  Center, Combobox, Input, InputBase,useCombobox } from '@mantine/core';
import CustomTooltip from './CustomTooltip';
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
        key={item.value.toString() + tooltip}
      >
        {item.label}
      </Combobox.Option>
    ) : (
      <Combobox.Option
        className={classes.simpleComboboxDropdownOption}
        value={item.value}
        key={item.value + tooltip}
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
            <CustomTooltip label={tooltip}>
              <InputBase
                disabled={disabled}
                w={width}
                component="button"
                type="button"
                pointer
                rightSection={
                  <Center c="var(--mantine-color-white)">
                    <MdOutlineKeyboardArrowDown style={{ marginTop: '2px' }} />
                  </Center>
                }
                rightSectionPointerEvents="none"
                onClick={() => combobox.toggleDropdown()}
                variant="unstyled"
                p="0px"
                size="xs"
                styles={{
                  input: {
                    fontWeight: '500',
                    paddingLeft: '10px',
                    color: 'var(--mantine-color-white)',
                    backgroundColor: combobox.dropdownOpened
                      ? 'var(--mantine-color-cyan-7)'
                      : 'var(--mantine-color-cyan-5)',
                  },
                }}

              >
                {values.find((val) => val.value.toString() === value)?.label || (
                  <Input.Placeholder> </Input.Placeholder>
                )}
              </InputBase>

            </CustomTooltip>
          </Center>
        </Combobox.Target>

        <Combobox.Dropdown
          bg="var(--mantine-color-cyan-0)"
          className={classes.simpleComboboxDropdownOption}
          bd=" 1px solid var(--mantine-color-cyan-3)"
        >
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}
