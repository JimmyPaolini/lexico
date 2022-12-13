import { CardActionArea, Grid } from '@mui/material'

import Link from 'next/link'

import { Text } from 'src/graphql/generated'
import { LibraryNamedText } from './LibraryNamedText'
import { LibraryNumberedText } from './LibraryNumberedText'

type Props = { text: Text }

export const LibraryText = ({ text }: Props) => {
  const isNumberedText = text.title.match(/book \d+/i)

  return (
    <Grid item xs={isNumberedText ? 2 : 4} container justifyContent="center">
      <Link href={`reader/${text.id}`} style={{ textDecoration: 'none' }}>
        <CardActionArea>
          {isNumberedText ? (
            <LibraryNumberedText text={text} />
          ) : (
            <LibraryNamedText text={text} />
          )}
        </CardActionArea>
      </Link>
    </Grid>
  )
}
