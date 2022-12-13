import { Avatar } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Text } from 'src/graphql/generated'
import { romanNumeralize } from 'src/utils/romanNumeral'

type Props = { text: Text }

export const LibraryNumberedText = ({ text }: Props) => {
  const theme = useTheme()
  const numberTitle = text.title.match(/\d+/)?.[0]
  const romanNumeralTitle = romanNumeralize(numberTitle)

  return (
    <Avatar
      sx={{
        margin: 'auto',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      }}
    >
      {numberTitle}
    </Avatar>
  )
}
