import {
  Card,
  CardContent,
  Divider,
  Grid,
  Grow,
  IconButton,
  InputAdornment,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Close, Visibility, VisibilityOff } from "@material-ui/icons"
import { useFormik } from "formik"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import React, { useRef, useState } from "react"
import CardHeader from "../../../components/accessories/CardHeader"
import SubmitButton from "../../../components/accessories/SubmitButton"
import TextBox from "../../../components/accessories/TextBox"
import validatePasswordResetTokenQuery from "../../../graphql/authentication/validatePasswordResetToken.graphql"
import useResetPassword from "../../../hooks/authentication/useResetPassword"
import { graphQLClient } from "../../_app"

interface Props {
  passwordResetToken: string
}
export default function ResetPassword({ passwordResetToken }: Props) {
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const passwordTextBoxRef = useRef<any>(null)
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate,
    onSubmit: async () => {
      await resetPassword()
      router.push("/user")
      enqueueSnackbar(`Your password has been successfully reset!`, {
        variant: "info",
        autoHideDuration: 8000,
        action: (key: any) => (
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <Close />
          </IconButton>
        ),
      })
    },
  })
  const { mutateAsync: resetPassword } = useResetPassword(
    passwordResetToken,
    formik.values.password,
  )

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item className={classes.column}>
        <Grow in={true}>
          <Card className={classes.card}>
            <CardHeader title="Reset Password" />
            <Divider variant="middle" />
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextBox
                      name="password"
                      formik={formik}
                      type={showPassword ? "text" : "password"}
                      ref={passwordTextBoxRef}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <SubmitButton name="Reset Password" />
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

interface ResetPasswordInfo {
  password: string
}
export function validate({ password }: ResetPasswordInfo) {
  const errors = {} as any
  if (password.length < 8)
    errors.password = "Password must be at least 8 characters"
  else if (!password.match(/[A-Z]/g))
    errors.password = "Password must contain a capital letter"
  else if (!password.match(/[0-9]/g))
    errors.password = "Password must contain a number"
  return errors
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const passwordResetToken = context.params?.passwordResetToken
  try {
    const { validatePasswordResetToken } = await graphQLClient.request(
      validatePasswordResetTokenQuery,
      {
        passwordResetToken,
      },
    )
    if (!validatePasswordResetToken) {
      console.error("invalid password reset token")
      return { notFound: true }
    }
  } catch {
    console.error("invalid password reset token")
    return { notFound: true }
  }
  console.log("valid password reset token")
  return { props: { passwordResetToken } }
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
