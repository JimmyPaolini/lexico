import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

import { useMediaQuery, useTheme } from '@mui/material'

import { QueryClient } from 'react-query'

import { User, useUserQuery } from 'src/graphql/generated'

export type LexicoContextType = {
  isNavOpen: boolean
  setNavOpen: Dispatch<SetStateAction<boolean>>
  isMobile: boolean
  user: User
  queryClient: QueryClient
}

export const LexicoContext = createContext({} as LexicoContextType)

export const useLexicoContext = () => useContext(LexicoContext)

type Props = PropsWithChildren<{ queryClient: QueryClient }>

export const LexicoContextProvider = ({ children, queryClient }: Props) => {
  const { data } = useUserQuery(undefined, {
    staleTime: 1000 * 60 * 5 /* 5 minutes */,
  })
  const user = data?.user
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [isNavOpen, setNavOpen] = useState(false)

  return (
    <LexicoContext.Provider
      value={
        {
          user,
          isMobile,
          isNavOpen,
          setNavOpen,
          queryClient,
        } as LexicoContextType
      }
    >
      {children}
    </LexicoContext.Provider>
  )
}
