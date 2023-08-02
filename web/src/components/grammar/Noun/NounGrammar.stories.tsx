import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NounGrammar } from './NounGrammar'

export default {
  title: 'Cards/Grammar/NounGrammar',
  component: NounGrammar,
} as ComponentMeta<typeof NounGrammar>

export const Default: ComponentStory<typeof NounGrammar> = () => (
  <NounGrammar expandedInitial />
)
