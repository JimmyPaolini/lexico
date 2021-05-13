import { Grid, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { GetStaticPaths, GetStaticProps } from "next"
import { useSnackbar } from "notistack"
import { useContext, useEffect, useState } from "react"
import Text from "../../../../entity/literature/Text"
import { Context } from "../../components/Context"
import ReaderModal from "../../components/literature/ReaderModal"
import ReaderText from "../../components/literature/ReaderText"
import getTextsQuery from "../../graphql/literature/getTexts.graphql"
import { getText } from "../../hooks/literature/useGetText"
import { showReaderInstructions } from "../../utils/readerInstructions"
import { graphQLClient } from "../_app"

interface Props {
  text: Text
}
export default function Reader({ text }: Props) {
  const classes = useStyles()
  const { user } = useContext(Context)

  const [searched, setSearched] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const openModal = (word: string) => {
    setSearched(word)
    setOpen(true)
  }

  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    if (showReaderInstructions()) {
      const readerInstructions = `Click a word to see its dictionary entry, then click elsewhere or swipe it away to keep reading`
      enqueueSnackbar(readerInstructions, { variant: "info" })
    }
  }, [])

  return (
    <Paper
      square
      elevation={0}
      className={classes.reader}
      style={{ fontSize: user?.settings.fontSize }}
    >
      <style jsx global>{`
        body#body {
          background-color: black;
        }
      `}</style>
      <Grid container justify="center">
        {!!text && user !== undefined ? (
          <ReaderText
            {...{
              text,
              openModal,
            }}
          />
        ) : null}
      </Grid>
      <ReaderModal {...{ searched, open, setOpen }} />
    </Paper>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getTexts: texts } = await graphQLClient.request(getTextsQuery)
  return {
    fallback: true,
    paths: texts.map((text: Text) => ({ params: { literature: [text.id] } })),
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const textId = context.params?.literature[0]!
  if (!textId) return { notFound: true }
  let text: Text
  try {
    text = await getText({ queryKey: [null, textId] })
  } catch {
    return { notFound: true }
  }
  if (!text) return { notFound: true }
  else return { props: { text } }
}

const useStyles = makeStyles((theme: any) => ({
  reader: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
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
