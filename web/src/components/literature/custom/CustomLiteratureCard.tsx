import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader as CardHeaderMui,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Add } from "@material-ui/icons"
import React, { memo } from "react"
import CustomLiteratureRows from "./CustomLiteratureRows"

export default memo(function LiteratureCustomCard() {
  const classes = useStyles()

  return (
    <Card elevation={4} className={classes.literatureCustomCard}>
      <CardActionArea href="/literature/custom">
        <CardHeaderMui
          title="Your Literature"
          action={<Add className={classes.add} />}
          classes={{ action: classes.action }}
        />
      </CardActionArea>
      <CardContent className={classes.noPadding}>
        <CustomLiteratureRows />
      </CardContent>
    </Card>
  )
})

const useStyles = makeStyles((theme: any) => ({
  literatureCustomCard: {
    display: "flex",
    flexDirection: "column",
    maxWidth: theme.custom.cardWidth,
    minWidth: theme.custom.cardWidth - theme.spacing(4),
    paddingBottom: 0,
    margin: theme.spacing(1),
  },
  noPadding: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  add: {
    margin: theme.spacing(1),
    marginRight: 12,
  },
  action: {
    marginTop: "auto",
    marginBottom: "auto",
  },
}))
