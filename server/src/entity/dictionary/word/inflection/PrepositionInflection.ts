import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class PrepositionInflection {
  @Field(() => String)
  case: PrepositionCase = 'accusative'

  @Field()
  other?: string = ''

  constructor(prepositionCase: PrepositionCase = 'accusative', other = '') {
    this.case = prepositionCase
    this.other = other
  }
}

export type PrepositionCase = 'accusative' | 'ablative'
export const prepositionCaseRegex = /(accusative)|(ablative)/
