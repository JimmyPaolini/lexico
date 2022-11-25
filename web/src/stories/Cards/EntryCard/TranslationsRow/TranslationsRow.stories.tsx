import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Translations } from 'src/components/Entry/Translations/Translations'
import theme from 'src/theme'
import { searchEntry } from 'src/utils/stories'

export default {
  title: 'Cards/EntryCard/Translations',
  component: Translations,
  decorators: [
    (Story) => (
      <div
        style={{ width: theme.custom.card.maxWidth, border: '1px solid white' }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Translations>

export const Default: ComponentStory<typeof Translations> & {
  loaders: any[]
} = (args, { loaded }) => <Translations {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { translations } = await searchEntry('amat')
    return { translations }
  },
]
