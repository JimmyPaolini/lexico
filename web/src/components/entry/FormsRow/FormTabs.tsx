import { Box, Tab, Tabs } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { ReactNode } from "react"

interface Props {
  activeTab: number
  tabs: string[]
  setActiveTab: any
  children: ReactNode
}

export default function FormTabs({
  activeTab,
  tabs,
  setActiveTab,
  children,
}: Props): JSX.Element {
  const classes = useStyles()
  const minWidth = `${100 / tabs.length}%`

  const changeActiveTab = (_: any, selectedTab: number) => {
    setActiveTab(selectedTab)
  }

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={changeActiveTab}
        onClick={(e) => e.stopPropagation()}
        className={classes.tabs}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="conjugation tabs">
        {tabs.map((tab, i) => (
          <Tab
            label={tab}
            style={{ minWidth }}
            disabled={tab === "-"}
            aria-label={tab}
            key={i}
          />
        ))}
      </Tabs>
      {children}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    height: 42,
    background: theme.palette.background.paper,
  },
}))
