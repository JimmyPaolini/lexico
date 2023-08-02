import Head from 'next/head'

import { getGrammarCards } from '../components/grammar/GrammarCards.constants'
import { DeckLayout } from '../components/layout/DeckLayout'

export default function Grammar() {
  return (
    <>
      <Head>
        <title>Lexico - Grammar</title>
      </Head>
      <DeckLayout Cards={getGrammarCards([0, 1, 2, 3, 4])} />
    </>
  )
}
