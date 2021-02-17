import { Button, Grid, TextField, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useFormik } from "formik"
import request from "graphql-request"
import React, { Dispatch, useState } from "react"
import { useQuery } from "react-query"
import loginQuery from "../../graphql/authentication/login.gql"
import registerMutation from "../../graphql/authentication/register.gql"
import { endpoint } from "../../pages/_app"
import {
  capitalizeFirstLetter,
  sentenceCase,
  validateEmail,
} from "../../utils/string"

export default function LoginLocal() {
  const classes = useStyles()
  const [submit, setSubmit] = useState<"sign up" | "sign in">("sign in")
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
        <LoginField name="email" formik={formik} />
      </Grid>
      <Grid item className={classes.columnItem}>
        <LoginField name="password" formik={formik} type="password" />
      </Grid>
      <Grid container item justify="space-between" spacing={2}>
        <Grid item xs>
          <SubmitButton name="sign up" setSubmit={setSubmit} />
        </Grid>
        <Grid item xs>
          <SubmitButton name="sign in" setSubmit={setSubmit} />
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

const useRegister = (userInfo: UserInfo) =>
  useQuery(
    "register",
    async () => {
      const { searchLatin: data } = await request(
        endpoint,
        registerMutation,
        userInfo,
      )
      return data
    },
    {
      enabled: false,
      retry: false,
    },
  )

const useLogin = (userInfo: UserInfo) =>
  useQuery(
    "login",
    async () => {
      const { searchLatin: data } = await request(
        endpoint,
        loginQuery,
        userInfo,
      )
      return data
    },
    {
      enabled: false,
      retry: false,
    },
  )

interface LoginFieldProps {
  formik: any
  name: string
  [key: string]: any
}
function LoginField({ formik, name, ...props }: LoginFieldProps) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      id={name}
      name={name}
      label={sentenceCase(name)}
      {...props}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && !!formik.errors[name]}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  )
}

interface SubmitButtonProps {
  name: "sign up" | "sign in"
  setSubmit: Dispatch<React.SetStateAction<"sign up" | "sign in">>
}
function SubmitButton({ name, setSubmit }: SubmitButtonProps) {
  return (
    <Button
      color="primary"
      variant="contained"
      size="large"
      disableElevation
      fullWidth
      type="submit"
      onClick={() => setSubmit(name)}
    >
      {sentenceCase(name)}
    </Button>
  )
}

interface UserInfo {
  email: string
  password: string
}
function validate({ email, password }: UserInfo) {
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
    marginTop: theme.spacing(1),
  },
}))
