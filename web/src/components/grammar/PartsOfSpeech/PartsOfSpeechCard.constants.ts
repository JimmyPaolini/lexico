import { ComponentProps } from 'react'

import { PartsOfSpeechCard } from './PartsOfSpeechCard'

export const partsOfSpeechCardData = {
  id: 'partsOfSpeech',
  title: 'Parts of Speech',
  description: 'Lexical Categories',
  partsOfSpeech: [
    {
      id: 'noun',
      title: 'Noun',
      description: 'Expresses things',
    },
    {
      id: 'verb',
      title: 'Verb',
      description: 'Expresses actions',
    },
    {
      id: 'adjective',
      title: 'Adjective, Participle',
      description: 'Words describing things',
    },
    {
      id: 'adverb',
      title: 'Adverb',
      description: 'Words describing actions',
    },
    {
      id: 'pronoun',
      title: 'Pronoun, Determiner',
      description: 'Expresses a noun in the neuter category',
    },
    {
      id: 'preposition',
      title: 'Preposition',
      description: 'Expresses a noun in the feminine category',
    },
    {
      id: 'conjunction',
      title: 'Conjunction',
      description: 'Expresses a noun in the neuter category',
    },
    {
      id: 'abbreviation',
      title: 'Abbreviation, Numeral',
      description: 'Expresses a noun in the masculine category',
    },
    {
      id: 'prefix',
      title: 'Prefix, Suffix, Interfix, Circumfix',
      description: 'Expresses a noun in the feminine category',
    },
  ],
} as ComponentProps<typeof PartsOfSpeechCard>
