import { RiErrorWarningFill } from 'react-icons/ri';
import { Box, Flex, Text, Transition } from '@mantine/core';

type InfoErrorMessagePropsType = {
  errorMessage: string;
  errorMessageOpened: boolean;
};

export default function ErrorMessage({
  errorMessage,
  errorMessageOpened,
}: InfoErrorMessagePropsType) {
  return (
    <Box h={30}>
      <Transition
        mounted={errorMessageOpened}
        transition="fade-up"
        duration={200}
        timingFunction="ease"
        keepMounted
      >
        {(styles) => (
          <Flex justify="center" align="center" style={styles}>
            <Text ta="center" size="md" c="var(--mantine-color-error)">
              <RiErrorWarningFill />
            </Text>
            <Text ta="center" ml={5} mb={3} size="sm" c="var(--mantine-color-error)">
              {errorMessage}
            </Text>
          </Flex>
        )}
      </Transition>
    </Box>
  );
}
