import { Button, Flex, Text, Tooltip } from '@mantine/core';
import CustomTooltip from '@/components/other/CustomTooltip';
import { groupedListType } from '@/Types';

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
                  <CustomTooltip
                    label={
                      <>
                        <Text fz="sm" w="100%" ta="center">
                          {getToottipText ? getToottipText(button.label) : button.label}
                        </Text>
                        <Text fz="sm" w="100%" ta="center">
                          {button.disabledFunction
                            ? button.disabledFunction()
                              ? '(Maximum quantity is already used)'
                              : ''
                            : ''}
                        </Text>
                      </>
                    }
                  >
                    {buttonsNotToRender.includes(amountOFButtons) ? (
                      <button.Icon />
                    ) : (
                      <Button
                        variant="format"
                        fz={iconSize}
                        onMouseUp={button.function}
                        disabled={button.disabledFunction ? button.disabledFunction() : false}
                        bg={button.backgroundColor ? button.backgroundColor : ''}
                      >
                        <button.Icon />
                      </Button>
                    )}
                  </CustomTooltip>
                );
              })}
            </Flex>
          );
        })}
      </Tooltip.Group>
    </Flex>
  );
}
