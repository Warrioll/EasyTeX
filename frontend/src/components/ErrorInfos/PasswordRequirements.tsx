import { Box } from '@mantine/core';

export default function PasswarodRequirements() {
  return (
    <Box mb="sm">
      <b>Password</b> must:
      <li>be 8-64 characters long</li>
      <li>contain min. one letter</li>
      <li>contain min. one number</li>
      <li>
        contain min. one of @$!%*#?&{' '}
        <span style={{ marginLeft: '1.25rem' }}>special character</span>
      </li>
    </Box>
  );
}
