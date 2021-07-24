import { Delete } from "@material-ui/icons"
import useDeleteCustomText from "../../../../hooks/user/useDeleteCustomText"
import {
  CustomText,
  deleteCustomTextLocal,
} from "../../../../utils/literatureLocal"
import CustomLiteratureMenuItem from "./CustomLiteratureMenuItem"

interface CustomLiteratureDeleteProps {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
}
export default function CustomLiteratureDelete({
  text,
  refreshCustomTexts,
}: CustomLiteratureDeleteProps): JSX.Element {
  const { mutate: deleteCustomTextUser } = useDeleteCustomText(text, {
    onSuccess: async () => await refreshCustomTexts(),
  })
  const deleteText = async () => {
    if (text.local) deleteCustomTextLocal(text.id)
    else deleteCustomTextUser(text)
  }

  return (
    <CustomLiteratureMenuItem
      action={deleteText}
      icon={<Delete />}
      text="Delete"
    />
  )
}
