import {
  Card,
  CardContent,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Bookmark, BookmarkBorder } from "@material-ui/icons"
import React from "react"

export default function BookmarkInstructionsCard(): JSX.Element {
  const classes = useStyles()

  return (
    <Grow in={true}>
      <Card className={classes.card}>
        <CardContent>
          <List style={{ padding: 0 }}>
            <ListItem style={{ padding: 0 }}>
              <ListItemIcon>
                <IconButton>
                  <BookmarkBorder />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary="Click the bookmark icon to bookmark entries" />
            </ListItem>
            <ListItem style={{ padding: 0 }}>
              <ListItemIcon>
                <IconButton>
                  <Bookmark />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary="Click the unbookmark icon to unbookmark entries" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Grow>
  )
}

const useStyles = makeStyles((theme: any) => ({
  card: {
    maxWidth: theme.custom.cardWidth,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  bookmarkIcon: {
    display: "inline",
  },
}))
