import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('AdjectiveInflectionInput')
export default class AdjectiveInflection {
  @Field(() => String)
  declension: AdjectiveDeclension = ''

  @Field(() => String)
  degree: AdjectiveDegree = 'positive'

  @Field()
  other?: string = ''

  constructor(
    declension: AdjectiveDeclension = '',
    degree: AdjectiveDegree = 'positive',
    other = ''
  ) {
    this.declension = declension
    this.degree = degree
    this.other = other
  }
}

export type AdjectiveDeclension = 'first/second' | 'third' | ''
export const adjectiveDelensionRegex = /(first\/second)|(third)/
export type AdjectiveDegree = 'positive' | 'comparative' | 'superlative'
export const adjectiveDegreeRegex = /(positive)|(comparative)|(superlative)/
