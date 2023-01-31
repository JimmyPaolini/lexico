import { useEffect, useState } from 'react'

import Head from 'next/head'

import { useLexicoContext } from 'src/components/layout/LexicoContext'

import { getGrammarCards } from '../components/grammar/GrammarCards.constants'
import { DeckLayout } from '../components/layout/DeckLayout'

export default function Grammar() {
  const { isMobile } = useLexicoContext()
  const [Cards, setCards] = useState(getGrammarCards([]))
  const [randomCardOpening, setRandomCardOpening] = useState(!isMobile)

  useEffect(() => {
    if (randomCardOpening) {
      const interval = setInterval(
        () =>
          setCards(getGrammarCards([Math.floor(Math.random() * Cards.length)])),
        5000
      )
      return () => clearInterval(interval)
    } else return () => null
  }, [randomCardOpening])

  return (
    <>
      <Head>
        <title>Lexico - Grammar</title>
      </Head>
      <DeckLayout Cards={Cards} onClick={() => setRandomCardOpening(false)} />
    </>
  )
}
