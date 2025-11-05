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
import CustomTooltip from '@/components/other/CustomTooltip';
import SimpleCombobox from '@/components/other/SimpleCombobox';
import classes from './Header.module.css';

type zoomToolsPropsType = {
  zoomState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
  tooltip: string;
};

export default function ZoomTools({ zoomState, tooltip }: zoomToolsPropsType) {
  const [zoomValue, setZoomValue] = zoomState;

  const zoomValuesList = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  const zoomList = [
    { value: 0.25, label: '25%' },
    { value: 0.5, label: '50%' },
    { value: 0.75, label: '75%' },
    { value: 1, label: '100%' },
    { value: 1.25, label: '125%' },
    { value: 1.5, label: '150%' },
    { value: 1.75, label: '175%' },
    { value: 2, label: '200%' },
  ];
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
      <CustomTooltip label="Zoom out">
        {/* <Tooltip
        label="Zoom out"
        //label={buttonsNotToRender.includes(idx) ? 'true' : 'false'}
        color="cyan"
        position="bottom"
        offset={5}
        withArrow
        arrowOffset={50}
        arrowSize={7}
        arrowRadius={2}
      > */}

        <Button
          variant="format"
          fz="var(--mantine-font-size-lg)"
          onMouseUp={() => {
            const zoomIdx = zoomValuesList.indexOf(Number(zoomValue)) - 1;
            if (zoomIdx >= 0) {
              setZoomValue(zoomValuesList[zoomIdx].toString());
            }
          }}
        >
          <FiZoomOut />
        </Button>
      </CustomTooltip>
      <SimpleCombobox tooltip={tooltip} valueState={zoomState} values={zoomList} width="4.1rem" />

      {/* <Tooltip
        label="Zoom in"
        //label={buttonsNotToRender.includes(idx) ? 'true' : 'false'}
        color="cyan"
        position="bottom"
        offset={5}
        withArrow
        arrowOffset={50}
        arrowSize={7}
        arrowRadius={2}
      > */}
      <CustomTooltip label="Zoom in">
        <Button
          variant="format"
          fz="var(--mantine-font-size-lg)"
          onMouseUp={() => {
            const zoomIdx = zoomValuesList.indexOf(Number(zoomValue)) + 1;
            if (zoomIdx < zoomValuesList.length) {
              setZoomValue(zoomValuesList[zoomIdx].toString());
            }
          }}
        >
          <FiZoomIn />
        </Button>
      </CustomTooltip>
    </Flex>
  );
}
