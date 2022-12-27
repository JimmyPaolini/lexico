import { Card, CardContent, Divider, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { CardHeader } from '../../accessories/CardHeader'
import { OAuthLogin } from './OAuthLogin'

export const LoginCard = () => {
  const theme = useTheme()
  return (
    <Card>
      <CardHeader
        title="Sign In"
        titleTypographyProps={{
          align: 'center',
          variant: 'h4',
          gutterBottom: true,
        }}
        subheader="Save your Bookmarks, Literature, and Settings across devices"
        subheaderTypographyProps={{
          align: 'center',
          variant: 'body2',
          gutterBottom: true,
        }}
        sx={{ paddingBottom: 0 }}
      />
      <Divider variant="middle" />
      <CardContent>
        <Grid container direction="column" alignItems="center">
          <Grid
            item
            sx={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(2) }}
          >
            <OAuthLogin provider="google" />
          </Grid>
          <Grid item sx={{ marginBottom: theme.spacing(2) }}>
            <OAuthLogin provider="facebook" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
