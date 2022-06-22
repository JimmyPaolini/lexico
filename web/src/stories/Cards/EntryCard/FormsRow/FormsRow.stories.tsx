import { ComponentMeta, ComponentStory } from '@storybook/react'
import FormsRow from 'src/components/entry/FormsRow/FormsRow'
import theme from 'src/theme'
import { searchEntry } from 'src/utils/stories'

export default {
  title: 'Cards/EntryCard/FormsRow',
  component: FormsRow,
  decorators: [
    (Story) => (
      <div style={{ width: theme.custom.cardWidth, border: '1px solid white' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof FormsRow>

export const Default: ComponentStory<typeof FormsRow> & {
  loaders: any[]
} = (args, { loaded }) => <FormsRow {...args} {...loaded} />
Default.loaders = [
  async () => {
    const searched = 'amat'
    const { forms, partOfSpeech, identifiers } = await searchEntry(searched)
    return { searched, forms, partOfSpeech, identifiers }
  },
]

export const TwoRows: ComponentStory<typeof FormsRow> & {
  loaders: any[]
} = (args, { loaded }) => <FormsRow {...args} {...loaded} />
TwoRows.loaders = [
  async () => {
    const searched = 'credam'
    const { forms, partOfSpeech, identifiers } = await searchEntry(searched)
    return { searched, forms, partOfSpeech, identifiers }
  },
]
