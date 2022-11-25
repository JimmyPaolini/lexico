import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FormTabs } from 'src/components/Entry/Forms/FormTabs'
import theme from 'src/theme'
import { searchEntry } from 'src/utils/stories'

import { verbFormsRestructure } from '../../../../components/Entry/Forms/PartsOfSpeech/VerbFormsTable/verbFormsRestructure'
import { VerbForms } from '../../../../graphql/generated'

export default {
  title: 'Cards/Entry/Forms/FormTabs',
  component: FormTabs,
  decorators: [
    (Story) => (
      <div
        style={{ width: theme.custom.card.maxWidth, border: '1px solid white' }}
      >
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
    const structure = verbFormsRestructure(forms as VerbForms)
    return {
      tabs: Object.keys(structure),
      activeTab: 0,
      setActiveTabs: () => {},
    }
  },
]
