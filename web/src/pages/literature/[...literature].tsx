import { Grid, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { GetStaticPaths, GetStaticProps } from "next"
import { useContext, useState } from "react"
import Text from "../../../../entity/literature/Text"
import { Context } from "../../components/Context"
import ReaderModal from "../../components/literature/ReaderModal"
import ReaderText from "../../components/literature/ReaderText"
import getTextsQuery from "../../graphql/literature/getTexts.graphql"
import useGetText, { getText } from "../../hooks/literature/useGetText"
import { graphQLClient } from "../_app"

interface Props {
  initialText: Text
}
export default function Reader({ initialText }: Props) {
  const classes = useStyles()
  const { user } = useContext(Context)
  const { data: text, isLoading } = useGetText(initialText?.id, initialText)

  const [searched, setSearched] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const openModal = (word: string) => {
    setSearched(word)
    setOpen(true)
  }

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
        {!isLoading && !!text && user !== undefined ? (
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
    paths: texts.map((text: Text) => {
      const literature = [text.author.name]
      if (text.book) literature.push(text.book.title, text.book.id)
      literature.push(text.title, text.id)
      return { params: { literature } }
    }),
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const textId = context.params?.literature[0]!
  if (!textId) return { notFound: true }
  const initialText = await getText({ queryKey: [null, textId] })
  if (!initialText) return { notFound: true }
  else return { props: { initialText } }
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
