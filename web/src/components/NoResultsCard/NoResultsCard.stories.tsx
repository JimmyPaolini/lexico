import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NoResultsCard } from './NoResultsCard'

export default {
  title: 'NoResultsCard',
  component: NoResultsCard,
} as ComponentMeta<typeof NoResultsCard>

export const Default: ComponentStory<typeof NoResultsCard> = () => (
  <NoResultsCard search="amoenono" />
)

export const NoQuery: ComponentStory<typeof NoResultsCard> = () => (
  <NoResultsCard />
)
