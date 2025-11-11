import { Text } from '@mantine/core';

type BlockReferenceIdPropsType = {
  referenceId: string;
  marked?: boolean;
};

export default function BlockReferenceId({ referenceId, marked }: BlockReferenceIdPropsType) {
  return (
    <>
      <Text
        miw="2rem"
        w="100%"
        c={marked ? 'var(--mantine-color-white)' : 'var(--mantine-color-cyan-9)'}
        bg={marked ? 'var(--mantine-color-cyan-4)' : 'var(--mantine-color-cyan-0)'}
        fw="500"
        fz="sm"
        pl="5px"
        pr="5px"
        ta="center"
        style={{ borderRadius: ' var(--mantine-radius-md)' }}
      >
        {referenceId}
      </Text>
    </>
  );
}
