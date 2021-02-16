import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grow,
  IconButton,
  useMediaQuery,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Menu } from "@material-ui/icons"
import React, { useContext } from "react"
import { useQuery } from "react-query"
import logoutQuery from "../../graphql/logout.gql"
import { graphQLClient, queryClient } from "../../pages/_app"
import { Context } from "../Context"

export default function SettingsCard() {
  const classes = useStyles()
  const { isNavOpen, setNavOpen } = useContext(Context)
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"))
  const { refetch: logout } = useQuery(
    "logout",
    async () => {
      await queryClient.invalidateQueries("user")
      const { logout: data } = await graphQLClient.request(logoutQuery)
      await queryClient.invalidateQueries("user")
      return data
    },
    { enabled: false },
  )

  return (
    <Grow in={true}>
      <Card className={classes.card}>
        <CardHeader
          title="Settings"
          titleTypographyProps={{ variant: "h5", align: "center" }}
          avatar={
            isMobile && (
              <IconButton
                onClick={() => setNavOpen(!isNavOpen)}
                aria-label="menu"
              >
                <Menu />
              </IconButton>
            )
          }
          action={
            isMobile && (
              <IconButton
                onClick={() => null}
                aria-label="empty space"
                className={classes.hiddenAction}
              >
                <Menu />
              </IconButton>
            )
          }
        />
        <Divider variant="middle" />
        <CardContent>
          <Button
            color="primary"
            variant="contained"
            size="large"
            disableElevation
            fullWidth
            type="submit"
            onClick={() => logout()}
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </Grow>
  )
}

const useStyles = makeStyles((theme: any) => ({
  card: {
    margin: theme.spacing(2),
    width: theme.custom.cardWidth,
  },
  columnItem: {
    marginBottom: theme.spacing(2),
  },
  hiddenAction: {
    marginTop: 8,
    marginRight: 8,
    visibility: "hidden",
  },
}))
