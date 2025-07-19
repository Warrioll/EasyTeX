import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Center,
  Flex,
  ScrollArea,
  SimpleGrid,
  Space,
  Text,
  Tooltip,
} from '@mantine/core';
import FigureCard from './FigureCard';

type LibraryFigureTabPropsType = {
  //figureState: [FileWithPath[] | null, Dispatch<SetStateAction<FileWithPath[] | null>>];
  //figureState: [string | null, Dispatch<SetStateAction<string | null>>];
  choosenFigureState: [number | null, Dispatch<SetStateAction<number | null>>];
  height: string;
};

export default function FiguresLibrary({
  //figureState,
  choosenFigureState,
  height,
}: LibraryFigureTabPropsType) {
  //const [figure, setFigure] = figureState;
  const [figures, setFigures] = useState<any[]>([]);
  //const choosenFigureState = useState<number | null>(null);
  const [choosenFigure, setChoosenFigure] = choosenFigureState;
  //const [opened, { open, close }] = modalHandlers;
  const [choosenFigureId, setChoosenFigureId] = useState<number | null>(null);

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
      <Box h={height}>
        <ScrollArea h="100%" pl="xl" pr="xl">
          <Space h="xl" />
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
            <Space h="xl" />
          </SimpleGrid>
        </ScrollArea>
      </Box>
    </>
  );
}
