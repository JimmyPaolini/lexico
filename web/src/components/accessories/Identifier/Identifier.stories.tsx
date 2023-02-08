import { Grid } from '@mui/material'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Identifier } from 'src/components/accessories/Identifier/Identifier'

export default {
  title: 'Identifier',
  component: Identifier,
} as ComponentMeta<typeof Identifier>

export const Default: ComponentStory<typeof Identifier> = () => (
  <Grid container direction="column" spacing={1} alignItems="center">
    <Grid container item>
      <Identifier identifier="noun" />
      <Identifier identifier="properNoun" />
      <Identifier identifier="verb" />
      <Identifier identifier="adjective" />
      <Identifier identifier="adverb" />
      <Identifier identifier="pronoun" />
      <Identifier identifier="determiner" />
      <Identifier identifier="preposition" />
      <Identifier identifier="conjunction" />
      <Identifier identifier="numeral" />
      <Identifier identifier="abbreviation" />
      <Identifier identifier="prefix" />
      <Identifier identifier="suffix" />
      <Identifier identifier="interfix" />
      <Identifier identifier="circumfix" />
      <Identifier identifier="inflection" />
      <Identifier identifier="particle" />
      <Identifier identifier="interjection" />
      <Identifier identifier="phrase" />
      <Identifier identifier="proverb" />
      <Identifier identifier="idiom" />
    </Grid>
    <Grid container item>
      <Identifier identifier="nominative" />
      <Identifier identifier="genitive" />
      <Identifier identifier="dative" />
      <Identifier identifier="accusative" />
      <Identifier identifier="ablative" />
      <Identifier identifier="vocative" />
      <Identifier identifier="locative" />
    </Grid>
    <Grid container item>
      <Identifier identifier="masculine" />
      <Identifier identifier="feminine" />
      <Identifier identifier="neuter" />
    </Grid>
    <Grid container item>
      <Identifier identifier="singular" />
      <Identifier identifier="plural" />
    </Grid>
    <Grid container item>
      <Identifier identifier="indicative" />
      <Identifier identifier="subjunctive" />
      <Identifier identifier="imperative" />
      <Identifier identifier="infinitive" />
      <Identifier identifier="non finite" />
    </Grid>
    <Grid container item>
      <Identifier identifier="present" />
      <Identifier identifier="imperfect" />
      <Identifier identifier="future" />
      <Identifier identifier="perfect" />
      <Identifier identifier="pluperfect" />
      <Identifier identifier="future perfect" />
    </Grid>
    <Grid container item>
      <Identifier identifier="participle" />
      <Identifier identifier="gerund/supine" />
      <Identifier identifier="gerund" />
      <Identifier identifier="supine" />
    </Grid>
    <Grid container item>
      <Identifier identifier="active" />
      <Identifier identifier="passive" />
    </Grid>
    <Grid container item>
      <Identifier identifier="first" />
      <Identifier identifier="second" />
      <Identifier identifier="third" />
    </Grid>
  </Grid>
)
