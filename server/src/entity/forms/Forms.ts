import { createUnionType } from "type-graphql"
import { UnionFromClasses } from "type-graphql/dist/helpers/utils"
import AdjectiveForms from "./AdjectiveForms"
import NounForms from "./NounForms"
import VerbForms from "./verb/VerbForms"

export type Forms = NounForms | VerbForms | AdjectiveForms

const FormsUnion: UnionFromClasses<
  [NounForms, VerbForms, AdjectiveForms]
> = createUnionType({
  name: "Forms",
  types: () => [NounForms, VerbForms, AdjectiveForms] as const,
  resolveType: (value) => {
    if ("indicative" in value) return VerbForms
    else if ("nominative" in value) {
      if ("masculine" in value.nominative.singular) return AdjectiveForms
      else return NounForms
    } else return undefined
  },
})

export default FormsUnion
