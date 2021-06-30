import { ComponentMeta, Story } from "@storybook/react"
import CardDeck from "../components/accessories/CardDeck"
import NounCard from "../components/grammar/NounCard"

export default {
  title: "NounCard",
  component: NounCard,
  decorators: [
    (Story) => <CardDeck cards={[{ key: "NounCard", Card: Story }]} />,
  ],
} as ComponentMeta<typeof NounCard>

const Template: Story<typeof NounCard> = (args) => {
  return <NounCard {...args} />
}

export const Default = Template.bind({})
Default.args = {}
