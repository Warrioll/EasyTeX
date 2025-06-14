import { ReactElement } from 'react';
import { Box, Button, Flex, Tooltip } from '@mantine/core';

type buttonType = {
  content: ReactElement;
  clickFunction: () => void | null;
  fontSize: string;
  tooltip: string;
};

type TabTemplatePropsType = {
  buttons: buttonType[];
};

export default function TabTemplate({ buttons }: TabTemplatePropsType) {
  return (
    <Flex>
      {/* <Tooltip.Group openDelay={100} closeDelay={300}>
        <Box ml="2rem">
          {codeAndLink.map((formatButton, idx) => (
            <Tooltip
              label={formatButton.tooltip}
              color="cyan"
              position="bottom"
              offset={5}
              withArrow
              arrowOffset={50}
              arrowSize={7}
              arrowRadius={2}
            >
              <Button
                variant="format"
                fz={formatButton.fontSize}
                onClick={() => {
                  formatButton.clickFunction();
                  saveElementChanges();
                }}
              >
                {formatButton.content}
              </Button>
            </Tooltip>
          ))}
        </Box>

        <Box ml="2rem" mr="2rem">
          {indexes.map((formatButton, idx) => (
            <Tooltip
              label={formatButton.tooltip}
              color="cyan"
              position="bottom"
              offset={5}
              withArrow
              arrowOffset={50}
              arrowSize={7}
              arrowRadius={2}
            >
              <Button
                variant="format"
                fz={formatButton.fontSize}
                onClick={() => {
                  formatButton.clickFunction();
                  saveElementChanges();
                }}
              >
                {formatButton.content}
              </Button>
            </Tooltip>
          ))}
        </Box>

        {lists.map((formatButton, idx) => (
          <Tooltip
            label={formatButton.tooltip}
            color="cyan"
            position="bottom"
            offset={5}
            withArrow
            arrowOffset={50}
            arrowSize={7}
            arrowRadius={2}
          >
            <Button
              variant="format"
              fz={formatButton.fontSize}
              onClick={() => {
                formatButton.clickFunction();
                saveElementChanges();
              }}
            >
              {formatButton.content}
            </Button>
          </Tooltip>
        ))}
      </Tooltip.Group> */}
    </Flex>
  );
}
