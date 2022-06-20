import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import CornerText from "./CornerText"

type Props = {
  top: string
  bottom: string
  side: "right" | "left"
}

export default function SideCornerTexts({ top, bottom, side }: Props) {
  const classes = useStyles()
  return (
    <Grid
      container
      xs
      direction="column"
      justifyContent="space-between"
      className={side === "right" ? classes.right : classes.left}
    >
      <CornerText text={top} />
      <CornerText text={bottom} />
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  left: {
    position: "relative",
    left: 2,
  },
  right: {
    position: "relative",
    right: 2,
  },
}))
