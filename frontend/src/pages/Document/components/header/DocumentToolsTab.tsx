import { useEffect, useState } from 'react';
import { Flex } from '@mantine/core';
import SimpleCombobox from '@/components/other/SimpleCombobox';
import { useBlocksContentContext } from '../../DocumentContextProviders';

export default function DocumentToolsTab() {
  const { blocksContent, setIsNotSaved } = useBlocksContentContext();

  const fontSizeState = useState<string | null>(null);
  const fontSizeValues = [
    { value: '10pt', label: '10 pt' },
    { value: '11pt', label: '11 pt' },
    { value: '12pt', label: '12 pt' },
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

  const languageState = useState<string | null>(null);
  const languageValues = [
    { value: 'english', label: 'English' },
    { value: 'polish', label: 'Polish' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'german', label: 'German' },
    { value: 'french', label: 'French' },
  ];

  useEffect(() => {
    if (blocksContent[0] && blocksContent[0].blockContent) {
      blocksContent[0].blockContent.paperSize = paperSizeState[0];
      blocksContent[0].blockContent.columns = columnsState[0];
      blocksContent[0].blockContent.fontSize = fontSizeState[0];
      blocksContent[0].blockContent.orientation = orientationState[0];
      blocksContent[0].blockContent.language = languageState[0];
      return () => {
        setIsNotSaved(true);
      };
    }
  }, [paperSizeState[0], columnsState[0], fontSizeState[0], orientationState[0], languageState[0]]);

  useEffect(() => {
    if (blocksContent[0] && blocksContent[0].blockContent) {
      paperSizeState[1](blocksContent[0].blockContent.paperSize);
      columnsState[1](blocksContent[0].blockContent.columns);
      fontSizeState[1](blocksContent[0].blockContent.fontSize);
      orientationState[1](blocksContent[0].blockContent.orientation);
      languageState[1](blocksContent[0].blockContent.language);
    }
  }, [blocksContent]);

  return (
    <Flex align="center" gap="md" w="100%">
      <SimpleCombobox
        tooltip="Main language"
        width="7rem"
        values={languageValues}
        valueState={languageState}
      />
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
    </Flex>
  );
}
