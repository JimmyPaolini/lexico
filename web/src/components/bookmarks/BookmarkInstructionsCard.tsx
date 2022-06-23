import React from 'react'

import { Bookmark, BookmarkBorder } from '@mui/icons-material'
import {
  Card,
  CardContent,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { styled } from '@mui/material/styles'

const PREFIX = 'BookmarkInstructionsCard'

const classes = {
  card: `${PREFIX}-card`,
  bookmarkIcon: `${PREFIX}-bookmarkIcon`,
}

const StyledGrow = styled(Grow)(({ theme }) => ({
  [`& .${classes.card}`]: {
    maxWidth: theme.custom.cardWidth,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  [`& .${classes.bookmarkIcon}`]: {
    display: 'inline',
  },
}))

export default function BookmarkInstructionsCard() {
  return (
    <StyledGrow in={true}>
      <Card className={classes.card}>
        <CardContent>
          <List style={{ padding: 0 }}>
            <ListItem style={{ padding: 0 }}>
              <ListItemIcon>
                <IconButton size="large">
                  <BookmarkBorder />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary="Click the bookmark icon to bookmark entries" />
            </ListItem>
            <ListItem style={{ padding: 0 }}>
              <ListItemIcon>
                <IconButton size="large">
                  <Bookmark />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary="Click the unbookmark icon to unbookmark entries" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </StyledGrow>
  )
}
