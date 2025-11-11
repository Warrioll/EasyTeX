type specialCharactersListType ={
label: string,
group: {value: string, label: string, latexRepresentation: string}[]
}[]

export const specialCharacters:specialCharactersListType
= [
// Greek letters (lowercase + variants)
{label: 'Greek letters (lowercase)', group: [
  { value: 'α', label: 'Alpha', latexRepresentation: '\\alpha ' },
  { value: 'β', label: 'Beta', latexRepresentation: '\\beta ' },
  { value: 'γ', label: 'Gamma', latexRepresentation: '\\gamma ' },
  { value: 'δ', label: 'Delta', latexRepresentation: '\\delta ' },
  { value: 'ε', label: 'Epsilon', latexRepresentation: '\\epsilon ' },
  { value: 'ϵ', label: 'Epsilon (variant)', latexRepresentation: '\\varepsilon ' },
  { value: 'ζ', label: 'Zeta', latexRepresentation: '\\zeta ' },
  { value: 'η', label: 'Eta', latexRepresentation: '\\eta ' },
  { value: 'θ', label: 'Theta', latexRepresentation: '\\theta ' },
  { value: 'ϑ', label: 'Theta (variant)', latexRepresentation: '\\vartheta ' },
  { value: 'ι', label: 'Iota', latexRepresentation: '\\iota ' },
  { value: 'κ', label: 'Kappa', latexRepresentation: '\\kappa ' },
  { value: 'λ', label: 'Lambda', latexRepresentation: '\\lambda '  },
  { value: 'μ', label: 'Mu', latexRepresentation: '\\mu ' },
  { value: 'ν', label: 'Nu', latexRepresentation: '\\nu ' },
  { value: 'ξ', label: 'Xi', latexRepresentation: '\\xi ' },
  { value: 'π', label: 'Pi', latexRepresentation: '\\pi ' },
  { value: 'ϖ', label: 'Pi (variant)', latexRepresentation: '\\varpi ' },
  { value: 'ρ', label: 'Rho', latexRepresentation: '\\rho ' },
  { value: 'ϱ', label: 'Rho (variant)', latexRepresentation: '\\varrho ' },
  { value: 'σ', label: 'Sigma', latexRepresentation: '\\sigma ' },
  { value: 'ς', label: 'Final sigma', latexRepresentation: '\\varsigma ' },
  { value: 'τ', label: 'Tau', latexRepresentation: '\\tau ' },
  { value: 'υ', label: 'Upsilon', latexRepresentation: '\\upsilon ' },
  { value: 'ϕ', label: 'Phi', latexRepresentation: '\\phi' },
  { value: 'φ', label: 'Phi (variant)', latexRepresentation: '\\varphi ' },
  { value: 'χ', label: 'Chi', latexRepresentation: '\\chi ' },
  { value: 'ψ', label: 'Psi', latexRepresentation: '\\psi ' },
  { value: 'ω', label: 'Omega', latexRepresentation: '\\omega ' },
]},


// Greek letters (uppercase)
{label: 'Greek letters (uppercase)', group: [
  { value: 'Γ', label: 'Capital Gamma', latexRepresentation: '\\Gamma ' },
  { value: 'Δ', label: 'Capital Delta', latexRepresentation: '\\Delta ' },
  { value: 'Θ', label: 'Capital Theta', latexRepresentation: '\\Theta ' },
  { value: 'Λ', label: 'Capital Lambda', latexRepresentation: '\\Lambda ' },
  { value: 'Ξ', label: 'Capital Xi', latexRepresentation: '\\Xi ' },
  { value: 'Π', label: 'Capital Pi', latexRepresentation: '\\Pi ' },
  { value: 'Σ', label: 'Capital Sigma', latexRepresentation: '\\Sigma ' },
  { value: 'Υ', label: 'Capital Upsilon', latexRepresentation: '\\Upsilon ' },
  { value: 'Φ', label: 'Capital Phi', latexRepresentation: '\\Phi ' },
  { value: 'Ψ', label: 'Capital Psi', latexRepresentation: '\\Psi ' },
  { value: 'Ω', label: 'Capital Omega', latexRepresentation: '\\Omega ' },
]},

// Mathematical and logical symbols
{label: 'Mathematical and logical symbols', group: [
  { value: '*', label: 'Asterisk', latexRepresentation: '\\ast ' },
  { value: '<', label: 'Less than', latexRepresentation: '<' },
  { value: '>', label: 'Greater than', latexRepresentation: '>' },
  { value: '≤', label: 'Less or equal', latexRepresentation: '\\le ' },
  { value: '≥', label: 'Greater or equal', latexRepresentation: '\\ge ' },
  { value: '≠', label: 'Not equal', latexRepresentation: '\\neq ' },
  { value: '≈', label: 'Approximately equal', latexRepresentation: '\\approx ' },
  { value: '≡', label: 'Equivalent to', latexRepresentation: '\\equiv ' },
  { value: '~', label: 'Tilde', latexRepresentation: '\\sim ' },
  { value: '∇', label: 'Nabla', latexRepresentation: '\\nabla ' },
  { value: '∂', label: 'Partial derivative', latexRepresentation: '\\partial ' },
  { value: '√', label: 'Square root', latexRepresentation: '\\sqrt{} ' },
]},

// Set theory & logic
{label: 'Set theory & logic', group: [
  { value: '∈', label: 'Element of', latexRepresentation: '\\in ' },
  { value: '∉', label: 'Not an element of', latexRepresentation: '\\notin ' },
  { value: '∅', label: 'Empty set', latexRepresentation: '\\emptyset ' },
  { value: '∩', label: 'Intersection', latexRepresentation: '\\cap ' },
  { value: '∪', label: 'Union', latexRepresentation: '\\cup ' },
  { value: '⊂', label: 'Proper subset', latexRepresentation: '\\subset ' },
  { value: '⊆', label: 'Subset or equal', latexRepresentation: '\\subseteq ' },
  { value: '⊃', label: 'Proper superset', latexRepresentation: '\\supset ' },
  { value: '⊇', label: 'Superset or equal', latexRepresentation: '\\supseteq ' },
  { value: '∃', label: 'There exists', latexRepresentation: '\\exists ' },
  { value: '∀', label: 'For all', latexRepresentation: '\\forall ' },
  { value: '∧', label: 'Logical and', latexRepresentation: '\\wedge ' },
  { value: '∨', label: 'Logical or', latexRepresentation: '\\vee ' },
  { value: '¬', label: 'Negation', latexRepresentation: '\\neg ' },
  { value: '⇒', label: 'Implies', latexRepresentation: '\\Rightarrow ' },
  { value: '⇔', label: 'If and only if', latexRepresentation: '\\Leftrightarrow ' },
  { value: '∝', label: 'Proportional to', latexRepresentation: '\\propto ' },
  { value: '⊥', label: 'Perpendicular (orthogonal)', latexRepresentation: '\\perp ' },
]},

// Binaries & operators
{label: 'Binaries & operators', group: [
  { value: '⊕', label: 'Direct sum (oplus)', latexRepresentation: '\\oplus ' },
  { value: '⊗', label: 'Tensor product (otimes)', latexRepresentation: '\\otimes ' },
]},

// Set types
{label: 'Set types', group: [
  { value: 'ℝ', label: 'Set of real numbers', latexRepresentation: '\\mathbb{R} ' },
  { value: 'ℕ', label: 'Set of natural numbers', latexRepresentation: '\\mathbb{N} ' },
  { value: 'ℤ', label: 'Set of integers', latexRepresentation: '\\mathbb{Z} ' },
  { value: 'ℚ', label: 'Set of rational numbers', latexRepresentation: '\\mathbb{Q} ' },
  { value: 'ℂ', label: 'Set of complex numbers', latexRepresentation: '\\mathbb{C} ' },
]},

// Miscellaneous
{label: 'Miscellaneous', group: [
  { value: '∞', label: 'Infinity', latexRepresentation: '\\infty ' },
  { value: '♪', label: 'Musical note', latexRepresentation: '\\sharp ' },
  { value: '©', label: 'Copyright', latexRepresentation: '\\copyright ' },
  { value: '®', label: 'Registered trademark', latexRepresentation: '\\textregistered ' },
]},

// Currency symbols
{label: 'Currency symbols', group: [
  { value: '$', label: 'Dollar', latexRepresentation: '\\$ ' },
  { value: '£', label: 'Pound', latexRepresentation: '\\pounds ' },
  { value: '¥', label: 'Yen', latexRepresentation: '\\yen ' },
]},

// Arrows
{label: 'Arrows', group: [
  { value: '→', label: 'Right arrow', latexRepresentation: '\\rightarrow ' },
  { value: '←', label: 'Left arrow', latexRepresentation: '\\leftarrow ' },
  { value: '↑', label: 'Up arrow', latexRepresentation: '\\uparrow ' },
  { value: '↓', label: 'Down arrow', latexRepresentation: '\\downarrow ' },
  { value: '↔', label: 'Double arrow', latexRepresentation: '\\leftrightarrow ' },
  { value: '⇒', label: 'Implies', latexRepresentation: '\\Rightarrow ' },
  { value: '⇔', label: 'If and only if', latexRepresentation: '\\Leftrightarrow ' },
]}

  ];
  