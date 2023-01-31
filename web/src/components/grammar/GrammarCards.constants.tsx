import { AdjectiveGrammar } from './Adjective'
import { Identifiers } from './Identifier'
import { NounGrammar } from './Noun'
import { PartsOfSpeechCard } from './PartsOfSpeech'
import { VerbGrammar } from './Verb'

export const getGrammarCards = (expandedInitialIndices: number[]) => [
  <VerbGrammar
    key="verb"
    // expandedInitial={expandedInitialIndices.includes(0)}
  />,
  <NounGrammar
    key="noun"
    // expandedInitial={expandedInitialIndices.includes(1)}
  />,
  <AdjectiveGrammar
    key="adjective"
    // expandedInitial={expandedInitialIndices.includes(2)}
  />,
  <Identifiers
    key="identifiers"
    // expandedInitial={expandedInitialIndices.includes(3)}
  />,
  <PartsOfSpeechCard
    key="partsOfSpeech"
    // expandedInitial={expandedInitialIndices.includes(4)}
  />,
]
