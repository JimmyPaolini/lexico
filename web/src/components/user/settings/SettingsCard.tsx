import React, { useContext } from 'react'

import { Card, CardContent, Divider, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import {
  useLogoutQuery,
  useUnregisterMutation,
} from '../../../graphql/generated'
import CardHeader from '../../accessories/CardHeader'
import SubmitButton from '../../accessories/SubmitButton'
import { Context } from '../../layout/Context'
import { Identity } from './Identity'
import SettingsForm from './SettingsForm'

export default function SettingsCard() {
  const theme = useTheme()
  const { user, queryClient } = useContext(Context)

  const { refetch: logout } = useLogoutQuery(
    {},
    {
      enabled: false,
      onSuccess: async () => {
        await queryClient.invalidateQueries('User')
      },
    },
  )
  const { mutateAsync: unregister } = useUnregisterMutation({
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries('User')
    },
  })

  const confirmUnregister = async () => {
    const unregisterDialog =
      'Are you sure you want to delete your account? All your Bookmarks, Literature, and Settings will be lost.'
    if (window.confirm(unregisterDialog)) await unregister({})
  }

  return (
    <Card
      sx={{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
      }}
    >
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
                    backgroundColor: theme.palette.error.main,
                    '&:hover': {
                      backgroundColor: theme.palette.error.dark,
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
