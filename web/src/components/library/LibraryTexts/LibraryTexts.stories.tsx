import { Paper } from '@mui/material'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { getAuthor } from 'src/utils/stories'

import { LibraryTexts } from './LibraryTexts'

export default {
  title: 'Cards/Library/Texts',
  component: LibraryTexts,
  decorators: [
    (Story) => (
      <Paper sx={{ width: '400px' }}>
        <Story />
      </Paper>
    ),
  ],
} as ComponentMeta<typeof LibraryTexts>

export const NumberdTexts: ComponentStory<typeof LibraryTexts> = (
  args,
  { loaded }
) => <LibraryTexts {...args} {...loaded} />
NumberdTexts.loaders = [
  async () => {
    const author = await getAuthor('caesar')
    return { texts: author.texts.filter((text) => text.title.match(/\d+/)) }
  },
]

export const NamedTexts: ComponentStory<typeof LibraryTexts> = (
  args,
  { loaded }
) => <LibraryTexts {...args} {...loaded} />
NamedTexts.loaders = [
  async () => {
    const author = await getAuthor('caesar')
    return { texts: author.texts.filter((text) => !text.title.match(/\d+/)) }
  },
]
