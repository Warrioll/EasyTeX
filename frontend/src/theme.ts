import { colorsTuple, createTheme } from '@mantine/core';
import { pointer } from '@testing-library/user-event/dist/types/pointer';

export const theme = createTheme({
    primaryColor: 'mainCyan',
    //primaryShade: { light: 7, dark: 7 },
    colors: {
      mainCyan: colorsTuple('var(--mantine-color-cyan-8)'),
      
    },
    autoContrast: true,
    cursorType: 'pointer',
    defaultRadius: 'sm'
   
  /** Put your mantine theme override here */
});
