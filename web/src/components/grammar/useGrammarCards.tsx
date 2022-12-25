import { AdjectiveDeclensionCard, adjectiveDeclensions } from './Adjective'
import { NounDeclensionCard, nounDeclensions } from './Noun'
import { VerbConjugationCard, verbConjugations } from './Verb'

export const GrammarCards = [
  ...verbConjugations.map((conjugation) => (
    <VerbConjugationCard
      key={conjugation.id}
      conjugation={conjugation}
      expandedInitial={conjugation.id === 'first'}
    />
  )),
  ...Object.values(nounDeclensions).map((declension) => (
    <NounDeclensionCard
      key={declension.id}
      declension={declension}
      expandedInitial={declension.id === 'first'}
    />
  )),
  ...adjectiveDeclensions.map((declension) => (
    <AdjectiveDeclensionCard
      key={declension.id}
      declension={declension}
      expandedInitial={declension.id === 'third'}
    />
  )),
]
