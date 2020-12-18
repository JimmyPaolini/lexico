import { createUnionType } from "type-graphql"
import { UnionFromClasses } from "type-graphql/dist/helpers/utils"
import AdjectiveInflection from "./inflection/AdjectiveInflection"
import AdverbInflection from "./inflection/AdverbInflection"
import NounInflection from "./inflection/NounInflection"
import PrepositionInflection from "./inflection/PrepositionInflection"
import VerbInflection from "./inflection/VerbInflection"

export type Inflection =
  | NounInflection
  | VerbInflection
  | AdjectiveInflection
  | AdverbInflection
  | PrepositionInflection
  | null

export const InflectionUnion: UnionFromClasses<
  [
    NounInflection,
    VerbInflection,
    AdjectiveInflection,
    AdverbInflection,
    PrepositionInflection,
  ]
> = createUnionType({
  name: "Inflection",
  types: () =>
    [
      NounInflection,
      VerbInflection,
      AdjectiveInflection,
      AdverbInflection,
      PrepositionInflection,
    ] as const,
  resolveType: () => {
    return undefined
  },
})
