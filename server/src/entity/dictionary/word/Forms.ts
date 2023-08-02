import { createUnionType } from 'type-graphql'
import { UnionFromClasses } from 'type-graphql/dist/helpers/utils'

import AdjectiveForms from './forms/AdjectiveForms'
import AdverbForms from './forms/AdverbForms'
import NounForms from './forms/NounForms'
import VerbForms from './forms/VerbForms'

export type Forms = NounForms | VerbForms | AdjectiveForms | AdverbForms

export const FormsUnion: UnionFromClasses<
  [NounForms, VerbForms, AdjectiveForms, AdverbForms]
> = createUnionType({
  name: 'Forms',
  types: () => [NounForms, VerbForms, AdjectiveForms, AdverbForms] as const,
  resolveType: (forms) => {
    if (
      Object.getOwnPropertyNames(new NounForms()).some((key) => key in forms)
    ) {
      return NounForms
    }
    if (
      Object.getOwnPropertyNames(new VerbForms()).some((key) => key in forms)
    ) {
      return VerbForms
    }
    if (
      Object.getOwnPropertyNames(new AdjectiveForms()).some(
        (key) => key in forms
      )
    ) {
      return AdjectiveForms
    }
    if (
      Object.getOwnPropertyNames(new AdverbForms()).some((key) => key in forms)
    ) {
      return AdverbForms
    }
    return undefined
  },
})
