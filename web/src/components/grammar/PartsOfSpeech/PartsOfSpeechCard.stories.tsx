import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PartsOfSpeechCard } from './PartsOfSpeechCard'
import { partsOfSpeechCardData } from './PartsOfSpeechCard.constants'

export default {
  title: 'Cards/Grammar/PartsOfSpeech',
  component: PartsOfSpeechCard,
} as ComponentMeta<typeof PartsOfSpeechCard>

export const Default: ComponentStory<typeof PartsOfSpeechCard> = () => (
  <PartsOfSpeechCard expandedInitial {...partsOfSpeechCardData} />
)
