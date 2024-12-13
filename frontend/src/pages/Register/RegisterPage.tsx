import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Flex,
    Group,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title,
    BackgroundImage,
  SimpleGrid,
  Transition,
Dialog, Alert,
Box} from '@mantine/core';
  import styles from './registerPage.module.css';
  import { hasLength, isEmail, useForm } from '@mantine/form';
  import { useDisclosure } from '@mantine/hooks';
  import { RiErrorWarningFill } from "react-icons/ri";
  
  export default function LoginPage() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const form = useForm({
      mode: 'controlled',
      initialValues: { name: '', email: '' },
      validate: {
        name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
        email: isEmail('Invalid email'),
      },
    });

    return (<>
     <BackgroundImage
         src="./bg13.png" 
          radius="xs"
         
        >
      <Stack h="100vh" align="stretch" justify="center">
        <Container w={820} >
         
  
          <Paper withBorder shadow="md" p={30} mt={40} radius="md" className={styles.paper}>
          <Title ta="center" className={styles.title}>
          Sign up!
           {/* Sign up to <span style={{color: 'var(--mantine-color-yellow-8)'}}>Easy</span><span style={{color: 'var(--mantine-color-cyan-8)'}}>Tex</span>! */}
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5} mb={20}>
            Create your EasyTeX Account!
          </Text>
          <form >
          <SimpleGrid cols={2} spacing={80} verticalSpacing="sm" p='md' pl='xl' pr='xl'>
            <TextInput {...form.getInputProps('name')} variant='filled'label="Name" placeholder="Name" required/>
            
           
            <PasswordInput {...form.getInputProps('password')} variant='filled' label="Password" placeholder="Your password" required  />
            <TextInput {...form.getInputProps('email')} variant='filled' label="Email" placeholder="Email" required/>
            <PasswordInput {...form.getInputProps('repeatedPassword')} variant='filled' label="Reapat Password" placeholder="Your password" required  />
            </SimpleGrid>
            <Box  h={30}>
            <Transition
        mounted={opened}
        transition='fade-up'
        duration={200}
        timingFunction="ease"
        keepMounted
      >{(styles) => <Flex  justify="center"align="center"style={styles}> <Text ta="center" size='md' c='var(--mantine-color-error)'><RiErrorWarningFill /></Text><Text ta="center" ml={5}mb={3} size='sm' c='var(--mantine-color-error)' > Invalid sign up data!</Text></Flex>}
                                   </Transition>
      </Box>
            <Flex justify='center' pl={210} pr={210} mt="xl">
            <Button type="submit"fullWidth onClick={toggle} >
              Submit
            </Button>
            </Flex>
          </form>
            <Group justify="space-between" mt="lg">
              {/* <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor> */}
            </Group>
          </Paper>
        </Container>
         <Dialog opened={opened}   size="lg" radius="md" p='0px' bg='rgba(255,255,255,0.5)' style={{top: 5}}>
        <Alert variant="light" withCloseButton onClose={close} color="red" radius="xs" title="Alert title" icon='E'>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis, quae tempore necessitatibus placeat saepe.
    </Alert>
      </Dialog>
      </Stack>
      </BackgroundImage>
      </>
    );
  }
  