import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { ExpandMore } from "@material-ui/icons"

interface Props {
  expanded: boolean
  [key: string]: any
}
export default function ExpandIcon({ expanded, ...props }: Props): JSX.Element {
  const classes = useStyles()
  return (
    <Box className={classes.container} {...props}>
      <ExpandMore
        className={expanded ? classes.upSideDown : classes.rightSideUp}
      />
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    padding: 12,
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
