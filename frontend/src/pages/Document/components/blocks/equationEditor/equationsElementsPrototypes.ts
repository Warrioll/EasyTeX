import { object } from "prop-types";
import { FaRegClosedCaptioning } from "react-icons/fa";

type elementFieldType={
label:string,
 elementPrototype: object,
 latexRepresentation: string
}

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
        label: 'Upper limit',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Lower limit',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const lineIntegral={
    value: '0',
    label: 'Line integral',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Upper limit',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Lower limit',
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

  // const upperIndex={
  //   value: '0',
  //   label: 'Upper index',
  //   editable: true,
  //   children: [
  //     {...expression}
  //   ],
  // }

  // const lowerIndex={
  //   value: '0',
  //   label: 'Lower index',
  //   editable: true,
  //   children: [
  //     {...expression}
  //   ],
  // }

  const sum={
    value: '0',
    label: 'Sum',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Upper limit',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Lower limit',
        editable: false,
        children: [
          {...expression} 
        ],
      },
    ],
  }

  const product={
    value: '0',
    label: 'Product',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Upper limit',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Lower limit',
        editable: false,
        children: [
          {...expression} 
        ],
      },
    ],
  }

  const limes={
    value: '0',
    label: 'Limes',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Limit condition',
        editable: false,
        children: [
          {...expression} 
        ],
      },
    ],
  }

  const bigUnion={
    value: '0',
    label: 'Big union',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Upper limit',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Lower limit',
        editable: false,
        children: [
          {...expression} 
        ],
      },
    ],
  }

  const bigIntersection={
    value: '0',
    label: 'Big intersection',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Upper limit',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Lower limit',
        editable: false,
        children: [
          {...expression} 
        ],
      },
    ],
  }

  const bigDisjunction={
    value: '0',
    label: 'Big Disjunction',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Upper limit',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Lower limit',
        editable: false,
        children: [
          {...expression} 
        ],
      },
    ],
  }

  const bigConjunction={
    value: '0',
    label: 'Big conjunction',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Upper limit',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Lower limit',
        editable: false,
        children: [
          {...expression} 
        ],
      },
    ],
  }
  
  const combination={
    value: '0',
    label: 'Combination',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Upper limit',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: 'Lower limit',
        editable: false,
        children: [
          {...expression} 
        ],
      },
    ],
  }


export const elementsPrototypes: Record<string,elementFieldType>={

  expression: {label: 'Expression', elementPrototype: expression,  latexRepresentation: 'abc'},
    fraction: {label: 'Fraction', elementPrototype: fraction, latexRepresentation: '\\frac{a}{b}'},
    integral: {label: 'Integral', elementPrototype: integral, latexRepresentation: '\\int^{a}_{b}'},
    lineIntegral: {label: 'Line integral', elementPrototype: lineIntegral, latexRepresentation:'\\oint^{a}_{b}'},
    root: {label: 'Root', elementPrototype: root, latexRepresentation: '\\sqrt[b]{a}'},
    lowerIndex: {label: 'Lower index', elementPrototype: lowerIndex, latexRepresentation: 'a_b'},
    upperIndex: {label: 'Upper index', elementPrototype: upperIndex, latexRepresentation: 'a^b'},
    upperAndLowerIndex: {label: 'Upper & lower index', elementPrototype: upperAndLowerIndex, latexRepresentation: 'a^b_c'},
    sum: {label:'Sum', elementPrototype: sum, latexRepresentation: '\\sum^a_b'},
    product: {label:'Product', elementPrototype: product, latexRepresentation: '\\prod^a_b'},
    limes: {label: 'Limes', elementPrototype: limes , latexRepresentation: '\\lim_{a \\to b}'},
    bigUnion: {label: 'Big union', elementPrototype: bigUnion , latexRepresentation: '\\bigcup^a_b'},
    bigIntersection: {label: 'Big intersection', elementPrototype: bigIntersection , latexRepresentation: '\\bigcap^a_b'},
    bigDisjunction: {label: 'Big disjunction', elementPrototype: bigDisjunction, latexRepresentation: '\\bigvee^a_b'},
    bigConjunction: {label: 'Big conjunction', elementPrototype: bigConjunction, latexRepresentation: '\\bigwedge^a_b'},
    combination: {label: 'Combination', elementPrototype: combination, latexRepresentation: '\\binom{a}{b}'}
}



