import { Home } from "@material-ui/icons"
import useDeleteCustomText from "../../../../hooks/user/useDeleteCustomText"
import useSnackbarEnhanced from "../../../../hooks/useSnackbarEnhanced"
import {
  createCustomTextLocal,
  CustomText
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
  closeMenu
}: CustomLiteratureMoveToLocalProps): JSX.Element {
  const { enqueueSnackbar } = useSnackbarEnhanced()

  const { mutate: deleteCustomText } = useDeleteCustomText(text, {
    onSuccess: () => {
      createCustomTextLocal(text)
      enqueueSnackbar(
        `Moved custom text "${text.title}" to local, so it can now be accessed only on this device/browser`,
      )
    },
    onMutate: closeMenu,
    onSettled: () => refreshCustomTexts(),
  })
  const moveToLocal = () => deleteCustomText(text.id)

  return (
    <CustomLiteratureMenuItem
      action={moveToLocal}
      icon={<Home />}
      text="Move to Local"
    />
  )
}
