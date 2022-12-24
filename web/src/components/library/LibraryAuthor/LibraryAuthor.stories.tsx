import { Paper } from '@mui/material'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { getAuthor } from 'src/utils/stories'

import { LibraryAuthor } from './LibraryAuthor'

export default {
  title: 'Cards/Library/Author',
  component: LibraryAuthor,
  decorators: [
    (Story) => (
      <Paper sx={{ width: '400px' }}>
        <Story />
      </Paper>
    ),
  ],
  args: { expanded: false },
} as ComponentMeta<typeof LibraryAuthor>

export const Caesar: ComponentStory<typeof LibraryAuthor> = (
  args,
  { loaded }
) => <LibraryAuthor {...args} {...loaded} />
Caesar.loaders = [
  async () => {
    const author = await getAuthor('caesar')
    return { author }
  },
]

export const Catullus: ComponentStory<typeof LibraryAuthor> = (
  args,
  { loaded }
) => <LibraryAuthor {...args} {...loaded} />
Catullus.loaders = [
  async () => {
    const author = await getAuthor('catullus')
    return { author }
  },
]

export const Cicero: ComponentStory<typeof LibraryAuthor> = (
  args,
  { loaded }
) => <LibraryAuthor {...args} {...loaded} />
Cicero.loaders = [
  async () => {
    const author = await getAuthor('cicero')
    return { author }
  },
]
