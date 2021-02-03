import { Field, InputType, ObjectType } from "type-graphql"

@ObjectType()
export default class Settings {
  @Field({ defaultValue: "dark" })
  theme: "dark" | "light" = "dark"

  @Field({ defaultValue: 12 })
  fontSize: number = 12

  @Field({ defaultValue: false })
  defaultFormsRowOpen: boolean = false

  @Field({ defaultValue: false })
  defaultTranslationsRowOpen: boolean = false

  @Field({ defaultValue: true })
  macronizeDictionary: boolean = true

  @Field({ defaultValue: false })
  macronizeLiterature: boolean = false
}

@InputType()
export class SettingsInput implements Partial<Settings> {
  @Field({ defaultValue: "dark" })
  theme: "dark" | "light" = "dark"

  @Field({ defaultValue: 12 })
  fontSize: number = 12

  @Field({ defaultValue: false })
  defaultFormsRowOpen: boolean = false

  @Field({ defaultValue: false })
  defaultTranslationsRowOpen: boolean = false

  @Field({ defaultValue: true })
  macronizeDictionary: boolean = true

  @Field({ defaultValue: false })
  macronizeLiterature: boolean = false
}
