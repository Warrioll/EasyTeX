import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Center, Flex, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import FiguresLibrary from '@/components/FiguresLibrary/FiguresLibrary';
import { useBlocksContentContext } from '@/pages/Document/DocumentContextProviders';
import FigureCard from './FigureCard';

type LibraryFigureTabPropsType = {
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
  const { blocksContent, setBlocksContent, isNotSaved, setIsNotSaved } = useBlocksContentContext();

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
      <FiguresLibrary height="70vh" choosenFigureState={choosenFigureState} />
      <Flex gap="3rem" pt="lg" justify="center">
        <Button
          w="20rem"
          disabled={choosenFigure === null}
          onClick={() => {
            if (choosenFigure !== null) {
              setFigure(choosenFigure as unknown as string);
              setIsNotSaved(true);
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
