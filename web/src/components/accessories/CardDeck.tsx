import React, { useMemo } from 'react'

import { useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import useMediaQuery from '@mui/material/useMediaQuery'

import LazyLoad from 'react-lazyload'

type Card = {
  key: string | number
  Card: JSX.Element
}

type Props = { cards: Card[] }

export default function CardDeck({ cards }: Props) {
  const theme = useTheme()
  const numCols = useMediaQuery(theme.breakpoints.up('xl'))
    ? 4
    : useMediaQuery(theme.breakpoints.up('lg'))
    ? 3
    : useMediaQuery(theme.breakpoints.up('md'))
    ? 2
    : 1

  const cardMatrix = useMemo<Card[][]>(
    () => arrangeCards(cards, numCols),
    [cards, numCols],
  )

  if (!cards.every((card) => card.key && card.Card)) {
    console.error('Invalid card structure passed into CardDeck')
    return <></>
  }
  if (!cardMatrix.length || !cardMatrix[0].length) return <></>
  return (
    <Grid container justifyContent="center" wrap="nowrap">
      {cardMatrix.map((cardColumn, col) => {
        if (!cardColumn.length) return null
        return (
          <Grid
            item
            flexBasis={0}
            container
            direction="column"
            alignItems="center"
            sx={{ margin: theme.spacing(2), outline: 'none' }}
            key={cardColumn.map((card) => card.key).join()}
          >
            {cardColumn.map((card, row) => {
              const timeout = Math.min(400 * Math.pow(col + row, 1 / 2), 1000)
              return (
                <Grow in timeout={timeout}>
                  <Grid item key={card.key}>
                    <LazyLoad offset={100} throttle={50} height={28} once>
                      {card.Card}
                    </LazyLoad>
                  </Grid>
                </Grow>
              )
            })}
          </Grid>
        )
      })}
    </Grid>
  )
}

function arrangeCards(cards: Card[], numCols: number): any {
  if (!Array.isArray(cards) || numCols <= 0) {
    return [[]]
  } else {
    return [...Array(numCols).keys()].map((_, col) =>
      cards.filter((_, row) => row % numCols === col),
    )
  }
}
