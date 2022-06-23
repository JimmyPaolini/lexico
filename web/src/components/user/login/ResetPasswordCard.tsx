import { useContext, useRef, useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'

import { useResetPasswordMutation } from '../../../graphql/generated'
import useSnackbarEnhanced from '../../../hooks/useSnackbarEnhanced'
import CardHeader from '../../accessories/CardHeader'
import SubmitButton from '../../accessories/SubmitButton'
import TextBox from '../../accessories/TextBox'
import { Context } from '../../layout/Context'

const PREFIX = 'ResetPasswordCard'

const classes = {
  card: `${PREFIX}-card`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.card}`]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

type Props = {
  passwordResetToken: string
}

export default function ResetPasswordCard({ passwordResetToken }: Props) {
  const { queryClient } = useContext(Context)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const passwordTextBoxRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbarEnhanced()

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate,
    onSubmit: async () => {
      await resetPassword({ passwordResetToken, ...formik.values })
      router.push('/user')
      enqueueSnackbar(`Your password has been successfully reset!`)
    },
  })
  const { mutateAsync: resetPassword } = useResetPasswordMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries('User')
    },
  })

  return (
    <Root>
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
                  type={showPassword ? 'text' : 'password'}
                  ref={passwordTextBoxRef}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
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
              <Grid item>
                <SubmitButton name="Reset Password" />
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Root>
  )
}

interface ResetPasswordInfo {
  password: string
}
export function validate({ password }: ResetPasswordInfo): {
  password: string
} {
  const errors = {} as { password: string }
  if (password.length < 8)
    errors.password = 'Password must be at least 8 characters'
  else if (!password.match(/[A-Z]/g))
    errors.password = 'Password must contain a capital letter'
  else if (!password.match(/[0-9]/g))
    errors.password = 'Password must contain a number'
  return errors
}
