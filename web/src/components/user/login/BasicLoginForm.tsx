import { useContext, useRef, useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { useFormik } from 'formik'
import Link from 'next/link'

import { useLoginQuery, useRegisterMutation } from '../../../graphql/generated'
import { googleAnalyticsEvent } from '../../../utils/googleAnalytics'
import { capitalizeFirstLetter, validateEmail } from '../../../utils/string'
import SubmitButton from '../../accessories/SubmitButton'
import TextBox from '../../accessories/TextBox'
import { Context } from '../../layout/Context'

const PREFIX = 'BasicLoginForm'

const classes = {
  columnItem: `${PREFIX}-columnItem`,
  formError: `${PREFIX}-formError`,
}

const Root = styled()(({ theme }) => ({
  [`& .${classes.columnItem}`]: {
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.formError}`]: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

export default function BasicLogin() {
  const { queryClient } = useContext(Context)
  const [submit, setSubmit] = useState<'sign up' | 'sign in'>('sign in')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const passwordTextBoxRef = useRef<HTMLDivElement>(null)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async () => {
      if (submit === 'sign in') {
        await login()
        googleAnalyticsEvent('login', {
          category: 'user',
          label: 'basic',
          value: formik.values.email,
        })
      } else {
        await register(formik.values)
        googleAnalyticsEvent('register', {
          category: 'user',
          label: 'email',
          value: formik.values.email,
        })
      }
    },
  })
  const { refetch: login, error: loginError } = useLoginQuery(formik.values, {
    enabled: false,
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries('User')
    },
  })
  const { mutateAsync: register, error: registerError } = useRegisterMutation()

  let error: any = registerError || loginError
  error = error ? error.response.errors[0].message : ''

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid item className={classes.columnItem}>
        <TextBox name="email" formik={formik} />
      </Grid>
      <Grid item className={classes.columnItem}>
        <TextBox
          name="password"
          formik={formik}
          type={showPassword ? 'text' : 'password'}
          ref={passwordTextBoxRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  style={{ left: 8 }}
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid
        container
        direction="row-reverse"
        item
        justifyContent="space-between"
        spacing={1}
      >
        <Grid item xs>
          <SubmitButton name="sign in" onClick={() => setSubmit('sign in')} />
        </Grid>
        <Grid item xs>
          <SubmitButton name="sign up" onClick={() => setSubmit('sign up')} />
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
      <Grid item>
        <Link href="/user/recoverPassword" passHref>
          <Button
            color="secondary"
            variant="contained"
            size="small"
            disableElevation
            fullWidth
          >
            Recover Password
          </Button>
        </Link>
      </Grid>
    </form>
  )
}

interface UserInfo {
  email: string
  password: string
}
export function validate({ email, password }: UserInfo): UserInfo {
  const errors = {} as UserInfo
  if (!validateEmail(email)) errors.email = 'Invalid email'
  if (password.length < 8)
    errors.password = 'Password must be at least 8 characters'
  else if (!password.match(/[A-Z]/g))
    errors.password = 'Password must contain a capital letter'
  else if (!password.match(/[0-9]/g))
    errors.password = 'Password must contain a number'
  return errors
}
