import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('UninflectedInput')
export default class Uninflected {
  @Field(() => String)
  other = 'uninflected'
}
