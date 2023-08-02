import { useState } from 'react'

import {
  Card,
  CardContent,
  Collapse,
  Divider,
  List,
  useTheme,
} from '@mui/material'

import { Author, Book } from 'src/graphql/generated'

import { LibraryAuthor } from './LibraryAuthor'
import { LibraryBook } from './LibraryBook'
import { LibraryTexts } from './LibraryTexts'

type Props = { author: Author }

export const LibraryCard = ({ author }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const theme = useTheme()
  const books = author.books || ([] as Book[])
  const nonBookTexts = author.texts.filter(
    (text) =>
      !books.some((book) =>
        book.texts.some((bookText) => bookText.id === text.id)
      )
  )

  return (
    <Card>
      <LibraryAuthor {...{ author, expanded, setExpanded }} />
      <Collapse in={expanded}>
        <Divider sx={{ marginLeft: theme.spacing(1) }} />
        <CardContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
          <List sx={{ padding: 0 }} dense>
            {books.map((book, i) => {
              const isLast = i === books.length - 1
              return (
                <div key={book.id}>
                  <LibraryBook {...{ author, book }} />
                  {(!isLast || (isLast && nonBookTexts.length) > 0) && (
                    <Divider sx={{ marginLeft: theme.spacing(1) }} />
                  )}
                </div>
              )
            })}
            <LibraryTexts texts={nonBookTexts} />
          </List>
        </CardContent>
      </Collapse>
    </Card>
  )
}
