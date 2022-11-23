import { ComponentMeta, ComponentStory } from '@storybook/react'

import EntryCard from 'src/components/entry/EntryCard'
import { searchEntry } from 'src/utils/stories'

export default {
  title: 'Cards/EntryCard',
  component: EntryCard,
} as ComponentMeta<typeof EntryCard>

export const Verb: ComponentStory<typeof EntryCard> & { loaders: any[] } = (
  args,
  { loaded },
) => <EntryCard {...args} {...loaded} />
Verb.args = { searched: 'amat' }
Verb.loaders = [
  async () => {
    const entry = await searchEntry('amat')
    return { entry }
  },
]

export const Adjective: ComponentStory<typeof EntryCard> & { loaders: any[] } =
  (args, { loaded }) => <EntryCard {...args} {...loaded} />
Adjective.args = { searched: 'amoeni' }
Adjective.loaders = [
  async () => {
    const entry = await searchEntry('amoenus')
    return { entry }
  },
]

export const Noun: ComponentStory<typeof EntryCard> & { loaders: any[] } = (
  args,
  { loaded },
) => <EntryCard {...args} {...loaded} />
Noun.args = { searched: 'pater' }
Noun.loaders = [
  async () => {
    const entry = await searchEntry('pater')
    return { entry }
  },
]
