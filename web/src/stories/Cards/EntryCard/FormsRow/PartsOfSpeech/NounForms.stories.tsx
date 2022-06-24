import { ComponentMeta, ComponentStory } from '@storybook/react'

import NounForms from 'src/components/entry/FormsRow/PartsOfSpeech/NounFormsTable'
import theme from 'src/theme'
import { searchEntry } from 'src/utils/stories'

export default {
  title: 'Cards/EntryCard/FormsRow/PartsOfSpeech/NounForms',
  component: NounForms,
  decorators: [
    (Story) => (
      <div
        style={{ width: theme.custom.card.maxWidth, border: '1px solid white' }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof NounForms>

export const Default: ComponentStory<typeof NounForms> & {
  loaders: any[]
} = (args, { loaded }) => <NounForms {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { forms } = await searchEntry('hortus')
    return { forms }
  },
]
