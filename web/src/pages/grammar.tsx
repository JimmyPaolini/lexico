import { useEffect, useState } from 'react'

import Head from 'next/head'

import { filterGrammarCards } from '../components/grammar/filterGrammarCards'
import { GrammarCards } from '../components/grammar/useGrammarCards'
import { Deck } from '../components/layout/Deck'
import { SearchBarLayout } from '../components/layout/SearchBarLayout'

export default function Grammar() {
  const [search, setSearch] = useState<string>('')
  const [Cards, setCards] = useState(GrammarCards)

  useEffect(() => {
    if (!search) setCards(GrammarCards)
  }, [search])

  const handleSearch = (search: string) => {
    if (!search) return
    setSearch(search)
    setCards(filterGrammarCards(GrammarCards, search))
  }

  return (
    <>
      <Head>
        <title>Lexico - Grammar</title>
      </Head>
      <SearchBarLayout
        handleSearch={handleSearch}
        isLoading={false}
        placeholder="Search Grammar"
      >
        <Deck Cards={Cards} />
      </SearchBarLayout>
    </>
  )
}
