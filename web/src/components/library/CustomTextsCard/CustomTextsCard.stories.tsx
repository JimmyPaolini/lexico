import { ComponentMeta, ComponentStory } from '@storybook/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Context, LexicoContext } from 'src/components/layout/Context'
import {
  CustomText,
  CustomTextsQuery,
  User as UserGql,
  useCustomTextsQuery,
} from 'src/graphql/generated'

import { createCustomTextLocal } from './CustomTexts'
import { CustomTextsCard } from './CustomTextsCard'

export default {
  title: 'Cards/Library/CustomTextsCard',
  component: CustomTextsCard,
} as ComponentMeta<typeof CustomTextsCard>

export const Local: ComponentStory<typeof CustomTextsCard> = () => (
  <CustomTextsCard />
)
Local.loaders = [
  async () => {
    createCustomTextLocal({
      id: '1',
      title: 'A Local Custom Text',
      text: '',
    } as CustomText)
    createCustomTextLocal({
      id: '2',
      title: 'Another Local Custom Text',
      text: '',
    } as CustomText)
    createCustomTextLocal({
      id: '3',
      title: 'A Third Local Custom Text',
      text: '',
    } as CustomText)
    return {}
  },
]

export const User: ComponentStory<typeof CustomTextsCard> = () => (
  <CustomTextsCard />
)
User.decorators = [
  (Story) => {
    const queryClient = new QueryClient()
    queryClient.setQueryData(useCustomTextsQuery.getKey(), {
      customTexts: [
        {
          id: '123',
          title: 'A User Custom Text',
          text: '',
          user: { id: 'a' } as unknown as UserGql,
        },
        {
          id: '456',
          title: 'Anoter User Custom Text',
          text: '',
          user: { id: 'a' } as unknown as UserGql,
        },
        {
          id: '789',
          title: 'A Third User Custom Text',
          text: '',
          user: { id: 'a' } as unknown as UserGql,
        },
      ],
    } as CustomTextsQuery)
    return (
      <QueryClientProvider client={queryClient}>
        <Context.Provider
          value={
            { user: { id: 'a' } as UserGql, isMobile: false } as LexicoContext
          }
        >
          <Story />
        </Context.Provider>
      </QueryClientProvider>
    )
  },
]

export const Loading: ComponentStory<typeof CustomTextsCard> = () => (
  <CustomTextsCard />
)
Loading.decorators = [
  (Story) => {
    return (
      <Context.Provider
        value={
          { user: { id: 'a' } as UserGql, isMobile: false } as LexicoContext
        }
      >
        <Story />
      </Context.Provider>
    )
  },
]
