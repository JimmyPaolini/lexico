import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import CardDeck from "../components/accessories/CardDeck"
import NounCard from "../components/grammar/NounCard"
import { MyTheme } from "../theme/theme"

export default function Grammar(): JSX.Element {
  const classes = useStyles()
  const cards = [NounCard]

  return (
    <Grid container justify="center" className={classes.container}>
      <CardDeck cards={cards.map((Card) => ({ key: Card.name, Card }))} />
    </Grid>
  )
}

const useStyles = makeStyles((theme: MyTheme) => ({
  container: {
    margin: theme.spacing(4),
  },
}))
