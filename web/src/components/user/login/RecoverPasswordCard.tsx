import { Card, CardContent, Divider, Grid } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import React from "react"
import { useRecoverPasswordMutation } from "../../../graphql/generated"
import useSnackbarEnhanced from "../../../hooks/useSnackbarEnhanced"
import { validateEmail } from "../../../utils/string"
import CardHeader from "../../accessories/CardHeader"
import SubmitButton from "../../accessories/SubmitButton"
import TextBox from "../../accessories/TextBox"

export default function RecoverPasswordCard() {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbarEnhanced()

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: async () => {
      try {
        await recoverPassword(formik.values)
        router.push("/user")
        enqueueSnackbar(
          `A password recovery email has been sent to: ${formik.values.email}`,
        )
      } catch (e: any) {
        console.log(JSON.stringify(e))
        if (e?.response?.errors?.[0]?.message === "email not found") {
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
    <Card className={classes.card}>
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

interface RecoverPasswordInfo {
  email: string
}
export function validate({ email }: RecoverPasswordInfo): { email: string } {
  const errors = {} as { email: string }
  if (!validateEmail(email)) errors.email = "Invalid email"
  return errors
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))
