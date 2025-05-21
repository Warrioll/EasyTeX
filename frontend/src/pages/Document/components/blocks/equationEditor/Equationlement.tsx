import { Dispatch, SetStateAction } from 'react';

type EquationElementPropsType = {
  activeElementState: [any, Dispatch<SetStateAction<any>>];
  elementsContentState: any;
};

export default function eEquationElementPropsTypeRquationelement({
  activeElementState,
  elementsContentState,
}: EquationElementPropsType) {
  return (
    <div
      key={idx}
      tabIndex={idx}
      onFocus={async () => {
        //toggle();
        //setActiveBlock(idx);
      }}
    >
      gy
    </div>
  );
}
