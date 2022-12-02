import { ComponentMeta, ComponentStory } from '@storybook/react'

import { VerbConjugationCard } from 'src/components/grammar/VerbConjugationCard'
import { verbConjugations } from 'src/components/grammar/verbConjugations'

export default {
  title: 'Cards/Grammar/VerbConjugationCard',
  component: VerbConjugationCard,
} as ComponentMeta<typeof VerbConjugationCard>

export const First: ComponentStory<typeof VerbConjugationCard> = () => (
  <VerbConjugationCard conjugation={verbConjugations[0]} expandedInitial />
)

export const Second: ComponentStory<typeof VerbConjugationCard> = () => (
  <VerbConjugationCard conjugation={verbConjugations[2]} expandedInitial />
)

export const Third: ComponentStory<typeof VerbConjugationCard> = () => (
  <VerbConjugationCard conjugation={verbConjugations[3]} expandedInitial />
)

export const ThirdIStem: ComponentStory<typeof VerbConjugationCard> = () => (
  <VerbConjugationCard conjugation={verbConjugations[4]} expandedInitial />
)

export const Fourth: ComponentStory<typeof VerbConjugationCard> = () => (
  <VerbConjugationCard conjugation={verbConjugations[5]} expandedInitial />
)
