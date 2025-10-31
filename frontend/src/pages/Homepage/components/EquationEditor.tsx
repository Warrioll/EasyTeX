import { Box, Center, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import classes from '../hompage.module.css';

export default function EquationEditor() {
  const text1 =
    'EasyTex offers a visual equation editor with a graphical interface that allows you to create complex equations without knowing LaTeX syntax. ';
  const text2 =
    'It uses a tree of nested elements, such as integrals, fractions, indices, sums, products, etc., which are automatically converted to LaTeX format for you.';
  const title = 'Equation editor';

  const Images = () => {
    return (
      <Center h="100%" className={classes.imgs}>
        <Image src="eqEditor1.png" radius="lg" className={classes.editorImg1} />
        <Image src="eq2.png" radius="lg" className={classes.editorImg2} />
      </Center>
    );
  };

  return (
    <>
      <Box
        h="100vh"
        visibleFrom="xl"
        className={classes.equationBg}
        pos="relative"
        style={{ zIndex: 1 }}
        pt="10vh"
        mih="67rem"
      >
        <SimpleGrid cols={2} h="100%" p="xl" px="7rem">
          <Stack c="white" justify="center" pl="8rem" w="60%">
            <Title order={2} fz="3rem" ta="left" mb="3rem">
              {title}
            </Title>
            <Text fz="xl" mb="sm">
              {text1}
            </Text>
            <Text fz="xl">{text2}</Text>
          </Stack>
          <Images />
        </SimpleGrid>
      </Box>

      <Box
        h="100vh"
        mih="67rem"
        visibleFrom="md"
        hiddenFrom="xl"
        className={classes.equationBg}
        pos="relative"
        style={{ zIndex: 1 }}
        pt="10vh"
        ta="center"
      >
        <SimpleGrid cols={1} h="100%" p="xl" mt="5rem">
          <Stack c="white" justify="center" px="8rem">
            <Title order={2} fz="2.5rem" mb="3rem">
              {title}
            </Title>
            <Text fz="lg" mb="0.3rem">
              {text1}
            </Text>
            <Text fz="lg">{text2}</Text>
            <Box p="xl" mr="-10rem" mt="-5rem" style={{ scale: '0.7' }} px="5rem">
              <Images />
            </Box>
          </Stack>
        </SimpleGrid>
      </Box>

      <Box
        h="100vh"
        mih="67rem"
        hiddenFrom="md"
        className={classes.equationBg}
        pos="relative"
        style={{ zIndex: 1 }}
        pt="10vh"
        ta="center"
      >
        <SimpleGrid cols={1} h="100%" p="sm">
          <Stack c="white" justify="center" px="xl">
            <Title order={2} fz="2.5rem" ta="center" mb="3rem">
              {title}
            </Title>
            <Text fz="lg" mb="0.3rem">
              {text1}
            </Text>
            <Text fz="lg">{text2}</Text>
            <Box p="xl">
              <Image src="eqEditor1.png" radius="lg" />
            </Box>
          </Stack>
        </SimpleGrid>
      </Box>
    </>
  );
}
