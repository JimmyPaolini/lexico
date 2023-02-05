import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('IndicativePersonInput')
export class IndicativePerson {
  @Field(() => [String], { nullable: true })
  first: string[] = []

  @Field(() => [String], { nullable: true })
  second: string[] = []

  @Field(() => [String], { nullable: true })
  third: string[] = []
}

@ObjectType()
@InputType('IndicativeNumberInput')
export class IndicativeNumber {
  @Field(() => IndicativePerson, { nullable: true })
  singular: IndicativePerson = new IndicativePerson()

  @Field(() => IndicativePerson, { nullable: true })
  plural: IndicativePerson = new IndicativePerson()
}

@ObjectType()
@InputType('IndicativeTenseInput')
export class IndicativeTense {
  @Field(() => IndicativeNumber, { nullable: true })
  present: IndicativeNumber = new IndicativeNumber()

  @Field(() => IndicativeNumber, { nullable: true })
  imperfect: IndicativeNumber = new IndicativeNumber()

  @Field(() => IndicativeNumber, { nullable: true })
  future: IndicativeNumber = new IndicativeNumber()

  @Field(() => IndicativeNumber, { nullable: true })
  perfect: IndicativeNumber = new IndicativeNumber()

  @Field(() => IndicativeNumber, { nullable: true })
  pluperfect: IndicativeNumber = new IndicativeNumber()

  @Field(() => IndicativeNumber, { nullable: true })
  futurePerfect: IndicativeNumber = new IndicativeNumber()
}

@ObjectType()
@InputType('IndicativeInput')
export default class Indicative {
  @Field(() => IndicativeTense, { nullable: true })
  active: IndicativeTense = new IndicativeTense()

  @Field(() => IndicativeTense, { nullable: true })
  passive: IndicativeTense = new IndicativeTense()
}
