import { ComponentMeta, ComponentStory } from '@storybook/react'

import { IdentifierCard } from './IdentifierCard'
import { identifierCardsData } from './IdentifierCard.constants'

export default {
  title: 'Cards/Grammar/IdentifierCard',
  component: IdentifierCard,
} as ComponentMeta<typeof IdentifierCard>

export const Mood: ComponentStory<typeof IdentifierCard> = () => (
  <IdentifierCard
    expandedInitial
    {...identifierCardsData.filter(({ id }) => id === 'mood')[0]}
  />
)

export const Tense: ComponentStory<typeof IdentifierCard> = () => (
  <IdentifierCard
    expandedInitial
    {...identifierCardsData.filter(({ id }) => id === 'tense')[0]}
  />
)

export const Voice: ComponentStory<typeof IdentifierCard> = () => (
  <IdentifierCard
    expandedInitial
    {...identifierCardsData.filter(({ id }) => id === 'voice')[0]}
  />
)

export const Person: ComponentStory<typeof IdentifierCard> = () => (
  <IdentifierCard
    expandedInitial
    {...identifierCardsData.filter(({ id }) => id === 'person')[0]}
  />
)

export const Number: ComponentStory<typeof IdentifierCard> = () => (
  <IdentifierCard
    expandedInitial
    {...identifierCardsData.filter(({ id }) => id === 'number')[0]}
  />
)

export const Case: ComponentStory<typeof IdentifierCard> = () => (
  <IdentifierCard
    expandedInitial
    {...identifierCardsData.filter(({ id }) => id === 'case')[0]}
  />
)

export const Gender: ComponentStory<typeof IdentifierCard> = () => (
  <IdentifierCard
    expandedInitial
    {...identifierCardsData.filter(({ id }) => id === 'gender')[0]}
  />
)

export const Miscellaneous: ComponentStory<typeof IdentifierCard> = () => (
  <IdentifierCard
    expandedInitial
    {...identifierCardsData.filter(({ id }) => id === 'miscellaneous')[0]}
  />
)
