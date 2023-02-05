import { CircularProgress, ListItem } from '@mui/material'

export const UserTextsLoading = () => {
  return (
    <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size={32} thickness={5.4} />
    </ListItem>
  )
}
