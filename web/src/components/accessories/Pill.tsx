import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  backgroundColor: string
  color: string
}>

export default function Pill({ backgroundColor, color, children }: Props) {
  const classes = useStyles()
  return (
    <Typography
      variant="button"
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
    height: 20,
    padding: "0px 6px",
    borderRadius: 100,
    display: "inline-flex",
    alignItems: "center",
  },
}))
