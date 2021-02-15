import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react"
import User from "../../../server/src/entity/user/User"

export const Context = createContext({} as { [key: string]: any })

interface Props {
  children?: ReactNode
}

export interface ReactContext {
  isNavOpen: boolean
  setNavOpen: Dispatch<SetStateAction<boolean>>
  user: User
}

export function ContextProvider({ children }: Props) {
  const [isNavOpen, setNavOpen] = useState(false)
  const context = { isNavOpen, setNavOpen } as ReactContext
  return <Context.Provider value={context}>{children}</Context.Provider>
}
