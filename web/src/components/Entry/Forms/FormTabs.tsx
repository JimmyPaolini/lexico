import { Dispatch, ReactNode, SetStateAction } from 'react'

import { Box, Tab, Tabs } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import {
  Identifier,
  IdentifierType,
  identifierStyles,
} from 'src/components/accessories/Identifier'

type Props = {
  tabs: IdentifierType[]
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

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={(_: unknown, tab: number) => setActiveTab(tab)}
        onClick={(e) => e.stopPropagation()}
        sx={{
          background: theme.palette.background.paper,
          '& .MuiTabs-indicator': {
            background: identifierStyles[tabs[activeTab]].background ?? 'white',
          },
        }}
        variant="fullWidth"
        aria-label="inflection tabs"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab}
            icon={<Identifier identifier={tab} sx={{ cursor: 'pointer' }} />}
            aria-label={tab}
            sx={{ minWidth: 0, padding: 0 }}
          />
        ))}
      </Tabs>
      {children}
    </Box>
  )
}
