import { FaArchive } from 'react-icons/fa';
import { HiDocumentDuplicate, HiWindow } from 'react-icons/hi2';
import { SiLibreofficemath } from 'react-icons/si';
import { TbMathIntegralX } from 'react-icons/tb';
import {
  Badge,
  Box,
  Card,
  Center,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import classes from '../hompage.module.css';

const mockdata = [
  {
    title: 'Graphical editor',
    description:
      'Graphical editor allows you to create documents without need to know LaTeX syntax, simply by building structure of blocks - sections, textfields, tables etc.',
    icon: () => <HiWindow />,
  },
  {
    title: 'Various document types',
    description:
      'EasyTex supports 5 LaTeX document classes: articles, reports, books, letters, presentations.',
    icon: () => <HiDocumentDuplicate />,
  },
  {
    title: 'Equation editor',
    description: 'With visual editor you can create complex equations without any LaTeX knowledge.',
    icon: () => <SiLibreofficemath />,
  },
  {
    title: 'Storing documents and assest',
    description: 'EasyTex stores the documents you create and the images you upload, which you can access at any time using your account.',
    icon: () => <FaArchive />,
  },
];

export default function Features() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="sm"
      radius="md"
      className={classes.card}
      ta="center"
      padding="xl"
      bd="1px solid var(--mantine-color-gray-3)"
    >
      {/* <Stack align="center" key={feature.title} className={classes.card} ta="center" gap="0px"> */}
      <Text fz="3rem" c="var(--mantine-color-cyan-7)" mb="-1rem">
        <feature.icon />
      </Text>
      <Text fz="xl" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="md" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Box bg="var(--mantine-color-gray-1)" w="100%" h="100%" pos='relative' style={{zIndex: 1}}>
      <Container size="80vw" pt="8rem" pb="4rem">
        <Group justify="center">
          <Badge variant="transparent" size="1.3rem" color="var(--mantine-color-cyan-7)">
            Features
          </Badge>
        </Group>

        <Title order={2} className={classes.title} ta="center" mt="sm">
          Discover the possibilities of EasyTex!
        </Title>

        <Text c="dimmed" fz="lg" className={classes.description} ta="center" mt="md">
          EasyTex offers various features to help you create documents.
        </Text>

        <SimpleGrid cols={{ base: 1, md: 4 }} spacing="6rem" mt="5rem">
          {features}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
