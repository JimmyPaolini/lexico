import { AdjectiveDeclensionCard } from './AdjectiveDeclensionCard'
import { NounDeclensionCard } from './NounDeclensionCard'
import { VerbConjugationCard } from './VerbConjugationCard'
import { adjectiveDeclensions } from './adjectiveDeclensions'
import { nounDeclensions } from './nounDeclensions'
import { verbConjugations } from './verbConjugations'

export const useGrammarCards = () => {
  return [
    ...verbConjugations.map((conjugation) => (
      <VerbConjugationCard
        conjugation={conjugation}
        expandedInitial={conjugation.id === 'first'}
      />
    )),
    ...Object.values(nounDeclensions).map((declension) => (
      <NounDeclensionCard
        declension={declension}
        expandedInitial={declension.id === 'first'}
      />
    )),
    ...adjectiveDeclensions.map((declension) => (
      <AdjectiveDeclensionCard
        declension={declension}
        expandedInitial={declension.id === 'third'}
      />
    )),
  ]
}
