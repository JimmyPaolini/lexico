import { Grid } from '@mui/material'

import { ComponentMeta, ComponentStory } from '@storybook/react'
import Pill from 'src/components/accessories/Pill'

import IdentifierPill from '../components/accessories/IdentifierPill'

// Red: red, crimson, tomato
// Blue: blue, cadetblue, cornflowerblue
// Yellow: yellow, gold, goldenrod
// Green: green, forestgreen, limegreen, darkgreen, darkolivegreen
// Pink/Purple: hotpink, indigo, fuchsia
// Brown: brown, saddlebrown
// Neutral: white, black, gray

export default {
  title: 'Pill',
  component: Pill,
} as ComponentMeta<typeof Pill>

export const AllPills: ComponentStory<typeof Pill> = () => (
  <Grid container direction="column" spacing={1} alignItems="center">
    <Grid container item>
      <IdentifierPill identifier="active" />
      <IdentifierPill identifier="passive" />
    </Grid>
    <Grid container item>
      <IdentifierPill identifier="indicative" />
      <IdentifierPill identifier="subjunctive" />
      <IdentifierPill identifier="imperative" />
      <IdentifierPill identifier="infinitive" />
      <IdentifierPill identifier="non finite" />
    </Grid>
    <Grid container item>
      <IdentifierPill identifier="present" />
      <IdentifierPill identifier="imperfect" />
      <IdentifierPill identifier="future" />
      <IdentifierPill identifier="perfect" />
      <IdentifierPill identifier="pluperfect" />
      <IdentifierPill identifier="future perfect" />
    </Grid>
    <Grid container item>
      <IdentifierPill identifier="nominative" />
      <IdentifierPill identifier="genitive" />
      <IdentifierPill identifier="dative" />
      <IdentifierPill identifier="accusative" />
      <IdentifierPill identifier="ablative" />
      <IdentifierPill identifier="vocative" />
      <IdentifierPill identifier="locative" />
    </Grid>
    <Grid container item>
      <IdentifierPill identifier="masculine" />
      <IdentifierPill identifier="feminine" />
      <IdentifierPill identifier="neuter" />
    </Grid>
    <Grid container item>
      <IdentifierPill identifier="first" />
      <IdentifierPill identifier="second" />
      <IdentifierPill identifier="third" />
    </Grid>
    <Grid container item>
      <IdentifierPill identifier="singular" />
      <IdentifierPill identifier="plural" />
    </Grid>
  </Grid>
)
