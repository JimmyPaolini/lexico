import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class AdjectiveNumber {
  @Field(() => [String], { nullable: true })
  singular?: string[]

  @Field(() => [String], { nullable: true })
  plural?: string[]
}

@ObjectType()
export class AdjectiveCase {
  @Field(() => AdjectiveNumber, { nullable: true })
  nominative?: AdjectiveNumber

  @Field(() => AdjectiveNumber, { nullable: true })
  genitive?: AdjectiveNumber

  @Field(() => AdjectiveNumber, { nullable: true })
  dative?: AdjectiveNumber

  @Field(() => AdjectiveNumber, { nullable: true })
  accusative?: AdjectiveNumber

  @Field(() => AdjectiveNumber, { nullable: true })
  ablative?: AdjectiveNumber

  @Field(() => AdjectiveNumber, { nullable: true })
  vocative?: AdjectiveNumber

  @Field(() => AdjectiveNumber, { nullable: true })
  locative?: AdjectiveNumber
}

@ObjectType()
export default class AdjectiveForms {
  @Field(() => AdjectiveCase, { nullable: true })
  masculine?: AdjectiveCase

  @Field(() => AdjectiveCase, { nullable: true })
  feminine?: AdjectiveCase

  @Field(() => AdjectiveCase, { nullable: true })
  neuter?: AdjectiveCase
}
