import { Card, CardContent, Divider, Grid, Grow } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useFormik } from "formik"
import React from "react"
import useRecoverPassword from "../../hooks/authentication/useRecoverPassword"
import { validateEmail } from "../../utils/string"
import CardHeader from "../accessories/CardHeader"
import SubmitButton from "../accessories/SubmitButton"
import TextBox from "../accessories/TextBox"

export default function RecoverPasswordCard() {
  const classes = useStyles()

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: async () => {
      await recoverPassword()
    },
  })
  const { mutateAsync: recoverPassword } = useRecoverPassword(
    formik.values.email,
  )

  return (
    <Grow in={true}>
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
    </Grow>
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

const useStyles = makeStyles((theme: any) => ({
  card: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))
