import Head from "next/head"
import React, { useEffect, useRef, useState } from "react"
import CardDeck from "../components/accessories/CardDeck"
import AdjectiveDeclensionCard from "../components/grammar/AdjectiveDeclensionCard"
import adjectiveDeclensions from "../components/grammar/adjectiveDeclensions"
import NounDeclensionCard from "../components/grammar/NounDeclensionCard"
import nounDeclensions from "../components/grammar/nounDeclensions"
import VerbConjugationCard from "../components/grammar/VerbConjugationCard"
import verbConjugations from "../components/grammar/verbConjugations"
import SearchBarLayout from "../components/layout/SearchBarLayout"
import { getMacronOptionRegex } from "../utils/string"

export default function Grammar(): JSX.Element {
  const grammarCards = [
    ...verbConjugations.map((conjugation) => {
      const ref = useRef<HTMLDivElement>()
      const Card = (
        <VerbConjugationCard
          conjugation={conjugation}
          ref={ref}
          expandedInitial={conjugation.id === "first"}
        />
      )
      return { key: "verb" + conjugation.id, ref, Card }
    }),
    ...Object.values(nounDeclensions).map((declension) => {
      const ref = useRef<HTMLDivElement>()
      const Card = (
        <NounDeclensionCard
          declension={declension}
          ref={ref}
          expandedInitial={declension.id === "first"}
        />
      )
      return { key: "noun" + declension.id, ref, Card }
    }),
    ...adjectiveDeclensions.map((declension) => {
      const ref = useRef<HTMLDivElement>()
      const Card = (
        <AdjectiveDeclensionCard
          declension={declension}
          ref={ref}
          expandedInitial={declension.id === "third"}
        />
      )
      return { key: "adjective" + declension.id, ref, Card }
    }),
  ]

  const [search, setSearch] = useState<string>("")
  const [cards, setCards] = useState(grammarCards)

  useEffect(() => {
    if (!search) setCards(grammarCards)
  }, [search])

  const handleSearchExecute = () => {
    if (!search) return
    const re = new RegExp(getMacronOptionRegex(search), "i")
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
          target: "grammar",
        }}
      >
        <CardDeck cards={cards} />
      </SearchBarLayout>
    </>
  )
}
