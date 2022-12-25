import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AdjectiveDeclensionCard } from './AdjectiveDeclensionCard'
import { adjectiveDeclensions } from './adjectiveDeclensions'

export default {
  title: 'Cards/Grammar/AdjectiveDeclensionCard',
  component: AdjectiveDeclensionCard,
} as ComponentMeta<typeof AdjectiveDeclensionCard>

export const FirstSecond: ComponentStory<
  typeof AdjectiveDeclensionCard
> = () => (
  <AdjectiveDeclensionCard
    declension={adjectiveDeclensions[0]}
    expandedInitial
  />
)

export const Third: ComponentStory<typeof AdjectiveDeclensionCard> = () => (
  <AdjectiveDeclensionCard
    declension={adjectiveDeclensions[1]}
    expandedInitial
  />
)

export const Comparative: ComponentStory<
  typeof AdjectiveDeclensionCard
> = () => (
  <AdjectiveDeclensionCard
    declension={adjectiveDeclensions[2]}
    expandedInitial
  />
)
