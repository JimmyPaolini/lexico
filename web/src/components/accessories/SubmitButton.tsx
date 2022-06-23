import React, { ComponentProps } from 'react'

import { Button } from '@mui/material'

import { sentenceCase } from '../../utils/string'

type Props = {
  name: string
  onClick?: () => any
} & ComponentProps<typeof Button>

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
