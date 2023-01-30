import { AdjectiveGrammar } from './Adjective'
import { IdentifierCard } from './Identifier/IdentifierCard'
import { identifierCardsData } from './Identifier/IdentifierCard.constants'
import { NounGrammar } from './Noun/NounGrammar'
import { PartsOfSpeechCard } from './PartsOfSpeech'
import { partsOfSpeechCardData } from './PartsOfSpeech/PartsOfSpeechCard.constants'
import { VerbGrammar } from './Verb'

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
  <VerbGrammar
    key="verb"
    expandedInitial={expandedInitialIndices.includes(
      2 + identifierCardsData.length
    )}
  />,
  <NounGrammar
    key="noun"
    expandedInitial={expandedInitialIndices.includes(
      3 + identifierCardsData.length
    )}
  />,
  <AdjectiveGrammar
    key="adjective"
    expandedInitial={expandedInitialIndices.includes(
      4 + identifierCardsData.length
    )}
  />,
]
