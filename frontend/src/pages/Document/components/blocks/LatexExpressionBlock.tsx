import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { Box, Flex, Text, Textarea } from '@mantine/core';
import { useBlocksContentContext } from '../../DocumentContextProviders';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
import classes from './blocks.module.css';

type LatexExpressionBlockProps = {
  idx: number;
};

export default function LatexExpressionBlock({ idx }: LatexExpressionBlockProps) {
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();

  const [lines, setLines] = useState<string[]>(['']);

  useEffect(() => {
    setLines(
      blocksContent[idx].blockContent ? blocksContent[idx].blockContent.split('\n').length : 1
    );
  }, [blocksContent]);

  const updateContent = (e) => {
    const blocksCopy = cloneDeep(blocksContent);
    blocksCopy[idx].blockContent = e.currentTarget.value;
    setBlocksContent(blocksCopy);
    setIsNotSaved(true);
  };

  return (
    <MarkedBlockFrame blockName="LaTeX expression" idx={idx}>
      <Flex className={classes.codeEditor}>
        <Box
          miw="2.5rem"
          p="calc(0.5rem + 2px)"
          c="var(--mantine-color-gray-6)"
          ta="right"
          bg="var(--mantine-color-gray-2)"
          style={{
            borderBottomLeftRadius: 'var(--mantine-radius-md)',
            borderTopLeftRadius: 'var(--mantine-radius-md)',
          }}
        >
          {Array.from({ length: lines }, (_, i) => {
            return (
              <Text fz="1rem" className={classes.codeEditorNumbers} key={`${idx}line${i}`}>
                {i + 1}
              </Text>
            );
          })}
        </Box>

        <Textarea
          bg="var(--mantine-color-gray-2)"
          bd="solid 2px var(--mantine-color-gray-2)"
          style={{
            borderTopRightRadius: 'var(--mantine-radius-md',
            borderBottomRightRadius: 'var(--mantine-radius-md',
          }}
          classNames={{ input: classes.codeEditorInput }}
          autosize
          w="100%"
          h="100%"
          variant="filled"
          value={blocksContent[idx].blockContent}
          onChange={updateContent}
        />
      </Flex>
    </MarkedBlockFrame>
  );
}
