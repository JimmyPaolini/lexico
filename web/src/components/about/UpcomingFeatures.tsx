import React from 'react'

import { Launch } from '@mui/icons-material'
import { Box, CardActionArea, CardHeader as CardHeaderMui } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { version } from '../../../../package.json'

export default function ToolIconGrid() {
  const theme = useTheme()
  return (
    <>
      <CardActionArea
        disableRipple
        disableTouchRipple
        href="https://github.com/JimmyPaolini/Lexico/issues"
        target="_blank"
      >
        <CardHeaderMui
          title={`Upcoming Releases (current v${version})`}
          titleTypographyProps={{ variant: 'body1' }}
          sx={{ paddingTop: 0, paddingBottom: 0, padding: theme.spacing(1) }}
          action={
            <Box sx={{ padding: 12, paddingTop: 20, paddingRight: 20 }}>
              <Launch />
            </Box>
          }
        />
      </CardActionArea>
    </>
  )
}
