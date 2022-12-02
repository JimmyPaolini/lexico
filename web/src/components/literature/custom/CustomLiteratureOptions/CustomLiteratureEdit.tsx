import { Edit } from '@mui/icons-material'

import { useRouter } from 'next/router'

import { CustomText } from 'src/utils/literatureLocal'

import { CustomLiteratureMenuItem } from './CustomLiteratureMenuItem'

type Props = {
  text: CustomText
}

export const CustomLiteratureEdit = ({ text }: Props) => {
  const router = useRouter()

  const editText = () => {
    router.push('literature/custom/' + text.id)
  }

  return (
    <CustomLiteratureMenuItem action={editText} icon={<Edit />} text="Edit" />
  )
}
