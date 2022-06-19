import { ComponentMeta, ComponentStory } from "@storybook/react"
import NounDeclensionCard from "../components/grammar/NounDeclensionCard"
import declensions from "../components/grammar/nounDeclensions"

export default {
  title: "Cards/NounDeclensionCard",
  component: NounDeclensionCard,
} as ComponentMeta<typeof NounDeclensionCard>

export const Default: ComponentStory<typeof NounDeclensionCard> = () => (
  <NounDeclensionCard declension={declensions[0]} />
)
