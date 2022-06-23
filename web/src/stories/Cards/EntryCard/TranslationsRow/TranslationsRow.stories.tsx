import { ComponentMeta, ComponentStory } from '@storybook/react'

import TranslationsRow from 'src/components/entry/TranslationsRow/TranslationsRow'
import theme from 'src/theme'
import { searchEntry } from 'src/utils/stories'

export default {
  title: 'Cards/EntryCard/TranslationsRow',
  component: TranslationsRow,
  decorators: [
    (Story) => (
      <div style={{ width: theme.custom.cardWidth, border: '1px solid white' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TranslationsRow>

export const Default: ComponentStory<typeof TranslationsRow> & {
  loaders: any[]
} = (args, { loaded }) => <TranslationsRow {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { translations } = await searchEntry('amat')
    return { translations }
  },
]
