import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('NonFinitePresentPerfectFutureInput')
export class NonFinitePresentPerfectFuture {
  @Field(() => [String], { nullable: true })
  present: string[] = []

  @Field(() => [String], { nullable: true })
  perfect: string[] = []

  @Field(() => [String], { nullable: true })
  future: string[] = []
}

@ObjectType()
@InputType('NonFinitePresentFutureInput')
export class NonFinitePresentFuture {
  @Field(() => [String], { nullable: true })
  present: string[] = []

  @Field(() => [String], { nullable: true })
  future: string[] = []
}

@ObjectType()
@InputType('NonFinitePerfectFutureInput')
export class NonFinitePerfectFuture {
  @Field(() => [String], { nullable: true })
  perfect: string[] = []

  @Field(() => [String], { nullable: true })
  future: string[] = []
}

@ObjectType()
@InputType('NonFiniteInfinitiveInput')
export class NonFiniteInfinitive {
  @Field(() => NonFinitePresentPerfectFuture, { nullable: true })
  active: NonFinitePresentPerfectFuture = new NonFinitePresentPerfectFuture()

  @Field(() => NonFinitePresentPerfectFuture, { nullable: true })
  passive: NonFinitePresentPerfectFuture = new NonFinitePresentPerfectFuture()
}

@ObjectType()
@InputType('NonFiniteParticipleInput')
export class NonFiniteParticiple {
  @Field(() => NonFinitePresentFuture, { nullable: true })
  active: NonFinitePresentFuture = new NonFinitePresentFuture()

  @Field(() => NonFinitePerfectFuture, { nullable: true })
  passive: NonFinitePerfectFuture = new NonFinitePerfectFuture()
}

@ObjectType()
@InputType('NonFiniteInput')
export default class NonFinite {
  @Field(() => NonFiniteInfinitive, { nullable: true })
  infinitive: NonFiniteInfinitive = new NonFiniteInfinitive()

  @Field(() => NonFiniteParticiple, { nullable: true })
  participle: NonFiniteParticiple = new NonFiniteParticiple()
}
