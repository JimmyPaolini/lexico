import { Typography } from "@material-ui/core"
import { useContext } from "react"
import { Context } from "../../layout/Context"

export function Identity() {
  const { user } = useContext(Context)

  return !!user ? (
    <Typography gutterBottom align="center">
      Signed in
      {user.googleId
        ? " with Google "
        : user.facebookId
        ? " with Facebook "
        : " with email/password "}
      as:
      <br />
      {user.email}
    </Typography>
  ) : (
    <Typography gutterBottom align="center">
      No user signed in:
      <br />
      settings saved locally on device/browser
    </Typography>
  )
}
