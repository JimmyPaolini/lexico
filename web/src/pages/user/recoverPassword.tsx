import {
  Card,
  CardContent,
  Divider,
  Grid,
  Grow,
  IconButton,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Close } from "@material-ui/icons"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import React from "react"
import CardHeader from "../../components/accessories/CardHeader"
import SubmitButton from "../../components/accessories/SubmitButton"
import TextBox from "../../components/accessories/TextBox"
import useRecoverPassword from "../../hooks/authentication/useRecoverPassword"
import { validateEmail } from "../../utils/string"

export default function RecoverPassword() {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: async () => {
      await recoverPassword()
      router.push("/user")
      enqueueSnackbar(
        `A password recovery email has been sent to: ${formik.values.email}`,
        {
          variant: "info",
          autoHideDuration: 8000,
          action: (key: any) => (
            <IconButton onClick={() => closeSnackbar(key)} size="small">
              <Close />
            </IconButton>
          ),
        },
      )
    },
  })
  const { mutateAsync: recoverPassword } = useRecoverPassword(
    formik.values.email,
  )

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item className={classes.column}>
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
      </Grid>
    </Grid>
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
  column: {
    width: theme.custom.cardWidth,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  card: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))
