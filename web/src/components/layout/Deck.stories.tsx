import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Deck } from 'src/components/layout/Deck'
import { searchEntry } from 'src/utils/stories'

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
    const amo = await searchEntry('amo')
    const per = await searchEntry('per')
    return {
      Cards: [
        <Entry entry={amo} searched={'amo'} key={1} />,
        <Entry entry={amo} searched={'amo'} key={2} />,
        <Entry entry={per} searched={'per'} key={3} />,
      ],
    }
  },
]
