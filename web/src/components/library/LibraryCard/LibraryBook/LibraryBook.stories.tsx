import { Paper } from '@mui/material'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { getAuthor } from 'src/utils/stories'

import { LibraryBook } from './LibraryBook'

export default {
  title: 'Cards/Library/Book',
  component: LibraryBook,
  decorators: [
    (Story) => (
      <Paper sx={{ width: '400px' }}>
        <Story />
      </Paper>
    ),
  ],
} as ComponentMeta<typeof LibraryBook>

export const DeBelloGallico: ComponentStory<typeof LibraryBook> = (
  args,
  { loaded }
) => <LibraryBook {...args} {...loaded} />
DeBelloGallico.loaders = [
  async () => {
    const author = await getAuthor('caesar')
    if (!author.books?.length) throw new Error("can't find book")
    return {
      book: author.books.find((book) => book.title === 'de bello gallico'),
    }
  },
]

export const CatullusCarmina: ComponentStory<typeof LibraryBook> = (
  args,
  { loaded }
) => <LibraryBook {...args} {...loaded} />
CatullusCarmina.loaders = [
  async () => {
    const author = await getAuthor('catullus')
    if (!author.books?.length) throw new Error("can't find book")
    return {
      book: author.books.find((book) => book.title === 'carmina 61-80'),
    }
  },
]
