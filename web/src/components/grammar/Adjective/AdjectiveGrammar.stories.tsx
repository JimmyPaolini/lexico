import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AdjectiveGrammar } from './AdjectiveGrammar'

export default {
  title: 'Cards/Grammar/AdjectiveGrammar',
  component: AdjectiveGrammar,
} as ComponentMeta<typeof AdjectiveGrammar>

export const Default: ComponentStory<typeof AdjectiveGrammar> = () => (
  <AdjectiveGrammar expandedInitial />
)
