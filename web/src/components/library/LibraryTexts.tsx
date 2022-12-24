import { Grid } from '@mui/material'

import { Text } from 'src/graphql/generated'

import { LibraryText } from './LibraryText'

type Props = { texts: Text[] }

export const LibraryTexts = ({ texts }: Props) => {
  return (
    <Grid container justifyContent="center">
      {texts.map((text) => (
        <Grid item key={text.id}>
          <LibraryText {...{ text }} />
        </Grid>
      ))}
    </Grid>
  )
}
