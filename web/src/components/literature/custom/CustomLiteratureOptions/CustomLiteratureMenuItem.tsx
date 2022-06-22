import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

interface CustomLiteratureMenuItemProps {
  action: () => void
  icon: JSX.Element
  text: string
}
export default function CustomLiteratureMenuItem({
  action,
  icon,
  text,
}: CustomLiteratureMenuItemProps) {
  const classes = useStyles()

  return (
    <MenuItem onClick={action}>
      <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </MenuItem>
  )
}

const useStyles = makeStyles(() => ({
  icon: {
    minWidth: 40,
  },
}))
