import { Identifier, IdentifierAbbreviation } from './types'

export const abbreviateIdentifier = {
  nominative: 'NOM',
  genitive: 'GEN',
  dative: 'DAT',
  accusative: 'ACC',
  ablative: 'ABL',
  vocative: 'VOC',
  locative: 'LOC',

  masculine: 'MASC',
  feminine: 'FEM',
  neuter: 'NEU',

  singular: 'SG',
  plural: 'PL',

  indicative: 'IND',
  subjunctive: 'SUB',
  imperative: 'IMPV',
  IMPERATIVE: 'IMPV',
  infinitive: 'INF',
  INFINITIVE: 'INF',
  'non finite': 'NONF',

  present: 'PRES',
  imperfect: 'IMP',
  future: 'FUT',
  perfect: 'PERF',
  pluperfect: 'PLUP',
  'future perfect': 'FUTP',

  participle: 'PART',
  'gerund/supine': 'GER/SUP',
  gerund: 'GER',
  supine: 'SUP',

  active: 'ACT',
  passive: 'PAS',

  first: '1ST',
  second: '2ND',
  third: '3RD',
} as { [key in Identifier]: IdentifierAbbreviation }

export const unabbreviateIdentifier = {
  NOM: 'nominative',
  GEN: 'genitive',
  DAT: 'dative',
  ACC: 'accusative',
  ABL: 'ablative',
  VOC: 'vocative',
  LOC: 'locative',

  MASC: 'masculine',
  FEM: 'feminine',
  NEU: 'neuter',

  SG: 'singular',
  PL: 'plural',

  IND: 'indicative',
  SUB: 'subjunctive',
  IMPV: 'imperative',
  INF: 'infinitive',
  NONF: 'non finite',

  PRES: 'present',
  IMP: 'imperfect',
  FUT: 'future',
  PERF: 'perfect',
  PLUP: 'pluperfect',
  FUTP: 'future perfect',

  PART: 'participle',
  'GER/SUP': 'gerund/supine',
  GER: 'gerund',
  SUP: 'supine',

  ACT: 'active',
  PAS: 'passive',

  '1ST': 'first',
  '2ND': 'second',
  '3RD': 'third',
} as { [key in IdentifierAbbreviation]: Identifier }
