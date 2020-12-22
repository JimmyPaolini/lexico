import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class SubjunctivePerson {
  @Field(() => [String])
  first: string[] = []

  @Field(() => [String])
  second: string[] = []

  @Field(() => [String])
  third: string[] = []
}

@ObjectType()
export class SubjunctiveNumber {
  @Field(() => SubjunctivePerson)
  singular: SubjunctivePerson = new SubjunctivePerson()

  @Field(() => SubjunctivePerson)
  plural: SubjunctivePerson = new SubjunctivePerson()
}

@ObjectType()
export class SubjunctiveTense {
  @Field(() => SubjunctiveNumber)
  "present": SubjunctiveNumber = new SubjunctiveNumber()

  @Field(() => SubjunctiveNumber)
  "imperfect": SubjunctiveNumber = new SubjunctiveNumber()

  @Field(() => SubjunctiveNumber)
  "perfect": SubjunctiveNumber = new SubjunctiveNumber()

  @Field(() => SubjunctiveNumber)
  "pluperfect": SubjunctiveNumber = new SubjunctiveNumber()
}

@ObjectType()
export default class Subjunctive {
  @Field(() => SubjunctiveTense)
  active: SubjunctiveTense = new SubjunctiveTense()

  @Field(() => SubjunctiveTense)
  passive: SubjunctiveTense = new SubjunctiveTense()
}
