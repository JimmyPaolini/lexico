import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AdjectiveFormsTable } from 'src/components/Entry/Forms/PartsOfSpeech/AdjectiveFormsTable'
import { theme } from 'src/theme'
import { searchEntry } from 'src/utils/stories'

export default {
  title: 'Cards/Entry/Forms/PartsOfSpeech/AdjectiveFormsTable',
  component: AdjectiveFormsTable,
  decorators: [
    (Story) => (
      <div
        style={{ width: theme.custom.card.maxWidth, border: '1px solid white' }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof AdjectiveFormsTable>

export const Default: ComponentStory<typeof AdjectiveFormsTable> = (
  args,
  { loaded }
) => <AdjectiveFormsTable {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { forms } = await searchEntry('amoenus')
    return { forms }
  },
]
