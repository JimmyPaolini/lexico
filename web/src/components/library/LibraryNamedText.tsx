import { Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Text } from 'src/graphql/generated'
import { romanNumeralize } from 'src/utils/romanNumeral'
import { sentenceCase } from 'src/utils/string'

type Props = { text: Text }

export const LibraryNamedText = ({ text }: Props) => {
  const theme = useTheme()

  return (
    <Grid
      sx={{
        height: 56,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
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
  )
}
