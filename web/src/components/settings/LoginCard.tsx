import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Grow,
  IconButton,
  useMediaQuery,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Menu } from "@material-ui/icons"
import Image from "next/image"
import React, { useContext } from "react"
import { sentenceCase } from "../../utils/string"
import { Context } from "../Context"
import LoginLocal from "./LoginLocal"

interface Props {
  title: string
}
export default function LoginCard({ title }: Props) {
  const classes = useStyles()
  const { isNavOpen, setNavOpen } = useContext(Context)
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"))

  return (
    <Grow in={true}>
      <Card className={classes.card}>
        <CardHeader
          title={sentenceCase(title)}
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
        />
        <Divider variant="middle" />
        <CardContent>
          <Grid container direction="column" alignItems="center">
            <Grid item className={classes.columnItem}>
              <OAuthLogin provider="google" href={googleUrl} />
            </Grid>
            <Grid item className={classes.columnItem}>
              <OAuthLogin provider="facebook" href={facebookUrl} />
            </Grid>
          </Grid>
          <Divider className={classes.columnItem} />
          <LoginLocal />
        </CardContent>
      </Card>
    </Grow>
  )
}

const googleUrl =
  "https://accounts.google.com/o/oauth2/auth" +
  "?response_type=code" +
  "&client_id=581175821772-acc3epk92kl7n8bna0m6md2p4gvtrfpa.apps.googleusercontent.com" +
  "&scope=email" +
  "&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fgoogle"
const facebookUrl =
  "https://www.facebook.com/v3.2/dialog/oauth" +
  "?response_type=code" +
  "&client_id=1348031495536829" +
  "&scope=email" +
  "&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ffacebook"

interface OAuthLoginProps {
  provider: string
  href: string
}
function OAuthLogin({ provider, href }: OAuthLoginProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      disableElevation
      size="large"
      href={href}
      startIcon={
        <Image
          src={`/icon/${provider}.png`}
          alt={`${provider} logo`}
          height={24}
          width={24}
        />
      }
    >
      {`Sign in with ${sentenceCase(provider)}`}
    </Button>
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
}))
