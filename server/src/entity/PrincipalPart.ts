import { Field, ObjectType } from "type-graphql"

@ObjectType()
export default class PrincipalPart {
  @Field()
  name: string

  @Field()
  text: string
}
