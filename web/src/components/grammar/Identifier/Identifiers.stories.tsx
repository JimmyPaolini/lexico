import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Identifiers } from './Identifiers'

export default {
  title: 'Cards/Grammar/Identifiers',
  component: Identifiers,
} as ComponentMeta<typeof Identifiers>

export const Default: ComponentStory<typeof Identifiers> = () => (
  <Identifiers expandedInitial />
)
