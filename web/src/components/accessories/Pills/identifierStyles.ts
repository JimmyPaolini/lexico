import { Identifier } from 'src/utils/identifiers'

// https://www.w3schools.com/css/css_colors_hsl.asp
// https://htmlcolorcodes.com/color-names/

export const identifierStyles = {
  nominative: { background: 'royalblue', color: 'white' },
  genitive: { background: 'forestgreen', color: 'white' },
  dative: { background: 'chartreuse', color: 'black' },
  accusative: { background: 'tomato', color: 'white' },
  ablative: { background: 'hotpink', color: 'white' },
  vocative: { background: 'orangered', color: 'white' },
  locative: { background: 'brown', color: 'white' },

  masculine: { background: 'orange', color: 'white' },
  feminine: { background: 'green', color: 'white' },
  neuter: { background: 'purple', color: 'white' },

  singular: { background: 'white', color: 'black', border: '1px solid black' },
  plural: { background: 'black', color: 'white', border: '1px solid white' },

  indicative: { background: 'steelblue', color: 'white' },
  subjunctive: { background: 'fuchsia', color: 'white' },
  imperative: { background: 'maroon', color: 'white' },
  infinitive: { background: 'lime', color: 'black' },
  'non finite': { background: 'olive', color: 'black' },

  present: { background: 'blue', color: 'white' },
  imperfect: { background: 'darkgreen', color: 'white' },
  future: { background: 'gold', color: 'black' },
  perfect: { background: 'crimson', color: 'white' },
  pluperfect: { background: 'indigo', color: 'white' },
  'future perfect': { background: 'seagreen', color: 'black' },

  participle: { background: 'black', color: 'white' },
  'gerund/supine': { background: 'black', color: 'white' },
  gerund: { background: 'black', color: 'white' },
  supine: { background: 'black', color: 'white' },

  active: { background: '#555', color: 'white', border: '1px dotted white' },
  passive: { background: '#999', color: 'black', border: '1px dotted black' },

  first: { background: 'blue', color: 'white' },
  second: { background: 'red', color: 'white' },
  third: { background: 'yellow', color: 'black' },
} as { [key in Identifier]: IdentifierStyles }

export type IdentifierStyles = {
  background: string
  color: string
  border?: string
}
