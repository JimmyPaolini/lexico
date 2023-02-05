import { Paper } from '@mui/material'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  LexicoContext,
  LexicoContextType,
} from 'src/components/layout/LexicoContext'
import { User as UserGql } from 'src/graphql/generated'

import { UserText } from './UserText'

export default {
  title: 'Cards/Library/UserTextsCard/UserText',
  component: UserText,
  decorators: [
    (Story) => (
      <Paper sx={{ width: '400px' }}>
        <Story />
      </Paper>
    ),
  ],
} as ComponentMeta<typeof UserText>

export const Local: ComponentStory<typeof UserText> = (args, { loaded }) => (
  <UserText {...args} {...loaded} />
)
Local.args = {
  text: {
    id: '0',
    title: 'Test User Text Local',
    text: 'Lorem Ipsum',
    user: undefined as unknown as UserGql,
  },
}

export const User: ComponentStory<typeof UserText> = (args, { loaded }) => (
  <UserText {...args} {...loaded} />
)
User.args = {
  text: {
    id: '0',
    title: 'Test User Text Remote',
    text: 'Lorem Ipsum',
    user: {} as UserGql,
  },
}
User.decorators = [
  (Story) => (
    <LexicoContext.Provider
      value={{ user: {} as UserGql, isMobile: false } as LexicoContextType}
    >
      <Story />
    </LexicoContext.Provider>
  ),
]
