import { useMemo } from 'react'

import { useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import useMediaQuery from '@mui/material/useMediaQuery'

import LazyLoad from 'react-lazyload'

type Card = JSX.Element
type Props = { cards: Card[] }

export const getCardKey = (Card: JSX.Element) =>
  Card.props?.entry?.id ?? JSON.stringify(Card.props)

export const Deck = ({ cards }: Props) => {
  const theme = useTheme()
  const isXl = useMediaQuery(theme.breakpoints.up('xl'))
  const isLg = useMediaQuery(theme.breakpoints.up('lg'))
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const numCols = isXl ? 4 : isLg ? 3 : isMd ? 2 : 1

  const cardCols = useMemo<Card[][]>(
    () => arrangeCards(cards, numCols),
    [cards, numCols],
  )

  return !cardCols?.[0]?.length ? null : (
    <Grid
      container
      justifyContent="center"
      wrap="nowrap"
      sx={{  outline: 'none' }}
    >
      {cardCols.map((cardCol, colNum) => {
        return !cardCol.length ? null : (
          <Grid
            item
            container
            // flexGrow={1}
            direction="column"
            alignItems="center"
            sx={{ width: 'auto', outline: 'none' }}
            key={cardCol.map((Card) => getCardKey(Card)).join()}
          >
            {cardCol.map((Card, rowNum) =>(
              <Grow
                in
                key={getCardKey(Card)}
                timeout={Math.min(
                  400 * Math.pow(colNum + rowNum, 1 / 2),
                  1000,
                )}
              >
                <Grid item>
                  <LazyLoad offset={100} throttle={50} height={28} once>
                    {Card}
                  </LazyLoad>
                </Grid>
              </Grow>
            ))}
          </Grid>
        )
      })}
    </Grid>
  )
}

function arrangeCards(cards: Card[], numCols: number): Card[][] {
  if (!Array.isArray(cards) || numCols <= 0) {
    return [[]]
  } else {
    return [...Array(numCols).keys()].map((_, colNum) =>
      cards.filter((_, rowNum) => rowNum % numCols === colNum),
    )
  }
}
