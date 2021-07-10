import { Grid, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { GetStaticPaths, GetStaticProps } from "next"
import { useContext, useEffect, useState } from "react"
import Text from "../../../../entity/literature/Text"
import { Context } from "../../components/layout/Context"
import ReaderModal from "../../components/literature/reader/ReaderModal"
import ReaderText from "../../components/literature/reader/ReaderText"
import getTextIdsQuery from "../../graphql/literature/getTextIds.graphql"
import { getText } from "../../hooks/literature/useGetText"
import useSnackbarEnhanced from "../../hooks/useSnackbarEnhanced"
import { MyTheme } from "../../theme/theme"
import { googleAnalyticsEvent } from "../../utils/googleAnalytics"
import { getSettingsLocal } from "../../utils/localSettings"
import { showReaderInstructions } from "../../utils/readerInstructions"
import { graphQLClient } from "../_app"

interface Props {
  text: Text
}
export default function Reader({ text }: Props): JSX.Element {
  const classes = useStyles({})
  const { user } = useContext(Context)

  const [searched, setSearched] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const openModal = (word: string) => {
    setSearched(word)
    setOpen(true)
    googleAnalyticsEvent("search", {
      category: "literature",
      label: text.title,
      value: word,
    })
  }

  const { enqueueSnackbar } = useSnackbarEnhanced()
  useEffect(() => {
    if (showReaderInstructions()) {
      enqueueSnackbar(
        `Click a word to see its dictionary entry, then click elsewhere or swipe it away to keep reading`,
        { variant: "info" },
      )
    }
  }, [])

  useEffect(() => {
    googleAnalyticsEvent("reader", {
      category: "literature",
      label: "open",
      value: text.title,
    })
  }, [])

  return (
    <Paper
      square
      elevation={0}
      className={classes.reader}
      style={{
        fontSize: user?.settings.fontSize || getSettingsLocal().fontSize,
      }}>
      <style jsx global>{`
        body#body {
          background-color: black;
        }
      `}</style>
      <Grid container justify="center">
        {!!text && user !== undefined ? (
          <ReaderText {...{ text, openModal }} />
        ) : null}
      </Grid>
      <ReaderModal {...{ searched, open, setOpen }} />
    </Paper>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getTextIds: texts } = await graphQLClient.request(getTextIdsQuery)
  return {
    fallback: true,
    paths: texts.map((text: Text) => ({ params: { literature: [text.id] } })),
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) return { notFound: true }
  const textId = context.params.literature[0]
  console.log(textId)
  if (!textId) return { notFound: true }
  let text: Text
  try {
    text = await getText({ queryKey: ["getText", textId] })
    if (!text) return { notFound: true }
  } catch {
    return { notFound: true }
  }
  return { props: { text } }
}

const useStyles = makeStyles((theme: MyTheme) => ({
  reader: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    ...theme.typography.literature,
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
