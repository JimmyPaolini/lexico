import { useMemo } from 'react'

import {
  CardActionArea,
  ListItemButton,
  Typography,
  useTheme,
} from '@mui/material'

import { Link } from 'src/components/accessories/Link'
import { Text } from 'src/graphql/generated'
import { romanNumeralize } from 'src/utils/romanNumeral'
import { sentenceCase } from 'src/utils/string'

type Props = { text: Text }

export const LibraryText = ({ text }: Props) => {
  const theme = useTheme()
  const title = useMemo(
    () =>
      text.title.match(/book \d+/i)
        ? romanNumeralize(text.title.replace(/\D+/, ''))
        : sentenceCase(text.title),
    [text]
  )

  return (
    <ListItemButton
      sx={{
        height: 40,
        minWidth: 40,
        borderRadius: 16,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        background: theme.palette.grey[600],
        '&:hover': {
          background: theme.palette.secondary.main,
        },
        color: theme.palette.primary.main,
        flexGrow: 0,
      }}
    >
      <CardActionArea disableRipple disableTouchRipple>
        <Link href={`reader/${text.id}`}>
          <Typography align="center" sx={{ ...theme.custom.lineClamp(2) }}>
            {title}
          </Typography>
        </Link>
      </CardActionArea>
    </ListItemButton>
  )
}
