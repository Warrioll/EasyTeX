import { FaRedo, FaUndo } from 'react-icons/fa';
import { Button, Flex, Tooltip } from '@mantine/core';
import { useBlocksContentContext } from '../../DocumentContextProviders';
import ZoomTools from './ZoomTools';

type WorkspaceToolsTabPropsType = {
  workspaceZoom: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
};

export default function WorkspaceToolsTab({ workspaceZoom }: WorkspaceToolsTabPropsType) {
  // const {
  //   blocksContent,
  //   setBlocksContent,
  //   isNotSaved,
  //   setIsNotSaved,
  //   undo,
  //   redo,
  //   undoPossible,
  //   redoPossible,
  // } = useBlocksContentContext();

  return (
    <Flex>
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
          <Button variant="format" disabled={!undoPossible()} onClick={() => undo()}>
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
          <Button variant="format" disabled={!redoPossible()} onClick={() => redo()}>
            <FaRedo />
          </Button>
        </Tooltip>
      </Flex> */}
      <ZoomTools zoomState={workspaceZoom} tooltip="Workspace zoom" />
    </Flex>
  );
}
