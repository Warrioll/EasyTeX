import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { TbFilesOff, TbMoodSadSquint } from 'react-icons/tb';
import {
  Box,
  Button,
  Center,
  Flex,
  Loader,
  ScrollArea,
  SimpleGrid,
  Space,
  Text,
  Tooltip,
} from '@mantine/core';
import ErrorBanner from '../ErrorInfos/ErrorBanner';
import FigureCard from './FigureCard';

type LibraryFigureTabPropsType = {
  choosenFigureState: [number | null, Dispatch<SetStateAction<number | null>>];
  height: string;
};

export default function FiguresLibrary({
  choosenFigureState,
  height,
}: LibraryFigureTabPropsType) {
  const [figures, setFigures] = useState<any[]>([]);
  const [figuresError, setFiguresError] = useState<string>('You have no assets.');
  const [areFiguresLoading, setAreFiguresLoading] = useState<boolean>(true);

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
        console.error('Load figures error', error);
      }
      setAreFiguresLoading(false);
    };
    setAreFiguresLoading(true);
    loadFigures();
  }, []);

  return (
    <>
      <Box h={height}>
        <ScrollArea h="100%" pl="xl" pr="xl">
          <Space h="xl" />
          {figures.length === 0 ? (
            areFiguresLoading ? (
              <Center w="100%" h="70vh">
                <Loader size={50} />
              </Center>
            ) : (
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
            )
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
