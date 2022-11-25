import React, { Dispatch, ReactNode, SetStateAction } from 'react'

import { Box, Tab, Tabs } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { ClassNames } from '@emotion/react'

import { Identifier } from '../../../utils/identifiers'
import IdentifierPill from '../../accessories/Pills/IdentifierPill'
import { identifierStyles } from '../../accessories/Pills/identifierStyles'

type Props = {
  tabs: Identifier[]
  activeTab: number
  setActiveTab: Dispatch<SetStateAction<number>> | ((activeTab: number) => void)
  children: ReactNode
}

export const FormTabs = ({
  tabs,
  activeTab,
  setActiveTab,
  children,
}: Props) => {
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
                background:
                  identifierStyles[tabs[activeTab]].background ?? 'white',
              }),
            }}
            variant="fullWidth"
            aria-label="inflection tabs"
          >
            {tabs.map((tab) => (
              <Tab
                icon={<IdentifierPill identifier={tab} />}
                sx={{ minWidth, padding: '0px 0px' }}
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
