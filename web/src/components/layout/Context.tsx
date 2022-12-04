import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react'

import { useMediaQuery, useTheme } from '@mui/material'

import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { QueryClient } from 'react-query'

import { User, useUserQuery } from 'src/graphql/generated'

type LexicoContext = {
  user: User
  session: Session | null
  isNavOpen: boolean
  setNavOpen: Dispatch<SetStateAction<boolean>>
  isMobile: boolean
  queryClient: QueryClient
}

export const Context = createContext({} as LexicoContext)

type Props = PropsWithChildren<{ queryClient: QueryClient }>

export const ContextProvider = ({ children, queryClient }: Props) => {
  const { data: session } = useSession()
  const { data } = useUserQuery(
    {},
    { staleTime: 1000 * 60 * 5 /* 5 minutes */ },
  )
  const user = data?.user
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [isNavOpen, setNavOpen] = useState(false)

  return (
    <Context.Provider
      value={
        {
          user,
          session,
          isNavOpen,
          setNavOpen,
          isMobile,
          queryClient,
        } as LexicoContext
      }
    >
      {children}
    </Context.Provider>
  )
}
