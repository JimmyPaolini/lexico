import { Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { CardHeader } from '../../accessories/CardHeader'
import { OAuthLogin } from './OAuthLogin'

export const LoginCard = () => {
  const theme = useTheme()
  return (
    <Card>
      <CardHeader
        title="Sign In"
        sx={{
          paddingBottom: 0,
          minHeight: theme.spacing(8),
        }}
      />
      <Typography align="center" variant="body2" color="textSecondary">
        Save your Bookmarks, Literature,
      </Typography>
      <Typography
        align="center"
        variant="body2"
        color="textSecondary"
        gutterBottom
      >
        and Settings across devices
      </Typography>
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
