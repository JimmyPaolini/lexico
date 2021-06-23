import { Card, CardContent, Divider, Grid } from "@material-ui/core"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import React from "react"
import CardHeader from "../../components/accessories/CardHeader"
import SubmitButton from "../../components/accessories/SubmitButton"
import TextBox from "../../components/accessories/TextBox"
import SingleCardLayout from "../../components/layout/SingleCardLayout"
import useRecoverPassword from "../../hooks/authentication/useRecoverPassword"
import useSnackbarEnhanced from "../../hooks/useSnackbarEnhanced"
import { validateEmail } from "../../utils/string"

export default function RecoverPassword() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbarEnhanced()

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: async () => {
      try {
        await recoverPassword()
        router.push("/user")
        enqueueSnackbar(
          `A password recovery email has been sent to: ${formik.values.email}`,
        )
      } catch {
        enqueueSnackbar(
          `An unknown error occurred, if it persists please contact Lexico!`,
        )
      }
    },
  })
  const { mutateAsync: recoverPassword } = useRecoverPassword(
    formik.values.email,
  )

  return (
    <SingleCardLayout>
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
    </SingleCardLayout>
  )
}

interface RecoverPasswordInfo {
  email: string
}
export function validate({ email }: RecoverPasswordInfo) {
  const errors = {} as any
  if (!validateEmail(email)) errors.email = "Invalid email"
  return errors
}
