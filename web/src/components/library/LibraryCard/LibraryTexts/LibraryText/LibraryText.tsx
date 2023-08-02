import { useMemo, useState } from 'react'

import { ListItemButton, Typography, useTheme } from '@mui/material'

import { Link } from 'src/components/accessories/Link'
import { Text } from 'src/graphql/generated'
import { romanNumeralize } from 'src/utils/romanNumeral'
import { sentenceCase } from 'src/utils/string'

type Props = { text: Text }

export const LibraryText = ({ text }: Props) => {
  const theme = useTheme()
  const [isHovered, setHovered] = useState(false)
  const title = useMemo(
    () =>
      text.title.match(/book \d+/i)
        ? romanNumeralize(text.title.replace(/\D+/, ''))
        : sentenceCase(text.title),
    [text]
  )

  return (
    <Link
      href={`/text/${encodeURIComponent(text.id)}`}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <ListItemButton
        sx={{
          height: '40px',
          minWidth: '40px',
          borderRadius: '5px',
          margin: theme.spacing(1),
          padding: theme.spacing(1),
          flexGrow: 0,
          display: 'flex',
          justifyContent: 'center',
          color: theme.palette.primary.main,
          background: isHovered
            ? theme.palette.secondary.main
            : theme.palette.grey[600],
          '&:hover': {
            background: theme.palette.secondary.main,
          },
        }}
      >
        <Typography align="center" sx={{ ...theme.custom.lineClamp(2) }}>
          {title}
        </Typography>
      </ListItemButton>
    </Link>
  )
}
