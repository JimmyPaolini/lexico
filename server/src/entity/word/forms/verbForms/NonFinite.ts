import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class NonFinitePresentPerfectFuture {
  @Field(() => [String])
  present: string[] = []

  @Field(() => [String])
  perfect: string[] = []

  @Field(() => [String])
  future: string[] = []
}

@ObjectType()
export class NonFinitePresentFuture {
  @Field(() => [String])
  present: string[] = []

  @Field(() => [String])
  future: string[] = []
}

@ObjectType()
export class NonFinitePerfectFuture {
  @Field(() => [String])
  perfect: string[] = []

  @Field(() => [String])
  future: string[] = []
}

@ObjectType()
export class NonFiniteInfinitive {
  @Field(() => NonFinitePresentPerfectFuture)
  active: NonFinitePresentPerfectFuture = new NonFinitePresentPerfectFuture()

  @Field(() => NonFinitePresentPerfectFuture)
  passive: NonFinitePresentPerfectFuture = new NonFinitePresentPerfectFuture()
}

@ObjectType()
export class NonFiniteParticiple {
  @Field()
  active: NonFinitePresentFuture = new NonFinitePresentFuture()

  @Field()
  passive: NonFinitePerfectFuture = new NonFinitePerfectFuture()
}

@ObjectType()
export default class NonFinite {
  @Field(() => NonFiniteInfinitive)
  infinitive: NonFiniteInfinitive = new NonFiniteInfinitive()

  @Field(() => NonFiniteParticiple)
  participle: NonFiniteParticiple = new NonFiniteParticiple()
}
