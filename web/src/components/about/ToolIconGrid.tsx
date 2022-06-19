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
import tools from "../../utils/tools"
import ExpandIcon from "../accessories/ExpandIcon"

export default function ToolIconGrid(): JSX.Element {
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
          title="Frameworks, Libraries, and Tools"
          titleTypographyProps={{ variant: "body1" }}
          className={classes.dropdown}
          action={
            <Box p={1.5} mt={1} mr={1}>
              <ExpandIcon expanded={expanded} />
            </Box>
          }
        />
      </CardActionArea>
      <Collapse in={expanded} appear>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          className={classes.toolGrid}
        >
          {tools.map((tool) => (
            <Grid item key={tool.name}>
              <Link
                href={tool.url}
                target="_blank"
                onClick={(e: any) => e.stopPropagation()}
              >
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  width={64}
                  height={64}
                  priority
                  loading="eager"
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </>
  )
}

const useStyles = makeStyles((theme: any) => ({
  dropdown: {
    paddingTop: 0,
    paddingBottom: 0,
    padding: theme.spacing(1),
  },
  toolGrid: {
    padding: theme.spacing(1),
  },
  hide: {
    display: "none",
  },
}))
