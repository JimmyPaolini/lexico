import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FormTabs } from 'src/components/Entry/Forms/FormTabs'
import { verbFormsRestructure } from 'src/components/Entry/Forms/PartsOfSpeech/VerbFormsTable/verbFormsRestructure'
import { VerbForms } from 'src/graphql/generated'
import { theme } from 'src/theme'
import { getEntry } from 'src/utils/stories'

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

export const Default: ComponentStory<typeof FormTabs> = (args, { loaded }) => (
  <FormTabs {...args} {...loaded} />
)
Default.loaders = [
  async () => {
    const { forms } = await getEntry('amat:0')
    const structure = verbFormsRestructure(forms as VerbForms)
    return {
      tabs: Object.keys(structure),
      activeTab: 0,
      setActiveTabs: () => null,
    }
  },
]
