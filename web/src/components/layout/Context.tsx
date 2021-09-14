import { useMediaQuery } from "@material-ui/core"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react"
import User from "../../../../entity/user/User"
import useUser from "../../hooks/user/useUser"

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
  const { data: user } = useUser()
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
