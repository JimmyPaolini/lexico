import { Avatar, CardActionArea, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { useRouter } from 'next/router'

import { Text } from 'src/graphql/generated'
import { romanNumeralize } from 'src/utils/romanNumeral'
import { sentenceCase } from 'src/utils/string'

type Props = { text: Text }

export const LiteratureText = ({ text }: Props) => {
  const theme = useTheme()
  const router = useRouter()

  const isTitleBook = text.title.match(/book \d+/i)

  return (
    <Grid item xs={isTitleBook ? 2 : 4} container justifyContent="center">
      <CardActionArea onClick={() => router.push(`reader/${text.id}`)}>
        {isTitleBook ? (
          <Avatar
            sx={{
              margin: 'auto',
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(1),
            }}
          >
            {text.title.match(/\d+/)?.[0]}
          </Avatar>
        ) : (
          <Grid
            sx={{
              height: 56,
              margin: theme.spacing(1),
              padding: '8px 8px',
              borderRadius: 16,
              background: theme.palette.grey[600],
              color: theme.palette.primary.main,
              overflow: 'hidden',
            }}
          >
            <Typography
              sx={{
                '-webkit-line-clamp': '3',
                '-webkit-box-orient': 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                margin: 'auto',
                lineHeight: 1.1,
                textAlign: 'center',
              }}
            >
              {romanNumeralize(sentenceCase(text.title))}
            </Typography>
          </Grid>
        )}
      </CardActionArea>
    </Grid>
  )
}
