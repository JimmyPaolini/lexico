import { ComponentMeta, ComponentStory } from "@storybook/react"
import SearchBar from "../components/SearchBar/SearchBar"

export default {
  title: "SearchBar",
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>

const Template: ComponentStory<typeof SearchBar> = (args) => {
  return <SearchBar {...{ ...args }} />
}

export const Default = Template.bind({})
Default.args = {}
