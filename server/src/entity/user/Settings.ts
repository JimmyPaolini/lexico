import { Field, ObjectType } from "type-graphql"

@ObjectType()
export default class Settings {
  @Field()
  theme: "dark" | "light" = "dark"

  @Field()
  fontSize: number = 12

  @Field()
  defaultFormsRowOpen: boolean = false

  @Field()
  defaultTranslationsRowOpen: boolean = false

  @Field()
  macronizeDictionary: boolean = true

  @Field()
  macronizeLiterature: boolean = false
}
