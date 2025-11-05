import { FaAngleDown } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Box, Center, Combobox, Input, InputBase, Tooltip, useCombobox } from '@mantine/core';
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
              {/* <Tooltip
              label={tooltip}
              //label={buttonsNotToRender.includes(idx) ? 'true' : 'false'}
              color="cyan"
              position="bottom"
              offset={5}
              withArrow
              arrowOffset={50}
              arrowSize={7}
              arrowRadius={2}
            > */}
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
                //bg="var(--mantine-color-cyan-4)"
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
                    //textAlign: 'center',
                  },
                }}
                //className={classes.zoomInput}
              >
                {values.find((val) => val.value.toString() === value)?.label || (
                  <Input.Placeholder> </Input.Placeholder>
                )}
              </InputBase>
              {/* </Tooltip> */}
            </CustomTooltip>
          </Center>
        </Combobox.Target>

        <Combobox.Dropdown
          bg="var(--mantine-color-cyan-0)"
          //c="var(--mantine-color-white)"
          className={classes.simpleComboboxDropdownOption}
          bd=" 1px solid var(--mantine-color-cyan-3)"
        >
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}
