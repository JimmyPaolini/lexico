import { AccountCircle } from '@mui/icons-material'

import { deleteCustomTextLocal } from 'src/components/library/CustomTextsCard/CustomTexts'
import { CustomText, useCreateCustomTextMutation } from 'src/graphql/generated'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { GraphqlError } from 'src/utils/graphqlError.type'

import { Action } from './Action'

type Props = {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
  closeMenu: () => void
}

export const MoveToUser = ({ text, refreshCustomTexts, closeMenu }: Props) => {
  const enqueueSnackbar = useSnackbar()

  const { mutate: createCustomTextUser } =
    useCreateCustomTextMutation<GraphqlError>({
      onMutate: closeMenu,
      onSuccess: () => deleteCustomTextLocal(text.id),
      onSettled: async () => await refreshCustomTexts(),
      onError: (error) => {
        const errorMessage = error?.response?.errors?.[0]?.message
        const userHasMoreThan3Texts = errorMessage?.match(
          /user cannot have more than 3 custom texts/
        )
        if (userHasMoreThan3Texts) {
          enqueueSnackbar(
            'You cannot have more than 3 custom texts saved to your account at once. Move ome to local in order to this one to your account'
          )
        }
      },
    })

  return (
    <Action
      onClick={async (e) => {
        e.stopPropagation()
        await createCustomTextUser(text)
      }}
      Icon={<AccountCircle />}
      text="Move To User"
    />
  )
}
