import Pill from "src/components/accessories/Pill"
import { ComponentMeta, ComponentStory } from "@storybook/react"

// Red: red, crimson, tomato
// Blue: blue, cadetblue, cornflowerblue
// Yellow: yellow, gold, goldenrod
// Green: green, forestgreen, limegreen, darkgreen, darkolivegreen
// Pink/Purple: hotpink, indigo, fuchsia
// Brown: brown, saddlebrown
// Neutral: white, black, gray

export default {
  title: "Pill",
  component: Pill,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", gap: 4 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Pill>

export const VoicePills: ComponentStory<typeof Pill> = () => (
  <>
    <Pill backgroundColor="#999" color="black">
      Act
    </Pill>
    <Pill backgroundColor="#555">Pas</Pill>
  </>
)

export const CasePills: ComponentStory<typeof Pill> = () => (
  <>
    <Pill backgroundColor="royalblue">NOM</Pill>
    <Pill backgroundColor="forestgreen">GEN</Pill>
    <Pill backgroundColor="yellow" color="black">
      DAT
    </Pill>
    <Pill backgroundColor="crimson">ACC</Pill>
    <Pill backgroundColor="hotpink">ABL</Pill>
    <Pill backgroundColor="orangered">VOC</Pill>
    <Pill backgroundColor="brown">LOC</Pill>
  </>
)

export const MoodPills: ComponentStory<typeof Pill> = () => (
  <>
    <Pill backgroundColor="blue">IND</Pill>
    <Pill backgroundColor="fuchsia">SUB</Pill>
    <Pill backgroundColor="red">IMP</Pill>
    <Pill backgroundColor="yellow" color="black">
      INF
    </Pill>
    <Pill backgroundColor="green" color="black">
      NONF
    </Pill>
  </>
)

export const TensePills: ComponentStory<typeof Pill> = () => (
  <>
    <Pill backgroundColor="blue">PRES</Pill>
    <Pill backgroundColor="forestgreen">IMP</Pill>
    <Pill backgroundColor="yellow" color="black">
      FUT
    </Pill>
    <Pill backgroundColor="crimson">PERF</Pill>
    <Pill backgroundColor="cyan" color="black">
      PLUP
    </Pill>
    <Pill backgroundColor="green" color="black">
      FUTP
    </Pill>
  </>
)

export const PersonPills: ComponentStory<typeof Pill> = () => (
  <>
    <Pill backgroundColor="yellow" color="black">
      1ST
    </Pill>
    <Pill backgroundColor="red">2ND</Pill>
    <Pill backgroundColor="blue">3RD</Pill>
  </>
)

export const NumberPills: ComponentStory<typeof Pill> = () => (
  <>
    <Pill backgroundColor="white" color="black">
      SG
    </Pill>
    <Pill backgroundColor="black">PL</Pill>
  </>
)
