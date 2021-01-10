import { createContext, ReactNode, useState } from "react"

export const Context = createContext({} as { [key: string]: any })

interface Props {
  children?: ReactNode
}

export function ContextProvider({ children }: Props) {
  const [isNavOpen, setNavOpen] = useState(false)
  const context = { isNavOpen, setNavOpen }
  return <Context.Provider value={context as any}>{children}</Context.Provider>
}
