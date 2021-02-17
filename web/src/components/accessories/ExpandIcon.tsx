import { IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { ExpandMore } from "@material-ui/icons"

interface Props {
  expanded: boolean
}
export default function ExpandIcon({ expanded }: Props) {
  const classes = useStyles()
  return (
    <IconButton
      disableRipple
      disableTouchRipple
      className={classes.disableHoverGlow}
    >
      <ExpandMore
        className={expanded ? classes.upSideDown : classes.rightSideUp}
      />
    </IconButton>
  )
}

const useStyles = makeStyles(() => ({
  disableHoverGlow: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  rightSideUp: {
    transition: "250ms ease",
    transform: "rotateZ(0deg)",
  },
  upSideDown: {
    transition: "250ms ease",
    transform: "rotateZ(-180deg)",
  },
}))
