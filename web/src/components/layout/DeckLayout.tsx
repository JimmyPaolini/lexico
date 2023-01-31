import { ComponentProps } from 'react'

import { Grid } from '@mui/material'

import { Deck } from './Deck'

type Props = ComponentProps<typeof Grid> & {
  Cards: ComponentProps<typeof Deck>['Cards']
}

export const DeckLayout = ({ Cards, ...props }: Props) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      sx={{ marginTop: 4 }}
      {...props}
    >
      <Grid container justifyContent="center">
        <Deck Cards={Cards} />
      </Grid>
    </Grid>
  )
}
