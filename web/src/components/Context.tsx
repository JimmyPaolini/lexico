import { useMediaQuery } from "@material-ui/core"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react"
import User from "../../../entity/user/User"
import useUser from "../hooks/user/useUser"

export const Context = createContext({} as { [key: string]: any })

export interface ReactContext {
  isNavOpen: boolean
  setNavOpen: Dispatch<SetStateAction<boolean>>
  user: User
}

interface Props {
  children?: ReactNode
}
export function ContextProvider({ children }: Props) {
  const { data: user } = useUser()
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"))
  const [isNavOpen, setNavOpen] = useState(false)

  const context = { user, isMobile, isNavOpen, setNavOpen } as ReactContext
  return <Context.Provider value={context}>{children}</Context.Provider>
}
