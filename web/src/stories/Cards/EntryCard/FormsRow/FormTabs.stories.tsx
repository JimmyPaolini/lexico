import { ComponentMeta, ComponentStory } from '@storybook/react'

import FormTabs from 'src/components/entry/FormsRow/FormTabs'
import theme from 'src/theme'
import { searchEntry } from 'src/utils/stories'

import { verbFormsRestructure } from '../../../../components/entry/FormsRow/PartsOfSpeech/VerbFormsTable/verbFormsRestructure'

export default {
  title: 'Cards/EntryCard/FormsRow/FormTabs',
  component: FormTabs,
  decorators: [
    (Story) => (
      <div style={{ width: theme.custom.cardWidth, border: '1px solid white' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof FormTabs>

export const Default: ComponentStory<typeof FormTabs> & {
  loaders: any[]
} = (args, { loaded }) => <FormTabs {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { forms } = await searchEntry('amat')
    const structure = verbFormsRestructure(forms)
    return {
      tabs: Object.keys(structure),
      activeTab: 0,
      setActiveTabs: () => {},
    }
  },
]
