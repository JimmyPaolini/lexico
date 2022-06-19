import { ComponentMeta, ComponentStory } from "@storybook/react"
import TranslationsRow from "../components/entry/TranslationsRow/TranslationsRow"
import theme from "../theme"
import { searchEntry } from "../utils/stories"

export default {
  title: "Cards/TranslationsRow",
  component: TranslationsRow,
  decorators: [
    (Story) => (
      <div style={{ width: theme.custom.cardWidth, border: "1px solid white" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TranslationsRow>

export const Amat: ComponentStory<typeof TranslationsRow> & {
  loaders: any[]
} = (args, { loaded }) => <TranslationsRow {...args} {...loaded} />
Amat.loaders = [
  async () => {
    const { translations } = await searchEntry("amat")
    return { translations }
  },
]
