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
  resolveType: (value) => {
    if ('nominative' in value) return NounForms
    if ('indicative' in value) return VerbForms
    if ('positive' in value) return AdverbForms
    if ('masculine' in value || 'feminine' in value || 'neuter' in value)
      return AdjectiveForms
    else return undefined
  },
})
