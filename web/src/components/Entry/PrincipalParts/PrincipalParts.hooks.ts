import {
  AdjectiveInflection,
  AdverbInflection,
  Inflection,
  NounInflection,
  PrepositionInflection,
  PrincipalPart,
  Uninflected,
  VerbInflection,
} from 'src/graphql/generated'
import { unCamelCase } from 'src/utils/string'

import { PartOfSpeech } from '../../accessories/Pills/identifierTypes'

export const getInflectionLabel = (
  inflection: Inflection | null | undefined,
  partOfSpeech: PartOfSpeech
): string => {
  let inflectionLabel = ''
  if (['noun', 'properNoun'].includes(partOfSpeech)) {
    const declension = (inflection as NounInflection)?.declension
    const gender = (inflection as NounInflection)?.gender
    if (declension && gender)
      inflectionLabel = declension + ' declension, ' + gender
    if (declension) inflectionLabel = declension + ' declension'
    if (gender) inflectionLabel = gender
  } else if (partOfSpeech === 'verb') {
    const conjugation = (inflection as VerbInflection)?.conjugation
    if (conjugation) inflectionLabel = conjugation + ' conjugation'
  } else if (
    ['adjective', 'participle', 'numeral', 'suffix'].includes(partOfSpeech)
  ) {
    const declension = (inflection as AdjectiveInflection)?.declension
    const degree = (inflection as AdjectiveInflection)?.degree
    if (declension && degree)
      inflectionLabel = declension + ' declension, ' + degree
    if (declension) inflectionLabel = declension + ' declension'
    if (degree) inflectionLabel = degree
  } else if (partOfSpeech === 'adverb') {
    const type = (inflection as AdverbInflection)?.type
    const degree = (inflection as AdverbInflection)?.degree
    if (type && degree) inflectionLabel = type + ', ' + degree
    if (type) inflectionLabel = type
    if (degree) inflectionLabel = degree
  } else if (partOfSpeech === 'preposition') {
    const case_ = (inflection as PrepositionInflection)?.case
    inflectionLabel = case_
  } else {
    const other = (inflection as Uninflected)?.other
    inflectionLabel = other
  }
  inflectionLabel = `${unCamelCase(partOfSpeech)}, ${inflectionLabel}`.replace(
    /, ?$|^, ?/,
    ''
  )
  return inflectionLabel
}

export const getPrincipalPartsLabel = (
  principalParts: PrincipalPart[]
  // partOfSpeech: PartOfSpeech
) => {
  return principalParts
    .map((principalPart) => principalPart.text.join('/'))
    .join(', ')
}
