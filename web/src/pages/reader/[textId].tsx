import { useContext, useEffect, useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Grid, Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { GetStaticPaths, GetStaticProps } from 'next'

import { Context } from 'src/components/layout/Context'
import { ReaderLoading } from 'src/components/reader/ReaderLoading'
import { SearchModal } from 'src/components/reader/SearchModal'
import { Text } from 'src/components/reader/Text'
import { shouldShowReaderInstructions } from 'src/components/reader/readerInstructions'
import { getSettingsLocal } from 'src/components/user/settings/settingsLocal'
import {
  Text as ReaderText,
  useTextIdsQuery,
  useTextQuery,
} from 'src/graphql/generated'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { googleAnalyticsEvent } from 'src/utils/googleAnalytics'
import { sentenceCase } from 'src/utils/string'

type Props = { text: ReaderText }

export default function Reader({ text }: Props) {
  const theme = useTheme()
  const router = useRouter()
  if (router.isFallback) return <ReaderLoading />

  const { user } = useContext(Context)

  const [searched, setSearched] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const openModal = (word: string) => {
    setSearched(word)
    setOpen(true)
    googleAnalyticsEvent('search', {
      category: 'literature',
      label: text.title,
      value: word,
    })
  }

  const enqueueSnackbar = useSnackbar()
  useEffect(() => {
    if (shouldShowReaderInstructions()) {
      enqueueSnackbar(
        'Click a word to see its dictionary entry, then click elsewhere or swipe it away to keep reading'
      )
    }
  }, [])

  useEffect(() => {
    googleAnalyticsEvent('reader', {
      category: 'literature',
      label: 'open',
      value: text.title,
    })
  }, [])

  let title = 'Lexico - Literature: ' + sentenceCase(text.author.id)
  if (text.book) {
    title += ' ' + sentenceCase(text.book.title).replace(/^\d+ /, '')
  }
  title += ' ' + sentenceCase(text.title)

  const fontSize = (user?.settings?.fontSize ||
    getSettingsLocal().fontSize) as number

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`Read and translate ${title}`} />
        <meta
          name="keywords"
          content={`Latin ${text.author.name}${
            text.book ? ', ' + text.book.title : ''
          }, ${text.title}, Library, Literature, Read, English, Translation`}
        />
      </Head>
      <style>{`
        body#body {
          background-color: black;
        }
      `}</style>
      <Paper
        square
        elevation={0}
        sx={{
          width: '100%',
          height: '100%',
          background: 'black',
          ...theme.custom.literature,
        }}
        style={{ fontSize }}
      >
        <Grid container justifyContent="center">
          {!!text && user !== undefined ? (
            <Text {...{ text, openModal }} />
          ) : null}
        </Grid>
        <SearchModal {...{ searched, open, setOpen }} />
      </Paper>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { textIds } = await useTextIdsQuery.fetcher()()
  return {
    fallback: true,
    paths: textIds.map((textId) => ({ params: { textId } })),
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const textId = params?.textId as string
  if (!textId) return { notFound: true }
  try {
    const { text } = await useTextQuery.fetcher({ id: textId })()
    if (!text) return { notFound: true }
    console.log(text)
    return { props: { text } }
  } catch {
    return { notFound: true }
  }
}
