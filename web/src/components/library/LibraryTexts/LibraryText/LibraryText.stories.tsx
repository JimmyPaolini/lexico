import { Paper } from '@mui/material'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { getAuthor } from 'src/utils/stories'

import { LibraryText } from './LibraryText'

export default {
  title: 'Cards/Library/Text',
  component: LibraryText,
  decorators: [
    (Story) => (
      <Paper>
        <Story />
      </Paper>
    ),
  ],
} as ComponentMeta<typeof LibraryText>

export const NumberdText: ComponentStory<typeof LibraryText> = (
  args,
  { loaded }
) => <LibraryText {...args} {...loaded} />
NumberdText.loaders = [
  async () => {
    const author = await getAuthor('catullus')
    return { text: author.texts[8] }
  },
]

export const LongNumberdText: ComponentStory<typeof LibraryText> = (
  args,
  { loaded }
) => <LibraryText {...args} {...loaded} />
LongNumberdText.loaders = [
  async () => {
    const author = await getAuthor('catullus')
    return { text: author.texts[84] }
  },
]

export const NamedText: ComponentStory<typeof LibraryText> = (
  args,
  { loaded }
) => <LibraryText {...args} {...loaded} />
NamedText.loaders = [
  async () => {
    const author = await getAuthor('caesar')
    return {
      text: author.texts.find((text) => text.title === 'de bello africo'),
    }
  },
]

export const LongNamedText: ComponentStory<typeof LibraryText> = (
  args,
  { loaded }
) => <LibraryText {...args} {...loaded} />
LongNamedText.loaders = [
  async () => {
    return {
      text: {
        id: '0',
        title: 'a very long title that should wrap around the line',
      },
    }
  },
]
