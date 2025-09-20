import { Box, Center, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import classes from '../hompage.module.css';

export default function EquationEditor() {
  return (
    <Box h="85vh" className={classes.equationBg}>
      <SimpleGrid cols={2} h="100%" p="xl" px="7rem">
        <Stack c="white" justify="center" pl="8rem" w="60%">
          <Title order={2} fz="3rem" ta="left">
            Equation editor
          </Title>
          <Text fz="xl">
            Bla bla bla editor nigdzie indziej go nie znjadziecie wiec sie cieszcie hue hue hue
          </Text>
        </Stack>
        <Center h="100%" className={classes.imgs}>
          <Image src="eqEditor1.png" radius="lg" className={classes.editorImg1} />
          <Image src="eq2.png" radius="lg" className={classes.editorImg2} />
        </Center>
      </SimpleGrid>
    </Box>
  );
}
