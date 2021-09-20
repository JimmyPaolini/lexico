import { Delete } from "@material-ui/icons"
import { useDeleteCustomTextMutation } from "../../../../graphql/generated"
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
  const { mutate: deleteCustomTextUser } = useDeleteCustomTextMutation({
    onSuccess: () => refreshCustomTexts(),
  })
  const deleteText = async () => {
    if (text.local) {
      deleteCustomTextLocal(text.id)
      await refreshCustomTexts()
    } else deleteCustomTextUser(text)
  }

  return (
    <CustomLiteratureMenuItem
      action={deleteText}
      icon={<Delete />}
      text="Delete"
    />
  )
}
