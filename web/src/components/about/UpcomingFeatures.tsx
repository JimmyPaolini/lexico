import { Launch } from '@mui/icons-material'
import { CardHeader } from '@mui/material'

import packageJson from '../../../../package.json'
import { Link } from '../accessories/Link'

export const UpcomingFeatures = () => {
  const href = 'https://github.com/JimmyPaolini/Lexico/issues'
  return (
    <Link href={href} target="_blank">
      <CardHeader
        title={`Releases (current v${packageJson.version})`}
        titleTypographyProps={{ variant: 'h5' }}
        action={<Launch />}
        sx={{ '& .MuiCardHeader-action': { margin: 'auto' } }}
      />
    </Link>
  )
}
