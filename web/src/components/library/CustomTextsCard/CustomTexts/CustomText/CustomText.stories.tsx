import { Paper } from '@mui/material'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  LexicoContext,
  LexicoContextType,
} from 'src/components/layout/LexicoContext'
import { User as UserGql } from 'src/graphql/generated'

import { CustomText } from './CustomText'

export default {
  title: 'Cards/Library/CustomTextsCard/CustomText',
  component: CustomText,
  decorators: [
    (Story) => (
      <Paper sx={{ width: '400px' }}>
        <Story />
      </Paper>
    ),
  ],
} as ComponentMeta<typeof CustomText>

export const Local: ComponentStory<typeof CustomText> = (args, { loaded }) => (
  <CustomText {...args} {...loaded} />
)
Local.args = {
  text: {
    id: '0',
    title: 'Test Local Custom Text',
    text: 'Lorem Ipsum',
    user: undefined as unknown as UserGql,
  },
}

export const User: ComponentStory<typeof CustomText> = (args, { loaded }) => (
  <CustomText {...args} {...loaded} />
)
User.args = {
  text: {
    id: '0',
    title: 'Test User Custom Text',
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
