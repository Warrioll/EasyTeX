import { Flex, Text } from '@mantine/core';

type BlockReferenceIdPropsType = {
  referenceId: string;
};

export default function BlockReferenceId({ referenceId }: BlockReferenceIdPropsType) {
  return (
    <>
      {/* <Tooltip
            label={`Unique equation identifier used for references`}
            //label={buttonsNotToRender.includes(idx) ? 'true' : 'false'}
            color="var(--mantine-color-cyan-0)"
            //bd="1px solid var(--mantine-color-cyan-4)"
            position="bottom"
            w="10vw"
            c="var(--mantine-color-cyan-9)"
            offset={5}
            withArrow
            arrowOffset={50}
            arrowSize={7}
            arrowRadius={2}
            multiline
          > */}
      <Text
        miw="2rem"
        w="100%"
        //c={idx === activeBlock ? 'var(--mantine-color-white)' : 'var(--mantine-color-cyan-9)'}
        // bg={
        //   idx === activeBlock ? 'var(--mantine-color-cyan-4)' : 'var(--mantine-color-cyan-0)'
        // }
        c="var(--mantine-color-cyan-9)"
        bg="var(--mantine-color-cyan-0)"
        fw="500"
        fz="sm"
        pl="5px"
        pr="5px"
        ta="center"
        //bd="1px solid var(--mantine-color-cyan-5)"
        style={{ borderRadius: ' var(--mantine-radius-md)' }}
      >
        {referenceId}
      </Text>
      {/* </Tooltip> */}
    </>
  );
}
