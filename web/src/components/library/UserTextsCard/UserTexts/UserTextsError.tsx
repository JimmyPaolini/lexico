import { ListItem, Typography } from '@mui/material'

export const UserTextsError = () => {
  return (
    <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography>Error fetching your User Texts</Typography>
    </ListItem>
  )
}
