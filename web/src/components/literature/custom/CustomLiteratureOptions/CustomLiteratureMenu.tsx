import { Menu } from "@material-ui/core"
import { Dispatch, SetStateAction } from "react"
import { CustomText } from "../../../../utils/literatureLocal"
import CustomLiteratureDelete from "./CustomLiteratureDelete"
import CustomLiteratureEdit from "./CustomLiteratureEdit"
import CustomLiteratureMoveToLocal from "./CustomLiteratureMoveToLocal"
import CustomLiteratureMoveToUser from "./CustomLiteratureMoveToUser"

interface CustomLiteratureMenuProps {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
  anchor: HTMLElement | null
  setAnchor: Dispatch<SetStateAction<HTMLElement | null>>
}
export default function CustomLiteratureMenu({
  text,
  refreshCustomTexts,
  anchor,
  setAnchor,
}: CustomLiteratureMenuProps): JSX.Element {
  const closeMenu = () => {
    setAnchor(null)
  }

  return (
    <Menu
      onClick={(event) => event.stopPropagation()}
      anchorEl={anchor}
      open={!!anchor}
      onClose={closeMenu}
      elevation={4}
      MenuListProps={{ style: { padding: 0 } }}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}>
      {text.local ? (
        <CustomLiteratureMoveToUser
          {...{ text, refreshCustomTexts, closeMenu }}
        />
      ) : (
        <CustomLiteratureMoveToLocal
          {...{ text, refreshCustomTexts, closeMenu }}
        />
      )}
      <CustomLiteratureEdit {...{ text }} />
      <CustomLiteratureDelete {...{ text, refreshCustomTexts }} />
    </Menu>
  )
}
