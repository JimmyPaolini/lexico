import { useRef } from 'react'

import AdjectiveDeclensionCard from './AdjectiveDeclensionCard'
import NounDeclensionCard from './NounDeclensionCard'
import VerbConjugationCard from './VerbConjugationCard'
import adjectiveDeclensions from './adjectiveDeclensions'
import nounDeclensions from './nounDeclensions'
import verbConjugations from './verbConjugations'

export default function useGrammarCards() {
  return [
    ...verbConjugations.map((conjugation) => {
      const ref = useRef<HTMLDivElement>()
      return (
        <VerbConjugationCard
          conjugation={conjugation}
          ref={ref}
          expandedInitial={conjugation.id === 'first'}
        />
      )
    }),
    ...Object.values(nounDeclensions).map((declension) => {
      const ref = useRef<HTMLDivElement>()
      return (
        <NounDeclensionCard
          declension={declension}
          ref={ref}
          expandedInitial={declension.id === 'first'}
        />
      )
    }),
    ...adjectiveDeclensions.map((declension) => {
      const ref = useRef<HTMLDivElement>()
      return (
        <AdjectiveDeclensionCard
          declension={declension}
          ref={ref}
          expandedInitial={declension.id === 'third'}
        />
      )
    }),
  ]
}
