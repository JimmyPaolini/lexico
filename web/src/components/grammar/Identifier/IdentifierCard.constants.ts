import { ComponentProps } from 'react'

import { IdentifierCard } from './IdentifierCard'

export const identifierCardsData = [
  {
    id: 'mood',
    title: 'Mood',
    description: "Expresses the speaker's attitude towards a verb",
    identifiers: [
      {
        id: 'indicative',
        title: 'Indicative',
        description: 'Expresses factual information, actions that do happen',
      },
      {
        id: 'subjunctive',
        title: 'Subjunctive',
        description:
          'Expresses hypothetical actions, actions that might or might not happen',
      },
      {
        id: 'imperative',
        title: 'Imperative',
        description: 'Expresses commands to perform actions',
      },
      {
        id: '',
        title: '',
        description:
          'Some verb forms, like infinitives ' +
          'and non finite forms like participles ' +
          'and gerunds, do not have any mood',
      },
    ],
  },
  {
    id: 'tense',
    title: 'Tense',
    description: 'Expresses the reference time at which a verb occurs',
    identifiers: [
      {
        id: 'present',
        title: 'Present',
        description:
          'Expresses actions that are currently happening or happen regularly',
      },
      {
        id: 'imperfect',
        title: 'Imperfect',
        description: 'Expresses actions that happened over time in the past',
      },
      {
        id: 'future',
        title: 'Future',
        description:
          'Expresses actions that will or might happen in the future',
      },
      {
        id: 'perfect',
        title: 'Perfect',
        description:
          'Expresses actions that were completed at one time in the past',
      },
      {
        id: 'pluperfect',
        title: 'Pluperfect',
        description:
          'Expresses actions that were completed prior to another time in the past',
      },
      {
        id: 'future perfect',
        title: 'Future Perfect',
        description:
          'Expresse actions that will be completed prior to another time in the future',
      },
    ],
  },
  {
    id: 'voice',
    title: 'Voice',
    description: 'Expresses the relationship of a verb to its participants',
    identifiers: [
      {
        id: 'active',
        title: 'Active',
        description: 'Expresses actions which the subject directly performs',
      },
      {
        id: 'passive',
        title: 'Passive',
        description: 'Expresses actions which are performed on the subject',
      },
    ],
  },
  {
    id: 'person',
    title: 'Person',
    description: "Expresses a verb's participants",
    identifiers: [
      {
        id: 'first',
        title: 'First',
        description:
          'Expresses actions performed by the speaker or their group',
      },
      {
        id: 'second',
        title: 'Second',
        description: 'Expresses actions performed by the addressee(s)',
      },
      {
        id: 'third',
        title: 'Third',
        description:
          'Expresses actions performed by neither the speaker or addressee(s)',
      },
    ],
  },
  {
    id: 'number',
    title: 'Number',
    description: 'How many nouns perform a verb',
    identifiers: [
      {
        id: 'singular',
        title: 'Singular',
        description: 'Expresses verbs with one agent',
      },
      {
        id: 'plural',
        title: 'Plural',
        description: 'Expresses verbs with multiple agents',
      },
    ],
  },
  {
    id: 'case',
    title: 'Case',
    description: "Express a noun's relationships to entities",
    identifiers: [
      {
        id: 'nominative',
        title: 'Nominative',
        description: 'Expresses a noun as a subject',
      },
      {
        id: 'genitive',
        title: 'Genitive',
        description: "Expresses a noun's possession (of)",
      },
      {
        id: 'dative',
        title: 'Dative',
        description: 'Expresses a noun as an indirect object (to/for)',
      },
      {
        id: 'accusative',
        title: 'Accusative',
        description: 'Expresses a noun as an object',
      },
      {
        id: 'ablative',
        title: 'Ablative',
        description: 'Expresses a noun as an agent (by/with/from)',
      },
      {
        id: 'vocative',
        title: 'Vocative',
        description: 'Expresses a noun being direct addressed',
      },
      {
        id: 'locative',
        title: 'Locative',
        description: 'Expresses a noun as a location',
      },
    ],
  },
  {
    id: 'gender',
    title: 'Gender',
    description: "Expresses a noun or adjective's somewhat arbitrary category",
    identifiers: [
      {
        id: 'masculine',
        title: 'Masculine',
        description: 'Expresses a noun in the masculine category',
      },
      {
        id: 'feminine',
        title: 'Feminine',
        description: 'Expresses a noun in the feminine category',
      },
      {
        id: 'neuter',
        title: 'Neuter',
        description: 'Expresses a noun in the neuter category',
      },
    ],
  },
  {
    id: 'miscellaneous',
    title: 'Miscellaneous',
    description: 'Other verb identifiers',
    identifiers: [
      {
        id: 'infinitive',
        title: 'Infinitive',
        description: 'Expresses a basic form of a verb',
      },
      {
        id: 'non finite',
        title: 'Non Finite',
        description: 'Verbs conjugated without mood, person, or number',
      },
      {
        id: 'participle',
        title: 'Participle',
        description:
          'Verbs used as adjectives or as part of a compound verb tense',
      },
      {
        id: 'gerund',
        title: 'Gerund',
        description: 'Verbs used as a nouns',
      },
      {
        id: 'supine',
        title: 'Supine',
        description: 'Verbs used as nouns in specific cases',
      },
    ],
  },
] as ComponentProps<typeof IdentifierCard>[]
