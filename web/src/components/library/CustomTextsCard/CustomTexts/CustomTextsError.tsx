import { ListItem, Typography } from '@mui/material'

export const CustomTextsError = () => {
  return (
    <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography>{"Error fetching your account's Custom Texts"}</Typography>
    </ListItem>
  )
}
