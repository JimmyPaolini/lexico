import { Field, ObjectType } from "type-graphql"

@ObjectType()
export default class NounInflection {
  @Field(() => String)
  declension: NounDeclension = ""

  @Field(() => String)
  gender: NounGender = ""

  @Field()
  other?: string = ""

  constructor(
    declension: NounDeclension = "",
    gender: NounGender = "",
    other = "",
  ) {
    this.declension = declension
    this.gender = gender
    this.other = other
  }
}

export type NounDeclension =
  | "first"
  | "second"
  | "third"
  | "fourth"
  | "fifth"
  | ""
export const nounDeclensionRegex = new RegExp(
  /(first)|(second)|(third)|(fourth)|(fifth)/,
)
export type NounGender = "masculine" | "feminine" | "neuter" | ""
export const genderRegex = new RegExp(/(masculine)|(feminine)|(neuter)/)
