import { MouseEventHandler } from 'react'

import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

type Props = {
  onClick?: MouseEventHandler<HTMLLIElement> | undefined
  Icon: JSX.Element
  text: string
}

export const Action = ({ onClick, Icon, text }: Props) => {
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon sx={{ minWidth: '40px' }}>{Icon}</ListItemIcon>
      <ListItemText primary={text} />
    </MenuItem>
  )
}
