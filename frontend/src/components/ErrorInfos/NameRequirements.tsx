import { Box } from '@mantine/core';

type NameRequirementsPropsType={
  thingToName:string
}

export default function NameRequirements({thingToName}:NameRequirementsPropsType) {
  return (
     <Box mb="sm">
            <b>{thingToName} name</b> must:
            <li> be 3-255 characters long</li>
            <li>
              not contain any other special{' '}
              <span style={{ marginLeft: '1.25rem' }}>characters than ._!@#$%^&-</span>
            </li>
            <li>
              not start or end with space
             
            </li>
            <li>
              not start or end with ._ special{' '}
              <span style={{ marginLeft: '1.25rem' }}>characters</span>
            </li>
          </Box>
  );
}