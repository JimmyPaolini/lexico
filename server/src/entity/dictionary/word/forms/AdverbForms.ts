import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class AdverbForms {
  @Field(() => [String], { nullable: true })
  positive: string[]

  @Field(() => [String], { nullable: true })
  comparative?: string[]

  @Field(() => [String], { nullable: true })
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

  get __typename(): string {
    return 'AdverbForms'
  }
}
