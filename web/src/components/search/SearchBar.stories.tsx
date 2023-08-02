import { useState } from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SearchBar } from 'src/components/search/SearchBar'

export default {
  title: 'SearchBar',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>

const Template: ComponentStory<typeof SearchBar> = (args) => {
  const [search, setSearch] = useState<string>('')
  const [isLatin, setLatin] = useState<boolean>(false)
  return <SearchBar {...{ ...args, search, setSearch, isLatin, setLatin }} />
}

export const Default = Template.bind({})
Default.args = {
  isLoading: false,
  placeholder: 'Search Lexico',
  handleSearch: () => null,
}
