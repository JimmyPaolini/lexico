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

export const Default: ComponentStory<typeof NounDeclensionCard> = () => <NounDeclensionCard {...{ declension: declensions[0] }} />

// export const Default = Template.bind({})
// Default.args = { declension: declensions[0] }
