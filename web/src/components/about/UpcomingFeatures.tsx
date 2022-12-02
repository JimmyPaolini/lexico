import { Launch } from '@mui/icons-material'
import { CardActionArea, CardHeader } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import packageJson from '../../../../package.json'

export const UpcomingFeatures = () => {
  const theme = useTheme()
  return (
    <CardActionArea
      disableRipple
      disableTouchRipple
      href="https://github.com/JimmyPaolini/Lexico/issues"
      target="_blank"
    >
      <CardHeader
        title={`Upcoming Releases (current v${packageJson.version})`}
        titleTypographyProps={{ variant: 'body1' }}
        sx={{ padding: `0px ${theme.spacing(1)} 0px ${theme.spacing(1)}` }}
        action={<Launch sx={{ margin: '20px 20px 12px 12px' }} />}
      />
    </CardActionArea>
  )
}
