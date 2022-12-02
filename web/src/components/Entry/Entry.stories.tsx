import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Entry } from 'src/components/Entry/Entry'
import { searchEntry } from 'src/utils/stories'

export default {
  title: 'Cards/Entry',
  component: Entry,
} as ComponentMeta<typeof Entry>

export const Verb: ComponentStory<typeof Entry> & { loaders: any[] } = (
  args,
  { loaded },
) => <Entry {...args} {...loaded} />
Verb.args = { searched: 'amat' }
Verb.loaders = [
  async () => {
    const entry = await searchEntry('amat')
    return { entry }
  },
]

export const Adjective: ComponentStory<typeof Entry> & { loaders: any[] } = (
  args,
  { loaded },
) => <Entry {...args} {...loaded} />
Adjective.args = { searched: 'amoeni' }
Adjective.loaders = [
  async () => {
    const entry = await searchEntry('amoenus')
    return { entry }
  },
]

export const Noun: ComponentStory<typeof Entry> & { loaders: any[] } = (
  args,
  { loaded },
) => <Entry {...args} {...loaded} />
Noun.args = { searched: 'pater' }
Noun.loaders = [
  async () => {
    const entry = await searchEntry('pater')
    return { entry }
  },
]
