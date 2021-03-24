import { Card, CardContent, Divider, Grid, Grow } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { sentenceCase } from "../../utils/string"
import CardHeader from "../accessories/CardHeader"
import LoginLocal from "./BasicLogin"
import OAuthLogin from "./OAuthLogin"

interface Props {
  title: string
}
export default function LoginCard({ title }: Props) {
  const classes = useStyles()

  return (
    <Grow in={true}>
      <Card className={classes.card}>
        <CardHeader title={sentenceCase(title)} />
        <Divider variant="middle" />
        <CardContent>
          <Grid container direction="column" alignItems="center">
            <Grid item className={classes.columnItem}>
              <OAuthLogin provider="google" />
            </Grid>
            <Grid item className={classes.columnItem}>
              <OAuthLogin provider="facebook" />
            </Grid>
          </Grid>
          <Divider className={classes.columnItem} />
          <LoginLocal />
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
