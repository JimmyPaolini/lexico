import { Grid, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useRouter } from "next/router"
import React from "react"
import { useQuery } from "react-query"
import Text from "../../../../server/src/entity/literature/Text"
import getTextQuery from "../../graphql/literature/getText.gql"
import { graphQLClient } from "../_app"

export default function Reader() {
  const classes = useStyles()
  const router = useRouter()
  console.log(router.query)
  const {
    authorName,
    bookTitle,
    bookId,
    textTitle,
    textId,
  } = useLiteraturePath(router.query.literature as string[])
  if (!textId) return null
  const { data: text, isLoading } = useQuery(["getText", textId], async () => {
    const { getText: data } = await graphQLClient.request(getTextQuery, {
      id: textId,
    })
    return data as Text
  })
  authorName
  bookTitle
  bookId
  textTitle

  return (
    <Paper square elevation={0} className={classes.paper}>
      <Grid container justify="center">
        {!isLoading
          ? text?.lines.map((line) => {
              return <div>{line.line}</div>
            })
          : null}
      </Grid>
    </Paper>
  )
}

const useLiteraturePath = (literatueQueryPath: string[]) => {
  if (literatueQueryPath.length === 3) {
    const [authorName, textTitle, textId] = literatueQueryPath
    return { authorName, textTitle, textId }
  } else {
    const [
      authorName,
      bookTitle,
      bookId,
      textTitle,
      textId,
    ] = literatueQueryPath
    return { authorName, bookTitle, bookId, textTitle, textId }
  }
}

const useStyles = makeStyles((theme: any) => ({
  paper: {
    width: "100%",
    backgroundColor: "black",
    padding: theme.spacing(8),
    fontFamily: theme.typography.literature.fontFamily,
    fontWeight: theme.typography.literature.fontWeight,
    fontSize: theme.typography.literature.fontSize,
    fontHeight: theme.typography.literature.fontHeight,
    letterSpacing: theme.typography.literature.letterSpacing,
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    color: theme.palette.primary.contrastText,
  },
}))
