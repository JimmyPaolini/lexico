import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NounDeclensionCard } from 'src/components/grammar/NounDeclensionCard'
import { nounDeclensions } from 'src/components/grammar/nounDeclensions'

export default {
  title: 'Cards/Grammar/NounDeclensionCard',
  component: NounDeclensionCard,
} as ComponentMeta<typeof NounDeclensionCard>

export const First: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={nounDeclensions[0]} expandedInitial />
)

export const Second: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={nounDeclensions[1]} expandedInitial />
)

export const SecondNeuter: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={nounDeclensions[2]} expandedInitial />
)

export const ThirdMascFem: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={nounDeclensions[3]} expandedInitial />
)

export const ThirdNeuter: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={nounDeclensions[4]} expandedInitial />
)

export const Fourth: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={nounDeclensions[5]} expandedInitial />
)

export const Fifth: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={nounDeclensions[6]} expandedInitial />
)
