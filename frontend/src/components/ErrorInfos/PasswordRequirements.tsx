import { Box, List } from '@mantine/core';

export default function PasswarodRequirements() {
  return (
    <Box mb="sm">
      <b>Password</b> must:
      <List>
        <List.Item>be 8-64 characters long</List.Item>
        <List.Item>contain min. one letter</List.Item>
        <List.Item>contain min. one number</List.Item>
        <List.Item>contain min. one of @$!*#?& special character</List.Item>
      </List>
    </Box>
  );
}
