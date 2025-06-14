import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Image } from '@mantine/core';

type FigureCardPropsType = {
  //wywalić to any
  figureData: any;
};

export default function FigureCard({ figureData }: FigureCardPropsType) {
  const [figure, setFigure] = useState<any>();

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
    <Box
      bg="var(--mantine-color-gray-1)"
      bd="1px solid var(--mantine-color-gray-3)"
      style={{ borderRadius: 'var(--mantine-radius-md)' }}
      p="xl"
    >
      <Image key={0} src={figure} alt="" fit="fill" />
      {figureData.name}
    </Box>
  );
}
