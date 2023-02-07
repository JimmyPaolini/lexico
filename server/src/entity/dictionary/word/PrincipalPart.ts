import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class PrincipalPart {
  @Field(() => String)
  name = ''

  @Field(() => [String])
  text: string[] = []
}
