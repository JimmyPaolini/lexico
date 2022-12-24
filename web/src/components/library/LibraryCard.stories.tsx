import { ComponentMeta, ComponentStory } from '@storybook/react'

import { getAuthor } from 'src/utils/stories'

import { LibraryCard } from './LibraryCard'

export default {
  title: 'Cards/LibraryCard',
  component: LibraryCard,
} as ComponentMeta<typeof LibraryCard>

export const Caesar: ComponentStory<typeof LibraryCard> = (
  args,
  { loaded }
) => <LibraryCard {...args} {...loaded} />
Caesar.loaders = [
  async () => {
    const author = await getAuthor('caesar')
    return { author }
  },
]

export const Catullus: ComponentStory<typeof LibraryCard> = (
  args,
  { loaded }
) => <LibraryCard {...args} {...loaded} />
Catullus.loaders = [
  async () => {
    const author = await getAuthor('catullus')
    return { author }
  },
]

export const VulgateOld: ComponentStory<typeof LibraryCard> = (
  args,
  { loaded }
) => <LibraryCard {...args} {...loaded} />
VulgateOld.loaders = [
  async () => {
    const author = await getAuthor('vulgate bible old testament')
    return { author }
  },
]
