import { Field, ObjectType } from "type-graphql"

@ObjectType()
export default class AdverbInflection {
  @Field(() => String)
  type: AdverbType = ""

  @Field(() => String)
  degree: AdverbDegree = "positive"

  constructor(type: AdverbType = "", degree: AdverbDegree = "positive") {
    this.type = type
    this.degree = degree
  }
}

export type AdverbType = "descriptive" | "conjunctional" | ""
export type AdverbDegree = "positive" | "comparative" | "superlative"
export const adverbDegreeRegex = new RegExp(
  /(positive)|(comparative)|(superlative)/,
)
