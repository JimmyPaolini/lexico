import { ComponentMeta, ComponentStory } from '@storybook/react'
import FormsTable from 'src/components/entry/FormsRow/FormsTable'
import theme from 'src/theme'
import { searchEntry } from 'src/utils/stories'

import { verbFormsRestructure } from '../../../../components/entry/FormsRow/PartsOfSpeech/VerbFormsTable/verbFormsRestructure'

export default {
  title: 'Cards/EntryCard/FormsRow/FormsTable',
  component: FormsTable,
  decorators: [
    (Story) => (
      <div style={{ width: theme.custom.cardWidth, border: '1px solid white' }}>
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
    console.log(verbFormsRestructure(forms))
    return { forms: verbFormsRestructure(forms)['IND']['PRES']['ACT'] }
  },
]
