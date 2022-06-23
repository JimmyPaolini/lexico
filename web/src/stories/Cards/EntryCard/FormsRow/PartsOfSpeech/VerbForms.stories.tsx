import { ComponentMeta, ComponentStory } from '@storybook/react'

import VerbForms from 'src/components/entry/FormsRow/PartsOfSpeech/VerbFormsTable'
import theme from 'src/theme'
import { searchEntry } from 'src/utils/stories'

export default {
  title: 'Cards/EntryCard/FormsRow/PartsOfSpeech/VerbForms',
  component: VerbForms,
  decorators: [
    (Story) => (
      <div style={{ width: theme.custom.cardWidth, border: '1px solid white' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof VerbForms>

export const Default: ComponentStory<typeof VerbForms> & {
  loaders: any[]
} = (args, { loaded }) => <VerbForms {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { forms } = await searchEntry('amat')
    return { forms }
  },
]
