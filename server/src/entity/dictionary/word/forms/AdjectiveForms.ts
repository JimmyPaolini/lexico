import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AdjectiveNumber {
  @Field(() => [String], { nullable: true })
  singular?: string[] = []

  @Field(() => [String], { nullable: true })
  plural?: string[] = []
}

@ObjectType()
export class AdjectiveCase {
  @Field(() => AdjectiveNumber, { nullable: true })
  nominative?: AdjectiveNumber = new AdjectiveNumber()

  @Field(() => AdjectiveNumber, { nullable: true })
  genitive?: AdjectiveNumber = new AdjectiveNumber()

  @Field(() => AdjectiveNumber, { nullable: true })
  dative?: AdjectiveNumber = new AdjectiveNumber()

  @Field(() => AdjectiveNumber, { nullable: true })
  accusative?: AdjectiveNumber = new AdjectiveNumber()

  @Field(() => AdjectiveNumber, { nullable: true })
  ablative?: AdjectiveNumber = new AdjectiveNumber()

  @Field(() => AdjectiveNumber, { nullable: true })
  vocative?: AdjectiveNumber = new AdjectiveNumber()

  @Field(() => AdjectiveNumber, { nullable: true })
  locative?: AdjectiveNumber = new AdjectiveNumber()
}

@ObjectType()
export default class AdjectiveForms {
  @Field(() => AdjectiveCase, { nullable: true })
  masculine?: AdjectiveCase = new AdjectiveCase()

  @Field(() => AdjectiveCase, { nullable: true })
  feminine?: AdjectiveCase = new AdjectiveCase()

  @Field(() => AdjectiveCase, { nullable: true })
  neuter?: AdjectiveCase = new AdjectiveCase()
}
