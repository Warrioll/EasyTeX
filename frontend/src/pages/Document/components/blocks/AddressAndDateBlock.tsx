import { Box, Flex, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useBlocksContentContext } from '../../DocumentContextProviders';
import BasicTexfield from './blocksComponents/BasicTextfield';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import classes from './blocks.module.css';

type AddressAndDateBlockPropsType = {
  idx: number;
};

export default function AddressAndDateBlock({ idx }: AddressAndDateBlockPropsType) {
  const { blocksContent, setBlocksContent } = useBlocksContentContext();
  const [focusTrap, { toggle }] = useDisclosure(false);

  return (
    <div>
      <Flex>
        <MarkedBlockFrame idx={idx} blockName="Address & date">
          <Stack
            justify="center"
            align="flex-start"
            pt="xl"
            pb="xl"
            m="xl"
            className={classes.titlePage}
            ml="xs"
          >
            <Flex w="100%">
              <Text
                ta="left"
                miw="3rem"
                mr="xs"
                mt="xs"
                fz="xs"
                fw="500"
                c="var(--mantine-color-cyan-6)"
              >
                Address:
              </Text>
              <Box w="calc(100% - 3rem)">
                <BasicTexfield
                  idx={idx}
                  contentToRead={blocksContent[idx].blockContent.author as string}
                  idxInput={idx.toString().concat('author')}
                />
              </Box>
            </Flex>
            <Flex w="100%">
              <Text
                ta="left"
                miw="3rem"
                mr="xs"
                mt="xs"
                fz="xs"
                fw="500"
                c="var(--mantine-color-cyan-6)"
              >
                Date:
              </Text>
              <Box w="calc(100% - 3rem)">
                <BasicTexfield
                  idx={idx}
                  contentToRead={blocksContent[idx].blockContent.date as string}
                  idxInput={idx.toString().concat('date')}
                />
              </Box>
            </Flex>
          </Stack>
        </MarkedBlockFrame>
      </Flex>
    </div>
  );
}
