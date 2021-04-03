import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class ImperativeSecondThird {
  @Field(() => [String], { nullable: true })
  second: string[] = []

  @Field(() => [String], { nullable: true })
  third: string[] = []
}

@ObjectType()
export class ImperativeSecond {
  @Field(() => [String], { nullable: true })
  second: string[]
}

@ObjectType()
export class ImperativeThird {
  @Field(() => [String], { nullable: true })
  third: string[]
}

@ObjectType()
export class ImperativePresent {
  @Field(() => ImperativeSecond, { nullable: true })
  singular: ImperativeSecond = new ImperativeSecond()

  @Field(() => ImperativeSecond, { nullable: true })
  plural: ImperativeSecond = new ImperativeSecond()
}

@ObjectType()
export class ImperativeActiveFuture {
  @Field(() => ImperativeSecondThird, { nullable: true })
  singular: ImperativeSecondThird = new ImperativeSecondThird()

  @Field(() => ImperativeSecondThird, { nullable: true })
  plural: ImperativeSecondThird = new ImperativeSecondThird()
}

@ObjectType()
export class ImperativePassiveFuture {
  @Field(() => ImperativeSecondThird, { nullable: true })
  singular: ImperativeSecondThird = new ImperativeSecondThird()

  @Field(() => ImperativeThird, { nullable: true })
  plural: ImperativeThird = new ImperativeThird()
}

@ObjectType()
export class ImperativeActive {
  @Field(() => ImperativePresent, { nullable: true })
  present: ImperativePresent = new ImperativePresent()

  @Field(() => ImperativeActiveFuture, { nullable: true })
  future: ImperativeActiveFuture = new ImperativeActiveFuture()
}

@ObjectType()
export class ImperativePassive {
  @Field(() => ImperativePresent, { nullable: true })
  present: ImperativePresent = new ImperativePresent()

  @Field(() => ImperativePassiveFuture, { nullable: true })
  future: ImperativePassiveFuture = new ImperativePassiveFuture()
}

@ObjectType()
export default class Imperative {
  @Field(() => ImperativeActive, { nullable: true })
  active: ImperativeActive = new ImperativeActive()

  @Field(() => ImperativePassive, { nullable: true })
  passive: ImperativePassive = new ImperativePassive()
}
