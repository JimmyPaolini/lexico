import Link from 'next/link'

import { CardActionArea, Grid } from '@mui/material'

import { Text } from 'src/graphql/generated'

import { LibraryNamedText } from './LibraryNamedText'
import { LibraryNumberedText } from './LibraryNumberedText'

type Props = { text: Text }

export const LibraryText = ({ text }: Props) => {
  const isNumberedText = text.title.match(/book \d+/i)

  return (
    <CardActionArea>
      <Link href={`reader/${text.id}`} style={{ textDecoration: 'none' }}>
        <Grid item xs container justifyContent="center">
          {isNumberedText ? (
            <LibraryNumberedText text={text} />
          ) : (
            <LibraryNamedText text={text} />
          )}
        </Grid>
      </Link>
    </CardActionArea>
  )
}
