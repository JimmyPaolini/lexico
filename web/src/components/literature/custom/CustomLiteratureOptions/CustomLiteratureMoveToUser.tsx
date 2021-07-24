import { AccountCircle } from "@material-ui/icons"
import { useEffect } from "react"
import useCreateCustomText from "../../../../hooks/user/useCreateCustomText"
import useSnackbarEnhanced from "../../../../hooks/useSnackbarEnhanced"
import {
  CustomText,
  deleteCustomTextLocal,
} from "../../../../utils/literatureLocal"
import CustomLiteratureMenuItem from "./CustomLiteratureMenuItem"

interface CustomLiteratureMoveToUserProps {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
  closeMenu: () => void
}
export default function CustomLiteratureMoveToUser({
  text,
  refreshCustomTexts,
  closeMenu,
}: CustomLiteratureMoveToUserProps): JSX.Element {
  const { enqueueSnackbar } = useSnackbarEnhanced()

  const { mutate: createCustomText, error } = useCreateCustomText(text, {
    onSuccess: () => {
      deleteCustomTextLocal(text.id)
      enqueueSnackbar(
        `Moved custom text "${text.title}" to user, so it can now be accessed across devices/browsers`,
      )
    },
    onMutate: closeMenu,
    onSettled: () => refreshCustomTexts(),
  })
  const moveToUser = () => createCustomText(text)

  useEffect(() => {
    if (
      error &&
      /user cannot have more than 3 custom texts/.test(
        (error as any)?.response.errors[0].message,
      )
    ) {
      enqueueSnackbar(
        `User cannot have more than 3 custom texts saved at once. Please move one to local in order to move another to the user`,
      )
    }
  }, [error])

  return (
    <CustomLiteratureMenuItem
      action={moveToUser}
      icon={<AccountCircle />}
      text="Move To User"
    />
  )
}
