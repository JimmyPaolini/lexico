import { List } from "@material-ui/core"
import React from "react"
import useCustomTexts from "../../../hooks/literature/useCustomTexts"
import CustomLiteratureLoading from "./CustomLiteratureLoading"
import CustomLiteratureRow from "./CustomLiteratureRow"

export default function CustomLiteratureRows(): JSX.Element {
  const { customTexts, refreshCustomTexts, isLoading } = useCustomTexts()

  if (!customTexts.length) return <></>
  return (
    <List style={{ padding: 0 }}>
      {isLoading ? (
        <CustomLiteratureLoading />
      ) : (
        customTexts.map((text) => (
          <CustomLiteratureRow
            {...{ text, refreshCustomTexts }}
            key={text.id}
          />
        ))
      )}
    </List>
  )
}
