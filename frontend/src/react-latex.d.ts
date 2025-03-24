declare module 'react-latex-next' {
    import * as React from 'react';
  
    interface LatexProps {
      children: string;
    }
  
    const Latex: React.FC<LatexProps>;
  
    export default Latex;
  }
  