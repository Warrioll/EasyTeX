import React from 'react';
import { AppShell, Burger, Group, UnstyledButton, Box, Anchor, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './guestLayout.module.css';
import { TiHome } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

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
              EasyTeX
              <Group ml="xl" gap={0} visibleFrom="sm">
                <Button onClick={()=>navigate('/')} variant='transparent' leftSection={<TiHome />}className={classes.control}>Home</Button>
                <Button onClick={()=>navigate('/login')} variant='transparent' className={classes.control}>Sign in</Button>
                <Button onClick={()=>navigate('/register')} variant='transparent'  className={classes.control}>Sign up</Button>
               
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