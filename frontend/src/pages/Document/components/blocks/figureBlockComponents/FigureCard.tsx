import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Center, Image, Text } from '@mantine/core';
import classes from './figureBlockComponents.module.css';

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
        `http://localhost:8100/figure/user/getFigure/${figureData._id}`,
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

  return (
    <Box className={classes.cardComponent}>
      <Box
        p="md"
        h="30vh"
        className={idx === choosenFigure ? classes.choosenCard : classes.card}
        onClick={() => setChoosenFigure(idx)}
      >
        <Center
          h="24vh"
          p="0px"
          //bg=" var(--mantine-color-gray-1)"
          style={{ borderRadius: 'var(--mantine-radius-md)' }}
        >
          <Image
            className={classes.imageTransition}
            w="24vh"
            h="24vh"
            key={0}
            src={figure}
            alt=""
            //fit={fitImg}
            fit="contain"
            onMouseEnter={() => {
              setFitImg('contain');
            }}
            onMouseLeave={() => {
              setFitImg('cover');
            }}
          />
        </Center>

        <Center>
          <Text fw="500" className={classes.cardTitle} h="1.6rem">
            {figureData.name}
          </Text>
        </Center>
      </Box>
    </Box>
  );
}
