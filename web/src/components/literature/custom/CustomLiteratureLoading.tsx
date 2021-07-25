import { CircularProgress, Divider, ListItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { memo } from "react"
import { MyTheme } from "../../../theme/theme"

export default memo(function CustomLiteratureLoading(): JSX.Element {
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

const useStyles = makeStyles((theme: MyTheme) => ({
  divider: {
    marginRight: theme.spacing(1),
  },
  row: {
    display: "flex",
    justifyContent: "center",
  },
}))
