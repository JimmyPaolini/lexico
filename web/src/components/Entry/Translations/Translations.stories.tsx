import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Translations } from 'src/components/Entry/Translations/Translations'
import { theme } from 'src/theme'
import { getEntry } from 'src/utils/stories'

export default {
  title: 'Cards/Entry/Translations',
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

export const Default: ComponentStory<typeof Translations> = (
  args,
  { loaded }
) => <Translations {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { translations } = await getEntry('amo:0')
    return { translations }
  },
]
