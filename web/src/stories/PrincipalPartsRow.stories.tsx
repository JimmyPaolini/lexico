import { ComponentMeta, ComponentStory } from "@storybook/react"
import PrincipalPartsRow from "../components/entry/PrincipalPartsRow/PrincipalPartsRow"
import { searchEntry } from "../utils/stories"

export default {
  title: "Cards/PrincipalPartsRow",
  component: PrincipalPartsRow,
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
