import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class Gerund {
  @Field(() => [String])
  genitive: string[] = []

  @Field(() => [String])
  dative: string[] = []

  @Field(() => [String])
  accusative: string[] = []

  @Field(() => [String])
  ablative: string[] = []
}

@ObjectType()
export class Supine {
  @Field(() => [String])
  accusative: string[] = []

  @Field(() => [String])
  ablative: string[] = []
}

@ObjectType()
export default class VerbalNoun {
  @Field(() => Gerund)
  gerund: Gerund = new Gerund()

  @Field(() => Supine)
  supine: Supine = new Supine()
}
