import { getMacronOptionRegex } from 'src/utils/string'

import { GrammarCards } from './useGrammarCards'

export const filterGrammarCards = (
  Cards: typeof GrammarCards,
  search: string
) => {
  const re = new RegExp(getMacronOptionRegex(search), 'i')
  return Cards.filter((GrammarCard) => {
    if (keys(GrammarCard.props.declension).match(re)) return true
    if (keys(GrammarCard.props.conjugation).match(re)) return true
    // if (GrammarCard.ref.current?.innerText?.match(re)) return true
    else return false
  })
}

const keys = (obj: object): string => JSON.stringify(Object.values(obj))
