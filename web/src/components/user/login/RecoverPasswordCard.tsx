import { Card, CardContent, Divider, Grid } from '@mui/material'

import { useFormik } from 'formik'
import { useRouter } from 'next/router'

import { useRecoverPasswordMutation } from 'src/graphql/generated'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { validateEmail } from 'src/utils/string'

import { CardHeader } from '../../accessories/CardHeader'
import { SubmitButton } from '../../accessories/SubmitButton'
import { TextBox } from '../../accessories/TextBox'

export const RecoverPasswordCard = () => {
  const router = useRouter()
  const enqueueSnackbar = useSnackbar()

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: async () => {
      try {
        await recoverPassword(formik.values)
        router.push('/user')
        enqueueSnackbar(
          `A password recovery email has been sent to: ${formik.values.email}`,
        )
      } catch (e: any) {
        console.log(JSON.stringify(e))
        if (e?.response?.errors?.[0]?.message === 'email not found') {
          enqueueSnackbar(
            `No user with the following email exists: ${formik.values.email}. Try signing in through a provider if this email is correct`,
          )
        } else {
          enqueueSnackbar(
            `An unknown error occurred, if it persists please contact Lexico!`,
          )
        }
      }
    },
  })
  const { mutateAsync: recoverPassword } = useRecoverPasswordMutation()

  return (
    <Card>
      <CardHeader title="Recover Password" />
      <Divider variant="middle" />
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextBox name="email" formik={formik} />
            </Grid>
            <Grid item>
              <SubmitButton name="Recover Password" />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

type RecoverPasswordInfo = { email: string }

export function validate({ email }: RecoverPasswordInfo): { email: string } {
  const errors = {} as { email: string }
  if (!validateEmail(email)) errors.email = 'Invalid email'
  return errors
}
