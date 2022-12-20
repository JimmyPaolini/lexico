import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class NounInflection {
  @Field(() => String)
  declension: NounDeclension = ''

  @Field(() => String)
  gender: NounGender = ''

  @Field()
  other?: string = ''

  constructor(
    declension: NounDeclension = '',
    gender: NounGender = '',
    other = '',
  ) {
    this.declension = declension
    this.gender = gender
    this.other = other
  }
}

export type NounDeclension =
  | 'first'
  | 'second'
  | 'third'
  | 'fourth'
  | 'fifth'
  | ''
export const nounDeclensionRegex = /(first)|(second)|(third)|(fourth)|(fifth)/
export type NounGender = 'masculine' | 'feminine' | 'masc/fem' | 'neuter' | ''
export const genderRegex = /(masculine)|(feminine)|(neuter)/
