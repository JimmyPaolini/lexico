import { useMediaQuery } from "@material-ui/core"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react"
import { User, useUserQuery } from "../../graphql/generated"

export interface ReactContext {
  isNavOpen: boolean
  setNavOpen: Dispatch<SetStateAction<boolean>>
  isMobile: boolean
  user: User
}

export const Context = createContext({} as ReactContext)

interface Props {
  children?: ReactNode
}
export function ContextProvider({ children }: Props): JSX.Element {
  const { data } = useUserQuery({}, { staleTime: 1000 * 60 * 5 })
  const user = data?.user
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"))
  const [isNavOpen, setNavOpen] = useState(false)

  return (
    <Context.Provider
      value={
        {
          user,
          isMobile,
          isNavOpen,
          setNavOpen,
        } as ReactContext
      }>
      {children}
    </Context.Provider>
  )
}
