import abbreviationIcon from 'public/icon/partsOfSpeech/abbreviation.svg'
import adjectiveIcon from 'public/icon/partsOfSpeech/adjective.svg'
import adverbIcon from 'public/icon/partsOfSpeech/adverb.svg'
import conjunctionIcon from 'public/icon/partsOfSpeech/conjunction.svg'
import nounIcon from 'public/icon/partsOfSpeech/noun.svg'
import prefixIcon from 'public/icon/partsOfSpeech/prefix.svg'
import prepositionIcon from 'public/icon/partsOfSpeech/preposition.svg'
import pronounIcon from 'public/icon/partsOfSpeech/pronoun.svg'
import verbIcon from 'public/icon/partsOfSpeech/verb.svg'

export function partofSpeechToIcon(partOfSpeech: string) {
  if (['noun', 'properNoun'].includes(partOfSpeech)) {
    return nounIcon
  }
  if (['verb'].includes(partOfSpeech)) {
    return verbIcon
  }
  if (['adjective', 'participle'].includes(partOfSpeech)) {
    return adjectiveIcon
  }
  if (['adverb'].includes(partOfSpeech)) {
    return adverbIcon
  }
  if (['preposition'].includes(partOfSpeech)) {
    return prepositionIcon
  }
  if (['conjunction'].includes(partOfSpeech)) {
    return conjunctionIcon
  }
  if (['abbreviation', 'numeral'].includes(partOfSpeech)) {
    return abbreviationIcon
  }
  if (['prefix', 'suffix', 'interfix', 'circumfix'].includes(partOfSpeech)) {
    return prefixIcon
  }
  if (['pronoun', 'determiner'].includes(partOfSpeech)) {
    return pronounIcon
  }
  if (
    [
      'inflection',
      'particle',
      'interjection',
      'phrase',
      'proverb',
      'idiom',
    ].includes(partOfSpeech)
  ) {
    return null
  }
}
