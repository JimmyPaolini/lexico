import { Edit } from "@material-ui/icons"
import { useRouter } from "next/router"
import { CustomText } from "../../../../utils/literatureLocal"
import CustomLiteratureMenuItem from "./CustomLiteratureMenuItem"

interface CustomLiteratureEditProps {
  text: CustomText
}
export default function CustomLiteratureEdit({
  text,
}: CustomLiteratureEditProps): JSX.Element {
  const router = useRouter()

  const editText = () => {
    router.push("literature/custom/" + text.id)
  }

  return (
    <CustomLiteratureMenuItem action={editText} icon={<Edit />} text="Edit" />
  )
}
