import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AdjectiveDeclensionCard } from './AdjectiveDeclensionCard'
import { adjectiveDeclensionCardsData } from './AdjectiveDeclensionCard.constants'

export default {
  title: 'Cards/Grammar/AdjectiveDeclensionCard',
  component: AdjectiveDeclensionCard,
} as ComponentMeta<typeof AdjectiveDeclensionCard>

export const FirstSecond: ComponentStory<
  typeof AdjectiveDeclensionCard
> = () => (
  <AdjectiveDeclensionCard
    declension={adjectiveDeclensionCardsData[0]}
    expandedInitial
  />
)

export const Third: ComponentStory<typeof AdjectiveDeclensionCard> = () => (
  <AdjectiveDeclensionCard
    declension={adjectiveDeclensionCardsData[1]}
    expandedInitial
  />
)

export const Comparative: ComponentStory<
  typeof AdjectiveDeclensionCard
> = () => (
  <AdjectiveDeclensionCard
    declension={adjectiveDeclensionCardsData[2]}
    expandedInitial
  />
)
