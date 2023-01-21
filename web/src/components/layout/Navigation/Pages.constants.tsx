import AccountBalance from '@mui/icons-material/AccountBalance'
import Bookmark from '@mui/icons-material/Bookmark'
import Construction from '@mui/icons-material/Construction'
import Edit from '@mui/icons-material/Edit'
import MenuBook from '@mui/icons-material/MenuBook'
import Search from '@mui/icons-material/Search'
import Settings from '@mui/icons-material/Settings'

export const PAGES = [
  { name: 'search', Icon: <Search fontSize="large" /> },
  { name: 'bookmarks', Icon: <Bookmark fontSize="large" /> },
  { name: 'library', Icon: <MenuBook fontSize="large" /> },
  { name: 'tools', Icon: <Construction fontSize="large" /> },
  { name: 'grammar', Icon: <Edit fontSize="large" /> },
  { name: 'settings', Icon: <Settings fontSize="large" /> },
  { name: 'about', Icon: <AccountBalance fontSize="large" /> },
]
