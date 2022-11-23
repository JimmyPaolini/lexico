import { PropsWithChildren } from 'react'

import { Typography } from '@mui/material'

type Props = PropsWithChildren<{ backgroundColor: string; color: string }>

export default function Pill({ backgroundColor, color, children }: Props) {
  return (
    <Typography
      variant="button"
      noWrap
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        height: '20px',
        padding: '0px 6px',
        margin: '2px',
        borderRadius: '100px',
        color,
        backgroundColor,
      }}
    >
      {children}
    </Typography>
  )
}
