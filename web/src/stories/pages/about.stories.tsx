import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import SearchBar from "src/components/search/SearchBar"

export default {
  title: "SearchBar",
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>


export const Default: ComponentStory<typeof SearchBar> = (args) => {
  return <SearchBar {...{ ...args, search, setSearch, isLatin, setLatin }} />
}
Default.args = {
  isLoading: false,
  target: "lexico",
  handleSearchExecute: () => null,
}
