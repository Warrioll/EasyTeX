import { Box, Button, Stack, Text } from '@mantine/core';

type ErrorBannerPropsType = {
  title: string;
  Icon?: React.FC;
  description?: string;
  buttonLabel?: string;
  ButtonIcon?: React.FC;
  buttonFunction?: () => void;
};

export default function ErrorBanner({
  title,
  Icon,
  description,
  buttonLabel,
  ButtonIcon,
  buttonFunction,
}: ErrorBannerPropsType) {
  return (
    <Stack
      align="center"
      //mih="50vh"
      p="md"
      c="var(--mantine-color-gray-6)"
      fz="2rem"
      fw="bold"
      ta="center"
      gap="sm"
      h="100%"
      justify="center"
    >
      {Icon && (
        <Text fz="4rem" mr="md">
          <Icon />
        </Text>
      )}
      <Box>{title}</Box>

      <Text>{description}</Text>
      {buttonLabel && (
        <Button
          variant="light"
          onClick={buttonFunction}
          mih="2.5rem"
          color="var(--mantine-color-gray-6)"
          leftSection={ButtonIcon ? <ButtonIcon /> : null}
        >
          {buttonLabel}
        </Button>
      )}
    </Stack>
  );
}
