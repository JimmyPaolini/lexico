import { Grid, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { memo, useContext, useEffect, useState } from "react"
import Text from "../../../../entity/literature/Text"
import { Context } from "../../components/layout/Context"
import LiteratureFallback from "../../components/literature/LiteratureFallback"
import ReaderModal from "../../components/reader/ReaderModal"
import ReaderText from "../../components/reader/ReaderText"
import getTextIdsQuery from "../../graphql/literature/getTextIds.graphql"
import { getText } from "../../hooks/literature/useGetText"
import useSnackbarEnhanced from "../../hooks/useSnackbarEnhanced"
import { MyTheme } from "../../theme/theme"
import { googleAnalyticsEvent } from "../../utils/googleAnalytics"
import { showReaderInstructions } from "../../utils/readerInstructions"
import { getSettingsLocal } from "../../utils/settingsLocal"
import { sentenceCase } from "../../utils/string"
import { graphQLClient } from "../_app"

interface Props {
  text: Text
}
export default memo(function Reader({ text }: Props): JSX.Element {
  const router = useRouter()
  if (router.isFallback) return <LiteratureFallback />
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

  let title = "Lexico - Literature: " + sentenceCase(text.author.id)
  if (text.book)
    title += " " + sentenceCase(text.book.title).replace(/^\d+ /, "")
  title += " " + sentenceCase(text.title)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`Read and translate ${title}`} />
        <meta
          name="keywords"
          content={`Latin ${text.author.name}${
            text.book ? ", " + text.book.title : ""
          }, ${text.title}, Literature, Read, English, Translation`}
        />
      </Head>
      <style jsx global>{`
        body#body {
          background-color: black;
        }
      `}</style>
      <Paper
        square
        elevation={0}
        className={classes.reader}
        style={{
          fontSize: user?.settings.fontSize || getSettingsLocal().fontSize,
        }}>
        <Grid container justify="center">
          {!!text && user !== undefined ? (
            <ReaderText {...{ text, openModal }} />
          ) : null}
        </Grid>
        <ReaderModal {...{ searched, open, setOpen }} />
      </Paper>
    </>
  )
})

export const getStaticPaths: GetStaticPaths = async () => {
  const { getTextIds: texts } = await graphQLClient.request(getTextIdsQuery)
  return {
    fallback: true,
    paths: texts.map((text: Text) => ({ params: { textId: text.id } })),
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const textId = params?.textId as string
  if (!textId) return { notFound: true }
  try {
    const text = await getText({ queryKey: ["getText", textId] })
    if (!text) return { notFound: true }
    return { props: { text } }
  } catch {
    return { notFound: true }
  }
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
