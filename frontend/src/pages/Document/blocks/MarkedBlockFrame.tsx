
import { Flex, Badge, Group, Menu, Button, Stack, Box, Paper, Affix, VisuallyHidden } from '@mantine/core';
import { FaRegTrashAlt } from "react-icons/fa";
import React, { Dispatch, SetStateAction } from 'react';
import { FiMoreHorizontal } from "react-icons/fi";
import { TbForbid2 } from "react-icons/tb";
import styles from './blocks.module.css'

type MarkedBlockFrameProps = {
    idx: number;
    activeSection: number;
    setActiveSecion: Dispatch<SetStateAction<number>>;
    blockName: string;
    children: React.ReactNode
  };

export default function MarkedBlockFrame({ children, idx,
    activeSection, setActiveSecion, blockName}:MarkedBlockFrameProps){
    
    return(
        <Flex w='100%'>
    {
        idx===activeSection ? 
      <Badge color="cyan" mt='lg'radius="md" variant='light' >{ blockName}</Badge>:<></>
      }
     
       <Paper shadow="md" radius="xs"  p="xl" mr='xs'  ml='xs' mt={0} mb={0} w="50rem"  className={ idx===activeSection ? styles.blockFrameStyle : ''}>
      <Box w='100%' p='xs'  className={ idx===activeSection ? styles.sectionBlockStyle : ''}>
      {children}
      </Box>
      </Paper>
      
     {
        idx===activeSection ? 
    //     <Stack
    //   align="flex-end"
    //   justify="flex-start"
    //   gap="0%"
    // >
    <Stack  gap="xs">
      <Menu position="left-start">
        <Menu.Target><Button mt='lg' variant='light' size='compact-md'><FiMoreHorizontal/></Button></Menu.Target>
        <Menu.Dropdown>
        <Menu.Item leftSection={<FiMoreHorizontal />}>
          Settings
        </Menu.Item>
        <Menu.Item leftSection={<FaRegTrashAlt/>}>
          Delete Block
        </Menu.Item>
        </Menu.Dropdown>

      </Menu>
      
      <Button variant='light' size='compact-md' onClick={()=>setActiveSecion(0)} className={styles.stickyElement}><TbForbid2/></Button>
      
      </Stack>
      : <Button variant='format' disabled style={{opacity: '0%'}}><FiMoreHorizontal/></Button>}
     </Flex>

    
    )
}