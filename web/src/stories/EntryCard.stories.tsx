import { ComponentMeta, ComponentStory } from "@storybook/react"
import { print } from "graphql"
import { rawRequest } from "graphql-request"
import EntryCard from "../components/EntryCard/EntryCard"
import searchLatinQuery from "../graphql/search/searchLatin.graphql"

export default {
  title: "EntryCard",
  component: EntryCard,
} as ComponentMeta<typeof EntryCard>

export const Amo: ComponentStory<typeof EntryCard> & { loaders: any[] } = (
  args,
  { loaded },
) => <EntryCard {...args} {...loaded} />
Amo.args = {
  searched: "amat",
}
Amo.loaders = [
  async () => ({
    entry: (
      await rawRequest(
        "http://localhost:3001/graphql",
        print(searchLatinQuery),
        {
          search: Amo.args?.searched,
        },
      )
    ).data.searchLatin[0],
  }),
]
