

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
    label: 'Big disjunction',
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



  const row2ElementsLeft={
    value: '0',
    label: 'Row (2 elements, left aligned)',
    editable: true,
    children: [
      {
        value: '0.0',
        label: '1st element',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: '2nd element',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const row3ElementsLeft={
    value: '0',
    label: 'Row (3 elements, left aligned)',
    editable: true,
    children: [
      {
        value: '0.0',
        label: '1st element',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: '2nd element',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.2',
        label: '3rd element',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const column2ElementsLeft={
    value: '0',
    label: 'Column (2 elements, left aligned)',
    editable: true,
    children: [
      {
        value: '0.0',
        label: '1st element',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: '2nd element',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const column3ElementsLeft={
    value: '0',
    label: 'Column (3 elements, left aligned)',
    editable: true,
    children: [
      {
        value: '0.0',
        label: '1st element',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: '2nd element',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.2',
        label: '3rd element',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const row2ElementsCenter={
    value: '0',
    label: 'Row (2 elements, centered)',
    editable: true,
    children: [
      {
        value: '0.0',
        label: '1st element',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: '2nd element',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const row3ElementsCenter={
    value: '0',
    label: 'Row (3 elements, centered)',
    editable: true,
    children: [
      {
        value: '0.0',
        label: '1st element',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: '2nd element',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.2',
        label: '3rd element',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const column2ElementsCenter={
    value: '0',
    label: 'Column (2 elements, centered)',
    editable: true,
    children: [
      {
        value: '0.0',
        label: '1st element',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: '2nd element',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const column3ElementsCenter={
    value: '0',
    label: 'Column (3 elements, centered)',
    editable: true,
    children: [
      {
        value: '0.0',
        label: '1st element',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.1',
        label: '2nd element',
        editable: false,
        children: [
          {...expression}
        ],
      },
      {
        value: '0.2',
        label: '3rd element',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const bigLeftCurlyBracket={
    value: '0',
    label: 'Big left curly bracket',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Content',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const bigRightCurlyBracket={
    value: '0',
    label: 'Big right curly bracket',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Content',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const bigLeftSquareBracket={
    value: '0',
    label: 'Big left square bracket',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Content',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const bigRightSquareBracket={
    value: '0',
    label: 'Big right square bracket',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Content',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const bigLeftRegularBracket={
    value: '0',
    label: 'Big left regular bracket',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Content',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const bigRightRegularBracket={
    value: '0',
    label: 'Big right regular bracket',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Content',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const bigRegularBrackets={
    value: '0',
    label: 'Big regular brackets',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Content',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const bigCurlyBrackets={
    value: '0',
    label: 'Big curly brackets',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Content',
        editable: false,
        children: [
          {...expression}
        ],
      },
    ],
  }

  const bigSquareBrackets={
    value: '0',
    label: 'Big square brackets',
    editable: true,
    children: [
      {
        value: '0.0',
        label: 'Content',
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
    combination: {label: 'Combination', elementPrototype: combination, latexRepresentation: '\\binom{a}{b}'},
    row2ElementsLeft: {label: 'Row (2 elements, left aligned)', elementPrototype: row2ElementsLeft, latexRepresentation: '\\left.\\begin{array}{ll}a&b\\end{array}\\right.'},
    row3ElementsLeft: {label: 'Row (3 elements, left aligned)', elementPrototype: row3ElementsLeft, latexRepresentation: '\\left.\\begin{array}{ll}a&b&c\\end{array}\\right.'},
    column2ElementsLeft: {label: 'Column (2 elements, left aligned)', elementPrototype: column2ElementsLeft, latexRepresentation: '\\left.\\begin{array}{ll}a\\\\b\\end{array}\\right.'},
    column3ElementsLeft: {label: 'Column (3 elements, left aligned)', elementPrototype: column3ElementsLeft, latexRepresentation: '\\left.\\begin{array}{ll}a\\\\b\\\\c\\end{array}\\right.'},
    row2ElementsCenter: {label: 'Row (2 elements, center)', elementPrototype: row2ElementsCenter, latexRepresentation: '\\left.\\begin{array}{cc}a&b\\end{array}\\right.'},
    row3ElementsCenter: {label: 'Row (3 elements, center)', elementPrototype: row3ElementsCenter, latexRepresentation: '\\left.\\begin{array}{cc}a&b&c\\end{array}\\right.'},
    column2ElementsCenter: {label: 'Column (2 elements, center)', elementPrototype: column2ElementsCenter, latexRepresentation: '\\left.\\begin{array}{cc}a\\\\b\\end{array}\\right.'},
    column3ElementsCenter: {label: 'Column (3 elements, center)', elementPrototype: column3ElementsCenter, latexRepresentation: '\\left.\\begin{array}{cc}a\\\\b\\\\c\\end{array}\\right.'},
    bigLeftCurlyBracket: {label: 'Big left curly bracket', elementPrototype: bigLeftCurlyBracket, latexRepresentation: '\\left\\{a \\right.'},
    bigRightCurlyBracket: {label: 'Big right curly bracket', elementPrototype: bigRightCurlyBracket, latexRepresentation: '\\left. a \\right\\}'},
    bigLeftSquareBracket: {label: 'Big left square bracket', elementPrototype: bigLeftSquareBracket, latexRepresentation: '\\left[ a \\right.'},
    bigRightSquareBracket: {label: 'Big right square bracket', elementPrototype: bigRightSquareBracket, latexRepresentation: '\\left. a \\right]'},
    bigLeftRegularBracket: {label: 'Big left regular bracket', elementPrototype: bigLeftRegularBracket, latexRepresentation: '\\left( a \\right.'},
    bigRightRegularBracket: {label: 'Big right regular bracket', elementPrototype: bigRightRegularBracket, latexRepresentation: '\\left. a \\right)'},
    bigRegularBrackets: {label: 'Big regular brackets', elementPrototype: bigRegularBrackets, latexRepresentation: '\\left( a \\right)'},
    bigCurlyBrackets: {label: 'Big curly brackets', elementPrototype: bigCurlyBrackets, latexRepresentation: '\\left\\{ a \\right\\}'},
    bigSquareBrackets: {label: 'Big square brackets', elementPrototype: bigSquareBrackets, latexRepresentation: '\\left[ a \\right]'},
    
  }



