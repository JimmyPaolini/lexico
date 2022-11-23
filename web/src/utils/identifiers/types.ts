export type Case =
  | 'nominative'
  | 'genitive'
  | 'dative'
  | 'accusative'
  | 'ablative'
  | 'vocative'
  | 'locative'
export type Gender = 'masculine' | 'feminine' | 'neuter'
export type Number = 'singular' | 'plural'
export type Mood =
  | 'indicative'
  | 'subjunctive'
  | 'imperative'
  | 'infinitive'
  | 'non finite'
export type Tense =
  | 'present'
  | 'imperfect'
  | 'future'
  | 'perfect'
  | 'pluperfect'
  | 'future perfect'
export type NonFinite = 'participle' | 'gerund/supine' | 'gerund' | 'supine'
export type Voice = 'active' | 'passive'
export type Person = 'first' | 'second' | 'third'

export type Identifier =
  | Case
  | Gender
  | Number
  | Mood
  | Tense
  | NonFinite
  | Voice
  | Person

export type CaseAbbreviation =
  | 'NOM'
  | 'GEN'
  | 'DAT'
  | 'ACC'
  | 'ABL'
  | 'VOC'
  | 'LOC'
export type GenderAbbreviation = 'MASC' | 'FEM' | 'NEU'
export type NumberAbbreviation = 'SG' | 'PL'
export type MoodAbbreviation = 'IND' | 'SUB' | 'IMPV' | 'INF' | 'NONF'
export type TenseAbbreviation =
  | 'PRES'
  | 'IMP'
  | 'FUT'
  | 'PERF'
  | 'PLUP'
  | 'FUTP'
export type NonFiniteAbbreviation = 'PART' | 'GER/SUP' | 'GER' | 'SUP'
export type VoiceAbbreviation = 'ACT' | 'PAS'
export type PersonAbbreviation = '1ST' | '2ND' | '3RD'

export type IdentifierAbbreviation =
  | CaseAbbreviation
  | GenderAbbreviation
  | NumberAbbreviation
  | MoodAbbreviation
  | TenseAbbreviation
  | NonFiniteAbbreviation
  | VoiceAbbreviation
  | PersonAbbreviation
