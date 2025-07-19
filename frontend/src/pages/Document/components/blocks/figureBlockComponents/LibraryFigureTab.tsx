import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Center, Flex, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import FiguresLibrary from '@/components/FiguresLibrary/FiguresLibrary';
import FigureCard from './FigureCard';

type LibraryFigureTabPropsType = {
  //figureState: [FileWithPath[] | null, Dispatch<SetStateAction<FileWithPath[] | null>>];
  figureState: [string | null, Dispatch<SetStateAction<string | null>>];
  modalHandlers: readonly [
    boolean,
    {
      readonly open: () => void;
      readonly close: () => void;
      readonly toggle: () => void;
    },
  ];
};

export default function LibraryFigureTab({
  modalHandlers,
  figureState,
}: LibraryFigureTabPropsType) {
  const [figure, setFigure] = figureState;
  const [figures, setFigures] = useState<any[]>([]);
  const choosenFigureState = useState<number | null>(null);
  const [choosenFigure, setChoosenFigure] = choosenFigureState;
  const [opened, { open, close }] = modalHandlers;

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
      <FiguresLibrary
        height="70vh"
        //figureState={figureState}
        choosenFigureState={choosenFigureState}
      />
      {/* <Box h="70vh" p="xl">
        <ScrollArea h="100%">
          <SimpleGrid cols={5}>
            {figures.map((figure, id) => {
              return (
                <>
                  <FigureCard
                    idx={id}
                    figureData={figure}
                    choosenFigureState={choosenFigureState}
                  />
                </>
              );
            })}
          </SimpleGrid>
        </ScrollArea>
      </Box> */}
      <Flex gap="3rem" pt="lg" justify="center">
        <Button
          w="20rem"
          disabled={choosenFigure === null}
          onClick={() => {
            // uploadFigure();
            console.log(figures);
            //setFigure(figures[choosenFigure]._id);
            if (choosenFigure !== null) {
              setFigure(choosenFigure as unknown as string);
            }

            close();
          }}
        >
          Set choosen image
        </Button>
        <Button w="20rem" variant="outline" onClick={close}>
          Cancel
        </Button>
      </Flex>
    </>
  );
}
