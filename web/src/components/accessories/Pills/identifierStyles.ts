import { Identifier } from 'src/utils/identifiers'

export const identifierStyles = {
  nominative: { backgroundColor: 'royalblue', color: 'white' },
  genitive: { backgroundColor: 'forestgreen', color: 'white' },
  dative: { backgroundColor: 'chartreuse', color: 'black' },
  accusative: { backgroundColor: 'tomato', color: 'white' },
  ablative: { backgroundColor: 'hotpink', color: 'white' },
  vocative: { backgroundColor: 'orangered', color: 'white' },
  locative: { backgroundColor: 'brown', color: 'white' },

  masculine: { backgroundColor: 'orange', color: 'white' },
  feminine: { backgroundColor: 'green', color: 'white' },
  neuter: { backgroundColor: 'purple', color: 'white' },

  singular: {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid black',
  },
  plural: {
    backgroundColor: 'black',
    color: 'white',
    border: '1px solid white',
  },

  indicative: { backgroundColor: 'steelblue', color: 'white' },
  subjunctive: { backgroundColor: 'fuchsia', color: 'white' },
  imperative: { backgroundColor: 'maroon', color: 'white' },
  infinitive: { backgroundColor: 'lime', color: 'black' },
  'non finite': { backgroundColor: 'olive', color: 'black' },

  present: { backgroundColor: 'blue', color: 'white' },
  imperfect: { backgroundColor: 'darkgreen', color: 'white' },
  future: { backgroundColor: 'gold', color: 'black' },
  perfect: { backgroundColor: 'crimson', color: 'white' },
  pluperfect: { backgroundColor: 'indigo', color: 'white' },
  'future perfect': { backgroundColor: 'seagreen', color: 'black' },

  participle: { backgroundColor: 'black', color: 'white' },
  'gerund/supine': { backgroundColor: 'black', color: 'white' },
  gerund: { backgroundColor: 'black', color: 'white' },
  supine: { backgroundColor: 'black', color: 'white' },

  active: {
    backgroundColor: '#555',
    color: 'white',
    border: '1px solid white',
  },
  passive: {
    backgroundColor: '#999',
    color: 'black',
    border: '1px solid black',
  },

  first: { backgroundColor: 'yellow', color: 'black' },
  second: { backgroundColor: 'red', color: 'white' },
  third: { backgroundColor: 'blue', color: 'white' },
} as { [key in Identifier]: IdentifierStyles }

export type IdentifierStyles = {
  backgroundColor: string
  color: string
  border?: string
}
