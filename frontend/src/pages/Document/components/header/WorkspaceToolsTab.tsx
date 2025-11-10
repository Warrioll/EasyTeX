import { Dispatch, SetStateAction } from 'react';
import { FaRedo, FaUndo } from 'react-icons/fa';
import { Flex } from '@mantine/core';
import { useZoomsContext } from '../../DocumentContextProviders';
import ZoomTools from './ZoomTools';

export default function WorkspaceToolsTab() {
  const { pdfZoom, setPdfZoom, workspaceZoom, setWorkspaceZoom } = useZoomsContext();
  const workspaceZoomState: [string | null, Dispatch<SetStateAction<string | null>>] = [
    workspaceZoom,
    setWorkspaceZoom,
  ];

  return (
    <Flex>
      <ZoomTools zoomState={workspaceZoomState} tooltip="Workspace zoom" />
    </Flex>
  );
}
