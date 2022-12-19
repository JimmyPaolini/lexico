import { Field, ObjectType } from "type-graphql"

@ObjectType()
export default class AdjectiveInflection {
  @Field(() => String)
  declension: AdjectiveDeclension = ""

  @Field(() => String)
  degree: AdjectiveDegree = "positive"

  @Field()
  other?: string = ""

  constructor(
    declension: AdjectiveDeclension = "",
    degree: AdjectiveDegree = "positive",
    other = "",
  ) {
    this.declension = declension
    this.degree = degree
    this.other = other
  }
}

export type AdjectiveDeclension = "first/second" | "third" | ""
export const adjectiveDelensionRegex = new RegExp(/(first\/second)|(third)/)
export type AdjectiveDegree = "positive" | "comparative" | "superlative"
export const adjectiveDegreeRegex = new RegExp(
  /(positive)|(comparative)|(superlative)/,
)
