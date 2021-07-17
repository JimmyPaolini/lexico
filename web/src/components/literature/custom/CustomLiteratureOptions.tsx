import {
  IconButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Delete, Edit, MoreHoriz } from "@material-ui/icons"
import { useRouter } from "next/router"
import { memo, MouseEvent, RefObject, useState } from "react"
import {
  CustomText,
  deleteLiteratureLocal,
} from "../../../utils/localLiterature"

interface CustomLiteratureRowProps {
  text: CustomText
  listItemRef: RefObject<HTMLDivElement>
  refreshLiteratureLocal: () => void
}
export default memo(function CustomLiteratureRow({
  text,
  listItemRef,
  refreshLiteratureLocal,
}: CustomLiteratureRowProps): JSX.Element {
  const classes = useStyles()
  const router = useRouter()
  listItemRef

  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget)
  }
  const closeMenu = () => {
    setAnchor(null)
  }

  const deleteText = () => {
    deleteLiteratureLocal(text.id)
    refreshLiteratureLocal()
  }
  const editText = () => {
    router.push("reader/save/" + text.id)
  }

  return (
    <ListItemSecondaryAction onClick={(event) => event.stopPropagation()}>
      <IconButton
        aria-label="options"
        className={classes.options}
        onClick={openMenu}>
        <MoreHoriz />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={closeMenu}
        MenuListProps={{ style: { padding: 0 } }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <MenuItem onClick={editText}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={deleteText}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </ListItemSecondaryAction>
  )
})

const useStyles = makeStyles(() => ({
  options: {
    padding: 4,
  },
}))
