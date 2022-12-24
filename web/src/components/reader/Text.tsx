import { useRouter } from 'next/router'

import { Edit } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Text as TextGql } from 'src/graphql/generated'
import { sentenceCase } from 'src/utils/string'

import { CardHeader } from '../accessories/CardHeader'
import { Line } from './Line'

type Props = { text: TextGql; openModal: (word: string) => void }

export const Text = ({ text, openModal }: Props) => {
  const router = useRouter()
  const theme = useTheme()

  const title = sentenceCase(text.title)
  const subtitle =
    sentenceCase(text.author.id) +
    (text.book
      ? ' - ' + sentenceCase(text.book.title).replace(/^\d+ /, '')
      : '')

  const action = !router.pathname.match(/\/reader\/custom/) ? undefined : (
    <IconButton
      onClick={async () =>
        await router.push(
          window?.location.pathname.replace('reader', 'library') || '/library'
        )
      }
      aria-label="edit"
      size="large"
    >
      <Edit />
    </IconButton>
  )

  return (
    <Box
      sx={{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: theme.spacing(2),
      }}
    >
      <CardHeader
        title={router.pathname.match(/\/reader\/custom/) ? text.title : title}
        titleTypographyProps={{
          sx: {
            textAlign: 'center',
            ...theme.custom.literature,
            fontSize: '1.7rem',
            lineHeight: 1.3,
            [theme.breakpoints.up('sm')]: {
              fontSize: '2.5rem',
              lineHeight: 1.2,
            },
          },
        }}
        subheader={subtitle}
        subheaderTypographyProps={{
          sx: {
            textAlign: 'center',
            ...theme.custom.literature,
            fontSize: '1.3rem',
            lineHeight: 1.0,
            [theme.breakpoints.up('sm')]: {
              fontSize: '2.0rem',
              lineHeight: 1.0,
            },
          },
        }}
        sx={{
          background: 'black',
          width: '100%',
          '&.MuiCardHeader-action': {
            marginTop: 'auto',
            marginBottom: 'auto',
            marginLeft: theme.spacing(2),
          },
        }}
        action={action}
      />
      {text.lines.map((line) => (
        <Line {...{ line, openModal }} key={line.id} />
      ))}
    </Box>
  )
}
