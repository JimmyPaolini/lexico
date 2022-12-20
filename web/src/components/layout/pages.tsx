import AccountBalance from '@mui/icons-material/AccountBalance'
import Bookmark from '@mui/icons-material/Bookmark'
import Edit from '@mui/icons-material/Edit'
import MenuBook from '@mui/icons-material/MenuBook'
import Search from '@mui/icons-material/Search'
import Settings from '@mui/icons-material/Settings'

export const pages = [
  {
    name: 'search',
    icon: <Search />,
    keybind: 's',
  },
  {
    name: 'bookmarks',
    icon: <Bookmark />,
    keybind: 'b',
  },
  {
    name: 'library',
    icon: <MenuBook />,
    keybind: 'l',
  },
  {
    name: 'grammar',
    icon: <Edit />,
    keybind: 'g',
  },
  {
    name: 'settings',
    icon: <Settings />,
    keybind: 'u',
  },
  {
    name: 'about',
    icon: <AccountBalance />,
    keybind: 'a',
  },
]
