import { Field, InputType, ObjectType } from "type-graphql"

@ObjectType()
export default class Settings {
  @Field({ defaultValue: "dark" })
  theme: "dark" | "light" = "dark"

  @Field({ defaultValue: 24 })
  fontSize: number = 24

  @Field({ defaultValue: false })
  formsExpandedDefault: boolean = false

  @Field({ defaultValue: false })
  translationsExpandedDefault: boolean = false

  @Field({ defaultValue: true })
  dictionaryMacronized: boolean = true

  @Field({ defaultValue: false })
  literatureMacronized: boolean = false
}

@InputType()
export class SettingsInput implements Partial<Settings> {
  @Field({ defaultValue: "dark" })
  theme: "dark" | "light" = "dark"

  @Field({ defaultValue: 24 })
  fontSize: number = 24

  @Field({ defaultValue: false })
  formsExpandedDefault: boolean = false

  @Field({ defaultValue: false })
  translationsExpandedDefault: boolean = false

  @Field({ defaultValue: true })
  dictionaryMacronized: boolean = true

  @Field({ defaultValue: false })
  literatureMacronized: boolean = false
}
