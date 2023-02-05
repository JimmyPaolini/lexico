import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('PrincipalPartInput')
export default class PrincipalPart {
  @Field(() => String)
  name = ''

  @Field(() => [String])
  text: string[] = []
}
