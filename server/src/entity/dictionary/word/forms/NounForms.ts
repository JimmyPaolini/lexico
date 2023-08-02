import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class NounNumber {
  @Field(() => [String], { nullable: true })
  singular?: string[] = []

  @Field(() => [String], { nullable: true })
  plural?: string[] = []
}

@ObjectType()
export default class NounForms {
  @Field(() => NounNumber, { nullable: true })
  nominative?: NounNumber = new NounNumber()

  @Field(() => NounNumber, { nullable: true })
  genitive?: NounNumber = new NounNumber()

  @Field(() => NounNumber, { nullable: true })
  dative?: NounNumber = new NounNumber()

  @Field(() => NounNumber, { nullable: true })
  accusative?: NounNumber = new NounNumber()

  @Field(() => NounNumber, { nullable: true })
  ablative?: NounNumber = new NounNumber()

  @Field(() => NounNumber, { nullable: true })
  vocative?: NounNumber = new NounNumber()

  @Field(() => NounNumber, { nullable: true })
  locative?: NounNumber = new NounNumber()
}
