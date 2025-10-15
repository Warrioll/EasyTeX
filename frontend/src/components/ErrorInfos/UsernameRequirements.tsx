import { Box } from '@mantine/core';

export default function UsernameRequirements() {
  return (
    <Box mb="sm">
      <b>Username</b> must:
      <li> be 3-30 characters long</li>
      <li>
        not contain any other special{' '}
        <span style={{ marginLeft: '1.25rem' }}>characters than ._!@#$%^&*?-</span>
      </li>
      <li>
        not contain white characters
       
      </li>
      <li>
        not start or end with ._ special <span style={{ marginLeft: '1.25rem' }}>characters</span>
      </li>
    </Box>
  );
}
