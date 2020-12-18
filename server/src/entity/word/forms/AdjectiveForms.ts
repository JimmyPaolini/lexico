import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class AdjectiveGender {
  @Field(() => [String])
  masculine: string[]

  @Field(() => [String])
  feminine: string[]

  @Field(() => [String])
  neuter: string[]
}

@ObjectType()
export class AdjectiveNumber {
  @Field(() => AdjectiveGender)
  singular: AdjectiveGender

  @Field(() => AdjectiveGender)
  plural: AdjectiveGender
}

@ObjectType()
export default class AdjectiveForms {
  @Field(() => AdjectiveNumber)
  nominative: AdjectiveNumber

  @Field(() => AdjectiveNumber)
  genitive: AdjectiveNumber

  @Field(() => AdjectiveNumber)
  dative: AdjectiveNumber

  @Field(() => AdjectiveNumber)
  accusative: AdjectiveNumber

  @Field(() => AdjectiveNumber)
  ablative: AdjectiveNumber

  @Field(() => AdjectiveNumber)
  vocative: AdjectiveNumber

  @Field(() => AdjectiveNumber)
  locative: AdjectiveNumber
}
