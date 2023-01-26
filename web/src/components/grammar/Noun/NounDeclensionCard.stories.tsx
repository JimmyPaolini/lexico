import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NounDeclensionCard } from './NounDeclensionCard'
import { nounDeclensionCardsData } from './NounDeclensionCard.constants'

export default {
  title: 'Cards/Grammar/NounDeclensionCard',
  component: NounDeclensionCard,
} as ComponentMeta<typeof NounDeclensionCard>

export const First: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={nounDeclensionCardsData[0]} expandedInitial />
)

export const Second: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={nounDeclensionCardsData[1]} expandedInitial />
)

export const SecondNeuter: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={nounDeclensionCardsData[2]} expandedInitial />
)

export const ThirdMascFem: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={nounDeclensionCardsData[3]} expandedInitial />
)

export const ThirdNeuter: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={nounDeclensionCardsData[4]} expandedInitial />
)

export const Fourth: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={nounDeclensionCardsData[5]} expandedInitial />
)

export const Fifth: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={nounDeclensionCardsData[6]} expandedInitial />
)
