import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class ImperativeSecondThird {
  @Field(() => [String])
  second: string[] = []

  @Field(() => [String])
  third: string[] = []
}

@ObjectType()
export class ImperativeSecond {
  @Field(() => [String])
  second: string[]
}

@ObjectType()
export class ImperativeThird {
  @Field(() => [String])
  third: string[]
}

@ObjectType()
export class ImperativePresent {
  @Field(() => ImperativeSecond)
  singular: ImperativeSecond = new ImperativeSecond()

  @Field(() => ImperativeSecond)
  plural: ImperativeSecond = new ImperativeSecond()
}

@ObjectType()
export class ImperativeActiveFuture {
  @Field(() => ImperativeSecondThird)
  singular: ImperativeSecondThird = new ImperativeSecondThird()

  @Field(() => ImperativeSecondThird)
  plural: ImperativeSecondThird = new ImperativeSecondThird()
}

@ObjectType()
export class ImperativePassiveFuture {
  @Field(() => ImperativeSecondThird)
  singular: ImperativeSecondThird = new ImperativeSecondThird()

  @Field(() => ImperativeThird)
  plural: ImperativeThird = new ImperativeThird()
}

@ObjectType()
export class ImperativeActive {
  @Field(() => ImperativePresent)
  present: ImperativePresent = new ImperativePresent()

  @Field(() => ImperativeActiveFuture)
  future: ImperativeActiveFuture = new ImperativeActiveFuture()
}

@ObjectType()
export class ImperativePassive {
  @Field(() => ImperativePresent)
  present: ImperativePresent = new ImperativePresent()

  @Field(() => ImperativePassiveFuture)
  future: ImperativePassiveFuture = new ImperativePassiveFuture()
}

@ObjectType()
export default class Imperative {
  @Field(() => ImperativeActive)
  active: ImperativeActive = new ImperativeActive()

  @Field(() => ImperativePassive)
  passive: ImperativePassive = new ImperativePassive()
}
