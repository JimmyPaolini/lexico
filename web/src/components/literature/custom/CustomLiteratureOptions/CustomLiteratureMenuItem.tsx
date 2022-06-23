import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'

const PREFIX = 'CustomLiteratureMenuItem'

const classes = {
  icon: `${PREFIX}-icon`,
}

const StyledMenuItem = styled(MenuItem)(() => ({
  [`& .${classes.icon}`]: {
    minWidth: 40,
  },
}))

type Props = {
  action: () => void
  icon: JSX.Element
  text: string
}

export default function CustomLiteratureMenuItem({
  action,
  icon,
  text,
}: Props) {
  return (
    <StyledMenuItem onClick={action}>
      <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </StyledMenuItem>
  )
}
