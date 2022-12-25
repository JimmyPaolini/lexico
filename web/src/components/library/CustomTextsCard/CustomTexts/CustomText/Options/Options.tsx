import { MouseEvent, useState } from 'react'

import { AccountCircle, MoreHoriz } from '@mui/icons-material'
import { IconButton, ListItemSecondaryAction, useTheme } from '@mui/material'

import { CustomText } from 'src/graphql/generated'

import { Menu } from './Menu'

type Props = {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
}

export const Options = ({ text, refreshCustomTexts }: Props) => {
  const theme = useTheme()
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const openMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    event.nativeEvent.preventDefault()
    event.nativeEvent.stopImmediatePropagation()
    setAnchor(event.currentTarget)
  }

  return (
    <ListItemSecondaryAction>
      {Boolean(text?.user) && (
        <IconButton
          disabled
          size="large"
          sx={{ padding: theme.spacing(0.5) }}
          aria-label="saved to user"
        >
          <AccountCircle />
        </IconButton>
      )}
      <IconButton
        aria-label="options"
        sx={{ padding: theme.spacing(0.5) }}
        onClick={openMenu}
        size="large"
      >
        <MoreHoriz />
      </IconButton>
      <Menu {...{ text, refreshCustomTexts, anchor, setAnchor }} />
    </ListItemSecondaryAction>
  )
}
