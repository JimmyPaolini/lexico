import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NounFormsTable } from 'src/components/Entry/Forms/PartsOfSpeech/NounFormsTable'
import { theme } from 'src/theme'
import { getEntry } from 'src/utils/stories'

export default {
  title: 'Cards/Entry/Forms/PartsOfSpeech/NounFormsTable',
  component: NounFormsTable,
  decorators: [
    (Story) => (
      <div
        style={{ width: theme.custom.card.maxWidth, border: '1px solid white' }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof NounFormsTable>

export const Default: ComponentStory<typeof NounFormsTable> = (
  args,
  { loaded }
) => <NounFormsTable {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { forms } = await getEntry('hortus:0')
    return { forms }
  },
]
