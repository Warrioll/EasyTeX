import { Box, List } from '@mantine/core';

type NameRequirementsPropsType = {
  thingToName: string;
};

export default function NameRequirements({ thingToName }: NameRequirementsPropsType) {
  return (
    <Box mb="sm">
      <b>{thingToName} name</b> must:
      <List>
        <List.Item> be 3-255 characters long</List.Item>
        <List.Item>not contain any other special characters than ._!@#$%^&-</List.Item>
        <List.Item>not start or end with space</List.Item>
        <List.Item>not start or end with ._ special characters</List.Item>
      </List>
    </Box>
  );
}
