import { Edit as EditIcon } from '@mui/icons-material'

import { Link } from 'src/components/accessories/Link'
import { CustomText } from 'src/graphql/generated'

import { Action } from './Action'

type Props = { text: CustomText }

export const Edit = ({ text }: Props) => {
  return (
    <Link href={`library/customText/${text.id}`}>
      <Action
        onClick={(e) => {
          e.stopPropagation()
        }}
        Icon={<EditIcon />}
        text="Edit"
      />
    </Link>
  )
}
