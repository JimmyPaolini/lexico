import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('GerundInput')
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
@InputType('SupineInput')
export class Supine {
  @Field(() => [String], { nullable: true })
  accusative: string[] = []

  @Field(() => [String], { nullable: true })
  ablative: string[] = []
}

@ObjectType()
@InputType('VerbalNounInput')
export default class VerbalNoun {
  @Field(() => Gerund, { nullable: true })
  gerund: Gerund = new Gerund()

  @Field(() => Supine, { nullable: true })
  supine: Supine = new Supine()
}
