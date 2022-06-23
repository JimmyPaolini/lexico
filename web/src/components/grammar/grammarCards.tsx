import { useRef } from 'react'

import AdjectiveDeclensionCard from './AdjectiveDeclensionCard'
import NounDeclensionCard from './NounDeclensionCard'
import VerbConjugationCard from './VerbConjugationCard'
import adjectiveDeclensions from './adjectiveDeclensions'
import nounDeclensions from './nounDeclensions'
import verbConjugations from './verbConjugations'

export default [
  ...verbConjugations.map((conjugation) => {
    const ref = useRef<HTMLDivElement>()
    const Card = (
      <VerbConjugationCard
        conjugation={conjugation}
        ref={ref}
        expandedInitial={conjugation.id === 'first'}
      />
    )
    return { key: 'verb' + conjugation.id, ref, Card }
  }),
  ...Object.values(nounDeclensions).map((declension) => {
    const ref = useRef<HTMLDivElement>()
    const Card = (
      <NounDeclensionCard
        declension={declension}
        ref={ref}
        expandedInitial={declension.id === 'first'}
      />
    )
    return { key: 'noun' + declension.id, ref, Card }
  }),
  ...adjectiveDeclensions.map((declension) => {
    const ref = useRef<HTMLDivElement>()
    const Card = (
      <AdjectiveDeclensionCard
        declension={declension}
        ref={ref}
        expandedInitial={declension.id === 'third'}
      />
    )
    return { key: 'adjective' + declension.id, ref, Card }
  }),
]
