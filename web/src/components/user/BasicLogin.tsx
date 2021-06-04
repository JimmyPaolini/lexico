import { Grid, IconButton, InputAdornment, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import { useFormik } from "formik"
import Link from "next/link"
import React, { useRef, useState } from "react"
import useLogin from "../../hooks/authentication/useLogin"
import useRegister from "../../hooks/authentication/useRegister"
import { capitalizeFirstLetter, validateEmail } from "../../utils/string"
import SubmitButton from "../accessories/SubmitButton"
import TextBox from "../accessories/TextBox"

export default function BasicLogin() {
  const classes = useStyles()
  const [submit, setSubmit] = useState<"sign up" | "sign in">("sign in")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const passwordTextBoxRef = useRef<any>(null)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async () => {
      if (submit === "sign in") await login()
      else await register()
    },
  })
  const { refetch: login, error: loginError } = useLogin(formik.values)
  const { refetch: register, error: registerError } = useRegister(formik.values)

  let error: any = registerError || loginError
  error = error ? error.response.errors[0].message : ""

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid item className={classes.columnItem}>
        <TextBox name="email" formik={formik} />
      </Grid>
      <Grid item className={classes.columnItem}>
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
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Link href="/user/recoverPassword">
          <Typography color="secondary" className={classes.recoverPasswordLink}>
            Recover Password
          </Typography>
        </Link>
      </Grid>
      <Grid
        container
        direction="row-reverse"
        item
        justify="space-between"
        spacing={2}
      >
        <Grid item xs>
          <SubmitButton name="sign in" onClick={() => setSubmit("sign in")} />
        </Grid>
        <Grid item xs>
          <SubmitButton name="sign up" onClick={() => setSubmit("sign up")} />
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          color="error"
          variant="caption"
          align="center"
          display="block"
          className={classes.formError}
        >
          {capitalizeFirstLetter(error)}
        </Typography>
      </Grid>
    </form>
  )
}

interface UserInfo {
  email: string
  password: string
}
export function validate({ email, password }: UserInfo) {
  const errors = {} as any
  if (!validateEmail(email)) errors.email = "Invalid email"
  if (password.length < 8)
    errors.password = "Password must be at least 8 characters"
  else if (!password.match(/[A-Z]/g))
    errors.password = "Password must contain a capital letter"
  else if (!password.match(/[0-9]/g))
    errors.password = "Password must contain a number"
  return errors
}

const useStyles = makeStyles((theme: any) => ({
  columnItem: {
    marginBottom: theme.spacing(2),
  },
  formError: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  recoverPasswordLink: {
    cursor: "pointer",
  },
}))
