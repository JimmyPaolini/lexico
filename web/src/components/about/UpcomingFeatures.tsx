import React from 'react'

import { Launch } from '@mui/icons-material'
import { Box, CardActionArea, CardHeader as CardHeaderMui } from '@mui/material'
import { styled } from '@mui/material/styles'

import packageJson from '../../../../package.json'

const PREFIX = 'UpcomingFeatures'

const classes = {
  dropdown: `${PREFIX}-dropdown`,
  toolGrid: `${PREFIX}-toolGrid`,
  tool: `${PREFIX}-tool`,
  hide: `${PREFIX}-hide`,
  iconContainer: `${PREFIX}-iconContainer`,
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

  [`& .${classes.tool}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  [`& .${classes.hide}`]: {
    display: 'none',
  },

  [`& .${classes.iconContainer}`]: {
    padding: 12,
    paddingTop: 20,
    paddingRight: 20,
  },
}))

const { version } = packageJson

export default function ToolIconGrid() {
  return (
    <Root>
      <CardActionArea
        disableRipple
        disableTouchRipple
        classes={{ focusHighlight: classes.hide }}
        href="https://github.com/JimmyPaolini/Lexico/issues"
        target="_blank"
      >
        <CardHeaderMui
          title={`Upcoming Releases (current v${version})`}
          titleTypographyProps={{ variant: 'body1' }}
          className={classes.dropdown}
          action={
            <Box className={classes.iconContainer}>
              <Launch />
            </Box>
          }
        />
      </CardActionArea>
    </Root>
  )
}
