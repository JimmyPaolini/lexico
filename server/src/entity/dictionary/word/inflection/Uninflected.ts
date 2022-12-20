import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class Uninflected {
  @Field(() => String)
  other = 'uninflected'
}
