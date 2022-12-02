import { useEffect, useState } from 'react'

import Head from 'next/head'

import { getMacronOptionRegex } from 'src/utils/string'

import { useGrammarCards } from '../components/grammar/grammarCards'
import { Deck } from '../components/layout/Deck'
import { SearchBarLayout } from '../components/layout/SearchBarLayout'

export default function Grammar() {
  const [search, setSearch] = useState<string>('')
  const grammarCards = useGrammarCards()
  const [cards, setCards] = useState(grammarCards)

  useEffect(() => {
    if (!search) setCards(grammarCards)
  }, [search])

  const handleSearchExecute = () => {
    if (!search) return
    const re = new RegExp(getMacronOptionRegex(search), 'i')
    setCards(
      grammarCards.filter(
        (card) =>
          card.props.declension
            ? JSON.stringify(Object.values(card.props.declension))?.match(re)
            : JSON.stringify(Object.values(card.props.conjugation))?.match(re),
        // card.ref.current?.innerText?.match(re)
      ),
    )
  }

  return (
    <>
      <Head>
        <title>Lexico - Grammar</title>
      </Head>
      <SearchBarLayout
        searchBarProps={{
          search,
          setSearch,
          isLoading: false,
          handleSearchExecute,
          target: 'grammar',
        }}
      >
        <Deck cards={cards} />
      </SearchBarLayout>
    </>
  )
}
