import { IconButton, ListItemSecondaryAction } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { AccountCircle, MoreHoriz } from "@material-ui/icons"
import { MouseEvent, useState } from "react"
import { CustomText } from "../../../utils/literatureLocal"
import CustomLiteratureMenu from "./CustomLiteratureOptions/CustomLiteratureMenu"

type Props = {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
}
export default function CustomLiteratureOptions({
  text,
  refreshCustomTexts,
}: Props) {
  const classes = useStyles()

  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget)
  }

  return (
    <ListItemSecondaryAction
      onClick={(event) => event.stopPropagation()}
      className={classes.iconButtons}
    >
      {!text?.local ? (
        <IconButton disabled aria-label="on user" className={classes.options}>
          <AccountCircle />
        </IconButton>
      ) : null}
      <IconButton
        aria-label="options"
        className={classes.options}
        onClick={openMenu}
      >
        <MoreHoriz />
      </IconButton>
      <CustomLiteratureMenu
        {...{ text, refreshCustomTexts, anchor, setAnchor }}
      />
    </ListItemSecondaryAction>
  )
}

const useStyles = makeStyles(() => ({
  iconButtons: {
    position: "relative",
    right: 0,
    flexShrink: 0,
    marginTop: "auto",
    marginBottom: "auto",
    transform: "none",
  },
  options: {
    padding: 4,
  },
}))
