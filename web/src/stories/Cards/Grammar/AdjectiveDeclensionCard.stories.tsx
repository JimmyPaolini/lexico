import { ComponentMeta, ComponentStory } from '@storybook/react'
import AdjectiveDeclensionCard from 'src/components/grammar/AdjectiveDeclensionCard'
import declensions from 'src/components/grammar/adjectiveDeclensions'

export default {
  title: 'Cards/Grammar/AdjectiveDeclensionCard',
  component: AdjectiveDeclensionCard,
} as ComponentMeta<typeof AdjectiveDeclensionCard>

export const FirstSecond: ComponentStory<typeof AdjectiveDeclensionCard> =
  () => <AdjectiveDeclensionCard declension={declensions[0]} expandedInitial />

export const Third: ComponentStory<typeof AdjectiveDeclensionCard> = () => (
  <AdjectiveDeclensionCard declension={declensions[1]} expandedInitial />
)

export const Comparative: ComponentStory<typeof AdjectiveDeclensionCard> =
  () => <AdjectiveDeclensionCard declension={declensions[2]} expandedInitial />
