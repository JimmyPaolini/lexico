import Grid from "@material-ui/core/Grid"
import Grow from "@material-ui/core/Grow"
import { makeStyles, Theme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import React, { Dispatch, useEffect, useState } from "react"
import LazyLoad from "react-lazyload"

type Card = {
  key: string | number
  Card: () => JSX.Element
}

interface Props {
  cards: Card[]
}

export default function CardDeck({ cards }: Props) {
  const classes = useStyles()

  let numCols = 1
  if (useMediaQuery((theme: Theme) => theme.breakpoints.up("md"))) numCols = 2
  if (useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"))) numCols = 3
  if (useMediaQuery((theme: Theme) => theme.breakpoints.up("xl"))) numCols = 4

  const [columns, setColumns] = useState<Card[][]>([[]])

  useEffect(() => {
    reorganizeCards(cards, numCols, setColumns)
  }, [cards, numCols])

  if (!cards.every((card) => card.key && card.Card)) {
    console.error("Invalid card structure passed into CardDeck")
    return null
  }
  if (!columns.length || !columns[0].length) return null
  return (
    <>
      {columns.map((column, col) => {
        if (!column.length) return null
        const key = column.map((card) => card.key).join("")
        return (
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            spacing={4}
            className={classes.column}
            key={key}
          >
            {column.map((card, row) => {
              const timeout = 400 * Math.pow(col + row, 1 / 2)
              return (
                <Grid item>
                  <LazyLoad offset={100} throttle={50} height={28}>
                    <Grow
                      in
                      key={card.key}
                      {...(row || col ? { timeout } : {})}
                    >
                      <card.Card />
                    </Grow>
                  </LazyLoad>
                </Grid>
              )
            })}
          </Grid>
        )
      })}
    </>
  )
}

function reorganizeCards(
  cards: Card[],
  numCols: number,
  setColumns: Dispatch<React.SetStateAction<Card[][]>>,
): any {
  if (numCols <= 0 || !Array.isArray(cards)) return [[]]
  setColumns(
    [...Array(numCols).keys()].map((_, col) =>
      cards.filter((_, row) => row % numCols === col),
    ),
  )
}

const useStyles = makeStyles((theme: any) => ({
  column: {
    width: theme.custom.cardWidth + 2 * theme.spacing(4),
  },
}))
