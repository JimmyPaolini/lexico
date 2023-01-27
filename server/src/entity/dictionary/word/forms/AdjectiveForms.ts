import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AdjectiveNumber {
  @Field(() => [String], { nullable: true })
  singular?: string[]

  @Field(() => [String], { nullable: true })
  plural?: string[]

  constructor() {
    this.singular = []
    this.plural = []
  }
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

  constructor() {
    this.nominative = new AdjectiveNumber()
    this.genitive = new AdjectiveNumber()
    this.dative = new AdjectiveNumber()
    this.accusative = new AdjectiveNumber()
    this.ablative = new AdjectiveNumber()
    this.vocative = new AdjectiveNumber()
    this.locative = new AdjectiveNumber()
  }
}

@ObjectType()
export default class AdjectiveForms {
  @Field(() => AdjectiveCase, { nullable: true })
  masculine?: AdjectiveCase

  @Field(() => AdjectiveCase, { nullable: true })
  feminine?: AdjectiveCase

  @Field(() => AdjectiveCase, { nullable: true })
  neuter?: AdjectiveCase

  constructor() {
    this.masculine = new AdjectiveCase()
    this.feminine = new AdjectiveCase()
    this.neuter = new AdjectiveCase()
  }
}
