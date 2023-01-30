import { AdjectiveGrammar } from './Adjective'
import { Identifiers } from './Identifier/Identifiers'
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
  <Identifiers
    key="identifiers"
    expandedInitial={expandedInitialIndices.includes(1)}
  />,
  <VerbGrammar
    key="verb"
    expandedInitial={expandedInitialIndices.includes(3)}
  />,
  <NounGrammar
    key="noun"
    expandedInitial={expandedInitialIndices.includes(4)}
  />,
  <AdjectiveGrammar
    key="adjective"
    expandedInitial={expandedInitialIndices.includes(5)}
  />,
]
