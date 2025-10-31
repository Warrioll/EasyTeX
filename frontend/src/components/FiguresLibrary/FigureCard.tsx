import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Center, Image, Stack, Text, Transition } from '@mantine/core';
import classes from './figuresLibrary.module.css';

type FigureCardPropsType = {
  //wywalić to any
  figureData: any;
  choosenFigureState: [number | null, Dispatch<SetStateAction<number | null>>];
  idx: number;
};

export default function FigureCard({ idx, figureData, choosenFigureState }: FigureCardPropsType) {
  const [figure, setFigure] = useState<any>();
  const [fitImg, setFitImg] = useState<'cover' | 'contain'>('cover');
  const [choosenFigure, setChoosenFigure] = choosenFigureState;

  useEffect(() => {
    const getFigure = async () => {
      const response = await axios.get(
        `http://localhost:8100/figure/user/getFigureFile/${figureData._id}`,
        {
          withCredentials: true,
          responseType: 'blob',
        }
      );
      setFigure(URL.createObjectURL(response.data));
      console.log(figure);
    };

    getFigure();
  }, []);

  // useEffect(() => {
  //   if (idx === choosenFigure) {
  //     setFitImg('contain');
  //   }
  // }, [choosenFigure]);

  return (
    <Box className={classes.cardComponent}>
      <Stack
        p="md"
        h="15rem"
        justify="center"
        align="center"
        className={figureData._id === choosenFigure ? classes.choosenCard : classes.card}
        onClick={() => setChoosenFigure(figureData._id)}
      >
        <Image
          style={{ borderRadius: 'var(--mantine-radius-md)' }}
          className={classes.imageTransition}
          w="100%"
          maw="20rem"
          h="10rem"
          key={0}
          src={figure}
          alt=""
          //fit={fitImg}
          fit="cover"
          bd="1px solid var(--mantine-color-gray-3)"
          // onMouseEnter={() => {
          //   setFitImg('contain');
          // }}
          // onMouseLeave={() => {
          //   setFitImg('cover');
          // }}
        />

        <Center>
          <Text
            fw="500"
            className={
              figureData._id === choosenFigure ? classes.choosenCardTitle : classes.cardTitle
            }
            h="1.6rem"
          >
            {figureData.name}
          </Text>
        </Center>
      </Stack>
    </Box>
  );
}
