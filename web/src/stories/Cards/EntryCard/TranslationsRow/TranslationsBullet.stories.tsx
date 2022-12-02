import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Translation } from 'src/components/Entry/Translations/Translation'
import { theme } from 'src/theme'
import { searchEntry } from 'src/utils/stories'

export default {
  title: 'Cards/Entry/Translations/Translation',
  component: Translation,
  decorators: [
    (Story) => (
      <div
        style={{ width: theme.custom.card.maxWidth, border: '1px solid white' }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Translation>

export const Default: ComponentStory<typeof Translation> & {
  loaders: any[]
} = (args, { loaded }) => <Translation {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { translations } = await searchEntry('amat')
    return { translation: translations![0] }
  },
]

export const TwoLines: ComponentStory<typeof Translation> & {
  loaders: any[]
} = (args, { loaded }) => <Translation {...args} {...loaded} />
TwoLines.loaders = [
  async () => {
    const { translations } = await searchEntry('amat')
    return { translation: translations![2] }
  },
]
