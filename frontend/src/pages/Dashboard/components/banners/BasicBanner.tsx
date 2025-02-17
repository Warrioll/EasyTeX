import { ReactElement } from 'react';
import { Box, Button, Group, Text, Title } from '@mantine/core';
import classes from './banners.module.css';

type basicBannerPropsType = {
  color: string;
  icon: ReactElement;
  documentClassName: string;
  createDocumentModal: any;
};

export default function BasicBanner({
  color,
  icon,
  documentClassName,
  createDocumentModal,
}: basicBannerPropsType): ReactElement {
  return (
    <Group
      p="xl"
      className={classes.banner}
      w="90%"
      style={{
        background: `linear-gradient(to right,var(--mantine-color-${color}-7),var(--mantine-color-${color}-3)`,
      }}
      c="var(--mantine-color-white)"
      justify="flex-start"
    >
      <Text fz="4.5rem" mr="md" ml="sm" mb="-13px">
        {icon}
      </Text>
      <Box w="90%">
        <Title>Welcome to EasyTeX!</Title>
        <Group justify="space-between">
          <Text>Create and edit {documentClassName} based on LaTeX in EASY way!</Text>
          <Button
            bg="var(--mantine-color-white)"
            c={`var(--mantine-color-${color}-7)`}
            onClick={() => createDocumentModal.modalHandlers.open()}
          >
            Create new Document
          </Button>
        </Group>
      </Box>
    </Group>
  );
}
