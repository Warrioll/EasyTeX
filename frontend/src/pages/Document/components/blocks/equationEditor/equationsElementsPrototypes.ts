import { FaRegClosedCaptioning } from "react-icons/fa";

const expression={
        value: '0',
        label: 'Expression',
        editable: true,
        content: '',
        children: [],
}

const fraction={
    value: '0',
    label: 'Fraction',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Numerator',
        editable: false,
        children: [
            {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Denominator',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }


  const integral={
    value: '0',
    label: 'Integral',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Upper border',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Lower border',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const root={
    value: '0',
    label: 'Root',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Index',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Radical',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const upperIndex={
    value: '0',
    label: 'Upper index',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Index',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Base',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const lowerIndex={
    value: '0',
    label: 'Lower index',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Index',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Base',
        editable: false,
        children: [
          {...expression} 
        ],
      },
    ],
  }

export const elementsPrototypes={
  expression,
    fraction,
    integral,
    root,
    lowerIndex,
    upperIndex
}

