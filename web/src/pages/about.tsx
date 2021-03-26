import {
  Card,
  Divider,
  Grid,
  Grow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { FiberManualRecord } from "@material-ui/icons"
import React from "react"
import CommentBox from "../components/about/CommentBox"
import ToolIconGrid from "../components/about/ToolIconGrid"
import CardHeader from "../components/accessories/CardHeader"

const upcomingFeatures = [
  "More relevant search based on word frequency in literature",
  "More Literature (suggest some through the Comment Box!)",
  "Collaborations with Latinists/Classics Organizations (contact me through the Comment Box!)",
  "Voice translation, so that you can speak commansd to Lexico and it will speak its response!",
  // "Ελληνικά (Greek) translation and literature!",
]

const dataCollection = ["Word searches, literature views, user logins"]

export default function About() {
  const classes = useStyles()

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ overflowX: "hidden" }}
    >
      <Grow in={true}>
        <Card className={classes.card}>
          <CardHeader title="About" />
          <Divider className={classes.divider} />
          <Typography variant="body1" className={classes.body}>
            I love reading and writing Latin, so I built Lexico to help others
            enjoy Latin and ease some of the more tedious aspects of
            translation. As with all things it is a work ever in progress, and
            so long as people use it I’ll be striving to improve it.
          </Typography>
          <Divider className={classes.divider} />
          <ToolIconGrid />
          <Divider className={classes.divider} />
          <CommentBox />
          <Divider className={classes.divider} />
          <Typography variant="subtitle1" className={classes.body}>
            Upcoming Features:
          </Typography>
          <List dense className={classes.list}>
            {upcomingFeatures.map((text, i) => (
              <ListItem key={i} style={{ padding: 0 }}>
                <ListItemIcon>
                  <FiberManualRecord fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" className={classes.bullet}>
                    {text}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <Typography variant="subtitle1" className={classes.body}>
            Data collection:
          </Typography>
          <List dense className={classes.list}>
            {dataCollection.map((text, i) => (
              <ListItem key={i} style={{ padding: 0 }}>
                <ListItemIcon>
                  <FiberManualRecord fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" className={classes.bullet}>
                    {text}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <Divider className={classes.divider} />
          <Grid container justify="center">
            <Typography variant="h6">Omnia mūtantur, nihil īnterit</Typography>
          </Grid>
        </Card>
      </Grow>
    </Grid>
  )
}

const useStyles = makeStyles((theme: any) => ({
  card: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
    maxWidth: theme.custom.cardWidth * 2,
  },
  body: {
    padding: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1),
  },
  list: {
    padding: theme.spacing(1),
    listStyleType: "circle",
    listStylePosition: "inside",
  },
  bullet: {
    position: "relative",
    right: 20,
  },
  hide: {
    display: "none",
  },
}))
