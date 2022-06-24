import { memo, useState } from 'react'

import { Card, CardContent, Collapse, Divider, Grid, List } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Author, Book } from '../../graphql/generated'
import LiteratureAuthor from './LiteratureAuthor'
import LiteratureBook from './LiteratureBook'
import LiteratureText from './LiteratureText'

const PREFIX = 'LiteratureCard'

const classes = {
  literatureCard: `${PREFIX}-literatureCard`,
  noPadding: `${PREFIX}-noPadding`,
  inset1: `${PREFIX}-inset1`,
}

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.literatureCard}`]: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: theme.custom.card.maxWidth,
    minWidth: theme.custom.card.minWidth,
    paddingBottom: 0,
    margin: theme.spacing(1),
  },

  [`& .${classes.noPadding}`]: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },

  [`& .${classes.inset1}`]: {
    marginLeft: theme.spacing(1),
  },
}))

interface Props {
  author: Author
}
export default memo(function LiteratureCard({ author }: Props) {
  const books = author.books || ([] as Book[])
  const nonBookTexts = author.texts.filter(
    (text) =>
      !books.some((book) =>
        book.texts.some((bookText) => bookText.id === text.id),
      ),
  )
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <StyledCard elevation={4} className={classes.literatureCard}>
      <LiteratureAuthor {...{ author, expanded, setExpanded }} />
      <Collapse in={expanded} mountOnEnter>
        <Divider style={{ marginRight: 8 }} />
        <CardContent className={classes.noPadding}>
          <List className={classes.noPadding} dense>
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
    </StyledCard>
  )
})
