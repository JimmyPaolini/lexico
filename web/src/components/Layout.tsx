import React, { ReactNode } from "react"
import Navigation from "./Navigation"

interface Props {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}
