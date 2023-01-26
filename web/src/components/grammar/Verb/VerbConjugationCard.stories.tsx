import { ComponentMeta, ComponentStory } from '@storybook/react'

import { VerbConjugationCard } from './VerbConjugationCard'
import { verbConjugationCardsData } from './VerbConjugationCard.constants'

export default {
  title: 'Cards/Grammar/VerbConjugationCard',
  component: VerbConjugationCard,
} as ComponentMeta<typeof VerbConjugationCard>

export const First: ComponentStory<typeof VerbConjugationCard> = () => (
  <VerbConjugationCard
    conjugation={verbConjugationCardsData[0]}
    expandedInitial
  />
)

export const Second: ComponentStory<typeof VerbConjugationCard> = () => (
  <VerbConjugationCard
    conjugation={verbConjugationCardsData[2]}
    expandedInitial
  />
)

export const Third: ComponentStory<typeof VerbConjugationCard> = () => (
  <VerbConjugationCard
    conjugation={verbConjugationCardsData[3]}
    expandedInitial
  />
)

export const ThirdIStem: ComponentStory<typeof VerbConjugationCard> = () => (
  <VerbConjugationCard
    conjugation={verbConjugationCardsData[4]}
    expandedInitial
  />
)

export const Fourth: ComponentStory<typeof VerbConjugationCard> = () => (
  <VerbConjugationCard
    conjugation={verbConjugationCardsData[5]}
    expandedInitial
  />
)
