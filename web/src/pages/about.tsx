import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Collapse,
  Divider,
  Fade,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { ExpandMore } from "@material-ui/icons"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import Image from "next/image"
import React, { useState } from "react"

// const gratiasMaximasAd = [
//   "wiktionary.com for providing the dictionary content",
//   "thelatinlibrary.com for providing the literature content",
//   "Magistri sodalesque Latinorum",
// ]

const upcomingFeatures = [
  "Voice translation, so that you can speak commansd to Lexico and it will respond",
  // "English-to-Latin translation",
  "More Literature (suggest some through the Suggestions page!)",
  // "Ελληνικά (Greek) translation and literature!",
  "Possible collaboration with other Latinists/Classics Organizations (email me through the Suggestions page!)",
]

const dataCollection = [
  "On Client - all searches, Literature downloads & scroll positions",
  "On Server - global word search frequency (can't trace back to user)",
]

export default function About() {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<boolean>(false)
  return (
    <Grid container justify="center" alignItems="center">
      <Fade in={true}>
        <Card className={classes.card}>
          <Typography variant="h4" className={classes.body} align="center">
            About
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="body1" className={classes.body}>
            I love reading and writing Latin, so I built Lexico to help others
            enjoy Latin and ease some of the more tedious aspects of
            translation. As with all things it is a work ever in progress, and
            so long as people use it I’ll be striving to improve it.
          </Typography>
          <Divider className={classes.divider} />
          <CardActionArea
            onClick={() => setExpanded((expanded) => !expanded)}
            disableRipple
            disableTouchRipple
            classes={{ focusHighlight: classes.hide }}
          >
            <CardHeader
              title="Tools"
              titleTypographyProps={{ variant: "h5" }}
              action={
                <IconButton
                  disableRipple
                  disableTouchRipple
                  className={classes.disableHoverGlow}
                >
                  <ExpandMore
                    className={
                      expanded ? classes.upSideDown : classes.rightSideUp
                    }
                  />
                </IconButton>
              }
            />
            <Collapse in={expanded}>
              <Grid container spacing={2}>
                {tools.map((tool) => (
                  <Grid
                    item
                    key={tool.name}
                    xs={3}
                    className={classes.tool}
                    container
                    justify="center"
                  >
                    <Link
                      href={tool.url}
                      target="_blank"
                      onClick={(e: any) => e.stopPropagation()}
                    >
                      <Image
                        src={`/icon/${tool.name}.png`}
                        alt={tool.name}
                        width={128}
                        height={128}
                      />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </CardActionArea>
          <Divider className={classes.divider} />
          {/* <Typography variant="subtitle1">Gratias Maximas Ad:</Typography>
          <List dense>
            {gratiasMaximasAd.map((text, i) => (
              <ListItem key={i} style={{ padding: 0 }}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" className={classes.bullet}>
                    {text}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List> */}
          <Typography variant="subtitle1">Upcoming Features:</Typography>
          <List dense className={classes.list}>
            {upcomingFeatures.map((text, i) => (
              <ListItem key={i} style={{ padding: 0 }}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" className={classes.bullet}>
                    {text}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <Typography variant="subtitle1">Data collection:</Typography>
          <List dense className={classes.list}>
            {dataCollection.map((text, i) => (
              <ListItem key={i} style={{ padding: 0 }}>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize="small" />
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
          <Box display="flex" justifyContent="center">
            <Typography variant="h6">Omnia mūtantur, nihil īnterit</Typography>
          </Box>
        </Card>
      </Fade>
    </Grid>
  )
}

const tools = [
  { name: "typescript", url: "https://www.typescriptlang.org/" },
  { name: "nodejs", url: "https://nodejs.org/" },
  { name: "expressjs", url: "https://expressjs.com/" },
  { name: "postgres", url: "https://www.postgresql.org/" },
  { name: "apollo", url: "https://www.apollographql.com/" },
  { name: "graphql", url: "https://graphql.org/" },
  { name: "typeorm", url: "https://typeorm.io/" },
  { name: "type-graphql", url: "https://typegraphql.com/" },
  { name: "nextjs", url: "https://nextjs.org/" },
  { name: "jwt", url: "https://jwt.io/" },
  { name: "elk", url: "https://www.elastic.co/" },
  { name: "tslog", url: "https://tslog.js.org/" },
  { name: "react", url: "https://reactjs.org/" },
  { name: "materialui", url: "https://material-ui.com/" },
  { name: "react-query", url: "https://react-query.tanstack.com/" },
  { name: "prettier", url: "https://prettier.io/" },
  { name: "wikipedia", url: "https://www.wiktionary.org/" },
  { name: "figma", url: "https://www.figma.com/" },
  { name: "vscode", url: "https://code.visualstudio.com/" },
  { name: "github", url: "https://github.com/" },
]

const useStyles = makeStyles((theme: any) => ({
  card: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    maxWidth: theme.custom.cardWidth * 2,
  },
  body: {
    padding: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1),
  },
  list: {
    listStyleType: "circle",
    listStylePosition: "inside",
  },
  bullet: {
    position: "relative",
    right: 20,
  },
  rightSideUp: {
    transition: "250ms ease",
    transform: "rotateZ(0deg)",
  },
  upSideDown: {
    transition: "250ms ease",
    transform: "rotateZ(-180deg)",
  },
  disableHoverGlow: {
    "float": "right",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  hide: {
    display: "none",
  },
  tool: {
    marginBottom: theme.spacing(2),
  },
}))
