import { Home } from "@material-ui/icons"
import useDeleteCustomText from "../../../../hooks/user/useDeleteCustomText"
import {
  createCustomTextLocal,
  CustomText,
} from "../../../../utils/literatureLocal"
import CustomLiteratureMenuItem from "./CustomLiteratureMenuItem"

interface CustomLiteratureMoveToLocalProps {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
  closeMenu: () => void
}
export default function CustomLiteratureMoveToLocal({
  text,
  refreshCustomTexts,
  closeMenu,
}: CustomLiteratureMoveToLocalProps): JSX.Element {
  const { mutate: deleteCustomTextUser } = useDeleteCustomText(text, {
    onMutate: closeMenu,
    onSettled: () => refreshCustomTexts(),
  })
  const moveToLocal = () => {
    createCustomTextLocal(text)
    deleteCustomTextUser(text.id)
  }

  return (
    <CustomLiteratureMenuItem
      action={moveToLocal}
      icon={<Home />}
      text="Move to Local"
    />
  )
}
