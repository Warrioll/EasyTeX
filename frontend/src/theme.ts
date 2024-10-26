import { colorsTuple, createTheme } from '@mantine/core';

export const theme = createTheme({
    primaryColor: 'mainCyan',
    colors: {
      mainCyan: colorsTuple('var(--mantine-color-cyan-9)'),
      
    },
   
  /** Put your mantine theme override here */
});
