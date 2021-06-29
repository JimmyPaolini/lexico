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

export default function RecoverPassword(): JSX.Element {
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
      } catch (e) {
        console.log(JSON.stringify(e))
        if (e.response.errors[0].message === "email not found") {
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
export function validate({ email }: RecoverPasswordInfo): { email: string } {
  const errors = {} as { email: string }
  if (!validateEmail(email)) errors.email = "Invalid email"
  return errors
}
