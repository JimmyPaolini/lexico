import { ComponentMeta, ComponentStory } from '@storybook/react'

import AdjectiveForms from 'src/components/entry/FormsRow/PartsOfSpeech/AdjectiveFormsTable'
import theme from 'src/theme'
import { searchEntry } from 'src/utils/stories'

export default {
  title: 'Cards/EntryCard/FormsRow/PartsOfSpeech/AdjectiveForms',
  component: AdjectiveForms,
  decorators: [
    (Story) => (
      <div
        style={{ width: theme.custom.card.maxWidth, border: '1px solid white' }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof AdjectiveForms>

export const Default: ComponentStory<typeof AdjectiveForms> & {
  loaders: any[]
} = (args, { loaded }) => <AdjectiveForms {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { forms } = await searchEntry('amoenus')
    return { forms }
  },
]
