import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { TbFilesOff, TbMoodSadSquint } from 'react-icons/tb';
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
import ErrorBanner from '../ErrorInfos/ErrorBanner';
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
  const [figuresError, setFiguresError] = useState<string>('You have no assets.');

  const getFigures = async (): Promise<AxiosResponse<any, any>> => {
    return await axios.get('http://localhost:8100/figure/user/all', {
      withCredentials: true,
    });
  };

  useEffect(() => {
    const loadFigures = async () => {
      try {
        const response = await getFigures();
        setFigures(response.data);
      } catch (error) {
        setFiguresError('Sorry, something went wrong.');
        console.log('Load figures error', error);
      }
    };
    loadFigures();
  }, []);

  return (
    <>
      <Box h={height}>
        <ScrollArea h="100%" pl="xl" pr="xl">
          <Space h="xl" />
          {figures.length === 0 ? (
            <Box h={`calc(${height} - 2rem)`}>
              <ErrorBanner
                title={figuresError}
                Icon={
                  figuresError === 'Sorry, something went wrong.'
                    ? () => (
                        <Box mb="-1.5rem">
                          <TbMoodSadSquint />
                        </Box>
                      )
                    : () => (
                        <Box mb="-1.5rem">
                          <TbFilesOff />
                        </Box>
                      )
                }
              />
            </Box>
          ) : (
            <SimpleGrid cols={{ base: 1, xs: 2, md: 3, xl: 4, fourXl: 5 }}>
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
          )}
        </ScrollArea>
      </Box>
    </>
  );
}
