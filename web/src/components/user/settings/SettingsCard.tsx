import { useContext } from 'react'

import { Card, CardContent, Divider, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import {
  useLogoutQuery,
  useUnregisterMutation,
  useUserQuery,
} from 'src/graphql/generated'

import { CardHeader } from '../../accessories/CardHeader'
import { SubmitButton } from '../../accessories/SubmitButton'
import { Context } from '../../layout/Context'
import { Identity } from './Identity'
import { SettingsForm } from './SettingsForm'

export const SettingsCard = () => {
  const theme = useTheme()
  const { user, queryClient } = useContext(Context)

  const { refetch: logout } = useLogoutQuery(
    {},
    {
      enabled: false,
      onSuccess: () => {
        queryClient.setQueryData(useUserQuery.getKey(), undefined)
      },
    }
  )
  const { mutateAsync: unregister } = useUnregisterMutation({
    retry: false,
    onSuccess: () => {
      queryClient.setQueryData(useUserQuery.getKey(), undefined)
    },
  })

  const confirmUnregister = async () => {
    const unregisterDialog =
      'Are you sure you want to delete your account? All your Bookmarks, Literature, and Settings will be lost.'
    if (window.confirm(unregisterDialog)) await unregister({})
  }

  return (
    <Card>
      <CardHeader title="Settings" />
      <Divider variant="middle" />
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Identity />
          </Grid>
          <Grid item>
            <SettingsForm />
          </Grid>
          {user ? (
            <>
              <Grid item>
                <SubmitButton name="Sign Out" onClick={() => logout()} />
              </Grid>
              <Grid item>
                <SubmitButton
                  name="Delete Account"
                  sx={{
                    background: theme.palette.error.main,
                    '&:hover': {
                      background: theme.palette.error.dark,
                    },
                  }}
                  onClick={confirmUnregister}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
      </CardContent>
    </Card>
  )
}
