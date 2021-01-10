import {
  AccountBalance,
  Bookmark,
  Create,
  Inbox,
  MenuBook,
  Search,
  Settings,
} from "@material-ui/icons"
import React from "react"

const pages = [
  {
    Name: "Search",
    name: "",
    icon: <Search />,
    keybind: " ",
  },
  {
    Name: "Bookmarks",
    name: "bookmarks",
    icon: <Bookmark />,
    keybind: "b",
  },
  {
    Name: "Literature",
    name: "literature",
    icon: <MenuBook />,
    keybind: "l",
  },
  {
    Name: "Grammar",
    name: "grammar",
    icon: <Create />,
    keybind: "g",
  },
  // {
  //     Name: "Dictionary",
  //     name: "dictionary",
  //     icon: <Visibility/>,
  //     keybind: "d"
  // },
  {
    Name: "Settings",
    name: "settings",
    icon: <Settings />,
    keybind: "s",
  },
  {
    Name: "Suggestions",
    name: "suggestions",
    icon: <Inbox />,
    keybind: "",
  },
  {
    Name: "About",
    name: "about",
    icon: <AccountBalance />,
    keybind: "",
  },
]

export default pages
