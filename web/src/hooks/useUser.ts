import { useQueryClient } from 'react-query'

import { UserQuery, useUserQuery } from 'src/graphql/generated'

export const useUser = (): UserQuery['user'] => {
  return useQueryClient().getQueryData<UserQuery>(useUserQuery.getKey())?.user
}
