import { Field, ObjectType } from "type-graphql"

@ObjectType()
export default class AdverbForms {
  @Field(() => [String])
  positive: string[]

  @Field(() => [String])
  comparative?: string[]

  @Field(() => [String])
  superlative?: string[]

  constructor(
    positive: string[] = [],
    comparative?: string[],
    superlative?: string[],
  ) {
    this.positive = positive
    if (comparative) this.comparative = comparative
    if (superlative) this.superlative = superlative
  }
}
