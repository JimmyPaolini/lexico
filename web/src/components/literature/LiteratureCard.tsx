import { useState } from 'react'
import { Card, CardContent, Collapse, Divider, Grid, List } from '@mui/material'

import { Author, Book } from 'src/graphql/generated'

import { LiteratureAuthor } from './LiteratureAuthor'
import { LiteratureBook } from './LiteratureBook'
import { LiteratureText } from './LiteratureText'

type Props = { author: Author }

export const LiteratureCard = ({ author }: Props) => {
  const books = author.books || ([] as Book[])
  const nonBookTexts = author.texts.filter(
    (text) =>
      !books.some((book) =>
        book.texts.some((bookText) => bookText.id === text.id),
      ),
  )
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Card>
      <LiteratureAuthor {...{ author, expanded, setExpanded }} />
      <Collapse in={expanded} mountOnEnter>
        <Divider style={{ marginRight: 8 }} />
        <CardContent
          sx={{
            padding: 0,
            '&:last-child': {
              paddingBottom: 0,
            },
          }}
        >
          <List
            sx={{
              padding: 0,
              '&:last-child': {
                paddingBottom: 0,
              },
            }}
            dense
          >
            {books.map((book, i) => {
              const isLast = i === books.length - 1 && !nonBookTexts.length
              return (
                <LiteratureBook {...{ author, book, isLast }} key={book.id} />
              )
            })}
            <Grid container justifyContent="center" alignItems="stretch">
              {nonBookTexts.map((text) => (
                <LiteratureText {...{ text }} key={text.id} />
              ))}
            </Grid>
          </List>
        </CardContent>
      </Collapse>
    </Card>
  )
}
