import { useEffect } from 'react'

import { AccountCircle } from '@mui/icons-material'

import { useCreateCustomTextMutation } from 'src/graphql/generated'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { CustomText, deleteCustomTextLocal } from 'src/utils/literatureLocal'

import { GraphqlError } from '../../../../utils/graphqlError.type'
import { CustomLiteratureMenuItem } from './CustomLiteratureMenuItem'

type Props = {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
  closeMenu: () => void
}

export const CustomLiteratureMoveToUser = ({
  text,
  refreshCustomTexts,
  closeMenu,
}: Props) => {
  const enqueueSnackbar = useSnackbar()

  const { mutate: createCustomTextUser, error } =
    useCreateCustomTextMutation<GraphqlError>({
      onMutate: closeMenu,
      onSuccess: () => deleteCustomTextLocal(text.id),
      onSettled: async () => await refreshCustomTexts(),
    })
  const moveToUser = () => createCustomTextUser(text)

  useEffect(() => {
    const errorMessage = error?.response?.errors?.[0]?.message
    const userHasMoreThan3Texts = errorMessage?.match(
      /user cannot have more than 3 custom texts/
    )
    if (userHasMoreThan3Texts) {
      enqueueSnackbar(
        'You cannot have more than 3 custom texts saved to your user at once. Move one to local in order to move another to the user'
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
