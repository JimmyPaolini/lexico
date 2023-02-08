import {
  abbreviateCase,
  abbreviateGender,
  abbreviateIdentifier,
  abbreviateMisc,
  abbreviateMood,
  abbreviateNumber,
  abbreviatePartOfSpeech,
  abbreviatePerson,
  abbreviateTense,
  abbreviateVoice,
  unabbreviateCase,
  unabbreviateGender,
  unabbreviateIdentifier,
  unabbreviateMisc,
  unabbreviateMood,
  unabbreviateNumber,
  unabbreviatePartOfSpeech,
  unabbreviatePerson,
  unabbreviateTense,
  unabbreviateVoice,
} from './Identifier.constants'

export type PartOfSpeech = keyof typeof abbreviatePartOfSpeech
export type PartOfSpeechAbbreviation = keyof typeof unabbreviatePartOfSpeech

export type Case = keyof typeof abbreviateCase
export type CaseAbbreviation = keyof typeof unabbreviateCase

export type Gender = keyof typeof abbreviateGender
export type GenderAbbreviation = keyof typeof unabbreviateGender

export type Number = keyof typeof abbreviateNumber
export type NumberAbbreviation = keyof typeof unabbreviateNumber

export type Mood = keyof typeof abbreviateMood
export type MoodAbbreviation = keyof typeof unabbreviateMood

export type Tense = keyof typeof abbreviateTense
export type TenseAbbreviation = keyof typeof unabbreviateTense

export type Misc = keyof typeof abbreviateMisc
export type MiscAbbreviation = keyof typeof unabbreviateMisc

export type Voice = keyof typeof abbreviateVoice
export type VoiceAbbreviation = keyof typeof unabbreviateVoice

export type Person = keyof typeof abbreviatePerson
export type PersonAbbreviation = keyof typeof unabbreviatePerson

export type Identifier = keyof typeof abbreviateIdentifier
export type IdentifierAbbreviation = keyof typeof unabbreviateIdentifier
