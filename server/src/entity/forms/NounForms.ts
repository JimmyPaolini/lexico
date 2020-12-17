import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class NounSgPl {
  @Field(() => [String])
  singular: string[]

  @Field(() => [String])
  plural: string[]
}

@ObjectType()
export default class NounForms {
  @Field(() => NounSgPl)
  nominative: NounSgPl

  @Field(() => NounSgPl)
  genitive: NounSgPl

  @Field(() => NounSgPl)
  dative: NounSgPl

  @Field(() => NounSgPl)
  accusative: NounSgPl

  @Field(() => NounSgPl)
  ablative: NounSgPl

  @Field(() => NounSgPl)
  vocative: NounSgPl

  @Field(() => NounSgPl)
  locative: NounSgPl
}
