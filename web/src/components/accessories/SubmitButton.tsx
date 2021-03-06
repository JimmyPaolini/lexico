import { Button } from "@material-ui/core"
import React from "react"
import { sentenceCase } from "../../utils/string"

interface Props {
  name: string
  onClick?: () => any
  [key: string]: any
}
export default function SubmitButton({ name, onClick, ...props }: Props) {
  return (
    <Button
      color="primary"
      variant="contained"
      size="large"
      disableElevation
      fullWidth
      type="submit"
      onClick={onClick}
      {...props}
    >
      {sentenceCase(name)}
    </Button>
  )
}
