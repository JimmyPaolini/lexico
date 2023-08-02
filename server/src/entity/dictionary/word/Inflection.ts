import { createUnionType } from 'type-graphql'
import { UnionFromClasses } from 'type-graphql/dist/helpers/utils'

import AdjectiveInflection from './inflection/AdjectiveInflection'
import AdverbInflection from './inflection/AdverbInflection'
import NounInflection from './inflection/NounInflection'
import PrepositionInflection from './inflection/PrepositionInflection'
import Uninflected from './inflection/Uninflected'
import VerbInflection from './inflection/VerbInflection'

export type Inflection =
  | NounInflection
  | VerbInflection
  | AdjectiveInflection
  | AdverbInflection
  | PrepositionInflection
  | Uninflected

export const InflectionUnion: UnionFromClasses<
  [
    NounInflection,
    VerbInflection,
    AdjectiveInflection,
    AdverbInflection,
    PrepositionInflection,
    Uninflected
  ]
> = createUnionType({
  name: 'Inflection',
  types: () =>
    [
      NounInflection,
      VerbInflection,
      AdjectiveInflection,
      AdverbInflection,
      PrepositionInflection,
      Uninflected,
    ] as const,
  resolveType: (value) => {
    if ('declension' in value && 'gender' in value) return NounInflection
    if ('conjugation' in value) return VerbInflection
    if ('declension' in value && 'degree' in value) return AdjectiveInflection
    if ('type' in value && 'degree' in value) return AdverbInflection
    if ('case' in value) return PrepositionInflection
    else return Uninflected
  },
})
