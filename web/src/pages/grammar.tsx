import React, { useEffect, useState } from 'react'

import Head from 'next/head'

import CardDeck from '../components/accessories/CardDeck'
import useGrammarCards from '../components/grammar/grammarCards'
import SearchBarLayout from '../components/layout/SearchBarLayout'
import { getMacronOptionRegex } from '../utils/string'

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
          card.Card.props.declension
            ? JSON.stringify(Object.values(card.Card.props.declension))?.match(
                re,
              )
            : JSON.stringify(Object.values(card.Card.props.conjugation))?.match(
                re,
              ),
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
        <CardDeck cards={cards} />
      </SearchBarLayout>
    </>
  )
}
