import { ComponentMeta, ComponentStory } from "@storybook/react"
import PrincipalPartsRow from "src/components/entry/PrincipalPartsRow/PrincipalPartsRow"
import { searchEntry } from "src/utils/stories"
import theme from "src/theme"

export default {
  title: "Cards/EntryCard/PrincipalPartsRow",
  component: PrincipalPartsRow,
  decorators: [
    (Story) => (
      <div style={{ width: theme.custom.cardWidth, border: "1px solid white" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof PrincipalPartsRow>

export const Amat: ComponentStory<typeof PrincipalPartsRow> & {
  loaders: any[]
} = (args, { loaded }) => <PrincipalPartsRow {...args} {...loaded} />
Amat.loaders = [
  async () => {
    const { id, partOfSpeech, principalParts, inflection, bookmarked } =
      await searchEntry("amat")
    return { id, partOfSpeech, principalParts, inflection, bookmarked }
  },
]