'use client'

import { createContext, useContext, type PropsWithChildren } from 'react'
import { useLocalStorage } from 'usehooks-ts'

type HandleHealthChange = (value: HealthSettings) => void

interface ComponentSettingsContextType {
  setHealthSettings: HandleHealthChange
  healthSettings: HealthSettings
}

const ComponentSettingsContext =
  createContext<ComponentSettingsContextType | null>(null)

export function ComponentSettingsProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const [componentSettings, setComponentSettings] = useLocalStorage<Settings>(
    'toolsSettings',
    {
      health: {
        max: 0,
      },
      experience: {
        increment: 10,
      },
    }
  )

  const handleHealthChange: HandleHealthChange = (health) => {
    setComponentSettings((prev) => ({...prev, health}))
  }

  return (
    <ComponentSettingsContext.Provider
      value={{ healthSettings: componentSettings.health, setHealthSettings: handleHealthChange }}
    >
      {children}
    </ComponentSettingsContext.Provider>
  )
}

export function useComponentSettings(): ComponentSettingsContextType {
  const context = useContext(ComponentSettingsContext)

  if (!context)
    throw new Error(
      'useComponentSettings has to be used within <ComponentSettingsProvider.Provider>'
    )

  return context
}
