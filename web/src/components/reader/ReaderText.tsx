import React from 'react'

import { Edit } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'

import { Text } from '../../graphql/generated'
import { sentenceCase } from '../../utils/string'
import CardHeader from '../accessories/CardHeader'
import ReaderLine from './ReaderLine'

const PREFIX = 'ReaderText'

const classes = {
  readerText: `${PREFIX}-readerText`,
  title: `${PREFIX}-title`,
  subtitle: `${PREFIX}-subtitle`,
  cardHeader: `${PREFIX}-cardHeader`,
  shownAction: `${PREFIX}-shownAction`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.readerText}`]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.title}`]: {
    textAlign: 'center',
    ...theme.typography.literature,
    fontSize: '1.7rem',
    lineHeight: 1.3,
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
  },

  [`& .${classes.subtitle}`]: {
    textAlign: 'center',
    ...theme.typography.literature,
    fontSize: '1.3rem',
    lineHeight: 1.0,
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.0rem',
      lineHeight: 1.0,
    },
  },

  [`& .${classes.cardHeader}`]: {
    width: '100%',
  },

  [`& .${classes.shownAction}`]: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: theme.spacing(2),
  },
}))

type Props = {
  text: Text
  openModal: (word: string) => void
}

export default function ReaderText({ text, openModal }: Props) {
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
      size="large"
    >
      <Edit />
    </IconButton>
  )

  return (
    <StyledBox className={classes.readerText}>
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
    </StyledBox>
  )
}
