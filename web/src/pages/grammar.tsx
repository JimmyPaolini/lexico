import { useEffect, useState } from 'react'

import Head from 'next/head'

import { Box } from '@mui/material'

import { useLexicoContext } from 'src/components/layout/LexicoContext'

import { getGrammarCards } from '../components/grammar/GrammarCards.constants'
import { filterGrammarCards } from '../components/grammar/filterGrammarCards'
import { Deck } from '../components/layout/Deck'
import { SearchBarLayout } from '../components/layout/SearchBarLayout'

export default function Grammar() {
  const { isMobile } = useLexicoContext()
  const [search, setSearch] = useState<string>('')
  const [Cards, setCards] = useState(getGrammarCards([]))
  const [randomCardOpening, setRandomCardOpening] = useState(!isMobile)

  useEffect(() => {
    if (!search) {
      setCards(
        getGrammarCards([
          Math.floor(Math.random() * Cards.length),
          Math.floor(Math.random() * Cards.length),
          Math.floor(Math.random() * Cards.length),
          Math.floor(Math.random() * Cards.length),
          Math.floor(Math.random() * Cards.length),
        ])
      )
      setRandomCardOpening(true)
    }
  }, [search])

  useEffect(() => {
    if (randomCardOpening) {
      const interval = setInterval(
        () =>
          setCards(
            getGrammarCards([
              Math.floor(Math.random() * Cards.length),
              Math.floor(Math.random() * Cards.length),
              Math.floor(Math.random() * Cards.length),
              Math.floor(Math.random() * Cards.length),
              Math.floor(Math.random() * Cards.length),
            ])
          ),
        5000
      )
      return () => clearInterval(interval)
    } else return () => null
  }, [randomCardOpening])

  const handleSearch = (search: string) => {
    if (!search) {
      setRandomCardOpening(true)
      return
    }
    setSearch(search)
    setCards(filterGrammarCards(getGrammarCards([]), search))
  }

  return (
    <>
      <Head>
        <title>Lexico - Grammar</title>
      </Head>
      <Box
        onClick={() => {
          if (randomCardOpening) {
            setCards(getGrammarCards([]))
          }
          setRandomCardOpening(false)
        }}
      >
        <SearchBarLayout
          handleSearch={handleSearch}
          isLoading={false}
          placeholder="Search Grammar"
        >
          <Deck Cards={Cards} />
        </SearchBarLayout>
      </Box>
    </>
  )
}
