import Grid from "@material-ui/core/Grid"
import Grow from "@material-ui/core/Grow"
import { makeStyles, Theme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import React, { Dispatch, memo, useEffect, useState } from "react"
import LazyLoad from "react-lazyload"

type Card = {
  key: string | number
  Card: JSX.Element
}

type Props = {
  cards: Card[]
}
export default memo(function CardDeck({ cards }: Props) {
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
    return <></>
  }
  if (!columns.length || !columns[0].length) return <></>
  return (
    <>
      {columns.map((column, col) => {
        if (!column.length) return null
        return (
          <Grid
            item
            container
            direction="column"
            alignItems="stretch"
            className={classes.column}
            key={column.map((card) => card.key).join()}
          >
            {column.map((card, row) => {
              const timeout = Math.min(400 * Math.pow(col + row, 1 / 2), 1000)
              return (
                <Grid item key={card.key}>
                  <Grow in appear exit timeout={timeout}>
                    <LazyLoad offset={100} throttle={50} height={28} once>
                      {card.Card}
                    </LazyLoad>
                  </Grow>
                </Grid>
              )
            })}
          </Grid>
        )
      })}
    </>
  )
})

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
    maxWidth: theme.custom.cardWidth + theme.spacing(2),
    minWidth: theme.custom.cardWidth - theme.spacing(2),
    outline: "none",
  },
}))
