import { Edit } from '@material-ui/icons'

import { useRouter } from 'next/router'

import { CustomText } from '../../../../utils/literatureLocal'
import CustomLiteratureMenuItem from './CustomLiteratureMenuItem'

type Props = {
  text: CustomText
}

export default function CustomLiteratureEdit({ text }: Props) {
  const router = useRouter()

  const editText = () => {
    router.push('literature/custom/' + text.id)
  }

  return (
    <CustomLiteratureMenuItem action={editText} icon={<Edit />} text="Edit" />
  )
}
