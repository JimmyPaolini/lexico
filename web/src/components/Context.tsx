import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react"
import User from "../../../server/src/entity/user/User"
import useUser from "../hooks/authentication/useUser"

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
  const [isNavOpen, setNavOpen] = useState(false)
  const { data: user } = useUser()
  console.log("refetched user:", user)

  const context = { user, isNavOpen, setNavOpen } as ReactContext
  return <Context.Provider value={context}>{children}</Context.Provider>
}
