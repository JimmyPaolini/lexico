import React, { ReactNode } from 'react'

import { Box, Tab, Tabs } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { ClassNames } from '@emotion/react'

import { Identifier, identifierColors } from '../../../utils/identifiers'
import IdentifierPill from '../../accessories/Pills/IdentifierPill'

type Props = {
  tabs: Identifier[]
  activeTab: number
  setActiveTab: any
  children: ReactNode
}

export default function FormTabs({
  tabs,
  activeTab,
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
      <ClassNames>
        {({ css }) => (
          <Tabs
            value={activeTab}
            onChange={changeActiveTab}
            onClick={(e) => e.stopPropagation()}
            sx={{ background: theme.palette.background.paper }}
            classes={{
              indicator: css({
                backgroundColor:
                  identifierColors[tabs[activeTab]].backgroundColor ?? 'white',
              }),
            }}
            variant="fullWidth"
            aria-label="inflection tabs"
          >
            {tabs.map((tab) => (
              <Tab
                icon={<IdentifierPill identifier={tab} />}
                sx={{ minWidth, padding: '12px 0px' }}
                // disabled={tab === '-'}
                aria-label={tab}
                key={tab}
              />
            ))}
          </Tabs>
        )}
      </ClassNames>
      {children}
    </Box>
  )
}
