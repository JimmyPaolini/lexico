import React from 'react'

import { Box, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Edit } from '@material-ui/icons'

import { useRouter } from 'next/router'

import { Text } from '../../graphql/generated'
import { LexicoTheme } from '../../theme'
import { sentenceCase } from '../../utils/string'
import CardHeader from '../accessories/CardHeader'
import ReaderLine from './ReaderLine'

interface ReaderTextProps {
  text: Text
  openModal: (word: string) => void
}
export default function ReaderText({ text, openModal }: ReaderTextProps) {
  const classes = useStyles()
  const router = useRouter()

  const title = sentenceCase(text.title)
  let subtitle = sentenceCase(text.author.id)
  if (text.book)
    subtitle += ' - ' + sentenceCase(text.book.title).replace(/^\d+ /, '')

  const action = !router.pathname.match(/\/reader\/custom/) ? undefined : (
    <IconButton
      onClick={() =>
        router.push(
          window?.location.pathname.replace('reader', 'literature') ||
            '/literature',
        )
      }
      aria-label="edit"
    >
      <Edit />
    </IconButton>
  )

  return (
    <Box className={classes.readerText}>
      <CardHeader
        title={router.pathname.match(/\/reader\/custom/) ? text.title : title}
        titleTypographyProps={{
          className: classes.title,
          component: 'h1',
        }}
        subheader={subtitle}
        subheaderTypographyProps={{
          className: classes.subtitle,
          component: 'h2',
        }}
        className={classes.cardHeader}
        classes={{ action: classes.shownAction }}
        action={action}
      />
      {text.lines.map((line) => (
        <ReaderLine {...{ line, openModal }} key={line.id} />
      ))}
    </Box>
  )
}

const useStyles = makeStyles((theme: LexicoTheme) => ({
  readerText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
    ...theme.typography.literature,
    fontSize: '1.7rem',
    lineHeight: 1.3,
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
  },
  subtitle: {
    textAlign: 'center',
    ...theme.typography.literature,
    fontSize: '1.3rem',
    lineHeight: 1.0,
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.0rem',
      lineHeight: 1.0,
    },
  },
  cardHeader: {
    width: '100%',
  },
  shownAction: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: theme.spacing(2),
  },
}))
