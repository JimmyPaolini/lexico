import { ComponentMeta, ComponentStory } from "@storybook/react"
import TranslationBullet from "src/components/entry/TranslationsRow/TranslationBullet"
import theme from "src/theme"
import { searchEntry } from "src/utils/stories"

export default {
  title: "Cards/EntryCard/TranslationsRow/TranslationBullet",
  component: TranslationBullet,
  decorators: [
    (Story) => (
      <div style={{ width: theme.custom.cardWidth, border: "1px solid white" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TranslationBullet>

export const Default: ComponentStory<typeof TranslationBullet> & {
  loaders: any[]
} = (args, { loaded }) => <TranslationBullet {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { translations } = await searchEntry("amat")
    return { translation: translations![0] }
  },
]

export const TwoLines: ComponentStory<typeof TranslationBullet> & {
  loaders: any[]
} = (args, { loaded }) => <TranslationBullet {...args} {...loaded} />
TwoLines.loaders = [
  async () => {
    const { translations } = await searchEntry("amat")
    return { translation: translations![2] }
  },
]
