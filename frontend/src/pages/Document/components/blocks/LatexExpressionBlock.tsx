import MarkedBlockFrame from "./blocksComponents/MarkedBlockFrame"
import Latex from "react-latex-next";
import { Textarea, Flex, Box, Text } from "@mantine/core";
import { useBlocksContentContext, useActiveBlockContext } from "../../DocumentContextProviders";
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import classes from './blocks.module.css'

type LatexExpressionBlockProps = {
  idx: number;
};

export default function LatexExpressionBlock ({idx}: LatexExpressionBlockProps){

      const { activeBlock, setActiveBlock } = useActiveBlockContext();
      const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } =
        useBlocksContentContext();

      const [lines, setLines]=useState<string[]>([''])

      useEffect(()=>{
        //console.log('lines:',  blocksContent[idx].blockContent)
        setLines( blocksContent[idx].blockContent ? blocksContent[idx].blockContent.split('\n').length : 1)
        //console.log('updatelines')
      },[blocksContent])

      //const lines = blocksContent[idx].blockcontent ? blocksContent[idx].blockcontent.split('\n') : ['']

      const updateContent = (e)=>{
        const blocksCopy = cloneDeep(blocksContent)
        blocksCopy[idx].blockContent=e.currentTarget.value
        setBlocksContent(blocksCopy)
      }

    return <MarkedBlockFrame blockName="LaTeX expression" idx={idx}>
      <Flex className={classes.codeEditor}>
        <Box miw='2.5rem' p='0.5rem'  c='var(--mantine-color-gray-6)' ta='right' bg='var(--mantine-color-gray-2)' style={{ borderBottomLeftRadius: 'var(--mantine-radius-md)',  borderTopLeftRadius: 'var(--mantine-radius-md)'}}>
          {Array.from({length: lines}, (_, i)=>{return <Text  fz='1rem' className={classes.codeEditorNumbers} key={`${idx}line${i}`}>{i+1}</Text>}) }
          </Box>
          <Textarea  classNames={{input: classes.codeEditorInput}}  autosize w='100%' h='100%'   variant="filled" value={blocksContent[idx].blockContent} onChange={updateContent}/>
          </Flex>
          </MarkedBlockFrame>
}