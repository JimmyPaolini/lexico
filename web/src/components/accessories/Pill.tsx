import { PropsWithChildren } from 'react'

import { Typography } from '@mui/material'

type Props = PropsWithChildren<{ backgroundColor: string; color: string }>

export default function Pill({ backgroundColor, color, children }: Props) {
  return (
    <Typography
      variant="button"
      noWrap
      sx={{
        height: '20px',
        padding: '0px 6px',
        margin: '2px',
        borderRadius: '100px',
        display: 'inline-flex',
        alignItems: 'center',
        color,
        backgroundColor,
      }}
    >
      {children}
    </Typography>
  )
}
