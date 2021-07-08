import { ComponentMeta, ComponentStory } from "@storybook/react"
import CardDeck from "../components/accessories/CardDeck"
import declensions from "../components/grammar/nounDeclensions"
import NounDeclensionCard from "../components/grammar/NounDeclensionCard"

export default {
  title: "NounDeclensionCard",
  component: NounDeclensionCard,
  decorators: [
    (Story) => (
      <CardDeck cards={[{ key: "NounDeclensionCard", Card: Story }]} />
    ),
  ],
} as ComponentMeta<typeof NounDeclensionCard>

const Template: ComponentStory<typeof NounDeclensionCard> = (args) => {
  return <NounDeclensionCard {...args} />
}

export const Default = Template.bind({})
Default.args = { declension: declensions.first }
