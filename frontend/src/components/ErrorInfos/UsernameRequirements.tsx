import { Box, List } from '@mantine/core';

export default function UsernameRequirements() {
  return (
    <Box mb="sm">
      <b>Username</b> must:
      <List>
        <List.Item> be 3-30 characters long</List.Item>
        <List.Item>not contain any other special characters than ._!@#$^&*?-</List.Item>
        <List.Item>not contain white characters</List.Item>
        <List.Item>not start or end with ._ special characters</List.Item>
      </List>
    </Box>
  );
}
