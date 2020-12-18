import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class NounNumber {
  @Field(() => [String])
  singular: string[]

  @Field(() => [String])
  plural: string[]
}

@ObjectType()
export default class NounForms {
  @Field(() => NounNumber)
  nominative: NounNumber

  @Field(() => NounNumber)
  genitive: NounNumber

  @Field(() => NounNumber)
  dative: NounNumber

  @Field(() => NounNumber)
  accusative: NounNumber

  @Field(() => NounNumber)
  ablative: NounNumber

  @Field(() => NounNumber)
  vocative: NounNumber

  @Field(() => NounNumber)
  locative: NounNumber
}
