import { Avatar } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Text } from 'src/graphql/generated'

type Props = { text: Text }

export const LibraryNumberedText = ({ text }: Props) => {
  const theme = useTheme()
  const numberTitle = text.title.match(/\d+/)?.[0]

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
