import { ComponentMeta, ComponentStory } from '@storybook/react'

import { getEntry } from 'src/utils/stories'

import { Entry } from './Entry'

export default {
  title: 'Cards/Entry',
  component: Entry,
} as ComponentMeta<typeof Entry>

export const Verb: ComponentStory<typeof Entry> = (args, { loaded }) => (
  <Entry {...args} {...loaded} />
)
Verb.args = { search: 'amo:0' }
Verb.loaders = [
  async () => {
    const entry = await getEntry('amo:0')
    return { entry }
  },
]

export const Adjective: ComponentStory<typeof Entry> = (args, { loaded }) => (
  <Entry {...args} {...loaded} />
)
Adjective.args = { search: 'amoeni' }
Adjective.loaders = [
  async () => {
    const entry = await getEntry('amoenus:0')
    return { entry }
  },
]

export const Noun: ComponentStory<typeof Entry> = (args, { loaded }) => (
  <Entry {...args} {...loaded} />
)
Noun.args = { search: 'pax' }
Noun.loaders = [
  async () => {
    const entry = await getEntry('pax:1')
    return { entry }
  },
]
