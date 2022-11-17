import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

import { relative } from 'path'

import CornerText from './CornerText'

type Props = {
  top: string
  bottom: string
  side: 'right' | 'left'
}

export default function SideCornerTexts({ top, bottom, side }: Props) {
  return (
    <Grid
      container
      direction="column"
      xs="auto"
      justifyContent="space-between"
      sx={{
        position: 'relative',
        ...(side === 'right' ? { right: 2 } : { left: 2 }),
      }}
    >
      <CornerText text={top} />
      <CornerText text={bottom} />
    </Grid>
  )
}
