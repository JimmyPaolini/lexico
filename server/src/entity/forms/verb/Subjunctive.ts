import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class SubjunctivePerson {
  @Field(() => [String])
  first: string[]

  @Field(() => [String])
  second: string[]

  @Field(() => [String])
  third: string[]
}

@ObjectType()
export class SubjunctiveNumber {
  @Field(() => SubjunctivePerson)
  singular: SubjunctivePerson

  @Field(() => SubjunctivePerson)
  plural: SubjunctivePerson
}

@ObjectType()
export class SubjunctiveTense {
  @Field(() => SubjunctiveNumber)
  "present": SubjunctiveNumber

  @Field(() => SubjunctiveNumber)
  "imperfect": SubjunctiveNumber

  @Field(() => SubjunctiveNumber)
  "perfect": SubjunctiveNumber

  @Field(() => SubjunctiveNumber)
  "pluperfect": SubjunctiveNumber
}

@ObjectType()
export default class Subjunctive {
  @Field(() => SubjunctiveTense)
  active: SubjunctiveTense

  @Field(() => SubjunctiveTense)
  passive: SubjunctiveTense
}
