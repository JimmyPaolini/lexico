import { ComponentMeta, ComponentStory } from "@storybook/react"
import NounDeclensionCard from "src/components/grammar/NounDeclensionCard"
import declensions from "src/components/grammar/nounDeclensions"

export default {
  title: "Cards/NounDeclensionCard",
  component: NounDeclensionCard,
} as ComponentMeta<typeof NounDeclensionCard>

export const Default: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={declensions[0]} />
)
