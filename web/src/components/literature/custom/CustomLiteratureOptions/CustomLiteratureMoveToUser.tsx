import { AccountCircle } from "@material-ui/icons"
import { useEffect } from "react"
import useCreateCustomText from "../../../../hooks/literature/custom/useCreateCustomText"
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

  const { mutate: createCustomTextUser, error } = useCreateCustomText(text, {
    onMutate: closeMenu,
    onSuccess: () => deleteCustomTextLocal(text.id),
    onSettled: () => refreshCustomTexts(),
  })
  const moveToUser = () => createCustomTextUser(text)

  useEffect(() => {
    const errorMessage = (error as any)?.response.errors[0].message
    const userHasMoreThan3Texts =
      error && errorMessage.match(/user cannot have more than 3 custom texts/)
    if (userHasMoreThan3Texts) {
      enqueueSnackbar(
        `You cannot have more than 3 custom texts saved to your user at once. Move one to local in order to move another to the user`,
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
