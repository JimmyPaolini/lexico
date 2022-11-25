import { ComponentMeta, ComponentStory } from '@storybook/react'

import {Forms} from 'src/components/Entry/Forms/Forms'
import theme from 'src/theme'
import { searchEntry } from 'src/utils/stories'

export default {
  title: 'Cards/Entry/Forms',
  component: Forms,
  decorators: [
    (Story) => (
      <div
        style={{ width: theme.custom.card.maxWidth, border: '1px solid white' }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Forms>

export const Default: ComponentStory<typeof Forms> & {
  loaders: any[]
} = (args, { loaded }) => <Forms {...args} {...loaded} />
Default.loaders = [
  async () => {
    const searched = 'amat'
    const { forms, partOfSpeech, identifiers } = await searchEntry(searched)
    return { searched, forms, partOfSpeech, identifiers }
  },
]

export const TwoRows: ComponentStory<typeof Forms> & {
  loaders: any[]
} = (args, { loaded }) => <Forms {...args} {...loaded} />
TwoRows.loaders = [
  async () => {
    const searched = 'credam'
    const { forms, partOfSpeech, identifiers } = await searchEntry(searched)
    return { searched, forms, partOfSpeech, identifiers }
  },
]
