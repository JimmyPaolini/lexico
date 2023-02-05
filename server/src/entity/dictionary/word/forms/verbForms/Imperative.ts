import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('ImperativeSecondThirdInput')
export class ImperativeSecondThird {
  @Field(() => [String], { nullable: true })
  second: string[] = []

  @Field(() => [String], { nullable: true })
  third: string[] = []
}

@ObjectType()
@InputType('ImperativeSecondInput')
export class ImperativeSecond {
  @Field(() => [String], { nullable: true })
  second: string[]
}

@ObjectType()
@InputType('ImperativeThirdInput')
export class ImperativeThird {
  @Field(() => [String], { nullable: true })
  third: string[]
}

@ObjectType()
@InputType('ImperativePresentInput')
export class ImperativePresent {
  @Field(() => ImperativeSecond, { nullable: true })
  singular: ImperativeSecond = new ImperativeSecond()

  @Field(() => ImperativeSecond, { nullable: true })
  plural: ImperativeSecond = new ImperativeSecond()
}

@ObjectType()
@InputType('ImperativeActiveFutureInput')
export class ImperativeActiveFuture {
  @Field(() => ImperativeSecondThird, { nullable: true })
  singular: ImperativeSecondThird = new ImperativeSecondThird()

  @Field(() => ImperativeSecondThird, { nullable: true })
  plural: ImperativeSecondThird = new ImperativeSecondThird()
}

@ObjectType()
@InputType('ImperativePassiveFutureInput')
export class ImperativePassiveFuture {
  @Field(() => ImperativeSecondThird, { nullable: true })
  singular: ImperativeSecondThird = new ImperativeSecondThird()

  @Field(() => ImperativeThird, { nullable: true })
  plural: ImperativeThird = new ImperativeThird()
}

@ObjectType()
@InputType('ImperativeActiveInput')
export class ImperativeActive {
  @Field(() => ImperativePresent, { nullable: true })
  present: ImperativePresent = new ImperativePresent()

  @Field(() => ImperativeActiveFuture, { nullable: true })
  future: ImperativeActiveFuture = new ImperativeActiveFuture()
}

@ObjectType()
@InputType('ImperativePassiveInput')
export class ImperativePassive {
  @Field(() => ImperativePresent, { nullable: true })
  present: ImperativePresent = new ImperativePresent()

  @Field(() => ImperativePassiveFuture, { nullable: true })
  future: ImperativePassiveFuture = new ImperativePassiveFuture()
}

@ObjectType()
@InputType('ImperativeInput')
export default class Imperative {
  @Field(() => ImperativeActive, { nullable: true })
  active: ImperativeActive = new ImperativeActive()

  @Field(() => ImperativePassive, { nullable: true })
  passive: ImperativePassive = new ImperativePassive()
}
