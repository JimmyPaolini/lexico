import Grid from '@mui/material/Grid'

import { Identifier } from 'src/components/accessories/Identifier/Identifier.types'

import { CornerIdentifier } from './CornerIdentifier'

type Props = {
  top?: Identifier
  bottom?: Identifier
  side: 'right' | 'left'
}

export const Sidebar = ({ top, bottom, side }: Props) => {
  return (
    <Grid
      item
      container
      direction="column"
      xs="auto"
      justifyContent="space-between"
      sx={{
        position: 'relative',
        ...(side === 'right' ? { right: 0 } : { left: 0 }),
      }}
    >
      <CornerIdentifier identifier={top} />
      <CornerIdentifier identifier={bottom} />
    </Grid>
  )
}
