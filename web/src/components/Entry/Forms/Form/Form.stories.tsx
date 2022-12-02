import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Form } from 'src/components/Entry/Forms/Form/Form'
import { theme } from 'src/theme'

export default {
  title: 'Cards/Entry/Forms/Form',
  component: Form,
  decorators: [
    (Story) => (
      <div
        style={{
          width: theme.custom.card.maxWidth / 2,
          border: '1px solid white',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Form>

export const Default: ComponentStory<typeof Form> = (args) => <Form {...args} />
Default.args = {
  position: 'midLeft',
  centerText: 'amat',
  topLeftText: 'nominative',
  topRightText: 'singular',
  bottomLeftText: 'gerund',
  bottomRightText: 'plural',
}

export const TwoLines: ComponentStory<typeof Form> = (args) => (
  <Form {...args} />
)
TwoLines.args = {
  position: 'midLeft',
  centerText: 'amāvērunt, amāvērere',
  topLeftText: 'nominative',
  topRightText: 'singular',
  bottomLeftText: 'gerund',
  bottomRightText: 'plural',
}

export const Ellipsis: ComponentStory<typeof Form> = (args) => (
  <Form {...args} />
)
Ellipsis.args = {
  position: 'midLeft',
  centerText: 'amāvērunt, amāvērere, amāvērunt, amāvēruntaxivit',
  topLeftText: 'nominative',
  topRightText: 'singular',
  bottomLeftText: 'gerund',
  bottomRightText: 'plural',
}
