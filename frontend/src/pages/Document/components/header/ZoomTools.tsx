import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { Button, Flex } from '@mantine/core';
import CustomTooltip from '@/components/other/CustomTooltip';
import SimpleCombobox from '@/components/other/SimpleCombobox';

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

  return (
    <Flex ml="2rem" mr="2rem">
      <CustomTooltip label="Zoom out">
        <Button
          variant="format"
          fz="var(--mantine-font-size-lg)"
          onMouseUp={() => {
            const zoomIdx = zoomValuesList.indexOf(Number(zoomValue)) - 1;
            if (zoomIdx >= 0) {
              setZoomValue(zoomValuesList[zoomIdx].toString());
            }
          }}
          disabled={zoomValue === '0.25'}
        >
          <FiZoomOut />
        </Button>
      </CustomTooltip>
      <SimpleCombobox tooltip={tooltip} valueState={zoomState} values={zoomList} width="4.1rem" />

      <CustomTooltip label="Zoom in">
        <Button
          disabled={zoomValue === '2'}
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
