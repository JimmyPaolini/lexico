import {
  AdjectiveDeclensionCard,
  adjectiveDeclensionCardsData,
} from './Adjective'
import { IdentifierCard } from './Identifier/IdentifierCard'
import { identifierCardsData } from './Identifier/IdentifierCard.constants'
import { NounDeclensionCard, nounDeclensionCardsData } from './Noun'
import { PartsOfSpeechCard } from './PartsOfSpeech'
import { partsOfSpeechCardData } from './PartsOfSpeech/PartsOfSpeechCard.constants'
import { VerbConjugationCard, verbConjugationCardsData } from './Verb'

export const getGrammarCards = (expandedInitialIndices: number[]) => [
  <PartsOfSpeechCard
    key="partsOfSpeech"
    {...partsOfSpeechCardData}
    expandedInitial={expandedInitialIndices.includes(0)}
  />,
  ...identifierCardsData.map((identifierCardData, i) => (
    <IdentifierCard
      key={'identifier-' + identifierCardData.id}
      {...identifierCardData}
      expandedInitial={expandedInitialIndices.includes(i + 1)}
    />
  )),
  ...verbConjugationCardsData.map((conjugation, i) => (
    <VerbConjugationCard
      key={'verb-' + conjugation.id}
      {...conjugation}
      expandedInitial={expandedInitialIndices.includes(
        i + 1 + identifierCardsData.length
      )}
    />
  )),
  ...nounDeclensionCardsData.map((declension, i) => (
    <NounDeclensionCard
      key={'noun-' + declension.id}
      {...declension}
      expandedInitial={expandedInitialIndices.includes(
        i + 1 + identifierCardsData.length + verbConjugationCardsData.length
      )}
    />
  )),
  ...adjectiveDeclensionCardsData.map((declension, i) => (
    <AdjectiveDeclensionCard
      key={'adjective-' + declension.id}
      {...declension}
      expandedInitial={expandedInitialIndices.includes(
        i +
          1 +
          identifierCardsData.length +
          verbConjugationCardsData.length +
          nounDeclensionCardsData.length
      )}
    />
  )),
]
