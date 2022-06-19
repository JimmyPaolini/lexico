import { FC } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

type PillProps = {
  backgroundColor: string
  color: string
}

const Pill: FC<PillProps> = ({ backgroundColor, color, children }) => {
  const classes = useStyles()
  return (
    <Typography
      variant="button"
      align="center"
      noWrap
      className={classes.pill}
      style={{ color, backgroundColor }}
    >
      {children}
    </Typography>
  )
}

const useStyles = makeStyles(() => ({
  pill: {
    width: "min-content",
    height: 24,
    padding: "0px 6px",
    borderRadius: 100,
    flexShrink: 0,
  },
}))

export default Pill
