import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FormsTable } from 'src/components/Entry/Forms/FormsTable'
import { verbFormsRestructure } from 'src/components/Entry/Forms/PartsOfSpeech/VerbFormsTable/verbFormsRestructure'
import { VerbForms } from 'src/graphql/generated'
import { theme } from 'src/theme'
import { searchEntry } from 'src/utils/stories'

export default {
  title: 'Cards/Entry/Forms/FormsTable',
  component: FormsTable,
  decorators: [
    (Story) => (
      <div
        style={{ width: theme.custom.card.maxWidth, border: '1px solid white' }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof FormsTable>

export const Default: ComponentStory<typeof FormsTable> & {
  loaders: any[]
} = (args, { loaded }) => <FormsTable {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { forms } = await searchEntry('amat')
    return {
      forms: verbFormsRestructure(forms as VerbForms).indicative.present.active,
    }
  },
]
