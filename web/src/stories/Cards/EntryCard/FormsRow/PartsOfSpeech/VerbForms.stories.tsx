import { ComponentMeta, ComponentStory } from "@storybook/react"
import theme from "src/theme"
import { searchEntry } from "src/utils/stories"
import VerbForms from "src/components/entry/FormsRow/PartsOfSpeech/VerbFormsTable"

export default {
  title: "Cards/EntryCard/FormsRow/PartsOfSpeech/VerbForms",
  component: VerbForms,
  decorators: [
    (Story) => (
      <div style={{ width: theme.custom.cardWidth, border: "1px solid white" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof VerbForms>

export const Default: ComponentStory<typeof VerbForms> & {
  loaders: any[]
} = (args, { loaded }) => <VerbForms {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { forms } = await searchEntry("amat")
    return { forms }
  },
]
