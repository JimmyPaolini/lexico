import { ComponentMeta, ComponentStory } from '@storybook/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import {
  LexicoContext,
  LexicoContextType,
} from 'src/components/layout/LexicoContext'
import {
  CustomText,
  User as UserGql,
  UserTextsQuery,
  useUserTextsQuery,
} from 'src/graphql/generated'

import { createUserTextLocal } from './UserTexts'
import { UserTextsCard } from './UserTextsCard'

export default {
  title: 'Cards/Library/UserTextsCard',
  component: UserTextsCard,
} as ComponentMeta<typeof UserTextsCard>

export const Local: ComponentStory<typeof UserTextsCard> = () => (
  <UserTextsCard />
)
Local.loaders = [
  async () => {
    createUserTextLocal({
      id: '1',
      title: 'A Local Custom Text',
      text: '',
    } as CustomText)
    createUserTextLocal({
      id: '2',
      title: 'Another Local Custom Text',
      text: '',
    } as CustomText)
    createUserTextLocal({
      id: '3',
      title: 'A Third Local Custom Text',
      text: '',
    } as CustomText)
    return {}
  },
]

export const User: ComponentStory<typeof UserTextsCard> = () => (
  <UserTextsCard />
)
User.decorators = [
  (Story) => {
    const queryClient = new QueryClient()
    queryClient.setQueryData(useUserTextsQuery.getKey(), {
      userTexts: [
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
    } as UserTextsQuery)
    return (
      <QueryClientProvider client={queryClient}>
        <LexicoContext.Provider
          value={
            {
              user: { id: 'a' } as UserGql,
              isMobile: false,
            } as LexicoContextType
          }
        >
          <Story />
        </LexicoContext.Provider>
      </QueryClientProvider>
    )
  },
]

export const Loading: ComponentStory<typeof UserTextsCard> = () => (
  <UserTextsCard />
)
Loading.decorators = [
  (Story) => {
    return (
      <LexicoContext.Provider
        value={
          { user: { id: 'a' } as UserGql, isMobile: false } as LexicoContextType
        }
      >
        <Story />
      </LexicoContext.Provider>
    )
  },
]
