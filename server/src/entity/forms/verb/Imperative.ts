import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class ImperativeSecondThird {
  @Field(() => [String])
  second: string[]

  @Field(() => [String])
  third: string[]
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
  singular: ImperativeSecond

  @Field(() => ImperativeSecond)
  plural: ImperativeSecond
}

@ObjectType()
export class ImperativeActiveFuture {
  @Field(() => ImperativeSecondThird)
  singular: ImperativeSecondThird

  @Field(() => ImperativeSecondThird)
  plural: ImperativeSecondThird
}

@ObjectType()
export class ImperativeActive {
  @Field(() => ImperativePresent)
  present: ImperativePresent

  @Field(() => ImperativeActiveFuture)
  future: ImperativeActiveFuture
}

@ObjectType()
export class ImperativePassiveFuture {
  @Field(() => ImperativeSecondThird)
  singular: ImperativeSecondThird

  @Field(() => ImperativeThird)
  plural: ImperativeThird
}

@ObjectType()
export class ImperativePassive {
  @Field(() => ImperativePresent)
  present: ImperativePresent

  @Field(() => ImperativePassiveFuture)
  future: ImperativePassiveFuture
}

@ObjectType()
export default class Imperative {
  @Field(() => ImperativeActive)
  active: ImperativeActive

  @Field(() => ImperativePassive)
  passive: ImperativePassive
}
