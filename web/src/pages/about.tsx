import {
  Box,
  Card,
  CardActionArea,
  CardHeader as CardHeaderMui,
  Collapse,
  Divider,
  Grid,
  Grow,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { FiberManualRecord } from "@material-ui/icons"
import Image from "next/image"
import React, { useState } from "react"
import CardHeader from "../components/accessories/CardHeader"
import ExpandIcon from "../components/accessories/ExpandIcon"

const upcomingFeatures = [
  "Collaborations with Latinists/Classics Organizations (email me through the Suggestions page!)",
  "More Literature (suggest some through the Suggestions page!)",
  "Voice translation, so that you can speak commansd to Lexico and it will speak its response!",
  // "English-to-Latin translation",
  // "Ελληνικά (Greek) translation and literature!",
]

const dataCollection = ["Word searches, literature views, user logins"]

export default function About() {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Grid container justify="center" alignItems="center">
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
          <CardActionArea
            onClick={() => setExpanded((expanded) => !expanded)}
            disableRipple
            disableTouchRipple
            classes={{ focusHighlight: classes.hide }}
          >
            <CardHeaderMui
              title="Software libraries and tools"
              titleTypographyProps={{ variant: "body1" }}
              className={classes.toolsHeader}
              action={
                <Box style={{ paddingTop: 8, paddingRight: 8 }}>
                  <ExpandIcon {...{ expanded }} />
                </Box>
              }
            />
          </CardActionArea>
          <Collapse in={expanded}>
            <Grid container spacing={2} className={classes.toolGrid}>
              {tools.map((tool) => (
                <Grid
                  item
                  key={tool.name}
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

const tools = [
  { name: "wikipedia", url: "https://www.wiktionary.org/" },
  { name: "postgres", url: "https://www.postgresql.org/" },
  { name: "nodejs", url: "https://nodejs.org/" },
  { name: "typescript", url: "https://www.typescriptlang.org/" },
  { name: "expressjs", url: "https://expressjs.com/" },
  { name: "typeorm", url: "https://typeorm.io/" },
  { name: "graphql", url: "https://graphql.org/" },
  { name: "apollo", url: "https://www.apollographql.com/" },
  { name: "type-graphql", url: "https://typegraphql.com/" },
  { name: "elk", url: "https://www.elastic.co/" },
  { name: "react", url: "https://reactjs.org/" },
  { name: "nextjs", url: "https://nextjs.org/" },
  { name: "jwt", url: "https://jwt.io/" },
  { name: "materialui", url: "https://material-ui.com/" },
  { name: "react-query", url: "https://react-query.tanstack.com/" },
  { name: "formik", url: "https://formik.org/" },
  { name: "eslint", url: "https://eslint.org/" },
  { name: "prettier", url: "https://prettier.io/" },
  { name: "vscode", url: "https://code.visualstudio.com/" },
  { name: "github", url: "https://github.com/" },
  { name: "figma", url: "https://www.figma.com/" },
  { name: "docker", url: "https://www.docker.com/" },
  { name: "kubernetes", url: "https://kubernetes.io/" },
  { name: "linode", url: "https://www.linode.com/" },
  { name: "cloudflare", url: "https://www.cloudflare.com/" },
  // { name: "tslog", url: "https://tslog.js.org/" },
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
    padding: theme.spacing(1),
    listStyleType: "circle",
    listStylePosition: "inside",
  },
  toolsHeader: {
    paddingTop: 0,
    paddingBottom: 0,
    padding: theme.spacing(1),
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
  toolGrid: {
    padding: theme.spacing(1),
  },
  tool: {
    flex: "20%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  hiddenAction: {
    marginTop: 8,
    marginRight: 8,
    visibility: "hidden",
  },
}))
