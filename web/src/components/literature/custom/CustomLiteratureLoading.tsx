import { CircularProgress, Divider, ListItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { memo } from "react"
import { LexicoTheme } from "../../../theme"

export default memo(function CustomLiteratureLoading() {
  const classes = useStyles()

  return (
    <>
      <Divider className={classes.divider} />
      <ListItem className={classes.row}>
        <CircularProgress size={32} thickness={5.4} />
      </ListItem>
    </>
  )
})

const useStyles = makeStyles((theme: LexicoTheme) => ({
  divider: {
    marginRight: theme.spacing(1),
  },
  row: {
    display: "flex",
    justifyContent: "center",
  },
}))
