import { ComponentMeta, ComponentStory } from '@storybook/react'

import { VerbGrammar } from './VerbGrammar'

export default {
  title: 'Cards/Grammar/VerbGrammar',
  component: VerbGrammar,
} as ComponentMeta<typeof VerbGrammar>

export const Default: ComponentStory<typeof VerbGrammar> = () => (
  <VerbGrammar expandedInitial />
)
