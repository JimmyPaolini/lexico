import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class AdjectiveGender {
  @Field(() => [String], { nullable: true })
  masculine?: string[]

  @Field(() => [String], { nullable: true })
  feminine?: string[]

  @Field(() => [String], { nullable: true })
  neuter?: string[]
}

@ObjectType()
export class AdjectiveNumber {
  @Field(() => AdjectiveGender, { nullable: true })
  singular?: AdjectiveGender

  @Field(() => AdjectiveGender, { nullable: true })
  plural?: AdjectiveGender
}

@ObjectType()
export default class AdjectiveForms {
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
