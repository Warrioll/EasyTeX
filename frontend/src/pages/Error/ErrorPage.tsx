import { FallbackProps } from 'react-error-boundary';
import { Box, Button, ScrollArea, Title } from '@mantine/core';

export default function ErrorPage({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Box p="xl">
      <Title mb="xl"> Sorry somtehing went wrong...</Title>
      <ScrollArea
        h="100%"
        style={{ borderRadius: 'var(--mantine-radius-md)' }}
        bg="var(--mantine-color-gray-1)"
      >
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh page
        </Button>
        {error.message}
      </ScrollArea>
    </Box>
  );
}
