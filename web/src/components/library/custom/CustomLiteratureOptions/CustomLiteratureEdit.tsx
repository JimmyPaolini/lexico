import { useRouter } from 'next/router'

import { Edit } from '@mui/icons-material'

import { CustomText } from 'src/components/library/custom/customTextsLocal'

import { CustomLiteratureMenuItem } from './CustomLiteratureMenuItem'

type Props = { text: CustomText }

export const CustomLiteratureEdit = ({ text }: Props) => {
  const router = useRouter()

  const editText = async () => await router.push('library/custom/' + text.id)

  return (
    <CustomLiteratureMenuItem action={editText} icon={<Edit />} text="Edit" />
  )
}
