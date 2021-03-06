import { Grid, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { GetStaticPaths, GetStaticProps } from "next"
import React, { useState } from "react"
import { QueryFunctionContext, useQuery } from "react-query"
import Text from "../../../../entity/literature/Text"
import ReaderModal from "../../components/literature/ReaderModal"
import ReaderText from "../../components/literature/ReaderText"
import getTextQuery from "../../graphql/literature/getText.graphql"
import getTextsQuery from "../../graphql/literature/getTexts.graphql"
import { graphQLClient, queryClient } from "../_app"

interface Props {
  textId: string
}
export default function Reader({ textId }: Props) {
  const classes = useStyles()
  const { data: text, isLoading } = useQuery(["getText", textId], getText, {
    keepPreviousData: true,
  })

  const [searched, setSearched] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const openModal = (word: string) => {
    setSearched(word)
    setOpen(true)
  }

  return (
    <Paper square elevation={0} className={classes.reader}>
      <style jsx global>{`
        body#body {
          background-color: black;
        }
      `}</style>
      <Grid container justify="center">
        {!isLoading && !!text ? (
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
  const { textId } = useLiteraturePath(context.params?.literature as string[])
  await queryClient.prefetchQuery(["getText", textId], getText)
  return {
    notFound: !textId,
    props: { textId },
  }
}

const getText = async ({ queryKey: [, textId] }: QueryFunctionContext<any>) => {
  const { getText: data } = await graphQLClient.request(getTextQuery, {
    id: textId,
  })
  return data as Text
}

const useLiteraturePath = (literatueQueryPath: string[]) => {
  if (!literatueQueryPath) return {}
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
  reader: {
    width: "100%",
    height: "100%",
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
