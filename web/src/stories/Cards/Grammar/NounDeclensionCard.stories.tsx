import { ComponentMeta, ComponentStory } from '@storybook/react'
import NounDeclensionCard from 'src/components/grammar/NounDeclensionCard'
import declensions from 'src/components/grammar/nounDeclensions'

export default {
  title: 'Cards/Grammar/NounDeclensionCard',
  component: NounDeclensionCard,
} as ComponentMeta<typeof NounDeclensionCard>

export const First: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={declensions[0]} expandedInitial />
)

export const Second: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={declensions[1]} expandedInitial />
)

export const SecondNeuter: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={declensions[2]} expandedInitial />
)

export const ThirdMascFem: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={declensions[3]} expandedInitial />
)

export const ThirdNeuter: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={declensions[4]} expandedInitial />
)

export const Fourth: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={declensions[5]} expandedInitial />
)

export const Fifth: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={declensions[6]} expandedInitial />
)
