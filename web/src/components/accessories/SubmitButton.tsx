import { ComponentProps, MouseEventHandler } from 'react'

import { Button } from '@mui/material'

import { sentenceCase } from 'src/utils/string'

type Props = ComponentProps<typeof Button> & {
  name: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const SubmitButton = ({ name, onClick, ...props }: Props) => {
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
