import { ComponentMeta, ComponentStory } from "@storybook/react"
import CardDeck from "../components/accessories/CardDeck"
import NounDeclensionCard from "../components/grammar/NounDeclensionCard"
import declensions from "../components/grammar/nounDeclensions"

export default {
  title: "NounDeclensionCard",
  component: NounDeclensionCard,
  decorators: [
    (Story: unknown) => (
      <CardDeck
        cards={[{ key: "NounDeclensionCard", Card: Story as JSX.Element }]}
      />
    ),
  ],
} as ComponentMeta<typeof NounDeclensionCard>

const Template: ComponentStory<typeof NounDeclensionCard> = (args) => {
  return <NounDeclensionCard {...args} />
}

export const Default = Template.bind({})
Default.args = { declension: declensions[0] }
