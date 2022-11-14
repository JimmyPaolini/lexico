import React, { ReactNode } from 'react'

import { Box, Tab, Tabs } from '@mui/material'
import { useTheme } from '@mui/material/styles'

type Props = {
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
}: Props) {
  const theme = useTheme()
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
        sx={{ height: 42, background: theme.palette.background.paper }}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="conjugation tabs"
      >
        {tabs.map((tab, i) => (
          <Tab
            label={tab}
            style={{ minWidth }}
            disabled={tab === '-'}
            aria-label={tab}
            key={i}
          />
        ))}
      </Tabs>
      {children}
    </Box>
  )
}
