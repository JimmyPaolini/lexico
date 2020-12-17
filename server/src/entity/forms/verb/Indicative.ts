import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class IndicativePerson {
  @Field(() => [String])
  first: string[]

  @Field(() => [String])
  second: string[]

  @Field(() => [String])
  third: string[]
}

@ObjectType()
export class IndicativeNumber {
  @Field(() => IndicativePerson)
  singular: IndicativePerson

  @Field(() => IndicativePerson)
  plural: IndicativePerson
}

@ObjectType()
export class IndicativeTense {
  @Field(() => IndicativeNumber)
  "present": IndicativeNumber

  @Field(() => IndicativeNumber)
  "imperfect": IndicativeNumber

  @Field(() => IndicativeNumber)
  "future": IndicativeNumber

  @Field(() => IndicativeNumber)
  "perfect": IndicativeNumber

  @Field(() => IndicativeNumber)
  "pluperfect": IndicativeNumber

  @Field(() => IndicativeNumber)
  "futurePerfect": IndicativeNumber
}

@ObjectType()
export default class Indicative {
  @Field(() => IndicativeTense)
  active: IndicativeTense

  @Field(() => IndicativeTense)
  passive: IndicativeTense
}
