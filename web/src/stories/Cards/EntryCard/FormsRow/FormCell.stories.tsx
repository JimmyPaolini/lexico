import { ComponentMeta, ComponentStory } from '@storybook/react'

import FormCell from 'src/components/entry/FormsRow/FormCell'
import theme from 'src/theme'

export default {
  title: 'Cards/EntryCard/FormsRow/FormCell',
  component: FormCell,
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
} as ComponentMeta<typeof FormCell>

export const Default: ComponentStory<typeof FormCell> = (args) => (
  <FormCell {...args} />
)
Default.args = {
  position: 'midLeft',
  centerText: 'amat',
  topLeftText: 'TL',
  topRightText: 'TR',
  bottomLeftText: 'BL',
  bottomRightText: 'BR',
}

export const TwoLines: ComponentStory<typeof FormCell> = (args) => (
  <FormCell {...args} />
)
TwoLines.args = {
  position: 'midLeft',
  centerText: 'amāvērunt, amāvērere',
  topLeftText: 'TL',
  topRightText: 'TR',
  bottomLeftText: 'BL',
  bottomRightText: 'BR',
}

export const Ellipsis: ComponentStory<typeof FormCell> = (args) => (
  <FormCell {...args} />
)
Ellipsis.args = {
  position: 'midLeft',
  centerText: 'amāvērunt, amāvērere, amāvērunt',
  topLeftText: 'TL',
  topRightText: 'TR',
  bottomLeftText: 'BL',
  bottomRightText: 'BR',
}
