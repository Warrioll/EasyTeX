import { ReactElement } from 'react';
import { includes } from 'lodash';
import { Box, Button, Flex, Tooltip } from '@mantine/core';
import { groupedListType } from '@/Types';

type TabTemplatePropsType = {
  buttons: groupedListType;
  iconSize: string;
  dontRenderButtons?: number[];
};

export default function TabTemplate({
  buttons,
  iconSize,
  dontRenderButtons,
}: TabTemplatePropsType) {
  const buttonsNotToRender =
    dontRenderButtons !== undefined && dontRenderButtons !== null && dontRenderButtons.length > 0
      ? dontRenderButtons
      : [];

  let amountOFButtons = 0;

  return (
    <Flex>
      {buttons.map((buttonsGroup, groupIdx) => (
        <Tooltip.Group openDelay={100} closeDelay={300}>
          <Flex ml="2rem">
            {buttonsGroup.group.map((button, idx) => {
              amountOFButtons++;
              return (
                <Tooltip
                  label={button.label}
                  //label={buttonsNotToRender.includes(idx) ? 'true' : 'false'}
                  color="cyan"
                  position="bottom"
                  offset={5}
                  withArrow
                  arrowOffset={50}
                  arrowSize={7}
                  arrowRadius={2}
                >
                  {buttonsNotToRender.includes(amountOFButtons) ? (
                    <button.Icon />
                  ) : (
                    <Button variant="format" fz={iconSize} onClick={button.function}>
                      <button.Icon />
                    </Button>
                  )}
                </Tooltip>
              );
            })}
          </Flex>
        </Tooltip.Group>
      ))}
    </Flex>
  );
}
