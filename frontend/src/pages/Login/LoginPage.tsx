import {
  Anchor,
  BackgroundImage,
  Box,
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
} from '@mantine/core';
import styles from './loginPage.module.css';

export default function LoginPage() {
  return (
    // 14 lub 13
    <>
      <BackgroundImage src="./bg13.png" radius="xs">
        <Stack h="100vh" align="stretch" justify="center">
          <Container w={420} mb="6%">
            <Paper withBorder shadow="xl" p={30} mt={30} radius="md">
              <Title ta="center" className={styles.title}>
                Welcome back!
              </Title>
              <Text c="dimmed" size="sm" ta="center" mt={5} mb={20}>
                Do not have an account yet?{' '}
                <Anchor size="sm" href="/register" target="_blank">
                  Create account
                </Anchor>
              </Text>

              <Box className={styles.paper}>
                <TextInput label="Email" placeholder="you@mantine.dev" required />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" />
              </Box>
              <Group justify="space-between" mt="lg">
                {/* <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor> */}
              </Group>
              <Button fullWidth mt="xl">
                Sign in
              </Button>
            </Paper>
          </Container>
        </Stack>
      </BackgroundImage>
    </>
  );
}
