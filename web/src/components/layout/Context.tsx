import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'
import { QueryClient } from 'react-query'

import { useMediaQuery } from '@material-ui/core'

import { User, useUserQuery } from '../../graphql/generated'

export interface ReactContext {
  isNavOpen: boolean
  setNavOpen: Dispatch<SetStateAction<boolean>>
  isMobile: boolean
  user: User
  queryClient: QueryClient
}

export const Context = createContext({} as ReactContext)

type Props = {
  children?: ReactNode
  queryClient: QueryClient
}
export function ContextProvider({ children, queryClient }: Props) {
  const { data } = useUserQuery({}, { staleTime: 1000 * 60 * 5 }) // 5 minutes
  const user = data?.user
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
  const [isNavOpen, setNavOpen] = useState(false)

  return (
    <Context.Provider
      value={
        {
          user,
          isMobile,
          isNavOpen,
          setNavOpen,
          queryClient,
        } as ReactContext
      }
    >
      {children}
    </Context.Provider>
  )
}
