import {
  Box,
  CardActionArea,
  CardHeader as CardHeaderMui,
  Collapse,
  Grid,
  Link,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Image from "next/image"
import React, { useState } from "react"
import ExpandIcon from "../accessories/ExpandIcon"

export default function ToolIconGrid() {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        disableRipple
        disableTouchRipple
        classes={{ focusHighlight: classes.hide }}
      >
        <CardHeaderMui
          title="Software libraries and tools"
          titleTypographyProps={{ variant: "body1" }}
          className={classes.dropdown}
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
    </>
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
]

const useStyles = makeStyles((theme: any) => ({
  dropdown: {
    paddingTop: 0,
    paddingBottom: 0,
    padding: theme.spacing(1),
  },
  toolGrid: {
    padding: theme.spacing(1),
  },
  tool: {
    flex: "20%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  hide: {
    display: "none",
  },
}))
