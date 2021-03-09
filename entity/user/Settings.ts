import { Field, InputType, ObjectType } from "type-graphql"

@ObjectType()
export default class Settings {
  @Field({ defaultValue: "dark" })
  theme: "dark" | "light" = "dark"

  @Field({ defaultValue: 12 })
  fontSize: number = 12

  @Field({ defaultValue: false })
  formsExpandedByDefault: boolean = false

  @Field({ defaultValue: false })
  translationsExpandedByDefault: boolean = false

  @Field({ defaultValue: true })
  dictionaryMacronized: boolean = true

  @Field({ defaultValue: false })
  literatureMacronized: boolean = false
}

@InputType()
export class SettingsInput implements Partial<Settings> {
  @Field({ defaultValue: "dark" })
  theme: "dark" | "light" = "dark"

  @Field({ defaultValue: 12 })
  fontSize: number = 12

  @Field({ defaultValue: false })
  formsExpandedByDefault: boolean = false

  @Field({ defaultValue: false })
  translationsExpandedByDefault: boolean = false

  @Field({ defaultValue: true })
  dictionaryMacronized: boolean = true

  @Field({ defaultValue: false })
  literatureMacronized: boolean = false
}
