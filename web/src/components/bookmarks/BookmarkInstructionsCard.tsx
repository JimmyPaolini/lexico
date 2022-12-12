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

export const BookmarkInstructionsCard = () => {
  return (
    <Grow in>
      <Card>
        <CardContent>
          <List sx={{ padding: 0 }}>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon>
                <IconButton size="large">
                  <BookmarkBorder />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary="Click the bookmark icon to bookmark entries" />
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
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
    </Grow>
  )
}
