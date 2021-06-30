import { ComponentMeta, Story } from "@storybook/react"
import CardDeck from "../components/accessories/CardDeck"
import DeclensionCard from "../components/grammar/DeclensionCard"

export default {
  title: "DeclensionCard",
  component: DeclensionCard,
  decorators: [
    (Story) => <CardDeck cards={[{ key: "DeclensionCard", Card: Story }]} />,
  ],
} as ComponentMeta<typeof DeclensionCard>

const Template: Story<typeof DeclensionCard> = (args) => {
  return <DeclensionCard {...args} />
}

export const Default = Template.bind({})
Default.args = {}
