import { ReactElement } from 'react';
import { includes } from 'lodash';
import { Box, Button, Flex, Tooltip } from '@mantine/core';
import { groupedListType } from '@/Types';
import { useBlocksContentContext } from '../../DocumentContextProviders';

type TabTemplatePropsType = {
  buttons: groupedListType;
  iconSize: string;
  dontRenderButtons?: number[];
  getToottipText?: (label: string) => string;
  belongingValidator?: string;
};

export default function TabTemplate({
  buttons,
  iconSize,
  dontRenderButtons,
  getToottipText,
  belongingValidator,
}: TabTemplatePropsType) {
  const buttonsNotToRender =
    dontRenderButtons !== undefined && dontRenderButtons !== null && dontRenderButtons.length > 0
      ? dontRenderButtons
      : [];

  //  const { blocksContent, setBlocksContent } = useBlocksContentContext();

  let amountOFButtons = 0;

  return (
    <Flex>
      <Tooltip.Group openDelay={100} closeDelay={300}>
        {buttons.map((buttonsGroup, groupIdx) => {
          const filtredGroup = buttonsGroup.group.filter((button) =>
            button.belonging?.includes(belongingValidator as string)
          );
          return filtredGroup.length === 0 ? null : (
            <Flex ml="2rem">
              {buttonsGroup.group.map((button, idx) => {
                amountOFButtons++;
                if (!button.belonging?.includes(belongingValidator as string)) {
                  return null;
                }
                return (
                  <Tooltip
                    label={getToottipText ? getToottipText(button.label) : button.label}
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
          );
        })}
      </Tooltip.Group>
    </Flex>
  );
}
