import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Translation } from 'src/components/Entry/Translations/Translation'
import { theme } from 'src/theme'
import { getEntry } from 'src/utils/stories'

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

export const Default: ComponentStory<typeof Translation> = (
  args,
  { loaded }
) => <Translation {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { translations } = await getEntry('amat:0')
    if (!translations?.length) throw new Error('translation not found')
    return { translation: translations[0] }
  },
]

export const TwoLines: ComponentStory<typeof Translation> = (
  args,
  { loaded }
) => <Translation {...args} {...loaded} />
TwoLines.loaders = [
  async () => {
    const { translations } = await getEntry('amat:0')
    if (!translations?.length) throw new Error('translation not found')
    if (translations?.length < 3) throw new Error('translation not found')
    return { translation: translations[2] }
  },
]
