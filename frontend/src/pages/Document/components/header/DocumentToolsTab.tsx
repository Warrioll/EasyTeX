import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { FaRedo, FaUndo } from 'react-icons/fa';
import { Box, Button, Flex, Grid, Tooltip } from '@mantine/core';
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

  const fontSizeState = useState<string | null>(null);
  const fontSizeValues = [
    { value: '10pt', label: '10 pt' },
    { value: '11pt', label: '11 pt' },
    { value: '12pt', label: '12 pt' },
  ];

  const fontTypeState = useState<string | null>(null);
  const fontTypeValues = [
    { value: 'sans', label: 'Sans' },
    { value: 'roman', label: 'Roman' },
    { value: 'typewriter', label: 'Typewriter' },
  ];

  const orientationState = useState<string | null>(null);
  const orientationValues = [
    { value: '', label: 'Vertical' },
    { value: 'landscape', label: 'Horizontal' },
  ];

  const columnsState = useState<string | null>(null);
  const columnsValues = [
    { value: 'onecolumn', label: 'One column' },
    { value: 'twocolumn', label: 'Two columns' },
  ];

  const paperSizeState = useState<string | null>(null);
  const paperSizeValues = [
    { value: 'a4paper', label: 'A4 paper' },
    { value: 'a5paper', label: 'A5 paper' },
    { value: 'b5paper', label: 'B5 paper' },
    { value: 'letterpaper', label: 'Letter paper' },
    { value: 'legalpaper', label: 'Legal paper' },
    { value: 'executivepaper', label: 'Executive paper' },
  ];

  useEffect(() => {
    // console.log('opt loaded', optionsLoaded)
    // if (optionsLoaded && blocksContent[0] && blocksContent[0].blockContent) {
    //const blocksCopy = cloneDeep(blocksContent)
    //  blocksCopy[0].blockContent.paperSize = paperSizeState[0];
    // blocksCopy[0].blockContent.columns= columnsState[0]
    //  blocksCopy[0].blockContent.fontSize = fontSizeState[0];
    //  blocksCopy[0].blockContent.orientation = orientationState[0];

    if (blocksContent[0] && blocksContent[0].blockContent) {
      blocksContent[0].blockContent.paperSize = paperSizeState[0];
      blocksContent[0].blockContent.columns = columnsState[0];
      blocksContent[0].blockContent.fontSize = fontSizeState[0];
      blocksContent[0].blockContent.orientation = orientationState[0];
      //console.log('columns:', blocksContent[0].blockContent.columns)
      return () => {
        setIsNotSaved(true);
      };
      //setBlocksContent(blocksCopy)
      // console.log('yolo doc tab', blocksCopy)
      // }
    }
  }, [paperSizeState[0], columnsState[0], fontTypeState[0], fontSizeState[0], orientationState[0]]);

  useEffect(() => {
    if (blocksContent[0] && blocksContent[0].blockContent) {
      console.log(' options loaded');
      paperSizeState[1](blocksContent[0].blockContent.paperSize);
      columnsState[1](blocksContent[0].blockContent.columns);
      //fontTypeState[1](blocksContent[0].blockContent.paperSize)
      fontSizeState[1](blocksContent[0].blockContent.fontSize);
      orientationState[1](blocksContent[0].blockContent.orientation);
    }
  }, [blocksContent]);

  return (
    <Flex align="center" gap="md" w="100%">
      {/* <SimpleCombobox tooltip="Default font"  width='6rem' values={fontTypeValues} valueState={fontTypeState} /> */}
      {/* <Flex mx="2rem" justify="center">
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
      </Flex> */}

      <SimpleCombobox
        tooltip="Default font size"
        width="7rem"
        values={fontSizeValues}
        valueState={fontSizeState}
      />
      {blocksContent[0] &&
        blocksContent[0].blockContent &&
        blocksContent[0].blockContent.class !== 'beamer' && (
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
        )}
      {blocksContent[0] &&
        blocksContent[0].blockContent &&
        blocksContent[0].blockContent.class !== 'beamer' &&
        blocksContent[0].blockContent.class !== 'letter' && (
          <SimpleCombobox
            tooltip="Columns"
            width="7rem"
            values={columnsValues}
            valueState={columnsState}
          />
        )}

      {blocksContent[0] &&
        blocksContent[0].blockContent &&
        blocksContent[0].blockContent.class !== 'beamer' && (
          <SimpleCombobox
            tooltip="Paper size"
            width="9rem"
            values={paperSizeValues}
            valueState={paperSizeState}
            disabled={
              blocksContent[0] &&
              blocksContent[0].blockContent &&
              blocksContent[0].blockContent.class === 'beamer'
            }
          />
        )}

      {/* <ZoomTools zoomState={zoomState}/> */}
    </Flex>
  );
}
