import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class NonFinitePresentPerfectFuture {
  @Field(() => [String], { nullable: true })
  present: string[] = []

  @Field(() => [String], { nullable: true })
  perfect: string[] = []

  @Field(() => [String], { nullable: true })
  future: string[] = []
}

@ObjectType()
export class NonFinitePresentFuture {
  @Field(() => [String], { nullable: true })
  present: string[] = []

  @Field(() => [String], { nullable: true })
  future: string[] = []
}

@ObjectType()
export class NonFinitePerfectFuture {
  @Field(() => [String], { nullable: true })
  perfect: string[] = []

  @Field(() => [String], { nullable: true })
  future: string[] = []
}

@ObjectType()
export class NonFiniteInfinitive {
  @Field(() => NonFinitePresentPerfectFuture, { nullable: true })
  active: NonFinitePresentPerfectFuture = new NonFinitePresentPerfectFuture()

  @Field(() => NonFinitePresentPerfectFuture, { nullable: true })
  passive: NonFinitePresentPerfectFuture = new NonFinitePresentPerfectFuture()
}

@ObjectType()
export class NonFiniteParticiple {
  @Field(() => NonFinitePresentFuture, { nullable: true })
  active: NonFinitePresentFuture = new NonFinitePresentFuture()

  @Field(() => NonFinitePerfectFuture, { nullable: true })
  passive: NonFinitePerfectFuture = new NonFinitePerfectFuture()
}

@ObjectType()
export default class NonFinite {
  @Field(() => NonFiniteInfinitive, { nullable: true })
  infinitive: NonFiniteInfinitive = new NonFiniteInfinitive()

  @Field(() => NonFiniteParticiple, { nullable: true })
  participle: NonFiniteParticiple = new NonFiniteParticiple()
}
