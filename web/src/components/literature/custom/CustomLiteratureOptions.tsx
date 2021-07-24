import { IconButton, ListItemSecondaryAction } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { AccountCircle, MoreHoriz } from "@material-ui/icons"
import { MouseEvent, useState } from "react"
import { CustomText } from "../../../utils/literatureLocal"
import CustomLiteratureMenu from "./CustomLiteratureOptions/CustomLiteratureMenu"

interface CustomLiteratureOptionsProps {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
}
export default function CustomLiteratureOptions({
  text,
  refreshCustomTexts,
}: CustomLiteratureOptionsProps): JSX.Element {
  const classes = useStyles()

  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget)
  }

  return (
    <ListItemSecondaryAction onClick={(event) => event.stopPropagation()}>
      {!text?.local ? (
        <IconButton disabled>
          <AccountCircle />
        </IconButton>
      ) : null}
      <IconButton
        aria-label="options"
        className={classes.options}
        onClick={openMenu}>
        <MoreHoriz />
      </IconButton>
      <CustomLiteratureMenu
        {...{ text, refreshCustomTexts, anchor, setAnchor }}
      />
    </ListItemSecondaryAction>
  )
}

const useStyles = makeStyles(() => ({
  options: {
    padding: 4,
  },
}))
