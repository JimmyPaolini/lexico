import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class IndicativePerson {
  @Field(() => [String])
  first: string[] = []

  @Field(() => [String])
  second: string[] = []

  @Field(() => [String])
  third: string[] = []
}

@ObjectType()
export class IndicativeNumber {
  @Field(() => IndicativePerson)
  singular: IndicativePerson = new IndicativePerson()

  @Field(() => IndicativePerson)
  plural: IndicativePerson = new IndicativePerson()
}

@ObjectType()
export class IndicativeTense {
  @Field(() => IndicativeNumber)
  "present": IndicativeNumber = new IndicativeNumber()

  @Field(() => IndicativeNumber)
  "imperfect": IndicativeNumber = new IndicativeNumber()

  @Field(() => IndicativeNumber)
  "future": IndicativeNumber = new IndicativeNumber()

  @Field(() => IndicativeNumber)
  "perfect": IndicativeNumber = new IndicativeNumber()

  @Field(() => IndicativeNumber)
  "pluperfect": IndicativeNumber = new IndicativeNumber()

  @Field(() => IndicativeNumber)
  "futurePerfect": IndicativeNumber = new IndicativeNumber()
}

@ObjectType()
export default class Indicative {
  @Field(() => IndicativeTense)
  active: IndicativeTense = new IndicativeTense()

  @Field(() => IndicativeTense)
  passive: IndicativeTense = new IndicativeTense()
}
