import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class MascFemNeu {
  @Field(() => [String])
  masculine: string[]

  @Field(() => [String])
  feminine: string[]

  @Field(() => [String])
  neuter: string[]
}

@ObjectType()
export class AdjectiveSgPl {
  @Field(() => MascFemNeu)
  singular: MascFemNeu

  @Field(() => MascFemNeu)
  plural: MascFemNeu
}

@ObjectType()
export default class AdjectiveForms {
  @Field(() => AdjectiveSgPl)
  nominative: AdjectiveSgPl

  @Field(() => AdjectiveSgPl)
  genitive: AdjectiveSgPl

  @Field(() => AdjectiveSgPl)
  dative: AdjectiveSgPl

  @Field(() => AdjectiveSgPl)
  accusative: AdjectiveSgPl

  @Field(() => AdjectiveSgPl)
  ablative: AdjectiveSgPl

  @Field(() => AdjectiveSgPl)
  vocative: AdjectiveSgPl

  @Field(() => AdjectiveSgPl)
  locative: AdjectiveSgPl
}
