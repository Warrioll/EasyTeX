import { useEffect, useState } from 'react';
import { FaRedo, FaUndo } from 'react-icons/fa';
import { Button, Flex, Tooltip } from '@mantine/core';
import SimpleCombobox from '@/components/other/SimpleCombobox';
import { useBlocksContentContext } from '../../DocumentContextProviders';
import ZoomTools from './ZoomTools';

type DocumentToolsTabPropsType = {
  zoomState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
};
export default function DocumentToolsTab({ zoomState }: DocumentToolsTabPropsType) {
  const {
    blocksContent,
    setBlocksContent,
    isNotSaved,
    setIsNotSaved,
    undo,
    redo,
    undoPossible,
    redoPossible,
  } = useBlocksContentContext();

  const fontSizeState = useState<string | null>('12pt');
  const fontSizeValues = [
    { value: '10pt', label: '10 pt' },
    { value: '11pt', label: '11 pt' },
    { value: '12pt', label: '12 pt' },
  ];

  const fontTypeState = useState<string | null>('sans');
  const fontTypeValues = [
    { value: 'sans', label: 'Sans' },
    { value: 'roman', label: 'Roman' },
    { value: 'typewriter', label: 'Typewriter' },
  ];

  const orientationState = useState<string | null>('');
  const orientationValues = [
    { value: '', label: 'Vertical' },
    { value: 'landscape', label: 'Horizontal' },
  ];

  const columnsState = useState<string | null>('onecolumn');
  const columnsValues = [
    { value: 'onecolumn', label: 'One column' },
    { value: 'twocolumns', label: 'Two columns' },
  ];

  const paperSizeState = useState<string | null>('onecolumn');
  const paperSizeValues = [
    { value: 'a4paper', label: 'A4 paper' },
    { value: 'a5paper', label: 'A5 paper' },
    { value: 'b5paper', label: 'B5 paper' },
    { value: 'letterpaper', label: 'Letter paper' },
    { value: 'legalpaper', label: 'Legal paper' },
    { value: 'executivepaper', label: 'Executive paper' },
  ];

  useEffect(() => {
    return () => {
      if (blocksContent[0] && blocksContent[0].blockContent) {
        blocksContent[0].blockContent.paperSize = paperSizeState[0];
        //blocksContent[0].blockContent.columns= columnsState[0]
        //blocksContent[0].blockContent.=fontTypeState[0]
        blocksContent[0].blockContent.fontSize = fontSizeState[0];
        blocksContent[0].blockContent.orientation = orientationState[0];
        setIsNotSaved(true);
      }
    };
  }, [paperSizeState[0], columnsState[0], fontTypeState[0], fontSizeState[0], orientationState[0]]);

  useEffect(() => {
    if (blocksContent[0] && blocksContent[0].blockContent) {
      paperSizeState[1](blocksContent[0].blockContent.paperSize);
      //columnsState[1](blocksContent[0].blockContent.paperSize)
      //fontTypeState[1](blocksContent[0].blockContent.paperSize)
      fontSizeState[1](blocksContent[0].blockContent.fontSize);
      orientationState[1](blocksContent[0].blockContent.orientation);
    }
  }, [blocksContent]);

  return (
    <Flex align="center" gap="md">
      {/* <SimpleCombobox tooltip="Default font"  width='6rem' values={fontTypeValues} valueState={fontTypeState} /> */}
      <Flex mr="4rem">
        <Tooltip
          label="Undo"
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
            variant="format" //disabled={!undoPossible()} onClick={() => undo()}
          >
            <FaUndo />
          </Button>
        </Tooltip>
        <Tooltip
          label="Redo"
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
            variant="format" //</Tooltip>disabled={!redoPossible()}
          >
            <FaRedo />
          </Button>
        </Tooltip>
      </Flex>
      <SimpleCombobox
        tooltip="Default font size"
        width="7rem"
        values={fontSizeValues}
        valueState={fontSizeState}
      />
      <SimpleCombobox
        tooltip="Orientation"
        width="7rem"
        values={orientationValues}
        valueState={orientationState}
        disabled={
          blocksContent[0] &&
          blocksContent[0].blockContent &&
          blocksContent[0].blockContent.class === 'beamer'
        }
      />
      <SimpleCombobox
        tooltip="Columns"
        width="7rem"
        values={columnsValues}
        valueState={columnsState}
        disabled={
          blocksContent[0] &&
          blocksContent[0].blockContent &&
          blocksContent[0].blockContent.class === 'beamer' &&
          blocksContent[0].blockContent.class === 'letter'
        }
      />
      <SimpleCombobox
        tooltip="Paper size"
        width="7rem"
        values={paperSizeValues}
        valueState={paperSizeState}
        disabled={
          blocksContent[0] &&
          blocksContent[0].blockContent &&
          blocksContent[0].blockContent.class === 'beamer'
        }
      />
      {/* <ZoomTools zoomState={zoomState}/> */}
    </Flex>
  );
}
