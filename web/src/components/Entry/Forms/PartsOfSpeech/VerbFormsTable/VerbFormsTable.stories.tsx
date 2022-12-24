import { ComponentMeta, ComponentStory } from '@storybook/react'

import { VerbFormsTable } from 'src/components/Entry/Forms/PartsOfSpeech/VerbFormsTable'
import { theme } from 'src/theme'
import { getEntry } from 'src/utils/stories'

export default {
  title: 'Cards/Entry/Forms/PartsOfSpeech/VerbFormsTable',
  component: VerbFormsTable,
  decorators: [
    (Story) => (
      <div
        style={{ width: theme.custom.card.maxWidth, border: '1px solid white' }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof VerbFormsTable>

export const Default: ComponentStory<typeof VerbFormsTable> = (
  args,
  { loaded }
) => <VerbFormsTable {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { forms } = await getEntry('amat:0')
    return { forms }
  },
]
