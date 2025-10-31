import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import Latex from 'react-latex-next';
import { Box, Flex, Text, Textarea } from '@mantine/core';
import { useActiveBlockContext, useBlocksContentContext } from '../../DocumentContextProviders';
import MarkedBlockFrame from './blocksComponents/MarkedBlockFrame';
//import CodeEditor from '@uiw/react-textarea-code-editor';
import classes from './blocks.module.css';

type LatexExpressionBlockProps = {
  idx: number;
};

export default function LatexExpressionBlock({ idx }: LatexExpressionBlockProps) {
  const { activeBlock, setActiveBlock } = useActiveBlockContext();
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();

  const [lines, setLines] = useState<string[]>(['']);

  useEffect(() => {
    //console.log('lines:',  blocksContent[idx].blockContent)
    setLines(
      blocksContent[idx].blockContent ? blocksContent[idx].blockContent.split('\n').length : 1
    );
    //console.log('updatelines')
  }, [blocksContent]);

  //const lines = blocksContent[idx].blockcontent ? blocksContent[idx].blockcontent.split('\n') : ['']

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
        {/* <CodeEditor
        value={blocksContent[idx].blockContent}
        language="js"
        placeholder="Enter LaTeX expression"
        onChange={updateContent}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "red",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
        }}
      /> */}
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
