import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Center, Flex, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import FigureCard from './FigureCard';

type LibraryFigureTabPropsType = {
  //figureState: [FileWithPath[] | null, Dispatch<SetStateAction<FileWithPath[] | null>>];
  modalHandlers: readonly [
    boolean,
    {
      readonly open: () => void;
      readonly close: () => void;
      readonly toggle: () => void;
    },
  ];
};

export default function LibraryFigureTab({ modalHandlers }: LibraryFigureTabPropsType) {
  const [figures, setFigures] = useState<any[]>([]);

  useEffect(() => {
    const getFigures = async () => {
      const response = await axios.get('http://localhost:8100/figure/user/all', {
        withCredentials: true,
      });

      setFigures(response.data);
    };
    getFigures();
  }, []);

  return (
    <>
      <Box h="70vh" p="xl">
        <ScrollArea>
          <SimpleGrid cols={6}>
            {figures.map((figure, id) => {
              return (
                <>
                  <FigureCard figureData={figure} />
                </>
              );
            })}
          </SimpleGrid>
        </ScrollArea>
      </Box>
      <Flex gap="3rem" pt="lg" justify="center">
        <Button
          w="20rem"
          //disabled={figure === null}
          onClick={() => {
            // uploadFigure();
          }}
        >
          Set image
        </Button>
        <Button w="20rem" variant="outline" onClick={close}>
          Cancel
        </Button>
      </Flex>
    </>
  );
}
