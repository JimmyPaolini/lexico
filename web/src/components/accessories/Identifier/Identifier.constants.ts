import { invertDictionary } from 'src/utils/object'

export const abbreviatePartOfSpeech = {
  noun: 'NOUN' as const,
  properNoun: 'PN' as const,
  verb: 'VERB' as const,
  adjective: 'ADJ' as const,
  adverb: 'ADV' as const,
  pronoun: 'PRON' as const,
  determiner: 'PRON' as const,
  preposition: 'PREP' as const,
  conjunction: 'CJN' as const,
  numeral: 'NUM' as const,
  abbreviation: 'ABV.' as const,
  particle: 'PTCL' as const,
  interjection: '!!' as const,
  prefix: '-X-' as const,
  suffix: '-X-' as const,
  interfix: '-X-' as const,
  circumfix: '-X-' as const,
  inflection: '-X-' as const,
  phrase: 'PHRS' as const,
  proverb: 'PHRS' as const,
  idiom: 'PHRS' as const,
}

export const abbreviateCase = {
  nominative: 'NOM' as const,
  genitive: 'GEN' as const,
  dative: 'DAT' as const,
  accusative: 'ACC' as const,
  ablative: 'ABL' as const,
  vocative: 'VOC' as const,
  locative: 'LOC' as const,
}

export const abbreviateGender = {
  masculine: 'MASC' as const,
  feminine: 'FEM' as const,
  neuter: 'NEU' as const,
}

export const abbreviateNumber = {
  singular: 'S' as const,
  plural: 'P' as const,
}

export const abbreviateMood = {
  indicative: 'IND' as const,
  subjunctive: 'SUB' as const,
  imperative: 'IMPV' as const,
  IMPERATIVE: 'IMPV' as const,
  infinitive: 'INF' as const,
  INFINITIVE: 'INF' as const,
  'non finite': 'NONF' as const,
}

export const abbreviateTense = {
  present: 'PRES' as const,
  imperfect: 'IMP' as const,
  future: 'FUT' as const,
  perfect: 'PERF' as const,
  pluperfect: 'PLUP' as const,
  'future perfect': 'FUTP' as const,
}

export const abbreviateMisc = {
  participle: 'PART' as const,
  'gerund/supine': 'GER/SUP' as const,
  gerund: 'GER' as const,
  supine: 'SUP' as const,
}

export const abbreviateVoice = {
  active: 'ACT' as const,
  passive: 'PAS' as const,
}

export const abbreviatePerson = {
  first: '1' as const,
  second: '2' as const,
  third: '3' as const,
}

export const unabbreviatePartOfSpeech = invertDictionary(abbreviatePartOfSpeech)
export const unabbreviateCase = invertDictionary(abbreviateCase)
export const unabbreviateGender = invertDictionary(abbreviateGender)
export const unabbreviateNumber = invertDictionary(abbreviateNumber)
export const unabbreviateMood = invertDictionary(abbreviateMood)
export const unabbreviateTense = invertDictionary(abbreviateTense)
export const unabbreviateMisc = invertDictionary(abbreviateMisc)
export const unabbreviateVoice = invertDictionary(abbreviateVoice)
export const unabbreviatePerson = invertDictionary(abbreviatePerson)

export const abbreviateIdentifier = {
  ...abbreviatePartOfSpeech,
  ...abbreviateCase,
  ...abbreviateGender,
  ...abbreviateNumber,
  ...abbreviateMood,
  ...abbreviateTense,
  ...abbreviateMisc,
  ...abbreviateVoice,
  ...abbreviatePerson,
}

export const unabbreviateIdentifier = {
  ...unabbreviatePartOfSpeech,
  ...unabbreviateCase,
  ...unabbreviateGender,
  ...unabbreviateNumber,
  ...unabbreviateMood,
  ...unabbreviateTense,
  ...unabbreviateMisc,
  ...unabbreviateVoice,
  ...unabbreviatePerson,
}
