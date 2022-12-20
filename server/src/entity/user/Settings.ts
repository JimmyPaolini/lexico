import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('SettingsInput')
export default class Settings {
  @Field({ defaultValue: 'dark' })
  theme: 'dark' | 'light' = 'dark'

  @Field(() => Number, { defaultValue: 24 })
  fontSize = 24

  @Field(() => Boolean, { defaultValue: false })
  formsExpandedDefault = false

  @Field(() => Boolean, { defaultValue: false })
  translationsExpandedDefault = false

  @Field(() => Boolean, { defaultValue: true })
  dictionaryMacronized = true

  @Field(() => Boolean, { defaultValue: false })
  literatureMacronized = false
}
