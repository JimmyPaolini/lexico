import { makeStyles } from "@material-ui/core/styles"
import { ExpandMore } from "@material-ui/icons"

type Props = {
  expanded: boolean
  [key: string]: any
}
export default function ExpandIcon({ expanded, ...props }: Props) {
  const classes = useStyles()
  const direction = expanded ? classes.upSideDown : classes.rightSideUp
  return <ExpandMore className={direction} {...props} />
}

const useStyles = makeStyles(() => ({
  rightSideUp: {
    transition: "250ms ease",
    transform: "rotateZ(0deg)",
  },
  upSideDown: {
    transition: "250ms ease",
    transform: "rotateZ(-180deg)",
  },
}))
