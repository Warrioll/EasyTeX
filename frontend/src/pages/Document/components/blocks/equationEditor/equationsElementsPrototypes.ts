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

  const upperAndLowerIndex={
    value: '0',
    label: 'Upper & lower index',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Upper index',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.0',
        label: 'Lower index',
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

  const sum={
    value: '0',
    label: 'Sum',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Upper index',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Lower index',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

export const elementsPrototypes={

  expression: {label: 'Expression', elementPrototype: expression},
    fraction: {label: 'Fraction', elementPrototype: fraction},
    integral: {label: 'Integral', elementPrototype: integral},
    root: {label: 'Root', elementPrototype: root},
    lowerIndex: {label: 'Lower index', elementPrototype: lowerIndex},
    upperIndex: {label: 'Upper index', elementPrototype: upperIndex},
    upperAndLowerIndex: {label: 'Upper & lower index', elementPrototype: upperAndLowerIndex},
    sum: {label:'Sum', elementsPrototype: sum}
}

