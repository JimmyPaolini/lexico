import { List } from "@material-ui/core"
import React, { memo, useState } from "react"
import {
  CustomLiterature,
  listLiteratureLocal,
} from "../../../utils/localLiterature"
import CustomLiteratureRow from "./CustomLiteratureRow"

export default memo(function CustomLiteratureRows(): JSX.Element {
  const [literature, setLiterature] = useState<CustomLiterature>(
    listLiteratureLocal(),
  )
  const refreshLiteratureLocal = () => setLiterature(listLiteratureLocal())

  if (!literature.length) return <></>

  return (
    <List style={{ padding: 0 }}>
      {literature.map((text) => (
        <CustomLiteratureRow
          {...{ text, refreshLiteratureLocal }}
          key={text.title}
        />
      ))}
    </List>
  )
})
