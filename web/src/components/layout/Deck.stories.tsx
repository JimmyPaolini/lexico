import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Deck } from 'src/components/layout/Deck'
import { getEntry } from 'src/utils/stories'

import { Entry } from '../Entry/Entry'

export default {
  title: 'Deck',
  component: Deck,
} as ComponentMeta<typeof Deck>

export const Default: ComponentStory<typeof Deck> = (_, { loaded }) => (
  <Deck Cards={loaded.Cards} />
)
Default.loaders = [
  async () => {
    const amo = await getEntry('amo:0')
    const per = await getEntry('per:0')
    return {
      Cards: [
        <Entry entry={amo} search="amo" key={1} />,
        <Entry entry={amo} search="amo" key={2} />,
        <Entry entry={per} search="per" key={3} />,
      ],
    }
  },
]
