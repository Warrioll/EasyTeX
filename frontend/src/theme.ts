import { Button, colorsTuple, createTheme, Input } from '@mantine/core';
//import { pointer } from '@testing-library/user-event/dist/types/pointer';
import classes from './componentsGlobal.module.css'
export const theme = createTheme({
    primaryColor: 'mainCyan',
    //primaryShade: { light: 7, dark: 7 },
    colors: {
      mainCyan: colorsTuple('var(--mantine-color-cyan-8)'),
      
    },
    autoContrast: true,
    cursorType: 'pointer',
    defaultRadius: 'md',

    components:{
      Button: Button.extend({classNames: classes}),
      Input: Input.extend({ classNames: classes }),
    }
     
   
  /** Put your mantine theme override here */
});
