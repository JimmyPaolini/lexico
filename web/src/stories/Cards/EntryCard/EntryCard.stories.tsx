import { ComponentMeta, ComponentStory } from "@storybook/react"
import EntryCard from "src/components/entry/EntryCard"
import { searchEntry } from "src/utils/stories"

export default {
  title: "Cards/EntryCard",
  component: EntryCard,
} as ComponentMeta<typeof EntryCard>

export const Amat: ComponentStory<typeof EntryCard> & { loaders: any[] } = (
  args,
  { loaded },
) => <EntryCard {...args} {...loaded} />
Amat.args = {
  searched: "amat",
}
Amat.loaders = [
  async () => {
    const entry = await searchEntry("amat")
    return { entry }
  },
]
