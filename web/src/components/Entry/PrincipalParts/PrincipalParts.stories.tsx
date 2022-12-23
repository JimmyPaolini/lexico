import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PrincipalParts } from 'src/components/Entry/PrincipalParts/PrincipalParts'
import { theme } from 'src/theme'
import { searchEntry } from 'src/utils/stories'

export default {
  title: 'Cards/Entry/PrincipalParts',
  component: PrincipalParts,
  decorators: [
    (Story) => (
      <div
        style={{ width: theme.custom.card.maxWidth, border: '1px solid white' }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof PrincipalParts>

export const Default: ComponentStory<typeof PrincipalParts> = (
  args,
  { loaded }
) => <PrincipalParts {...args} {...loaded} />
Default.loaders = [
  async () => {
    const { id, partOfSpeech, principalParts, inflection, bookmarked } =
      await searchEntry('amat')
    return { id, partOfSpeech, principalParts, inflection, bookmarked }
  },
]
