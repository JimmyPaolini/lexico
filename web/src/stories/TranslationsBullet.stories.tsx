import { ComponentMeta, ComponentStory } from "@storybook/react"
import TranslationBullet from "../components/entry/TranslationsRow/TranslationBullet"
import theme from "../theme"
import { searchEntry } from "../utils/stories"

export default {
  title: "Cards/TranslationsRow/TranslationBullet",
  component: TranslationBullet,
  decorators: [
    (Story) => (
      <div style={{ width: theme.custom.cardWidth, border: "1px solid white" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TranslationBullet>

export const Amat: ComponentStory<typeof TranslationBullet> & {
  loaders: any[]
} = (args, { loaded }) => <TranslationBullet {...args} {...loaded} />
Amat.loaders = [
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
