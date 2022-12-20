import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Gerund {
  @Field(() => [String], { nullable: true })
  genitive: string[] = []

  @Field(() => [String], { nullable: true })
  dative: string[] = []

  @Field(() => [String], { nullable: true })
  accusative: string[] = []

  @Field(() => [String], { nullable: true })
  ablative: string[] = []
}

@ObjectType()
export class Supine {
  @Field(() => [String], { nullable: true })
  accusative: string[] = []

  @Field(() => [String], { nullable: true })
  ablative: string[] = []
}

@ObjectType()
export default class VerbalNoun {
  @Field(() => Gerund, { nullable: true })
  gerund: Gerund = new Gerund()

  @Field(() => Supine, { nullable: true })
  supine: Supine = new Supine()
}
