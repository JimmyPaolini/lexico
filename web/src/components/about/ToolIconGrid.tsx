import React, { useState } from 'react'

import {
  Box,
  CardActionArea,
  CardHeader as CardHeaderMui,
  Collapse,
  Grid,
  Link,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Image from 'next/image'

import tools from '../../utils/tools'
import ExpandIcon from '../accessories/ExpandIcon'

const PREFIX = 'ToolIconGrid'

const classes = {
  dropdown: `${PREFIX}-dropdown`,
  toolGrid: `${PREFIX}-toolGrid`,
  hide: `${PREFIX}-hide`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.dropdown}`]: {
    paddingTop: 0,
    paddingBottom: 0,
    padding: theme.spacing(1),
  },

  [`& .${classes.toolGrid}`]: {
    padding: theme.spacing(1),
  },

  [`& .${classes.hide}`]: {
    display: 'none',
  },
}))

export default function ToolIconGrid() {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Root>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        disableRipple
        disableTouchRipple
        classes={{ focusHighlight: classes.hide }}
      >
        <CardHeaderMui
          title="Frameworks, Libraries, and Tools"
          titleTypographyProps={{ variant: 'body1' }}
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
    </Root>
  )
}
