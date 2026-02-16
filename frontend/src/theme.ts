import { Button, colorsTuple, createTheme, Input } from '@mantine/core';
import classes from './componentsGlobal.module.css'
export const theme = createTheme({
    breakpoints:{
      xxl: '95rem',
      xxxl: '102rem',
      fourXl: '110rem' 
    },
    primaryColor: 'mainCyan',
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
     
   
});
