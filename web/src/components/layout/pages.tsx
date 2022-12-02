import AccountBalance from '@mui/icons-material/AccountBalance'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Bookmark from '@mui/icons-material/Bookmark'
import Edit from '@mui/icons-material/Edit'
import MenuBook from '@mui/icons-material/MenuBook'
import Search from '@mui/icons-material/Search'

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
    name: 'literature',
    icon: <MenuBook />,
    keybind: 'l',
  },
  {
    name: 'grammar',
    icon: <Edit />,
    keybind: 'g',
  },
  {
    name: 'user',
    icon: <AccountCircle />,
    keybind: 'u',
  },
  {
    name: 'about',
    icon: <AccountBalance />,
    keybind: 'a',
  },
]
