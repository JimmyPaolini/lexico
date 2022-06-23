import React, { ReactNode } from 'react'

import { Box, Tab, Tabs } from '@mui/material'
import { styled } from '@mui/material/styles'

const PREFIX = 'FormTabs'

const classes = {
  tabs: `${PREFIX}-tabs`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes.tabs}`]: {
    height: 42,
    background: theme.palette.background.paper,
  },
}))

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
  const minWidth = `${100 / tabs.length}%`

  const changeActiveTab = (_: any, selectedTab: number) => {
    setActiveTab(selectedTab)
  }

  return (
    <StyledBox>
      <Tabs
        value={activeTab}
        onChange={changeActiveTab}
        onClick={(e) => e.stopPropagation()}
        className={classes.tabs}
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
    </StyledBox>
  )
}
