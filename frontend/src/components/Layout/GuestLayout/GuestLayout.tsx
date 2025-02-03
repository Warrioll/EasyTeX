import React from 'react';
import { AppShell, Burger, Group, UnstyledButton, Box, Anchor, Button, Flex, Title, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './guestLayout.module.css';
import { TiHome } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import Logo from '@/svg/Logo';
 
export default function GuestLayout({ content }){
    const [opened, { toggle }] = useDisclosure();
    const navigate = useNavigate();

    return( <AppShell
        header={{ height: 50 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
        padding="0px"
        
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group justify="space-between" style={{ flex: 1 }}>
              {
                //<MantineLogo size={30} />
              }
              <Flex ml='sm' justify='center' align='center'>
              <Logo width='1.6rem'/> 
              <Text mt='0.2rem' c='var(--mantine-color-yellow-8)'fz='lg' fw='700' ml='sm'>Easy</Text><Text mt='0.2rem' fz='lg' fw='700' c='var(--mantine-color-cyan-9)'>TeX</Text>
              </Flex>
              <Group ml="xl" gap={0} visibleFrom="sm">
                <Button pt='0px' pb='0px' onClick={()=>navigate('/')} variant='transparent' leftSection={<TiHome />}className={classes.control}>Home</Button>
                <Button  pt='0px' pb='0px'onClick={()=>navigate('/login')} variant='transparent' className={classes.control}>Sign in</Button>
                <Button pt='0px' pb='0px'onClick={()=>navigate('/register')} variant='transparent'  className={classes.control}>Sign up</Button>
               
              </Group>
            </Group>
          </Group>
        </AppShell.Header>
  
        <AppShell.Navbar py="md" px={4}>
        <Button onClick={()=>navigate('/')} variant='transparent' leftSection={<TiHome />}className={classes.control}>Home</Button>
                <Button onClick={()=>navigate('/login')} variant='transparent' className={classes.control}>Sign in</Button>
                <Button onClick={()=>navigate('/register')} variant='transparent'  className={classes.control}>Sign up</Button>
        </AppShell.Navbar>
  
        <AppShell.Main p='0px' >{content}</AppShell.Main>
      </AppShell>)
}